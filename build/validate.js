// The release gate. Must print OK. Checks content/, data/ and the built site/.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (m) => errors.push(m);

function walk(dir, ext) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p, ext) : (!ext || ext.some((e) => n.endsWith(e)) ? [p] : []);
  });
}
const rel = (p) => p.slice(root.length + 1);
const text = ['.md', '.json', '.html', '.css', '.js', '.mjs', '.yml'];
const scanned = [...walk(join(root, 'content'), text), ...walk(join(root, 'data'), text), ...walk(join(root, 'site'), text), ...walk(join(root, 'assets'), text)];

{
  const pn = JSON.parse(readFileSync(join(root, 'build/private-names.json'), 'utf8'));
  const res = pn.patterns.map((p) => new RegExp(p, 'i'));
  for (const f of walk(join(root, 'site'))) {
    const t = readFileSync(f, 'utf8');
    if (res.some((re) => re.test(t) || re.test(rel(f)))) fail(`${rel(f)}: contains a name that must not be published`);
  }
}
if (!existsSync(join(root, 'site/index.html'))) fail('site/index.html missing: run the build first');
if (!existsSync(join(root, 'CNAME')) || readFileSync(join(root, 'CNAME'), 'utf8').trim() !== 'agenticcells.ai') fail('CNAME must contain agenticcells.ai');

const keyShapes = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}/,
  /\bgithub_pat_[A-Za-z0-9_]{30,}/,
  /\bsk-[A-Za-z0-9_-]{20,}/,
  /\bxox[abprs]-[A-Za-z0-9-]{10,}/,
  /\b[A-Fa-f0-9]{40,}\b/,
  /\b[A-Za-z0-9+\/]{40,}={0,2}(?![A-Za-z0-9+\/])/,
];
for (const f of scanned) {
  const t = readFileSync(f, 'utf8');
  if (t.includes('—')) fail(`${rel(f)}: em dash found`);
  for (const re of keyShapes) if (re.test(t)) fail(`${rel(f)}: key-shaped string (${re.source.slice(0, 20)}...)`);
  if (/\.(md|html)$/.test(f) || f.endsWith('.json')) {
    t.split('\n').forEach((line, i) => {
      if (/[£$€]\s?\d/.test(line) && !/first proposal/i.test(line)) fail(`${rel(f)}:${i + 1}: price not marked "first proposal"`);
    });
  }
}

// Every content page has title and description.
for (const f of walk(join(root, 'content'), ['.md'])) {
  const m = readFileSync(f, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  const fm = m ? m[1] : '';
  if (!/^title:\s*\S/m.test(fm)) fail(`${rel(f)}: no title`);
  if (!/^description:\s*\S/m.test(fm)) fail(`${rel(f)}: no description`);
  // Archive (V-ARCHIVE): an archived page needs a real date and a reason, and must not still ask for a nav place.
  if (/^archive:/m.test(fm)) {
    const d = (fm.match(/^archive:\s*(\S+)/m) || [])[1] || '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || Number.isNaN(Date.parse(d))) fail(`${rel(f)}: archive must be a date (YYYY-MM-DD)`);
    if (!/^archive_why:\s*\S/m.test(fm)) fail(`${rel(f)}: archived page has no archive_why`);
  }
}
// Every built page has title and description.
for (const f of walk(join(root, 'site'), ['.html'])) {
  const t = readFileSync(f, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(t)) fail(`${rel(f)}: empty title`);
  if (!/<meta name="description" content="[^"]+"/.test(t)) fail(`${rel(f)}: empty description`);
  // Links resolve.
  for (const m of t.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|#)/.test(u)) continue;
    const path = u.split('#')[0].split('?')[0];
    if (!path) continue;
    let target = path.startsWith('/') ? join(root, 'site', path) : resolve(dirname(f), path);
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) fail(`${rel(f)}: broken link ${u}`);
  }
}
// No page loads a script or stylesheet from another host: everything is served from this site.
const ownHosts = new Set(['agenticcells.ai', 'www.agenticcells.ai', 'agenticcells.com', 'www.agenticcells.com']);
const foreign = (u) => {
  const m = u.trim().match(/^(?:[a-z][a-z0-9+.-]*:)?\/\/([^/?#:]+)/i);
  if (m) return !ownHosts.has(m[1].toLowerCase());
  return /^[a-z][a-z0-9+.-]*:/i.test(u.trim()); // data:, javascript: and the like
};
for (const f of walk(join(root, 'site'), ['.html'])) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/<script\b[^>]*>/gi)) {
    const src = m[0].match(/\ssrc\s*=\s*["']?([^"'\s>]+)/i);
    if (src && foreign(src[1])) fail(`${rel(f)}: script from another host: ${src[1]}`);
  }
  for (const m of t.matchAll(/<link\b[^>]*>/gi)) {
    const relAttr = (m[0].match(/\srel\s*=\s*["']?([^"'>]+)/i) || [])[1] || '';
    if (!/\b(stylesheet|preload|modulepreload)\b/i.test(relAttr)) continue;
    const href = m[0].match(/\shref\s*=\s*["']?([^"'\s>]+)/i);
    if (href && foreign(href[1])) fail(`${rel(f)}: ${relAttr.trim()} from another host: ${href[1]}`);
  }
  for (const m of t.matchAll(/@import\s+(?:url\()?\s*["']?([^"')\s;]+)/gi)) if (foreign(m[1])) fail(`${rel(f)}: @import from another host: ${m[1]}`);
}
for (const f of walk(join(root, 'site'), ['.css'])) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/@import\s+(?:url\()?\s*["']?([^"')\s;]+)/gi)) if (foreign(m[1])) fail(`${rel(f)}: @import from another host: ${m[1]}`);
}

// Wording: no hype words in content/ or in the built pages (page hooks included).
const hype = /\b(revolutionary|cutting[- ]edge|seamless(?:ly)?|world[- ]class|game[- ]changing)\b/gi;
for (const f of [...walk(join(root, 'content'), ['.md']), ...walk(join(root, 'site'), ['.html'])]) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(hype)) fail(`${rel(f)}:${i + 1}: hype word "${m[1]}"`);
  });
}

// Cells data: every price marked.
try {
  const { cells } = JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8'));
  if (!Array.isArray(cells) || cells.length !== 4) fail('data/cells.json: expected four cells');
  for (const c of cells || []) if (c.price_status !== 'first proposal') fail(`data/cells.json: ${c.name} price not marked first proposal`);
} catch (e) { fail(`data/cells.json: ${e.message}`); }

// hub.json (ACC-024): the site's entry for the hub of agentic sites. Shape only; no vault fields yet.
try {
  const h = JSON.parse(readFileSync(join(root, 'hub.json'), 'utf8'));
  for (const k of ['name', 'what_it_does', 'owner', 'team', 'live_address', 'repository', 'version_from']) {
    if (typeof h[k] !== 'string' || !h[k].trim()) fail(`hub.json: ${k} must be a non-empty string`);
  }
  if (h.owner !== 'AgentiCCells') fail('hub.json: owner must be AgentiCCells');
  const cname = readFileSync(join(root, 'CNAME'), 'utf8').trim();
  if (h.live_address !== `https://${cname}`) fail(`hub.json: live_address must be https://${cname}`);
  if (!/^https:\/\/github\.com\/AgentiCCells\/[\w.-]+$/.test(h.repository || '')) fail('hub.json: repository must be a github.com/AgentiCCells URL');
  if (h.version_from !== `https://${cname}/version.json`) fail(`hub.json: version_from must be https://${cname}/version.json`);
  if (!h.licence || h.licence.code !== 'Apache-2.0' || h.licence.text !== 'CC BY 4.0') fail('hub.json: licence must be code Apache-2.0, text CC BY 4.0');
  for (const k of Object.keys(h)) if (/vault/i.test(k)) fail(`hub.json: vault field "${k}" not allowed until the vault exists`);
} catch (e) { fail(`hub.json: ${e.message}`); }

// Selling basics (V3): canonical and Open Graph on every indexable page, sitemap, robots, 404, favicon.
{
  const cname = readFileSync(join(root, 'CNAME'), 'utf8').trim();
  for (const f of ['site/404.html', 'site/robots.txt', 'site/sitemap.xml', 'site/assets/favicon.svg']) if (!existsSync(join(root, f))) fail(`${f} missing`);
  const sitemap = existsSync(join(root, 'site/sitemap.xml')) ? readFileSync(join(root, 'site/sitemap.xml'), 'utf8') : '';
  if (existsSync(join(root, 'site/robots.txt')) && !readFileSync(join(root, 'site/robots.txt'), 'utf8').includes(`Sitemap: https://${cname}/sitemap.xml`)) fail('site/robots.txt: Sitemap line missing or wrong host');
  for (const f of walk(join(root, 'site'), ['.html'])) {
    const t = readFileSync(f, 'utf8');
    for (const k of ['og:title', 'og:description']) if (!t.includes(`property="${k}"`)) fail(`${rel(f)}: no ${k}`);
    if (/<meta name="robots" content="noindex">/.test(t)) continue;
    const url = '/' + rel(f).slice('site/'.length).replace(/(^|\/)index\.html$/, '$1');
    if (!t.includes(`<link rel="canonical" href="https://${cname}${url}">`)) fail(`${rel(f)}: canonical missing or wrong (want https://${cname}${url})`);
    if (!sitemap.includes(`<loc>https://${cname}${url}</loc>`)) fail(`${rel(f)}: not in sitemap.xml`);
  }
}

// Warning only (V-RV1): agenticcells.com is not the site's domain; allowed on history pages and the console replays/board data.
for (const f of walk(join(root, 'site'), ['.html'])) {
  const r = rel(f);
  if (/history|case-study|how-this-site-was-built/.test(r)) continue;
  const lines = readFileSync(f, 'utf8').split('\n');
  let n = 0;
  lines.forEach((ln, i) => {
    // A mention followed in place by the "moved to agenticcells.ai" note is history said as history (V-RV6).
    const bare = ln.replace(/agenticcells\.com \(then the site's address; moved to agenticcells\.ai on 2026-11-15\)/g, '');
    const c = (bare.match(/agenticcells\.com/g) || []).length;
    if (c) { n += c; console.warn(`WARNING ${r}:${i + 1}: ${c} mention(s) of agenticcells.com without a history note: ${bare.replace(/<[^>]+>/g, '').trim().slice(0, 100)}`); }
  });
  if (n) console.warn(`WARNING ${r}: mentions agenticcells.com ${n} time(s) without a history note; the site is on agenticcells.ai`);
}
// Warning only (V-RV3): a size proxy for the console's length on a phone. 120 KB of HTML is about 30,000 px at 390 px
// by the 2026-11-16 measurement (61 KB = 10,785 px); build/console-height.mjs measures the real height with Playwright.
for (const f of walk(join(root, 'site', 'console'), ['.html'])) {
  const kb = Math.round(statSync(f).size / 1024);
  if (kb > 120) console.warn(`WARNING ${rel(f)}: ${kb} KB of HTML, over the 120 KB budget (about 30,000 px tall at 390 px)`);
}
// Warning only (V-EVID): figures on published pages with no evidence link in their sentence. Never fails the build.
spawnSync(process.execPath, [join(root, 'build/check-evidence.mjs')], { stdio: 'inherit' });
if (errors.length) { console.error(errors.join('\n')); console.error(`FAILED (${errors.length})`); process.exit(1); }
console.log('OK');

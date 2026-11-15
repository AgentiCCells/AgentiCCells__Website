// The release gate. Must print OK. Checks content/, data/ and the built site/.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

if (!existsSync(join(root, 'site/index.html'))) fail('site/index.html missing: run the build first');
if (!existsSync(join(root, 'CNAME')) || readFileSync(join(root, 'CNAME'), 'utf8').trim() !== 'agenticcells.com') fail('CNAME must contain agenticcells.com');

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
// Cells data: every price marked.
try {
  const { cells } = JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8'));
  if (!Array.isArray(cells) || cells.length !== 4) fail('data/cells.json: expected four cells');
  for (const c of cells || []) if (c.price_status !== 'first proposal') fail(`data/cells.json: ${c.name} price not marked first proposal`);
} catch (e) { fail(`data/cells.json: ${e.message}`); }

if (errors.length) { console.error(errors.join('\n')); console.error(`FAILED (${errors.length})`); process.exit(1); }
console.log('OK');

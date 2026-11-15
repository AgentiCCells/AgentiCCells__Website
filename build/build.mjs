// Turns content/ and data/ into site/. Node only, no dependencies.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'site');
// Set by CI only (see .github/workflows/pages.yml); local builds say 'local'.
const version = process.env.SITE_VERSION || 'local';
// Dinis, 2026-11-15: "The contact address for the team is going to be, for now, agent@riskmandate.ai".
const contact = 'agent@riskmandate.ai';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function frontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdown(body) {
  const lines = body.split('\n');
  const html = [];
  let para = [], list = [], olist = [];
  const flush = () => {
    if (para.length) html.push(`<p>${inline(para.join(' '))}</p>`);
    if (olist.length) html.push(`<ol class="steps">${olist.map((l) => `<li>${inline(l)}</li>`).join('')}</ol>`);
    // A list whose every item starts with a **bold lead** is a set of points: shown as cards (D2).
    if (list.length) html.push(`<ul${list.every((l) => /^\*\*[^*]+\*\*/.test(l)) ? ' class="points"' : ''}>${list.map((l) => `<li>${inline(l)}</li>`).join('')}</ul>`);
    para = []; list = []; olist = [];
  };
  for (const line of lines) {
    let m;
    if (line.trim() === '{{ladder}}') { flush(); html.push(ladder()); }
    else if ((m = line.trim().match(/^\{\{stack(?::(components|runtimes))?\}\}$/))) { flush(); html.push(stack(m[1] || 'components')); }
    else if ((m = line.match(/^(#{1,4})\s+(.*)$/))) { flush(); html.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); }
    else if ((m = line.match(/^[-*]\s+(.*)$/))) { if (para.length || olist.length) flush(); list.push(m[1]); }
    // Numbered steps ("1. ...") become an ordered list (D2).
    else if ((m = line.match(/^\d+\.\s+(.*)$/))) { if (para.length || list.length) flush(); olist.push(m[1]); }
    else if (line.trim() === '') flush();
    else { if (list.length || olist.length) flush(); para.push(line.trim()); }
  }
  flush();
  return html.join('\n');
}

function ladder() {
  const { cells } = JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8'));
  const rows = cells.map((c) =>
    `<tr><td data-label="Cell">${esc(c.name)}</td><td data-label="Price">${esc(c.price)} (${esc(c.price_status)})</td><td data-label="What is set up">${esc(c.includes)}</td></tr>`).join('\n');
  return `<div class="table-wrap ladder"><table>\n<thead><tr><th>Cell</th><th>Price</th><th>What is set up</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>\n<p>Every size includes the control centre. All prices are a first proposal and not yet offers.</p>`;
}

// {{stack}} (or {{stack:components}}) and {{stack:runtimes}}: the table from data/stack.json,
// so the open-source page does not type the list twice. Runtimes are the entries named "Runtime: ...".
function stack(which) {
  const { components, checked } = JSON.parse(readFileSync(join(root, 'data/stack.json'), 'utf8'));
  const isRuntime = (c) => /^Runtime:\s*/.test(c.name);
  const rows = components.filter((c) => (which === 'runtimes') === isRuntime(c)).map((c) => {
    const links = [`<a href="${esc(c.link)}">Link</a>`];
    if (c.code_link) links.push(`<a href="${esc(c.code_link)}">code</a>`);
    return `<tr><td><strong>${esc(c.name.replace(/^Runtime:\s*/, ''))}</strong><br>${esc(c.what || '')}</td><td>${esc(c.licence)}</td><td>${esc(c.status)}</td><td>${links.join(', ')}</td></tr>`;
  }).join('\n');
  return `<div class="table-wrap"><table>\n<thead><tr><th>${which === 'runtimes' ? 'Runtime' : 'Component'}</th><th>Licence</th><th>Status</th><th>Link</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>\n<p>From data/stack.json, checked ${esc(checked || '')}.</p>`;
}

// The site nav: every page with a `nav:` number in its front matter (or returned
// by a page hook), in that number's order. Pages without one stay out of the nav.
function navHtml(nav, current) {
  if (!nav.length) return '';
  const items = nav.map((n) => n.url === current
    ? `<li><a href="${esc(n.url)}" aria-current="page">${esc(n.title)}</a></li>`
    : `<li><a href="${esc(n.url)}">${esc(n.title)}</a></li>`).join('');
  return `<nav aria-label="Site"><ul>${items}</ul></nav>`;
}

function page(meta, content, nav = [], current = '') {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title || '')}</title>
<meta name="description" content="${esc(meta.description || '')}">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<header><a class="brand" href="/">AgentiCCells</a>${navHtml(nav, current)}</header>
<main>
${content}
</main>
<footer><p>Contact: <a href="mailto:${contact}">${contact}</a></p><p>Code under Apache-2.0. Text and images under CC BY 4.0.</p><p class="version">Version ${esc(version)}</p></footer>
</body>
</html>
`;
}

// A site path such as "/", "/console/" or "/console/2026-11-15/" (or "/x.html")
// becomes a file under site/. A path that would leave site/ is refused.
function fileFor(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) throw new Error(`page path must start with "/": ${path}`);
  let f = path.slice(1);
  if (f === '' || f.endsWith('/')) f += 'index.html';
  else if (!f.endsWith('.html')) f += '/index.html';
  if (f.split(/[\\/]/).some((part) => part === '..' || part === '.')) throw new Error(`page path leaves site/: ${path}`);
  return normalize(f);
}
const urlFor = (file) => '/' + file.replace(/(^|\/)index\.html$/, '$1');

// site/ is cleared first, so page hooks may also write their own files under ctx.out.
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });

// Pages from content/*.md.
const pages = [];
for (const f of readdirSync(join(root, 'content')).filter((f) => f.endsWith('.md')).sort()) {
  const { meta, body } = frontMatter(readFileSync(join(root, 'content', f), 'utf8'));
  const path = f === 'index.md' ? '/' : `/${f.replace(/\.md$/, '')}/`;
  pages.push({ path, title: meta.title, description: meta.description, nav: meta.nav, html: markdown(body), source: `content/${f}` });
}

// Page hooks: build/pages/*.mjs, each `export default async function (ctx)` returning
// [{ path, title, description, html, nav? }]. `path` is a site path such as "/console/";
// `html` is the inside of <main>. Each page gets the same template, nav and footer.
// ctx.out is site/, already cleared; a hook may also return extra files through ctx.files.
const hookDir = join(root, 'build', 'pages');
const ctx = { root, out, version, contact, esc, inline, markdown, frontMatter, pages: pages.map(({ path, title }) => ({ path, title })), files: [] };
if (existsSync(hookDir)) {
  for (const f of readdirSync(hookDir).filter((f) => f.endsWith('.mjs')).sort()) {
    const mod = await import(pathToFileURL(join(hookDir, f)).href);
    if (typeof mod.default !== 'function') throw new Error(`build/pages/${f}: no default export function`);
    const got = await mod.default(ctx);
    if (!Array.isArray(got)) throw new Error(`build/pages/${f}: must return an array of pages`);
    for (const p of got) {
      for (const k of ['path', 'title', 'description', 'html']) {
        if (typeof p?.[k] !== 'string') throw new Error(`build/pages/${f}: page ${p?.path ?? '?'} has no ${k}`);
      }
      pages.push({ ...p, source: `build/pages/${f}` });
    }
  }
}

const seen = new Map();
for (const p of pages) {
  p.file = fileFor(p.path);
  if (seen.has(p.file)) throw new Error(`${p.source} and ${seen.get(p.file)} both write ${p.path}`);
  seen.set(p.file, p.source);
}
const nav = pages
  .filter((p) => p.nav !== undefined && p.nav !== '' && Number.isFinite(Number(p.nav)))
  .sort((a, b) => Number(a.nav) - Number(b.nav) || String(a.title).localeCompare(String(b.title)))
  .map((p) => ({ url: urlFor(p.file), title: p.title }));

// Home page first screen (D2): the h1 and the opening paragraph become a hero with one call to action.
function hero(html) {
  const i = html.indexOf('<h2');
  if (i < 0) return html;
  return `<section class="hero">\n${html.slice(0, i)}\n<p class="cta"><a class="button" href="mailto:${contact}">Email ${contact}</a></p>\n</section>\n${html.slice(i)}`;
}
for (const p of pages) if (p.path === '/') p.html = hero(p.html);

// Seven-step diagram on the website cell page (D9): inline SVG, no external files.
const FLOW = '<figure class="flow"><svg viewBox="0 0 360 324" role="img" aria-labelledby="flow-t flow-d"><title id="flow-t">The seven steps of the website cell</title><desc id="flow-d">Order, queue, build, preview, key, steer, handover, in that order, with who acts at each step. A proposal, not yet run end to end.</desc><line class="d-line" x1="22" y1="30" x2="22" y2="294"/><circle class="d-dot" cx="22" cy="30" r="14"/><text class="d-num" x="22" y="35" text-anchor="middle">1</text><text class="d-txt" x="50" y="35">Order</text><circle class="d-dot" cx="22" cy="74" r="14"/><text class="d-num" x="22" y="79" text-anchor="middle">2</text><text class="d-txt" x="50" y="79">Queue</text><circle class="d-dot" cx="22" cy="118" r="14"/><text class="d-num" x="22" y="123" text-anchor="middle">3</text><text class="d-txt" x="50" y="123">Build</text><circle class="d-dot" cx="22" cy="162" r="14"/><text class="d-num" x="22" y="167" text-anchor="middle">4</text><text class="d-txt" x="50" y="167">Preview</text><circle class="d-dot" cx="22" cy="206" r="14"/><text class="d-num" x="22" y="211" text-anchor="middle">5</text><text class="d-txt" x="50" y="211">Key</text><circle class="d-dot" cx="22" cy="250" r="14"/><text class="d-num" x="22" y="255" text-anchor="middle">6</text><text class="d-txt" x="50" y="255">Steer</text><circle class="d-dot" cx="22" cy="294" r="14"/><text class="d-num" x="22" y="299" text-anchor="middle">7</text><text class="d-txt" x="50" y="299">Handover</text><text class="d-who" x="346" y="35" text-anchor="end">you</text><text class="d-who" x="346" y="79" text-anchor="end">us</text><text class="d-who" x="346" y="123" text-anchor="end">our agents</text><text class="d-who" x="346" y="167" text-anchor="end">you look</text><text class="d-who" x="346" y="211" text-anchor="end">your browser</text><text class="d-who" x="346" y="255" text-anchor="end">you and our agents</text><text class="d-who" x="346" y="299" text-anchor="end">you</text></svg><figcaption>The seven steps, in order, and who acts at each. A proposal; the flow has not yet been run end to end.</figcaption></figure>';
for (const p of pages) if (p.path === '/website-cell/') {
  const i = p.html.indexOf('<ol class="steps">');
  if (i >= 0) p.html = p.html.slice(0, i) + FLOW + '\n' + p.html.slice(i);
}

for (const p of pages) {
  mkdirSync(dirname(join(out, p.file)), { recursive: true });
  writeFileSync(join(out, p.file), page(p, p.html, nav, urlFor(p.file)));
}
for (const f of readdirSync(join(root, 'assets'))) copyFileSync(join(root, 'assets', f), join(out, 'assets', f));
if (existsSync(join(root, 'CNAME'))) copyFileSync(join(root, 'CNAME'), join(out, 'CNAME'));
// Extra files from page hooks (ctx.files: [{ path, content }], path under site/), written after site/ is cleared.
for (const { path, content } of ctx.files) {
  const file = normalize(String(path).replace(/^\/+/, ''));
  if (file.split(/[\\/]/).some((part) => part === '..' || part === '.')) throw new Error(`hook file leaves site/: ${path}`);
  mkdirSync(dirname(join(out, file)), { recursive: true });
  writeFileSync(join(out, file), content);
}
writeFileSync(join(out, 'version.json'), JSON.stringify({ version }) + '\n');
console.log(`built site/ (${version}, ${pages.length} pages)`);

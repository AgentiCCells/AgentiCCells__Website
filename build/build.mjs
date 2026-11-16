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

// The site's address comes from CNAME, so a domain change needs no edit here.
const origin = existsSync(join(root, 'CNAME')) ? `https://${readFileSync(join(root, 'CNAME'), 'utf8').trim()}` : '';

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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => /^(source|link|code)$/i.test(t) ? `<a class="cite" href="${u}">${t}</a>` : `<a href="${u}">${t}</a>`);
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
    const links = [`<a class="cite" href="${esc(c.link)}">Link</a>`];
    if (c.code_link) links.push(`<a class="cite" href="${esc(c.code_link)}">code</a>`);
    return `<tr><td><strong>${esc(c.name.replace(/^Runtime:\s*/, ''))}</strong><br>${esc(c.what || '')}</td><td>${esc(c.licence)}</td><td>${esc(c.status)}</td><td>${links.join(', ')}</td></tr>`;
  }).join('\n');
  return `<div class="table-wrap"><table>\n<thead><tr><th>${which === 'runtimes' ? 'Runtime' : 'Component'}</th><th>Licence</th><th>Status</th><th>Link</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>\n<p>From data/stack.json, checked ${esc(checked || '')}.</p>`;
}

// The site nav: every page with a `nav:` number in its front matter (or returned
// by a page hook), in that number's order. Pages without one stay out of the nav.
// Primary links (in this order); every other nav page goes to the footer "More" group.
const PRIMARY = ['/', '/website-cell/', '/cells/', '/method/', '/about/'];
const MARK = '<svg class="mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><path d="M17 6.5A10.5 10.5 0 1 0 17 25.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" opacity=".45"/><path d="M25 9.5A10.5 10.5 0 1 0 25 22.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>';
function primaryNav(nav) {
  return PRIMARY.map((u) => nav.find((n) => n.url === u)).filter(Boolean);
}
function navList(items, current) {
  return items.map((n) => n.url === current
    ? `<li><a href="${esc(n.url)}" aria-current="page">${esc(n.url==='/'?'Home':n.title)}</a></li>`
    : `<li><a href="${esc(n.url)}">${esc(n.url==='/'?'Home':n.title)}</a></li>`).join('');
}
function navHtml(nav, current) {
  if (!nav.length) return '';
  const items = navList(primaryNav(nav), current);
  return `<nav class="wide" aria-label="Site"><ul>${items}</ul></nav><details class="menu"><summary>Menu</summary><nav aria-label="Site (menu)"><ul>${items}</ul></nav></details>`;
}
function moreHtml(nav, current) {
  const rest = nav.filter((n) => !PRIMARY.includes(n.url));
  if (!rest.length) return '';
  return `<nav class="more" aria-label="More"><ul>${navList(rest, current)}</ul></nav>`;
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
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
${meta.noindex ? '<meta name="robots" content="noindex">\n' : ''}${origin && !meta.noindex ? `<link rel="canonical" href="${esc(origin + current)}">\n` : ''}<meta property="og:type" content="website">
<meta property="og:site_name" content="AgentiCCells">
<meta property="og:title" content="${esc(meta.title || '')}">
<meta property="og:description" content="${esc(meta.description || '')}">
${origin ? `<meta property="og:url" content="${esc(origin + current)}">\n` : ''}<meta name="twitter:card" content="summary">
</head>
<body${current === '/' ? ' class="home wide"' : meta.wide ? ' class="wide"' : ''}>
<a class="skip" href="#main">Skip to the content</a>
<header><a class="brand" href="/">${MARK}<span>AgentiCCells</span></a>${navHtml(nav, current)}</header>
<main id="main" tabindex="-1">
${content}
</main>
<footer>${moreHtml(nav, current)}<p>Contact: <a href="mailto:${contact}">${contact}</a></p><p>Code under Apache-2.0. Text and images under CC BY 4.0.</p><p class="version">Version ${esc(version)}</p></footer>
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

// A cell (D5): inline SVG, no external files. Membrane, conductor, agents, board, keys, console, stop file.
const CELL = '<svg viewBox="0 0 400 410" role="img" aria-labelledby="cell-t cell-d"><title id="cell-t">A cell: a small team of agents inside your environment</title><desc id="cell-d">A circle marks your environment. Inside it a conductor directs three agents. The agents read and write a board of files, each signs with its own key, and a console shows you all of it. A stop file halts every agent. You stand outside the circle and can see and stop the cell.</desc><g transform="translate(0 30)"><circle class="c-mem" cx="200" cy="190" r="170"/><g class="c-link"><line x1="200" y1="112" x2="130" y2="190"/><line x1="200" y1="112" x2="200" y2="190"/><line x1="200" y1="112" x2="270" y2="190"/><line x1="130" y1="190" x2="130" y2="262"/><line x1="270" y1="190" x2="270" y2="262"/></g><circle class="c-node c-lead" cx="200" cy="112" r="24"/><text class="c-txt c-on" x="200" y="117" text-anchor="middle">C</text><text class="c-lbl" x="200" y="84" text-anchor="middle">Conductor</text><circle class="c-node" cx="130" cy="190" r="16"/><circle class="c-node" cx="200" cy="190" r="16"/><circle class="c-node" cx="270" cy="190" r="16"/><text class="c-lbl" x="200" y="226" text-anchor="middle">Agents, each with its own key</text><rect class="c-box" x="84" y="262" width="92" height="40" rx="6"/><text class="c-txt" x="130" y="287" text-anchor="middle">Board</text><rect class="c-box" x="224" y="262" width="92" height="40" rx="6"/><text class="c-txt" x="270" y="287" text-anchor="middle">Console</text><text class="c-lbl" x="200" y="334" text-anchor="middle">Your environment</text></g><g class="c-you"><circle cx="150" cy="14" r="7"/></g><text class="c-lbl c-out" x="164" y="19">You: see it, stop it</text></svg>';
const CELL_CAPTION = 'A cell, as we propose it: one conductor, a few agents, a board of files, a console, all inside your own environment.';

// Home page first screen (D2, D5, D-RV2): headline and opening paragraph on the left, a picture of a cell on the right;
// the main call to action goes to the website cell, the email is the second action.
function hero(html) {
  const i = html.indexOf('<h2');
  if (i < 0) return html;
  return `<section class="hero">\n<div class="hero-text">\n${html.slice(0, i)}\n<p class="cta"><a class="button" href="/website-cell/">See the website cell</a> <a class="button ghost" href="mailto:${contact}">Email ${contact}</a></p>\n</div>\n<figure class="cell-fig">${CELL}<figcaption>${CELL_CAPTION}</figcaption></figure>\n</section>\n${html.slice(i)}`;
}
for (const p of pages) if (p.path === '/') p.html = hero(p.html);

// Inner pages (D-RV5, D-RV6): the same soft band as the hero around the title and the lede, a wider grid,
// and a one-line call to action at the end (not on the offer page itself).
for (const p of pages) {
  if (p.path === '/' || !p.source.startsWith('content/')) continue;
  p.wide = true;
  const m = /^(<h1[^>]*>[\s\S]*?<\/h1>)\s*(<p>[\s\S]*?<\/p>)?/.exec(p.html);
  if (m) p.html = `<section class="page-head">\n${m[1]}\n${m[2] ? m[2].replace('<p>', '<p class="lede">') + '\n' : ''}</section>` + p.html.slice(m[0].length);
  if (p.path !== '/website-cell/') p.html += `\n<aside class="closing"><p>Want a website built this way? <a class="button" href="/website-cell/">See the website cell</a></p></aside>`;
}

// Seven-step diagram on the website cell page (D9): inline SVG, no external files.
const FLOW = '<figure class="flow"><svg viewBox="0 0 360 324" role="img" aria-labelledby="flow-t flow-d"><title id="flow-t">The seven steps of the website cell</title><desc id="flow-d">Order, queue, build, preview, key, steer, handover, in that order, with who acts at each step. A proposal, not yet run end to end.</desc><line class="d-line" x1="22" y1="30" x2="22" y2="294"/><circle class="d-dot" cx="22" cy="30" r="14"/><text class="d-num" x="22" y="35" text-anchor="middle">1</text><text class="d-txt" x="50" y="35">Order</text><circle class="d-dot" cx="22" cy="74" r="14"/><text class="d-num" x="22" y="79" text-anchor="middle">2</text><text class="d-txt" x="50" y="79">Queue</text><circle class="d-dot" cx="22" cy="118" r="14"/><text class="d-num" x="22" y="123" text-anchor="middle">3</text><text class="d-txt" x="50" y="123">Build</text><circle class="d-dot" cx="22" cy="162" r="14"/><text class="d-num" x="22" y="167" text-anchor="middle">4</text><text class="d-txt" x="50" y="167">Preview</text><circle class="d-dot" cx="22" cy="206" r="14"/><text class="d-num" x="22" y="211" text-anchor="middle">5</text><text class="d-txt" x="50" y="211">Key</text><circle class="d-dot" cx="22" cy="250" r="14"/><text class="d-num" x="22" y="255" text-anchor="middle">6</text><text class="d-txt" x="50" y="255">Steer</text><circle class="d-dot" cx="22" cy="294" r="14"/><text class="d-num" x="22" y="299" text-anchor="middle">7</text><text class="d-txt" x="50" y="299">Handover</text><text class="d-who" x="346" y="35" text-anchor="end">you</text><text class="d-who" x="346" y="79" text-anchor="end">us</text><text class="d-who" x="346" y="123" text-anchor="end">our agents</text><text class="d-who" x="346" y="167" text-anchor="end">you look</text><text class="d-who" x="346" y="211" text-anchor="end">your browser</text><text class="d-who" x="346" y="255" text-anchor="end">you and our agents</text><text class="d-who" x="346" y="299" text-anchor="end">you</text></svg><figcaption>The seven steps, in order, and who acts at each. A proposal; the flow has not yet been run end to end.</figcaption></figure>';
for (const p of pages) if (p.path === '/website-cell/') {
  const i = p.html.indexOf('<ol class="steps">');
  if (i >= 0) p.html = p.html.slice(0, i) + FLOW + '\n' + p.html.slice(i);
}

// 404 page (GitHub Pages serves site/404.html for unknown paths). Not indexed, not in the nav.
if (!seen.has('404.html')) pages.push({
  path: '/404.html', file: '404.html', title: 'Page not found', noindex: true,
  description: 'This page does not exist. Use the menu or go back to the home page.',
  html: '<h1>Page not found</h1>\n<p>There is nothing at this address. Try the menu above, or go to the <a href="/">home page</a>.</p>',
});

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
// robots.txt and sitemap.xml (every indexable page; no dates, since the build holds none that are true).
const indexable = pages.filter((p) => !p.noindex).map((p) => urlFor(p.file)).sort();
if (origin) {
  writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((u) => `<url><loc>${esc(origin + u)}</loc></url>`).join('\n')}\n</urlset>\n`);
  writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
}
writeFileSync(join(out, 'version.json'), JSON.stringify({ version }) + '\n');
console.log(`built site/ (${version}, ${pages.length} pages)`);

// Turns content/ and data/ into site/. Node only, no dependencies.
import { cpSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync } from 'node:fs';
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

// W-PHOTOS: the Web Summit team photo, its 3 s motion as a muted looping video with the photo as poster.
// Captions name only people recorded as agreeing to be named (assets/media/websummit-2026/README.md); none is named here.
function photo() {
  const d = '/assets/media/websummit-2026/';
  return `<figure class="team-photo"><video autoplay muted loop playsinline preload="none" poster="${d}team-riskmandate-stand-poster-640.webp" width="800" height="600" aria-label="The team at the RiskMandate stand at Web Summit, Lisbon, November 2026, in a short loop"><source src="${d}team-riskmandate-stand-live-800.mp4" type="video/mp4"><a href="${d}team-riskmandate-stand-portrait-1200.webp">Photo of the team at the RiskMandate stand (a still of the loop)</a></video><figcaption>The team at the RiskMandate stand (A1-30, Alpha), Web Summit, Lisbon, November 2026. Photo shared by Dinis Cruz, CC BY 4.0. People are named here only once they have agreed to it. See the <a href="https://riskmandate-at-websummit.agenticcells.site">Web Summit site</a>.</figcaption></figure>`;
}
// V-OFFER: data/offer.json is the single source of the website cell's price. {{price}} in content/ becomes the
// anchor price, or the launch price with the usual price beside it once launch_gbp is set. No countdowns.
const offerData = JSON.parse(readFileSync(join(root, 'data/offer.json'), 'utf8'));
const gbp = (n) => '£' + Number(n).toLocaleString('en-GB');
const OFFER_URL = 'https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/offer.json';
// A launch price links to the file that sets it (numbers need evidence); the anchor price is a ladder price.
const priceWith = (link) => offerData.launch_gbp == null ? gbp(offerData.anchor_gbp) : `${link(gbp(offerData.launch_gbp))} (launch price, usually ${gbp(offerData.anchor_gbp)})`;
const PRICE_MD = priceWith((t) => `[${t}](${OFFER_URL})`);
const PRICE = priceWith((t) => `<a href="${OFFER_URL}">${t}</a>`);
function markdown(body) {
  body = body.replaceAll('{{price}}', PRICE_MD);
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
    if ((m = line.trim().match(/^\{\{photo:(stand)\}\}$/))) { flush(); html.push(photo()); }
    else if (line.trim() === '{{offer}}') { flush(); html.push(offer()); }
    else if (line.trim() === '{{ladder}}') { flush(); html.push(ladder()); }
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

// {{offer}}: the website cell's price from data/offer.json, the one source (W-SELL1).
function offer() {
  const o = JSON.parse(readFileSync(join(root, 'data/offer.json'), 'utf8'));
  const gbp = (n) => `£${Number(n).toLocaleString('en-GB')}`;
  const price = o.launch_gbp == null
    ? `<strong>${gbp(o.anchor_gbp)}</strong>, one-off`
    : `<s>${gbp(o.anchor_gbp)}</s> <strong><a href="${OFFER_URL}">${gbp(o.launch_gbp)}</a></strong> launch price, one-off`;
  return `<p class="offer">${price} (${o.launch_gbp == null ? 'first proposal, ' : ''}${esc(o.note)}; ${esc(o.offer_label)}). No subscription.`+
    `${o.free_eval ? ` <a href="mailto:${contact}?subject=Free%20evaluation%20site">${esc(o.free_eval)}</a>` : ''}</p>`;
}

function ladder() {
  const { cells } = JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8'));
  const rows = cells.map((c) =>
    `<tr><td data-label="Price">${esc(c.price)} (${esc(c.price_status)})</td><td data-label="Format">${esc(c.format || c.includes)}</td><td data-label="agenticcells.ai sells (proposal)">${esc(c.sells_acc || c.includes)}</td><td data-label="riskmandate.ai sells (proposal)">${esc(c.sells_rm || '')}</td></tr>`).join('\n');
  return `<div class="table-wrap ladder"><table>\n<thead><tr><th>Price</th><th>Format</th><th>agenticcells.ai sells (proposal)</th><th>riskmandate.ai sells (proposal)</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>\n<p>The same ladder on both sites, with the prices and formats as Dinis Cruz gave them. All prices are a first proposal and not yet offers. What each site sells at each step is a proposal too. A policy alone is a RiskMandate sale, a team is an AgentiCCells sale, and a dual sale is possible: a team with its policies.</p>`;
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
const PRIMARY = ['/', '/start-here/', '/website-cell/', '/cells/', '/method/'];
const MARK = '<svg class="mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect x="4" y="4" width="24" height="24" rx="7" fill="none" stroke="currentColor" stroke-width="3" opacity=".45"/><rect x="11" y="11" width="10" height="10" rx="3" fill="currentColor"/></svg>';
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

const SHARE_CARD = '/assets/share/card.jpg';
const SHARE_ALT = 'AgentiCCells: small teams of AI agents you can see and stop';
function page(meta, content, nav = [], current = '') {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title || '')}</title>
<meta name="description" content="${esc(meta.description || '')}">
<link rel="stylesheet" href="/assets/style.css">
${meta.design ? '<link rel="stylesheet" href="/assets/designs.css">\n' : ''}<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
${meta.noindex ? '<meta name="robots" content="noindex">\n' : ''}${origin && !meta.noindex ? `<link rel="canonical" href="${esc(origin + current)}">\n` : ''}<meta property="og:type" content="website">
<meta property="og:site_name" content="AgentiCCells">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(meta.title || '')}">
<meta property="og:description" content="${esc(meta.description || '')}">
${origin ? `<meta property="og:url" content="${esc(origin + current)}">
<meta property="og:image" content="${esc(origin + SHARE_CARD)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(SHARE_ALT)}">
<meta name="twitter:image" content="${esc(origin + SHARE_CARD)}">
` : ''}<meta name="twitter:card" content="summary_large_image">
</head>
<body${current === '/' || meta.design ? ` class="home wide${meta.design ? ' design-' + meta.design : ''}"` : meta.wide ? ' class="wide"' : ''}>
<a class="skip" href="#main">Skip to the content</a>
${current === '/' || meta.design ? designBar(meta.design || 'calm') : ''}
<header><a class="brand" href="/">${MARK}<span>AgentiCCells</span></a>${navHtml(nav, current)}</header>
<main id="main" tabindex="-1">
${content}
</main>
<footer>${moreHtml(nav, current)}<p>Contact: <a href="mailto:${contact}">${contact}</a></p><p>Code under Apache-2.0. Text and images under CC BY 4.0. Older pages: <a href="/archive/">the archive</a>.</p><p class="version">Version ${esc(version)}</p></footer>
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
  // V-ARCHIVE: `archive: YYYY-MM-DD` and `archive_why: ...` in the front matter archive a page. It keeps its address and its
  // words, gets a dated note on top, leaves the nav and is listed at /archive/ (build/pages/archive.mjs).
  const archived = meta.archive ? { date: meta.archive, why: meta.archive_why } : null;
  if (archived && (!/^\d{4}-\d{2}-\d{2}$/.test(archived.date) || Number.isNaN(Date.parse(archived.date)) || !archived.why)) {
    throw new Error(`content/${f}: archive needs a date (YYYY-MM-DD) and an archive_why line`);
  }
  const note = archived ? `<p class="note archive-note"><strong>Archived on ${esc(archived.date)}.</strong> ${esc(archived.why)} This page keeps its address and its words as they were. See the <a href="/archive/">archive</a>.</p>\n` : '';
  pages.push({ path, title: meta.title, description: meta.description, nav: archived ? undefined : meta.nav, archived, html: note + markdown(body), source: `content/${f}` });
}

// Page hooks: build/pages/*.mjs, each `export default async function (ctx)` returning
// [{ path, title, description, html, nav? }]. `path` is a site path such as "/console/";
// `html` is the inside of <main>. Each page gets the same template, nav and footer.
// ctx.out is site/, already cleared; a hook may also return extra files through ctx.files.
const hookDir = join(root, 'build', 'pages');
const ctx = { root, out, version, contact, esc, inline, markdown, frontMatter, pages: pages.map(({ path, title, archived }) => ({ path, title, archived })), files: [] };
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

// D-RV13: a one-line strip of the offer under the hero, and a row of example cards (the hub's own screenshots,
// self-hosted in assets/) before "How to start". Words come from the registry's "what" field (W-RV9); the personal
// site is not named, so no person is named without their say-so.
const OFFER = `<p class="offer-strip"><strong>The website cell</strong> <span>${PRICE}, first proposal</span> <span>not yet sold</span> <a href="/website-cell/">See the seven steps</a></p>`;
const EXAMPLES = [
  // D-SELL: the three people who agreed to be named (data/cells-registry.json, "consent") first, then the demos. Screenshots: the live site's first screen at 1100 x 480, taken 2026-11-17.
  ['example-silvio-switha.webp', 'Silvio Switha', 'An AI entrepreneur, musician and producer: a film first, then photos and a way to hire.', 'silvio-switha', 'Made for Silvio'],
  ['example-jose-bota.webp', 'José Bota', 'An AI automation expert: a portfolio with a short way to email or find them.', 'jose-bota', 'Made for José'],
  ['example-yiheng-wang.webp', 'Yiheng Wang', 'A project manager and AI operations lead: method, experience and a CV to download.', 'yiheng-wang', 'Made for Yiheng'],
  ['example-gabriel-dacruz.webp', 'A personal site', 'A personal site made with our site agent.', 'gabriel-dacruz', 'Demo'],
  ['example-riskmandate-at-websummit.webp', 'RiskMandate at Web Summit', 'The first site made by the site factory from a request file.', 'riskmandate-at-websummit', 'Demo'],
  ['example-algarve-orange-grower.webp', 'An orange grower (made up)', 'A made-up orange grower\'s site with a zone map and an order flow. Invented prices, nothing sent.', 'algarve-orange-grower', 'Demo'],
];
const EXAMPLE_ROW = '<section class="examples" aria-labelledby="see-what-we-have-made">\n<h2 id="see-what-we-have-made">Sites made by agents, live now</h2>\n<p class="wall-lede">Each card is the first screen of a real site. Select one to see it on the hub, with a link to the live address.</p>\n<ul class="example-cards">\n' + EXAMPLES.map(([img, name, what, slug, tag]) =>
  `<li><a href="https://hub.agenticcells.site/cells/${slug}/"><img src="/assets/${img}" srcset="/assets/${img.replace('.webp', '-half.webp')} 550w, /assets/${img} 1100w" sizes="(max-width: 40rem) 100vw, 22rem" width="1100" height="480" loading="lazy" decoding="async" alt="Top of the ${name} site, as the hub shows it"><span class="ex-body"><span class="ex-tag">${tag}</span><strong>${name}</strong><span>${what}</span></span></a></li>`).join('\n') +
  '\n</ul>\n<p><a href="https://hub.agenticcells.site/">All cells on the hub</a>. The hub lists; it does not sell. Screenshots are the first screen of each live site, taken on 17 November 2026.</p>\n</section>\n';
// D-SELL: the selling first screen. After the offer strip: the example wall, then the price block with one call to action.
// The launch price is shown struck-through only once data/offer.json carries one (V-OFFER); the block strikes the anchor and shows the launch price, linked to that file.
const PRICE_BLOCK = `<aside class="price-block" aria-label="Price"><div class="pb-price"><p class="pb-label">The website cell</p><p class="pb-amount">${offerData.launch_gbp == null ? `<strong>${gbp(offerData.anchor_gbp)}</strong>` : `<s class="pb-was">${gbp(offerData.anchor_gbp)}</s> <strong><a href="${OFFER_URL}">${gbp(offerData.launch_gbp)}</a></strong>`} <span>one-off${offerData.launch_gbp == null ? ', first proposal' : ', launch price, may change'}</span></p><p class="pb-note">No subscription, and no support contract, from us.${offerData.free_eval ? ` <a href="mailto:${contact}?subject=Free%20evaluation%20site">${esc(offerData.free_eval)}</a>` : ''}</p></div><div class="pb-give"><p><strong>You give us</strong> photos, videos and a description. Some can already be public.</p><p><strong>You get</strong> a finished static site in a GitHub repository you own, which you can keep changing with Claude or deploy anywhere that serves static sites.</p></div><p class="pb-cta"><a class="button" href="mailto:${contact}?subject=I%20would%20like%20a%20website%20cell">Ask for a site like these</a> <a href="/website-cell/">How it works, in seven steps</a></p></aside>\n`;
for (const p of pages) if (p.path === '/') {
  p.html = p.html.replace('</section>\n', '</section>\n' + OFFER + '\n' + EXAMPLE_ROW + PRICE_BLOCK);
}

// Inner pages (D-RV5, D-RV6): the same soft band as the hero around the title and the lede, a wider grid,
// and a one-line call to action at the end (not on the offer page itself).
const slug = (t) => t.replace(/<[^>]+>/g, '').toLowerCase().replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
for (const p of pages) {
  if (p.path === '/' || !(p.source.startsWith('content/') || p.path === '/key/')) continue;
  p.wide = true;
  // D-RV7: the band uses its width: title and lede on the left, "On this page" (the h2 headings) on the right.
  const used = new Set();
  const heads = [];
  p.html = p.html.replace(/<h2>([\s\S]*?)<\/h2>/g, (all, t) => {
    let id = slug(t) || 'section'; while (used.has(id)) id += '-2'; used.add(id);
    heads.push({ id, t });
    return `<h2 id="${id}">${t}</h2>`;
  });
  // D-RV10, D-RV11: the contents list is a "Jump to" disclosure on a phone (closed, no script) and a list on wide screens.
  // On a page with a "Four ways to start" side panel it stays in the band; elsewhere it is a sticky side column.
  const items = heads.map((h) => `<li><a href="#${h.id}">${h.t}</a></li>`).join('');
  const inBand = heads.some((h) => h.id === 'four-ways-to-start');
  const toc = heads.length >= 3 ? `<div class="toc${inBand ? '' : ' side'}"><nav class="toc-wide" aria-label="On this page"><p>On this page</p><ol>${items}</ol></nav><details class="toc-narrow"><summary>Jump to</summary><nav aria-label="On this page (menu)"><ol>${items}</ol></nav></details></div>\n` : '';
  const m = /^(<h1[^>]*>[\s\S]*?<\/h1>)\s*(<p(?: class="note")?>[\s\S]*?<\/p>)?/.exec(p.html);
  if (m) p.html = `<section class="page-head${toc && inBand ? ' has-toc' : ''}">\n<div class="head-main">\n${m[1]}\n${m[2] ? m[2].replace(/^<p( class="note")?>/, (x, n) => `<p class="lede${n ? ' note' : ''}">`) + '\n' : ''}</div>\n${inBand ? toc : ''}</section>` + (inBand ? '' : toc) + p.html.slice(m[0].length);
  if (p.path !== '/website-cell/') p.html += `\n<aside class="closing"><p>Want a website built this way? <a class="button" href="/website-cell/">See the website cell</a></p></aside>`;
}

// Seven-step diagram on the website cell page (D9): inline SVG, no external files.
const FLOW = '<figure class="flow"><svg viewBox="0 0 360 324" role="img" aria-labelledby="flow-t flow-d"><title id="flow-t">The seven steps of the website cell</title><desc id="flow-d">Order, queue, build, preview, key, steer, handover, in that order, with who acts at each step. A proposal, not yet run end to end.</desc><line class="d-line" x1="22" y1="30" x2="22" y2="294"/><circle class="d-dot" cx="22" cy="30" r="14"/><text class="d-num" x="22" y="35" text-anchor="middle">1</text><text class="d-txt" x="50" y="35">Order</text><circle class="d-dot" cx="22" cy="74" r="14"/><text class="d-num" x="22" y="79" text-anchor="middle">2</text><text class="d-txt" x="50" y="79">Queue</text><circle class="d-dot" cx="22" cy="118" r="14"/><text class="d-num" x="22" y="123" text-anchor="middle">3</text><text class="d-txt" x="50" y="123">Build</text><circle class="d-dot" cx="22" cy="162" r="14"/><text class="d-num" x="22" y="167" text-anchor="middle">4</text><text class="d-txt" x="50" y="167">Preview</text><circle class="d-dot" cx="22" cy="206" r="14"/><text class="d-num" x="22" y="211" text-anchor="middle">5</text><text class="d-txt" x="50" y="211">Key</text><circle class="d-dot" cx="22" cy="250" r="14"/><text class="d-num" x="22" y="255" text-anchor="middle">6</text><text class="d-txt" x="50" y="255">Steer</text><circle class="d-dot" cx="22" cy="294" r="14"/><text class="d-num" x="22" y="299" text-anchor="middle">7</text><text class="d-txt" x="50" y="299">Handover</text><text class="d-who" x="346" y="35" text-anchor="end">you</text><text class="d-who" x="346" y="79" text-anchor="end">us</text><text class="d-who" x="346" y="123" text-anchor="end">our agents</text><text class="d-who" x="346" y="167" text-anchor="end">you look</text><text class="d-who" x="346" y="211" text-anchor="end">your browser</text><text class="d-who" x="346" y="255" text-anchor="end">you and our agents</text><text class="d-who" x="346" y="299" text-anchor="end">you</text></svg><figcaption>The seven steps, in order, and who acts at each. A proposal; the flow has not yet been run end to end.</figcaption></figure>';
for (const p of pages) if (p.path === '/website-cell/') {
  const i = p.html.indexOf('<ol class="steps">');
  if (i >= 0) p.html = p.html.slice(0, i) + FLOW + '\n' + p.html.slice(i);
}

// D-RV19 (designer@, 2026-11-17): one diagram each on /trust/ and /start-here/. Inline SVG, no script, no external file.
// Trust: the five reaches from data/abp.json (reach_names), widest at the bottom; each box links to the file it comes from. No counts, so no figure needs its own evidence.
const GH = 'https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/';
const REACH_ROWS = [['Self', 'its own session', 190], ['Project', 'its worktree of this repository', 230], ['Host', 'the one shared container', 270], ['Tenant', 'accounts its keys and connectors reach', 310], ['World', 'any host on the internet, and the live site', 350]];
const REACH = `<figure class="flow reach"><svg viewBox="0 0 360 290" role="img" aria-labelledby="reach-t reach-d"><title id="reach-t">What a cell's agents can reach</title><desc id="reach-d">Five reaches, from narrow to wide: self, project, host, tenant, world. Each box links to the policy file that lists what was measured at that reach.</desc>${REACH_ROWS.map(([n, d, w], i) => { const x = (360 - w) / 2, y = 6 + i * 56; return `<a href="${GH}data/abp.json"><rect class="r-box r-${i}" x="${x}" y="${y}" width="${w}" height="48" rx="8"/><text class="r-n" x="180" y="${y + 20}" text-anchor="middle">${n}</text><text class="r-d" x="180" y="${y + 38}" text-anchor="middle">${esc(d)}</text></a>`; }).join('')}</svg><figcaption>What our own agents could reach on 15 November 2026, narrow at the top, wide at the bottom. It is the measurement of this team in one shared container, from <a href="${GH}data/abp.json">data/abp.json</a>; the text below says where it has changed. Today the limits are mostly rules, not walls.</figcaption></figure>`;
const LADDER_STEPS = [['One', 'workflow', '#step-one-one-very-simple-workflow'], ['Add a', 'meeting', '#step-two-add-a-meeting-or-two'], ['A', 'team', '#step-three-a-team'], ['A', 'network', '#step-four-a-network']];
const LADDER = `<figure class="flow ladder-fig"><svg viewBox="0 0 360 230" role="img" aria-labelledby="lad-t lad-d"><title id="lad-t">The four steps of the ladder</title><desc id="lad-d">Four steps rising from left to right: one very simple workflow, a meeting or two, a team, a network. Each step links to its section below.</desc>${LADDER_STEPS.map(([a, b, h], i) => { const ht = 70 + i * 46, x = i * 90, y = 224 - ht; return `<a href="${h}"><rect class="l-box l-${i}" x="${x}" y="${y}" width="84" height="${ht}" rx="8"/><text class="l-num" x="${x + 42}" y="${y + 26}" text-anchor="middle">${i + 1}</text><text class="l-t" x="${x + 42}" y="${y + 46}" text-anchor="middle">${a}</text><text class="l-t" x="${x + 42}" y="${y + 62}" text-anchor="middle">${b}</text></a>`; }).join('')}</svg><figcaption>Start at the left and stop wherever it is enough. Each step has its own section below.</figcaption></figure>`;
for (const p of pages) {
  if (p.path === '/trust/') p.html = p.html.replace(/(<h2 id="what-our-agents-can-reach-and-cannot">[^<]*<\/h2>)/, (m) => m + '\n' + REACH);
  if (p.path === '/start-here/') p.html = p.html.replace(/(<h2 id="step-one-)/, (m) => LADDER + '\n' + m);
}

// D-FIVE · Design switcher (designer@, 2026-11-16, after Dinis's liking for the five designs of one site's data).
// The home page exists in several designs with the same words: / (Calm), /d/editorial/ and /d/console/. The bar is plain
// links, so it needs no script; the choice is the address. Other designs are noindex and are not in the sitemap.
const DESIGNS = [
  ['gallery', 'Gallery', '/', 'Photos first: the team at Web Summit, large. The default.'],
  ['calm', 'Calm', '/d/calm/', 'Plain and quiet, with definitions first.'],
  ['editorial', 'Editorial', '/d/editorial/', 'Paper, serif headings, numbered sections.'],
  ['console', 'Console', '/d/console/', 'Dark and technical, in cards.'],
  ['proof', 'Proof', '/d/proof/', 'A wall of screenshots, each linked to the live page.'],
];
const WS = '/assets/media/websummit-2026/';
// Third and fourth designs (designer@, 2026-11-17). Photos: Dinis's Web Summit 2026 set (assets/media/websummit-2026/README.md).
// Alt text and captions name no one: only people recorded as agreeing to be named may be named (data/cells-registry.json).
const GALLERY_BANNER = `<figure class="g-banner"><img src="${WS}team-meo-arena.webp" srcset="${WS}team-meo-arena-half.webp 700w, ${WS}team-meo-arena.webp 1400w" sizes="(max-width: 62rem) 100vw, 62rem" width="1400" height="1050" fetchpriority="high" decoding="async" alt="Six people in a row inside a large indoor arena, smiling, with conference badges; one T-shirt reads Ask me how I control my agents"><figcaption>Web Summit, Lisbon, November 2026. Our team inside the MEO Arena.</figcaption></figure>`;
const GALLERY_STRIP = `<section class="g-strip" aria-label="More from Web Summit 2026"><figure><img src="${WS}team-riskmandate-stand.webp" srcset="${WS}team-riskmandate-stand-half.webp 450w, ${WS}team-riskmandate-stand.webp 900w" sizes="(max-width: 40rem) 100vw, 20rem" width="900" height="638" loading="lazy" alt="Six people in red, green, purple and yellow shirts at an exhibition stand, with the RiskMandate stand sign above them"><figcaption>At the RiskMandate stand, A1-30.</figcaption></figure><figure><img src="${WS}team-backstage.webp" srcset="${WS}team-backstage-half.webp 500w, ${WS}team-backstage.webp 1000w" sizes="(max-width: 40rem) 100vw, 20rem" width="1000" height="750" loading="lazy" alt="Five people in coloured hoodies in a concrete corridor backstage at the arena"><figcaption>Backstage at the arena.</figcaption></figure><figure class="g-video"><video controls muted playsinline preload="none" poster="${WS}team-meo-arena-poster-640.webp" width="800" height="600"><source src="${WS}team-meo-arena-live-800.mp4" type="video/mp4"></video><figcaption>The same moment in the arena, a short clip with no sound.</figcaption></figure></section>`;
const PROOF_SHOTS = [
  ['web-summit-home', 'The team site', 'The operating system of the Web Summit team: board, briefs, keys.', 'https://web-summit.sgit.ai/'],
  ['universe-dinis-universo', 'The universe view', 'Every agent as a moon of its owner, with its policy or the lack of one.', 'https://web-summit.sgit.ai/lib/gravity/'],
  ['web-summit-xray', 'The X-ray', 'What each agent did, drawn from the commits.', 'https://web-summit.sgit.ai/'],
  ['web-summit-pulse', 'The pulse', 'Activity across the team as it happened.', 'https://web-summit.sgit.ai/'],
  ['web-summit-companies', 'The company map', 'The companies at the event, mapped by agents.', 'https://web-summit.sgit.ai/'],
  ['newsroom-ten-days', 'The map article', 'Ten days at Web Summit, with the counts and how they were made.', 'https://newsroom.sgit.ai/articles/ten-days-at-web-summit.html'],
  ['riskmandate-home', 'RiskMandate', 'The sister site: behaviour policies for agents.', 'https://riskmandate.ai/'],
  ['promptugal-home', 'PrompTugal.news', 'A newsroom run by agents.', 'https://promptugal.news/'],
  ['storm-charles-home', 'The Storm site', 'A newsroom built in a night.', 'https://storm-charles.promptugal.news/'],
  ['lisbon-tech-fringe-home', 'Lisbon Tech Fringe', 'The fringe guide.', 'https://lisbontechfringe.com/'],
  ['ios-app-promptugal', 'A native app', 'An iOS app made by agents.', 'https://ios.app.promptugal.news/'],
];
const proofItem = ([f, t, c, u], i) => `<li><a href="${u}"><img src="/assets/media/proof/${f}-half.webp" srcset="/assets/media/proof/${f}-half.webp 450w, /assets/media/proof/${f}.webp 900w" sizes="(max-width: 40rem) 100vw, 20rem" width="900" height="563" loading="lazy" decoding="async" alt="Screenshot of ${esc(t)}"><span class="p-cap"><span class="p-n">${String(i + 1).padStart(2, '0')}</span><strong>${esc(t)}</strong><span>${esc(c)}</span></span></a></li>`;
// First row open; the rest sit behind a details element (no script), so the Proof design stays near the other designs in height (D-RV18).
const PROOF_WALL = `<section class="p-wall" aria-labelledby="p-wall-h"><h2 id="p-wall-h">The evidence wall</h2><p class="p-note">Screenshots of live pages we or our newsroom made, taken on 2026-11-16 (research/proof/shots/). Each links to the live page, which may have changed since.</p><ul>${PROOF_SHOTS.slice(0, 3).map((x, i) => proofItem(x, i)).join('')}</ul><details class="p-more"><summary>See all ${PROOF_SHOTS.length} screenshots</summary><ul>${PROOF_SHOTS.slice(3).map((x, i) => proofItem(x, i + 3)).join('')}</ul></details></section>`;
// Editorial lift (designer@, 2026-11-17): a printed front page. A dateline, one halftone-style plate beside the opening, and a
// row of three numbered figures (screenshots of live pages, each linked). Same words; images and captions only. Captions name no one.
const ED_DATELINE = `<p class="ed-dateline"><span>Lisbon</span><span>November 2026</span><span>Open source, Apache-2.0 and CC BY 4.0</span></p>`;
const ED_PLATE = `<figure class="ed-plate"><img src="${WS}team-riskmandate-stand.webp" srcset="${WS}team-riskmandate-stand-half.webp 450w, ${WS}team-riskmandate-stand.webp 900w" sizes="(max-width: 48rem) 100vw, 26rem" width="900" height="638" fetchpriority="high" decoding="async" alt="Six people in coloured shirts at an exhibition stand, with the RiskMandate stand sign above them"><figcaption><b>Plate 1.</b> The team at the RiskMandate stand, Web Summit, Lisbon.</figcaption></figure>`;
const ED_FIGS = [
  ['riskmandate-home', 'The sister site, where behaviour policies for agents are written.', 'https://riskmandate.ai/'],
  ['web-summit-xray', 'What each agent did, drawn from the commits.', 'https://web-summit.sgit.ai/'],
  ['newsroom-ten-days', 'The map article, with the counts and how they were made.', 'https://newsroom.sgit.ai/articles/ten-days-at-web-summit.html'],
];
const ED_FIGROW = `<section class="ed-figs" aria-label="Three live pages, as figures"><ol>${ED_FIGS.map(([f, c, u], i) => `<li><a href="${u}"><img src="/assets/media/proof/${f}-half.webp" srcset="/assets/media/proof/${f}-half.webp 450w, /assets/media/proof/${f}.webp 900w" sizes="(max-width: 40rem) 100vw, 20rem" width="900" height="563" loading="lazy" decoding="async" alt="Screenshot of a live page: ${esc(c)}"><span><b>Fig. ${i + 1}.</b> ${esc(c)}</span></a></li>`).join('')}</ol><p class="ed-note">Screenshots taken 2026-11-16 (research/proof/shots/); each links to the live page, which may have changed.</p></section>`;
function designHtml(id, home) {
  const h = sectioned(home);
  const strip = /<p class="offer-strip">[\s\S]*?<\/p>/;
  if (id === 'gallery') return GALLERY_BANNER + '\n' + h.replace(strip, (m) => m + '\n' + GALLERY_STRIP);
  if (id === 'editorial') return h.replace('<section class="hero">', ED_DATELINE + '\n<section class="hero">').replace('</section>\n', (m) => ED_PLATE + m).replace(strip, (m) => m + '\n' + ED_FIGROW);
  if (id === 'proof') return h.replace(strip, (m) => m + '\n' + PROOF_WALL);
  return h;
}
function designBar(now) {
  const items = DESIGNS.map(([id, name, path, tip]) => `<li><a href="${path}"${id === now ? ' aria-current="true"' : ''} title="${esc(tip)}">${name}</a></li>`).join('');
  return `<div class="design-bar"><nav aria-label="Design of this page"><span class="db-label">Design</span><ul>${items}</ul><span class="db-note">Same words, five designs</span></nav></div>`;
}
// Wrap each h2 and what follows it in a section, so a design can lay sections out as it likes (CSS only).
function sectioned(html) {
  const cut = html.search(/\n<h2>|\n<section class="examples"/);
  if (cut < 0) return html;
  const parts = html.slice(cut + 1).split(/\n(?=<h2>|<section class="examples")/);
  let n = 0;
  return html.slice(0, cut + 1) + parts.map((b) => {
    const id = slug((/^<h2[^>]*>([\s\S]*?)<\/h2>/.exec(b) || [0, 'examples'])[1]);
    if (b.startsWith('<section class="examples"')) { const num = String(++n).padStart(2, '0'); return b.replace('<section class="examples"', '<section class="blk examples"').replace(/<h2 id="([^"]*)">/, `<h2 id="$1" data-n="${num}">`); }
    const num = String(++n).padStart(2, '0');
    return `<section class="blk" id="${id}">\n${b.replace(/^<h2>/, `<h2 data-n="${num}">`)}\n</section>`;
  }).join('\n');
}
{
  const home = pages.find((p) => p.path === '/');
  const plain = home.html;
  // D-DEFAULT (designer@, 2026-11-17): Gallery is the default home (photos first); Calm moved to /d/calm/.
  for (const [id, name, path] of DESIGNS.filter((d) => d[0] !== 'gallery')) pages.push({
    path, title: `AgentiCCells (${name} design)`, description: home.description, noindex: true, design: id,
    html: designHtml(id, plain), source: 'build/build.mjs', file: fileFor(path),
  });
  home.html = designHtml('gallery', plain);
  home.design = 'gallery';
  // D-RV20: Calm keeps one team photo above "Words we use".
  const calm = pages.find((p) => p.path === '/d/calm/');
  const CALM_PHOTO = `<figure class="calm-photo"><img src="${WS}team-riskmandate-stand.webp" srcset="${WS}team-riskmandate-stand-half.webp 450w, ${WS}team-riskmandate-stand.webp 900w" sizes="(max-width: 48rem) 100vw, 34rem" width="900" height="638" fetchpriority="high" decoding="async" alt="Six people in coloured shirts at an exhibition stand, with the RiskMandate stand sign above them"><figcaption>The team at the RiskMandate stand, Web Summit, Lisbon, November 2026.</figcaption></figure>\n`;
  const m = calm.html.indexOf('<p><strong>Words we use</strong></p>');
  if (m < 0) throw new Error('home: "Words we use" marker not found (D-RV20)');
  calm.html = calm.html.slice(0, m) + CALM_PHOTO + calm.html.slice(m);
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
// Recursive, so assets may hold folders (assets/media/websummit-2026/, conductor@ 2026-11-16).
cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true });
if (existsSync(join(root, 'CNAME'))) copyFileSync(join(root, 'CNAME'), join(out, 'CNAME'));
// Extra files from page hooks (ctx.files: [{ path, content }], path under site/), written after site/ is cleared.
for (const { path, content } of ctx.files) {
  const file = normalize(String(path).replace(/^\/+/, ''));
  if (file.split(/[\\/]/).some((part) => part === '..' || part === '.')) throw new Error(`hook file leaves site/: ${path}`);
  mkdirSync(dirname(join(out, file)), { recursive: true });
  writeFileSync(join(out, file), content);
}
// robots.txt and sitemap.xml (every indexable page; no dates, since the build holds none that are true).
const indexable = pages.filter((p) => !p.noindex && !p.archived).map((p) => urlFor(p.file)).sort();
// Archived pages stay in the sitemap, listed after the others under an Archive comment (V-ARCHIVE).
const archivedUrls = pages.filter((p) => !p.noindex && p.archived).map((p) => urlFor(p.file)).sort();
const loc = (u) => `<url><loc>${esc(origin + u)}</loc></url>`;
if (origin) {
  writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(loc).join('\n')}${archivedUrls.length ? `\n<!-- Archive -->\n${archivedUrls.map(loc).join('\n')}` : ''}\n</urlset>\n`);
  writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
}
writeFileSync(join(out, 'version.json'), JSON.stringify({ version }) + '\n');
console.log(`built site/ (${version}, ${pages.length} pages)`);

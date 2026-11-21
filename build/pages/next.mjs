// /next/: the sovereign website preview (board/briefs/2026-11-19-sovereign-preview.md and -preview-contract.md).
// A page hook for build.mjs. It returns no pages through the main template; it writes complete HTML documents,
// with their own shell and styles (assets/next/), into ctx.files. Every page is noindex, carries the Preview band,
// is in no sitemap and is linked from no page outside /next/. No email address: asking goes to /next/start/.
// render() is pure apart from reading the repository, so build/next-local.mjs can call it without the full build.
// Written by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19. Code under Apache-2.0.
import { readFileSync, existsSync, openSync, readSync, closeSync } from 'node:fs';
import { join } from 'node:path';
import * as P from '../next/parts.mjs';
import * as C from '../next/cells.mjs';
import * as L from '../next/live.mjs';
import * as d1 from '../next/d1.mjs';
import * as d2 from '../next/d2.mjs';
import * as d3 from '../next/d3.mjs';
import * as d4 from '../next/d4.mjs';
import * as d5 from '../next/d5.mjs';

const HOMES = [d1, d2, d3, d4, d5];

// The explain pages. Title and description come from next/pages/<slug>.md front matter; these are only the labels
// used while the page is not written yet, with the data-driven blocks that page is for.
export const EXPLAIN = [
  ['cells', 'Agentic cells', ['{{figure:cell}}', '{{cells}}']],
  ['case-studies', 'Case studies', ['{{case_studies}}']],
  ['agentic-web', 'The agentic web', []],
  ['sovereign-website', 'The sovereign website', ['{{offer}}']],
  ['team-work', 'Team work', ['{{proof}}']],
  ['what-you-get', 'What you get', ['{{deliverables}}']],
  ['how-it-works', 'How it works', ['{{figure:how-it-works}}']],
  ['sovereignty', 'Sovereignty', []],
  ['no-lock-in', 'No lock-in', ['{{figure:can-you-leave}}']],
  ['security', 'Security', []],
  ['examples', 'Examples', ['{{examples}}']],
  ['partners', 'Partners', []],
  ['faq', 'Questions and answers', ['{{faq}}']],
  ['pricing', 'Pricing', ['{{table:pricing}}']],
  ['compare', 'Compare', ['{{table:compare}}', '{{table:features}}']],
  ['start', 'Start: how to ask for a site', ['{{offer}}']],
];

// The width and height of a JPEG, from its first frame header; null if it cannot be read.
function jpegSize(file) {
  try {
    const fd = openSync(file, 'r');
    const b = Buffer.alloc(65536);
    const n = readSync(fd, b, 0, b.length, 0);
    closeSync(fd);
    if (b[0] !== 0xff || b[1] !== 0xd8) return null;
    for (let i = 2; i + 9 < n;) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  } catch { /* unreadable: no size */ }
  return null;
}
const plain = (s) => String(s || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
// One line per design from next/DESIGNS.md (the designer's): "The story:" of its "## <n>." section, else "For:".
function designLines(root) {
  const f = join(root, 'next/DESIGNS.md');
  const out = {};
  if (!existsSync(f)) return out;
  const parts = readFileSync(f, 'utf8').split(/^## /m);
  for (const part of parts) {
    const m = part.match(/^(\d)\.\s/);
    if (!m) continue;
    const story = part.match(/\*\*The story:\*\*\s*([^\n]+)/);
    const who = part.match(/\*\*For:\*\*\s*(.+?)(?=\s\*\*|\n|$)/);
    const line = story ? story[1] : who ? `For ${who[1]}` : '';
    if (line) { const t = plain(line); out[m[1]] = t.charAt(0).toUpperCase() + t.slice(1); }
  }
  return out;
}
const firstSentence = (s) => { const t = String(s || '').trim(); const m = t.match(/^.*?[.!?](?=\s|$)/); return m ? m[0] : t; };
function pageMeta(root, slug) {
  const f = join(root, 'next/pages', `${slug}.md`);
  return existsSync(f) ? P.frontMatter(readFileSync(f, 'utf8')).meta : {};
}

function chooser(data, root) {
  const lines = designLines(root);
  const cards = P.DESIGNS.map((d) => {
    const thumb = `assets/next/thumbs/d${d.n}.jpg`;
    const size = existsSync(join(root, thumb)) ? jpegSize(join(root, thumb)) || { w: 1200, h: 900 } : null;
    const img = size
      ? `<img class="thumb-img" src="/${thumb}" alt="" width="${size.w}" height="${size.h}" loading="lazy" decoding="async">`
      : `<span class="thumb thumb-d${d.n}" aria-hidden="true"><span class="th-bar"></span><span class="th-h"></span><span class="th-p"></span><span class="th-card"></span></span>`;
    const line = lines[String(d.n)] || d.blurb;
    return `<li class="pick pick-d${d.n}">
${img}
<h3 class="pick-name"><a href="/next/d/${d.n}/">${P.esc(d.name)}</a></h3>
<p class="pick-line">${P.inline(line)}</p>
<p class="pick-go" aria-hidden="true">See design ${['one', 'two', 'three', 'four', 'five'][d.n - 1]}</p>
</li>`;
  }).join('\n');
  const idea = P.oneIdea(data.copy);
  return `<section class="hero chooser-hero"><div class="in">
<h1>Five designs for agenticcells.ai</h1>
${idea ? `<p class="kicker">${P.inline(idea)}</p>` : P.tbw('the one idea (next/copy.json one_idea)')}
<p>Agentic cells, with the sovereign website as the smallest cell: the same words and the same data in five styles. Pick one to see its home page; the explain pages below are shared by all five.</p>
</div></section>
<section class="sec" aria-labelledby="h-designs"><h2 id="h-designs">The five designs</h2>
<ol class="picks picks-large">
${cards}
</ol></section>
<section class="sec" aria-labelledby="h-explain"><h2 id="h-explain">The explain pages</h2>
<ul class="explain-row">
${EXPLAIN.map(([s, t]) => {
    const m = pageMeta(root, s);
    return `<li><a href="/next/${s}/">${P.esc(m.title || t)}</a><span class="explain-line">${m.description ? P.esc(firstSentence(m.description)) : 'To be written.'}</span></li>`;
  }).join('\n')}
</ul>
<p class="more"><a href="/next/review/">Morning review</a>: what was made overnight and what is waiting for a decision.</p>
</section>
<section class="sec" aria-labelledby="h-offer"><h2 id="h-offer">The offer</h2>
${C.cellList(data).length ? C.miniLadder({ data, root }, { cls: 'ml chooser-ml' }) : P.offerCard(data, { compact: true })}
</section>`;
}

// No email address may appear in /next/ (validator V-NEXT). Agent names written as role@AgentiCCells.person are shown
// as the role part only; any other address is removed. The conductor's file is not changed.
const noAddresses = (s) => s.replace(/([\w.+-]+)@([\w-]+)\.[\w.-]*[a-z]/gi, (m, local, dom) => (/^agenticcells$/i.test(dom) ? local : '[address removed]'));

// /next/review/: the morning review for Dinis, from next/review.md (the conductor writes it).
function reviewPage({ root, data, figs }) {
  const f = join(root, 'next/review.md');
  const src = existsSync(f) ? noAddresses(readFileSync(f, 'utf8')) : null;
  const { meta, body } = src ? P.frontMatter(src) : { meta: {}, body: '' };
  const tokens = {
    figure: (id) => P.figure(figs, id),
    'table:compare': () => P.compareTable(data, { note: !/not converted/i.test(body) }),
    'table:features': () => P.featuresTable(data),
    'table:pricing': () => P.pricingLadder(data),
    offer: () => P.offerBlock(data),
  };
  let html = src && body.trim() ? P.markdown(body, tokens) : '<p class="tbw">To be written.</p>';
  if (!/<h1[\s>]/.test(html)) html = `<h1>Morning review</h1>\n${html}`;
  return { path: 'next/review/index.html', content: P.shell({
    path: '/next/review/', title: 'Morning review',
    description: meta.description || 'The morning review of the sovereign website preview: what was made and what is waiting for a decision.',
    body: `<article class="page page-review"><div class="in">\n${html}\n</div></article>`, bodyClass: 'explain review',
  }) };
}

// The words of an explain page, without the shell: { title, description, body, bodyClass }. explainPage() puts them in the
// preview's shell; the live render (go live with design 1) puts the same words in the live shell.
function explainParts({ root, data, figs }, slug, label, defaults) {
  const f = join(root, 'next/pages', `${slug}.md`);
  const src = existsSync(f) ? readFileSync(f, 'utf8') : null;
  const { meta, body } = src ? P.frontMatter(src) : { meta: {}, body: '' };
  // Each figure once per page: a second token for the same figure renders nothing. {{deliverables}} draws the
  // deliverables figure with the list as its text version, so a page that has both shows it where the list belongs.
  const shown = new Set();
  const once = (id, html) => { if (shown.has(id)) return ''; shown.add(id); return html(); };
  const tokens = {
    figure: (id) => (id === 'deliverables' && /\{\{deliverables\}\}/.test(body) ? '' : once(id, () => P.figure(figs, id))),
    'table:compare': () => P.compareTable(data, { note: !/not converted/i.test(body) }),
    'table:features': () => P.featuresTable(data),
    'table:glance': () => P.glanceTable(data),
    'table:pricing': () => (C.cellList(data).length ? C.pricingCells({ data, figs, root }) : P.pricingLadder(data)),
    examples: () => P.examples(data, root),
    // The four-rung ladder is the offer (Dinis, ~17:55 UTC); the £50 launch offer is the sovereign website's own.
    offer: () => (slug !== 'sovereign-website' && C.cellList(data).length ? C.pricingCells({ data, figs, root }) : P.offerBlock(data)),
    deliverables: () => once('deliverables', () => P.deliverables(data, figs)),
    faq: () => P.faq(data),
    contact: () => `<p class="cta"><a class="btn" href="${P.ASK}">Ask for your site</a></p>`,
    cells: () => C.ladderList({ data, figs, root }),
    proof: () => C.proofGrid(),
    case_studies: () => C.caseList({ data, figs, root }),
    'case-studies': () => C.caseList({ data, figs, root }),
  };
  let html = src ? P.markdown(body, tokens) : `${P.tbw(`the words of this page (next/pages/${slug}.md)`)}\n${P.markdown(defaults.join('\n\n'), tokens)}`;
  // /next/pricing/: the euro note, after the offer block (else before the ladder, else at the end).
  if (slug === 'pricing' && !C.cellList(data).length) {
    const note = P.euroNote(data);
    const at = html.indexOf('</section>', html.indexOf('class="offer-block"'));
    if (note && html.includes('class="offer-block"') && at > 0) html = html.slice(0, at + 10) + '\n' + note + html.slice(at + 10);
    else if (note && html.includes('<div class="ladder">')) html = html.replace('<div class="ladder">', `${note}\n<div class="ladder">`);
    else html += `\n${note}`;
  }
  // /next/start/: its own "Ask for a site" links point at its how-to-ask section, not at the page itself.
  if (slug === 'start') {
    const ids = [...html.matchAll(/<h[2-4] id="([^"]+)"/g)].map((m) => m[1]);
    const to = ids.find((x) => /^how-to-ask/.test(x)) || ids.find((x) => /^ask/.test(x));
    if (to) html = html.split(`href="${P.ASK}"`).join(`href="#${to}"`);
  }
  // /next/sovereign-website/: the explain pages about the website itself are listed at its foot (round R1: the top nav
  // holds the cells; these pages stay in the footer and here).
  if (slug === 'sovereign-website') {
    html += `\n<nav class="saw-pages" aria-labelledby="saw-pages-h"><h2 id="saw-pages-h">More about the sovereign website</h2>\n<ul class="explain-row">\n${C.SAW_PAGES.map(([s2, t]) => {
      const m = pageMeta(root, s2);
      return `<li><a href="/next/${s2}/">${P.esc(m.title || t)}</a>${m.description ? `<span class="explain-line">${P.esc(firstSentence(m.description))}</span>` : ''}</li>`;
    }).join('\n')}\n</ul></nav>`;
  }
  const title = meta.title || label;
  if (!/<h1[\s>]/.test(html)) html = `<h1>${P.esc(title)}</h1>\n${html}`;
  const description = meta.description || `${label}, in the preview of agenticcells.ai: to be written.`;
  return { title, description, body: `<article class="page page-${slug}"><div class="in">\n${html}\n</div></article>`, bodyClass: `explain x-${slug}` };
}
function explainPage(h, slug, label, defaults) {
  const x = explainParts(h, slug, label, defaults);
  return { path: `next/${slug}/index.html`, content: P.shell({ path: `/next/${slug}/`, ...x }) };
}

// The list of files for /next/: [{ path, content }], paths under site/. Contact is not used (no address in the preview).
export async function render({ root }) {
  const data = P.loadData(root);
  const figs = await P.loadFigures(root, data);
  const h = { data, figs, root };
  const files = [];
  const idea = P.oneIdea(data.copy);
  files.push({ path: 'next/index.html', content: P.shell({
    path: '/next/', title: 'Five designs for agenticcells.ai',
    description: 'Preview for review: five designs of the AgentiCCells home page about agentic cells, with the pages that explain them.',
    body: chooser(data, root), bodyClass: 'chooser',
  }) });
  HOMES.forEach((mod, i) => {
    const n = i + 1;
    files.push({ path: `next/d/${n}/index.html`, content: P.shell({
      path: `/next/d/${n}/`, title: `${mod.name}: design ${['one', 'two', 'three', 'four', 'five'][i]}`,
      description: idea ? String(idea) : `The ${mod.name} design of the AgentiCCells home page about agentic cells, in the preview.`,
      css: mod.css, body: mod.home(h), bodyClass: `home d${n}`,
    }) });
  });
  for (const [slug, label, defaults] of EXPLAIN) files.push(explainPage(h, slug, label, defaults));
  files.push(reviewPage(h));
  // The honest notes once per page (the pricing ladder and the table notes repeat the offer block's), and no secondary
  // button that links to the page it is on (the offer card's "See the price" on /next/pricing/).
  return files.map((f) => ({ ...f, content: P.noSelfButtons(P.onceHonest(f.content), '/' + f.path.replace(/index\.html$/, '')) }));
}

// ---------- going live with design 1 (board/briefs/2026-11-21-go-live-design-1.md) ----------
// Complete live documents for / (design 1's home) and the root explain pages (L.LIVE_SLUGS): the same words as the preview,
// in the live shell, with /next/ links pointed at the live addresses. Returns [{ path, title, description, file, content }],
// path a site path ("/cells/"), file under site/. contact and version come from the build (ctx); the local render has none.
export async function renderLive({ root, contact = '', version = 'local' }) {
  P.setLinkLaunch(true);
  try {
    const data = P.loadData(root);
    const figs = await P.loadFigures(root, data);
    const h = { data, figs, root };
    const pages = [];
    const lead = P.lead(data.copy, 1);
    const headline = String(lead.headline || d1.name).replace(/[.\s]+$/, '');
    const idea = P.oneIdea(data.copy);
    // The home's description: the one idea and the four sizes, in the writer's words (110 to 150 characters, V-OG).
    const sizes = (String(lead.sub || '').match(/Four sizes[^.]*\./) || [''])[0];
    pages.push({ path: '/', title: `AgentiCCells: ${headline.charAt(0).toLowerCase()}${headline.slice(1)}`,
      description: [idea, sizes].filter(Boolean).join(' ') || headline, css: d1.css, body: d1.home(h), bodyClass: 'home d1-live' });
    for (const [slug, label, defaults] of EXPLAIN.filter(([s]) => L.LIVE_SLUGS.includes(s))) {
      const x = explainParts(h, slug, label, defaults);
      pages.push({ path: `/${slug}/`, ...x, title: x.title });
    }
    return pages.map((p) => {
      const title = p.path === '/' ? p.title : `${p.title}: AgentiCCells`;
      let html = L.liveShell({ root, path: p.path, title, description: p.description, css: p.css, body: p.body, bodyClass: p.bodyClass, contact, version });
      html = L.liveLinks(L.liveWords(html));
      html = P.noSelfButtons(P.onceHonest(html), p.path);
      html = L.splitWebsiteCellLines(html);
      L.assertLive(root, p.path, html);
      return { path: p.path, title, description: p.description, file: p.path === '/' ? 'index.html' : `${p.path.slice(1)}index.html`, content: html };
    });
  } finally { P.setLinkLaunch(false); }
}

export default async function next(ctx) {
  ctx.files.push(...await render({ root: ctx.root }));
  if (!L.isLive(ctx.root)) return [];
  // Live (data/next/live.json): each live document goes into ctx.files, which the build writes after every page, so it
  // replaces the page at the same file (the old /, /cells/ and /faq/). A live address with no content page gets a stub
  // page here, only so the build lists it in the sitemap; its rendered stub is then replaced by the live document.
  const live = await renderLive({ root: ctx.root, contact: ctx.contact, version: ctx.version });
  ctx.files.push(...live.map((p) => ({ path: p.file, content: p.content })));
  const have = new Set((ctx.pages || []).map((p) => p.path));
  return live.filter((p) => !have.has(p.path)).map((p) => ({ path: p.path, title: p.title, description: p.description, html: '' }));
}

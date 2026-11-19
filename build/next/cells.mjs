// The agentic-cells sections of the /next/ home designs (refactor round R1, board/briefs/2026-11-19-refactor-agentic-cells.md):
// what a cell is, the cells we sell (a ladder, prices from data/next/offer.json), the sovereign website as the example,
// the bigger cells (our own team's work at Web Summit, from public pages only), what every cell gives you, the devices
// (a plan) and the screenshots of cells at work. Every reader is tolerant: a missing key in next/copy.json renders a
// visible "To be written" box, never invented words. Prices are never read from copy: only from data/next/offer.json.
// Written by designer.agenticcells-ai@AgentiCCells.dinis (builder, round R1), 2026-11-19. Code under Apache-2.0.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ASK, OFFER_URL, esc, gbp, inline, prose, get, asArray, sectionOf, safeHref, tbw, proofLink, figure, euroLine, honestNotes, cta } from './parts.mjs';

// The words of a home section: copy.<key> (an object with title, text, points...) merged with copy.sections.<key>
// (a title, or a string that is the text). copy.sections.<key>.title wins for the heading.
export function words(c, key) {
  const top = get(c, key);
  const sec = sectionOf(c, key);
  const a = top && typeof top === 'object' && !Array.isArray(top) ? top : {};
  const b = typeof sec === 'string' ? { text: sec } : sec && typeof sec === 'object' ? sec : {};
  return { ...a, ...Object.fromEntries(Object.entries(b).filter(([, v]) => v != null && v !== '')) };
}
const titleOf = (w) => get(w, 'title', 'heading', 'h2');
const textOf = (w) => get(w, 'text', 'body', 'intro', 'lead');
// A heading: the writer's title, else the section's plain label with a "to be written" note beside the text.
function head(w, fallback, { tag = 'h2', id = '' } = {}) {
  const t = titleOf(w);
  return `<${tag}${id ? ` id="${esc(id)}"` : ''}>${t ? inline(t) : esc(fallback)}</${tag}>`;
}
function body(w, key, label) {
  const t = textOf(w);
  return t ? prose(t) : tbw(`the words for "${label}" (next/copy.json ${key})`);
}
const PRICED = /\{launch|launch price|launch offer|£\s?\d/i;
const points = (w, cls = 'pts', { noPrice = false } = {}) => {
  const list = asArray(get(w, 'points', 'items')).filter((x) => !noPrice || !PRICED.test(JSON.stringify(x)));
  return list.length ? `<ul class="${cls}">\n${list.map((x) => `<li>${inline(typeof x === 'object' ? [get(x, 'title'), get(x, 'text', 'line')].filter(Boolean).join(': ') : x)}</li>`).join('\n')}\n</ul>` : '';
};
const outLink = (w, cls = 'btn ghost') => {
  const href = safeHref(get(w, 'link', 'url'));
  const text = get(w, 'link_text', 'link_label');
  return href ? `<p class="go"><a class="${cls}" href="${esc(href)}">${inline(text || href.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a></p>` : '';
};

// ---------- the price of a cell ----------
// The ladder is data/cells.json (Dinis, 2026-11-19 ~17:55 UTC): £500, £1,500, £5,000, £20,000, each a first proposal.
// price: "500" / "1500" / "5000" / "20000" (a rung of data/cells.json, else a bigger offer in data/next/offer.json, first
// proposal), "launch" (the sovereign website's own launch price, data/next/offer.json), "ask" ("Priced for each
// engagement: ask us"). The mark ("first proposal" / "launch price") is always on the same line as the £ figure
// (validator), and the figure is the link to its data file (check-evidence). Never "from £..." (validator).
export const CELLS_URL = 'https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/cells.json';
const num = (v) => Number(String(v ?? '').replace(/[^\d]/g, ''));
export const rungs = (data) => asArray(data.cells && data.cells.cells).filter((x) => x && x.name && num(x.price) > 0);
export function cellPrice(data, price, { short = false } = {}) {
  const o = data.offer || {};
  const p = String(price ?? '').trim().toLowerCase();
  if (p === 'launch') {
    if (!Number.isFinite(o.launch_gbp)) return { html: tbw('the launch price (data/next/offer.json)', 'span'), kind: 'tbw' };
    const was = short ? '' : [Number.isFinite(o.usual_gbp) ? `usually <s>${gbp(o.usual_gbp)}</s>` : '', Number.isFinite(o.earlier_launch_gbp) ? `earlier launch price <s>${gbp(o.earlier_launch_gbp)}</s>` : ''].filter(Boolean).join(', ');
    return { html: `<strong><a href="${OFFER_URL}">${gbp(o.launch_gbp)}</a></strong> <span class="cp-w">launch price, once</span>${was ? ` <span class="cp-was">${was}</span>` : ''}`, kind: 'launch' };
  }
  if (/^[£\d,]+$/.test(p) && num(p) > 0) {
    const r = rungs(data).find((x) => num(x.price) === num(p));
    if (r) return { html: `<strong><a href="${CELLS_URL}">${gbp(num(r.price))}</a></strong><span class="cp-w">, first proposal</span>`, kind: 'proposal' };
    const b = asArray(o.bigger).find((x) => Number(x.price_gbp) === num(p));
    if (b) return { html: `<strong><a href="${OFFER_URL}">${gbp(b.price_gbp)}</a></strong><span class="cp-w">, first proposal</span>`, kind: 'proposal' };
    return { html: tbw(`the ${p} cell (data/cells.json)`, 'span'), kind: 'tbw' };
  }
  if (p === 'ask') return { html: `<strong class="cp-ask">Priced for each engagement</strong>: <a href="${ASK}">ask us</a>`, kind: 'ask' };
  return { html: tbw('the price of this cell (next/copy.json cells_we_sell[].price)', 'span'), kind: 'tbw' };
}
// The cells we sell: copy.cells_we_sell (the writer's words), else the rungs of data/cells.json as they stand
// (name, what it includes, price): data, not invented words.
export function cellList(data) {
  const c = asArray(get(data.copy, 'cells_we_sell'));
  if (c.length) return c;
  return rungs(data).map((r) => ({ id: String(r.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: r.name, what: r.includes, price: String(num(r.price)) }));
}
// The ladder's entry: the cheapest priced rung.
export function entry(data) {
  const list = cellList(data).filter((x) => /\d/.test(String(get(x, 'price') || '')));
  return list.sort((a, b) => num(get(a, 'price')) - num(get(b, 'price')))[0] || null;
}

// ---------- the first screen: the ladder's entry, and a compact ladder ----------
// One line: "<name>: £500, first proposal".
export function entryPrice(h, { cls = 'kp' } = {}) {
  const e = entry(h.data);
  if (!e) return tbw('the ladder (data/cells.json)');
  const p = cellPrice(h.data, get(e, 'price'));
  return `<p class="${cls} cp cp-${p.kind}"><span class="fp-name">${inline(get(e, 'name') || '')}</span> ${p.html}</p>`;
}
// The compact ladder: every rung on one row each, name and price; the entry first.
export function miniLadder(h, { cls = 'ml', title = 'The cells we sell', primary, secondary } = {}) {
  const list = cellList(h.data);
  if (!list.length) return tbw('the ladder (data/cells.json)');
  const w = words(h.data.copy, 'cells_we_sell');
  return `<aside class="${cls}" aria-label="${esc(titleOf(w) || title)}">
<p class="ml-h">${inline(titleOf(w) || title)}</p>
<ol class="ml-list">
${list.map((x) => { const p = cellPrice(h.data, get(x, 'price'), { short: true }); return `<li class="ml-${p.kind}"><span class="ml-name">${inline(get(x, 'name') || '')}</span> <span class="ml-p">${p.html}</span></li>`; }).join('\n')}
</ol>
${cta(h.data.copy, { primary, secondary, noSecondary: !secondary })}
</aside>`;
}

// ---------- what a cell is ----------
export function cellSection(h, { cls = '', fig = true } = {}) {
  const c = h.data.copy;
  const w = words(c, 'cell');
  const web = words(c, 'agentic_web');
  const webHtml = textOf(web) ? `<aside class="aweb" aria-label="${esc(titleOf(web) || 'The agentic web')}"><p class="aweb-h">${inline(titleOf(web) || 'The agentic web')}</p>${prose(textOf(web))}<p class="more"><a href="/next/agentic-web/">${inline(titleOf(web) || 'The agentic web')}, in full</a></p></aside>` : '';
  return `<section class="sec cx-cell ${cls}" id="cell">
${head(w, 'What a cell is')}
<div class="cx-words">
${body(w, 'cell', 'What a cell is')}
${points(w, 'pts cx-pts')}
<p class="more"><a href="/next/cells/">How a cell works</a></p>
</div>
${fig ? figure(h.figs, 'cell') : ''}
${webHtml}
</section>`;
}

// ---------- the cells we sell: the ladder ----------
export function ladderList(h, { cls = 'cl', eur = false } = {}) {
  const list = cellList(h.data);
  if (!list.length) return tbw('the cells we sell (next/copy.json cells_we_sell)');
  return `<ol class="${cls}">
${list.map((x, i) => {
    const p = cellPrice(h.data, get(x, 'price'));
    const href = safeHref(get(x, 'link'));
    const id = String(get(x, 'id') || `cell-${i + 1}`).replace(/[^a-z0-9-]/gi, '');
    return `<li class="cl-rung cl-${esc(id)} cl-${p.kind}">
<h3 class="cl-name">${inline(get(x, 'name') || '')}${get(x, 'name') ? '' : tbw('the name of this cell', 'span')}</h3>
${get(x, 'size') ? `<p class="cl-size">${inline(get(x, 'size'))}</p>` : ''}
${get(x, 'what') ? `<p class="cl-what">${inline(get(x, 'what'))}</p>` : tbw('what this cell does (next/copy.json cells_we_sell[].what)')}
<p class="cl-price cp cp-${p.kind}">${p.html}</p>
${p.kind === 'launch' && eur ? euroLine(h.data.offer) : ''}
${href ? `<p class="cl-go"><a href="${esc(href)}">${inline(get(x, 'link_text') || 'More')}</a></p>` : ''}
</li>`;
  }).join('\n')}
</ol>`;
}
export function cellsWeSell(h, { cls = '', fig = true, list = true } = {}) {
  const c = h.data.copy;
  const w = words(c, 'cells_we_sell');
  return `<section class="sec cx-sell ${cls}" id="cells">
${head(w, 'The cells we sell')}
${textOf(w) ? prose(textOf(w)) : ''}
${fig ? figure(h.figs, 'ladder') : ''}
${list ? ladderList(h) : ''}
<p class="more"><a href="/next/pricing/">Pricing in full</a></p>
</section>`;
}

// {{table:pricing}} once copy.cells_we_sell exists: the whole ladder, the euro price and the honest notes.
export function pricingCells(h) {
  return `<div class="ladder-cells">\n${ladderList(h, { cls: 'cl cl-page', eur: true })}\n${honestNotes(h.data)}\n<p><a class="btn" href="${ASK}">Ask for your site</a></p>\n</div>`;
}

// ---------- the sovereign website, the example ----------
export function sovereignExample(h, { cls = '', strip = '', extra = '' } = {}) {
  const c = h.data.copy;
  const w = words(c, 'sovereign_example');
  return `<section class="sec cx-saw ${cls}" id="sovereign-website">
${head(w, 'The sovereign website')}
<div class="cx-words">
${body(w, 'sovereign_example', 'The sovereign website')}
${points(w, 'pts cx-pts', { noPrice: asArray(get(c, 'case_studies')).length > 0 })}
${outLink(w, 'btn')}
<p class="more"><a href="/next/sovereign-website/">The sovereign website, on this preview</a></p>
</div>
${extra}
${strip}
</section>`;
}

// ---------- cells at work: our own team at Web Summit, from public pages ----------
// The screenshots the live /d/proof/ design uses (build/build.mjs PROOF_SHOTS, read, not run): pages of web-summit.sgit.ai
// and the map article, taken on 16 November 2026 (research/proof/shots/). Captions name no person and no customer.
export const PROOF = [
  ['web-summit-home', 'The team site', 'The operating system of the Web Summit team: board, briefs, keys.', 'https://web-summit.sgit.ai/'],
  ['universe-dinis-universo', 'The universe view', 'Every agent as a moon of its owner, with its policy or the lack of one.', 'https://web-summit.sgit.ai/lib/gravity/'],
  ['web-summit-xray', 'The X-ray', 'What each agent did, drawn from the commits.', 'https://web-summit.sgit.ai/'],
  ['web-summit-pulse', 'The pulse', 'Activity across the team as it happened.', 'https://web-summit.sgit.ai/'],
  ['web-summit-companies', 'The company map', 'The companies at the event, mapped by agents.', 'https://web-summit.sgit.ai/'],
  ['newsroom-ten-days', 'The map article', 'Ten days at Web Summit, and how the map was made.', 'https://newsroom.sgit.ai/articles/ten-days-at-web-summit.html'],
];
export function proofTile([f, t, cap, u], { eager = false, cls = '' } = {}) {
  return `<li class="px ${cls}"><a class="px-shot" href="${esc(u)}"><img src="/assets/media/proof/${f}-half.webp" srcset="/assets/media/proof/${f}-half.webp 450w, /assets/media/proof/${f}.webp 900w" sizes="(max-width: 40rem) 100vw, 26rem" width="900" height="563" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" alt="Screenshot of ${esc(t)}, a live page"><span class="px-tag">Cells at work</span></a>
<p class="px-cap"><a href="${esc(u)}">${esc(t)}</a> <span>${esc(cap)}</span></p></li>`;
}
export const PROOF_NOTE = '<p class="px-note">Screenshots of live pages our own team made, taken on 16 November 2026. Each links to the live page, which may have changed since.</p>';
export function proofGrid({ limit = PROOF.length, cls = 'px-grid', eager = 0 } = {}) {
  return `<ul class="${cls}">\n${PROOF.slice(0, limit).map((x, i) => proofTile(x, { eager: i < eager })).join('\n')}\n</ul>\n${PROOF_NOTE}`;
}
export function eventTeam(h, { cls = '', limit = PROOF.length, grid } = {}) {
  const c = h.data.copy;
  const w = words(c, 'event_team');
  return `<section class="sec cx-event ${cls}" id="team-work">
${head(w, 'Bigger cells: team work')}
<div class="cx-words">
${body(w, 'event_team', 'Bigger cells: team work')}
${outLink(w)}
<p class="more"><a href="/next/team-work/">Team work, in full</a></p>
</div>
${grid ?? proofGrid({ limit })}
</section>`;
}

// ---------- what every cell gives you ----------
export function propertyList(c, cls = 'props') {
  const list = asArray(get(c, 'properties'));
  if (!list.length) return tbw('what every cell gives you (next/copy.json properties)');
  return `<ol class="${cls}">\n${list.map((x) => (typeof x === 'object'
    ? `<li><h3>${inline(get(x, 'title', 'name') || '')}</h3>${prose(get(x, 'line', 'text'))}${get(x, 'proof') ? `<p class="proof">${inline(get(x, 'proof'))}${proofLink(x)}</p>` : proofLink(x, { before: '<p class="proof">', after: '</p>' })}</li>`
    : `<li><h3>${inline(x)}</h3></li>`)).join('\n')}\n</ol>`;
}
export function properties(h, { cls = '', listCls = 'props' } = {}) {
  const c = h.data.copy;
  const w = words(c, 'properties');
  return `<section class="sec cx-props ${cls}" id="properties">
${head(w, 'What every cell gives you')}
${textOf(w) ? prose(textOf(w)) : ''}
${propertyList(c, listCls)}
</section>`;
}

// ---------- the devices: a plan ----------
export function devices(h, { cls = '' } = {}) {
  const w = words(h.data.copy, 'devices');
  return `<section class="sec cx-dev ${cls}" id="devices">
<p class="plan-tag">Plan</p>
${head(w, 'On a device you hold')}
${body(w, 'devices', 'On a device you hold')}
</section>`;
}

// ---------- the explain page links from /next/sovereign-website/ ----------
export const SAW_PAGES = [
  ['what-you-get', 'What you get'], ['how-it-works', 'How it works'], ['sovereignty', 'Sovereignty'], ['no-lock-in', 'No lock-in'],
  ['security', 'Security'], ['compare', 'Compare'], ['partners', 'Partners'],
];

// ---------- the two case studies (Dinis, ~17:55 UTC): PrompTugal.news and the Sovereign Agentic Website ----------
// copy.case_studies: [{ id, name, what, points, link, link_text, image }]. The sovereign website's own £50 launch offer
// is shown here only, marked as its own and linked to sovereignwebsite.ai.
const SAW_URL = 'https://sovereignwebsite.ai/';
function caseImage(x, root) {
  let src = String(get(x, 'image', 'screenshot') || '').replace(/^\/+/, '');
  if (!src && /promptugal/i.test(String(get(x, 'id') || ''))) src = 'assets/media/proof/promptugal-home.webp';
  if (!src || /^https?:/.test(src)) return '';
  const ok = (p) => existsSync(join(root, p)) || existsSync(join(root, 'site', p));
  if (!ok(src)) return '';
  const half = src.replace(/(\.webp)$/, '-half$1');
  const isProof = /assets\/media\/proof\//.test(src);
  const [w, hh] = isProof ? [900, 563] : [1100, 688];
  const set = half !== src && ok(half) ? ` srcset="/${esc(half)} 450w, /${esc(src)} 900w" sizes="(max-width: 48rem) 100vw, 34rem"` : '';
  return `<span class="cs-img"><img src="/${esc(src)}"${set} width="${w}" height="${hh}" loading="lazy" decoding="async" alt="The first screen of ${esc(get(x, 'name') || 'the case study')}"></span>`;
}
function sawOffer(data) {
  const o = data.offer || {};
  if (!Number.isFinite(o.launch_gbp)) return '';
  return `<p class="cs-offer">Its own launch offer, on <a href="${SAW_URL}">sovereignwebsite.ai</a>: <strong><a href="${OFFER_URL}">${gbp(o.launch_gbp)}</a></strong> launch price, once.</p>`;
}
export function caseList(h, { cls = 'cs-list' } = {}) {
  const list = asArray(get(h.data.copy, 'case_studies'));
  if (!list.length) return tbw('the case studies (next/copy.json case_studies)');
  return `<ul class="${cls}">\n${list.map((x) => {
    const id = String(get(x, 'id') || '').replace(/[^a-z0-9-]/gi, '');
    const href = safeHref(get(x, 'link'));
    const img = caseImage(x, h.root);
    const pic = img && href ? `<a class="cs-shot" href="${esc(href)}" tabindex="-1" aria-hidden="true">${img}</a>` : img;
    return `<li class="cs cs-${esc(id)}">
${pic}
<div class="cs-body">
<h3>${inline(get(x, 'name') || '')}${get(x, 'name') ? '' : tbw('the name of this case study', 'span')}</h3>
${get(x, 'what') ? prose(get(x, 'what')) : tbw('what this case study is (next/copy.json case_studies[].what)')}
${points(x, 'pts cs-pts')}
${/sovereign/i.test(id) && !/launch|£/i.test(JSON.stringify(x)) ? sawOffer(h.data) : ''}
${href ? `<p class="go"><a class="btn ghost" href="${esc(href)}">${inline(get(x, 'link_text') || href.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a></p>` : ''}
</div>
</li>`;
  }).join('\n')}\n</ul>`;
}
export function caseStudies(h, { cls = '' } = {}) {
  const w = words(h.data.copy, 'case_studies');
  return `<section class="sec cx-cases ${cls}" id="case-studies">
${head(w, 'Case studies')}
${textOf(w) ? prose(textOf(w)) : ''}
${caseList(h)}
<p class="more"><a href="/next/case-studies/">The case studies, in full</a></p>
</section>`;
}

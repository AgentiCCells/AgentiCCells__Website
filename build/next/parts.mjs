// Shared parts of the /next/ preview: data loading, the page shell, a small markdown renderer, the offer,
// tables, figures, examples and FAQ. Each home design (build/next/d<n>.mjs) composes these.
// Written by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19. Code under Apache-2.0.
//
// Every reader is tolerant: a missing file or field renders a visible "To be written" placeholder, never
// invented content. The preview carries no email address: every way to ask goes to the live /start-here/
// (conductor.agenticcells-ai@, 2026-11-19).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export const OFFER_URL = 'https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/next/offer.json';
export const ASK = '/start-here/';
export const FIGURE_IDS = ['tenets', 'rent-or-own', 'can-you-leave', 'brief-to-claude', 'team', 'year-of-platform', 'deliverables', 'how-it-works'];

export const DESIGNS = [
  { n: 1, slug: 'sovereign', name: 'Sovereign', blurb: 'Deep ink and a serif voice: the one idea first, the price beside it.' },
  { n: 2, slug: 'six-promises', name: 'Six promises', blurb: 'Light and bright: the six promises are the first thing you see.' },
  { n: 3, slug: 'stop-renting', name: 'Stop renting your website', blurb: 'Rent against own, side by side, from the first screen.' },
  { n: 4, slug: 'just-say-it', name: 'Just say it', blurb: 'Big plain words, one short sentence at a time.' },
  { n: 5, slug: 'proof', name: 'Proof', blurb: 'A wall of real sites, each one labelled.' },
];

export const NAV = [
  ['Designs', '/next/'], ['What you get', '/next/what-you-get/'], ['How it works', '/next/how-it-works/'],
  ['Sovereignty', '/next/sovereignty/'], ['Pricing', '/next/pricing/'], ['Compare', '/next/compare/'],
  ['Examples', '/next/examples/'], ['FAQ', '/next/faq/'], ['Start', '/next/start/'], ['Review', '/next/review/'],
];

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const gbp = (n) => '£' + Number(n).toLocaleString('en-GB');
export const eur = (n) => '€' + Number(n).toLocaleString('en-GB');
export const tbw = (what, tag = 'p') => `<${tag} class="tbw">To be written: ${esc(what)}.</${tag}>`;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (d) => {
  const m = String(d ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : String(d ?? '');
};

// ---------- data ----------
const warn = (m) => console.warn(`WARNING next: ${m}`);
function json(root, p) {
  const f = join(root, p);
  if (!existsSync(f)) return null;
  try { return JSON.parse(readFileSync(f, 'utf8')); } catch (e) { warn(`${p} does not parse (${e.message}); shown as "to be written"`); return null; }
}
// The data of the current render, kept so figure() can show a text fallback when a figure module is missing.
let DATA = null;
export function loadData(root) {
  const offer = json(root, 'data/next/offer.json');
  setOffer(offer);
  DATA = {
    offer,
    competitors: json(root, 'data/next/competitors.json'),
    copy: json(root, 'next/copy.json'),
    examples: json(root, 'next/examples.json'),
  };
  return DATA;
}
// Key lookup that forgives case, dashes and spaces: get(obj, 'rent_or_own', 'rentOrOwn').
const norm = (k) => String(k).toLowerCase().replace(/[^a-z0-9]/g, '');
export function get(obj, ...keys) {
  if (!obj || typeof obj !== 'object') return undefined;
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
    const hit = Object.keys(obj).find((x) => norm(x) === norm(k));
    if (hit && obj[hit] !== null && obj[hit] !== '') return obj[hit];
  }
  return undefined;
}
// A home section from copy.json: copy.sections.<key> or copy.<key>.
// copy.sections.<key> wins; a top-level copy.<key> list (steps, team, promises) is content, not the section's words.
export const sectionOf = (copy, ...keys) => {
  const v = get(get(copy, 'sections', 'home') || {}, ...keys) ?? get(copy, ...keys);
  return Array.isArray(v) ? undefined : v;
};
export const asArray = (v) => (Array.isArray(v) ? v : v == null ? [] : get(v, 'items', 'list', 'points') ?? []);

// ---------- inline markdown and the small renderer ----------
// Price placeholders in the writer's words ({launch}, {launch_eur}, {usual}, {earlier}; {price} for a bigger offer),
// filled from data/next/offer.json. render() sets the offer once; a missing value shows as "to be written".
let OFFER = null;
export const setOffer = (o) => { OFFER = o; };
export function fillPrices(s, extra = {}) {
  const o = OFFER || {};
  const v = { launch: o.launch_gbp, usual: o.usual_gbp, earlier: o.earlier_launch_gbp, ...extra };
  return String(s ?? '')
    .replace(/\{(launch|usual|earlier|price)\}/g, (m, k) => (Number.isFinite(v[k]) ? gbp(v[k]) : '[price to be written]'))
    .replace(/\{launch_eur\}/g, () => (Number.isFinite(o.launch_eur) ? eur(o.launch_eur) : '[price to be written]'));
}
export function inline(s) {
  return esc(fillPrices(s))
    .replace(/\{\{contact\}\}/g, ASK)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${u}">${t}</a>`);
}
// Plain text or markdown-ish text (string, or an array of paragraphs) as paragraphs.
export function prose(v) {
  if (v == null || v === '') return '';
  const parts = Array.isArray(v) ? v : String(v).split(/\n\s*\n/);
  return parts.filter((p) => String(p).trim()).map((p) => `<p>${inline(String(p).replace(/\s*\n\s*/g, ' ').trim())}</p>`).join('\n');
}
export const slug = (s) => String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function frontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: m[2] };
}

// tokens: { name: () => html } for lines that are only {{name}}.
export function markdown(body, tokens) {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let para = [], list = [], olist = [], quote = [], rows = [];
  const flush = () => {
    if (rows.length) {
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const bodyRows = rows.slice(1).filter((r) => !/^\|?\s*:?-{2,}/.test(r.trim())).map(cells);
      html.push(`<div class="tw" tabindex="0" role="region" aria-label="Table"><table class="t">\n<thead><tr>${head.map((c) => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead>\n<tbody>\n${bodyRows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join('')}</tr>`).join('\n')}\n</tbody></table></div>`);
      rows = [];
    }
    if (para.length) html.push(`<p>${inline(para.join(' '))}</p>`);
    if (list.length) html.push(`<ul>\n${list.map((l) => `<li>${inline(l)}</li>`).join('\n')}\n</ul>`);
    if (olist.length) html.push(`<ol class="steps">\n${olist.map((l) => `<li>${inline(l)}</li>`).join('\n')}\n</ol>`);
    if (quote.length) html.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
    para = []; list = []; olist = []; quote = [];
  };
  for (const line of lines) {
    const t = line.trim();
    let m;
    if ((m = t.match(/^\{\{([a-z]+(?::[a-z0-9-]+)?)\}\}$/i))) {
      flush();
      const name = m[1].toLowerCase();
      const fn = tokens[name] || (name.startsWith('figure:') ? () => tokens.figure(name.slice(7)) : null);
      html.push(fn ? fn() : tbw(`the {{${name}}} block`));
    } else if ((m = line.match(/^(#{1,4})\s+(.*)$/))) { flush(); html.push(`<h${m[1].length} id="${slug(m[2])}">${inline(m[2])}</h${m[1].length}>`); }
    else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) { if (para.length || olist.length || quote.length) flush(); list.push(m[1]); }
    else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) { if (para.length || list.length || quote.length) flush(); olist.push(m[1]); }
    else if ((m = line.match(/^>\s?(.*)$/))) { if (para.length || list.length || olist.length) flush(); quote.push(m[1]); }
    else if (t === '') flush();
    else if (/^\|.*\|$/.test(t)) { if (para.length || list.length || olist.length) flush(); rows.push(t); }
    else { if (list.length || olist.length || quote.length) flush(); para.push(t); }
  }
  flush();
  return html.join('\n');
}

// ---------- the offer (data/next/offer.json) ----------
const offerLink = (t) => `<a href="${OFFER_URL}">${t}</a>`;
const hasPrices = (o) => o && [o.launch_gbp, o.usual_gbp, o.earlier_launch_gbp].every((n) => Number.isFinite(n));
// One line, always with "launch price" on it (validator) and the offer file's link in the sentence (check-evidence).
export function priceLine(o) {
  if (!hasPrices(o)) return tbw('the launch price (data/next/offer.json)');
  return `<p class="price"><s>${gbp(o.usual_gbp)}</s> <s>${gbp(o.earlier_launch_gbp)}</s> <strong>${offerLink(gbp(o.launch_gbp))}</strong> launch price, one-off.</p>`;
}
export function euroLine(o) {
  if (!o || !Number.isFinite(o.launch_eur)) return '';
  return `<p class="price-eur">In the euro area: <strong>${offerLink(eur(o.launch_eur))}</strong> launch price, one-off.</p>`;
}
// /next/pricing/: a small note on the euro price, with the offer file's link in its sentence. One line, so the
// validator sees "launch price" beside the euro figure.
export function euroNote(data) {
  const o = data.offer;
  if (!o || !Number.isFinite(o.launch_eur)) return '';
  return `<aside class="eur-note" aria-label="Prices in euros"><p><strong>Prices in euros.</strong> The launch price is ${offerLink(eur(o.launch_eur))} on our European pages (launch price), paid once.</p></aside>`;
}
export function honestNotes(data) {
  const intro = sectionOf(data.copy, 'honest_notes');
  let notes = asArray(get(data.copy, 'honest_notes'));
  if (!notes.length) notes = asArray(data.offer && data.offer.honest_notes);
  if (!notes.length) return tbw('the honest notes (next/copy.json honest_notes)');
  if (typeof intro === 'string' && !Array.isArray(intro)) return `<div class="honest-wrap"><p class="honest-intro">${inline(intro)}</p>\n<ul class="honest">\n${notes.map((n) => `<li>${inline(n)}</li>`).join('\n')}\n</ul></div>`;
  return `<ul class="honest">\n${notes.map((n) => `<li>${inline(n)}</li>`).join('\n')}\n</ul>`;
}
// The bigger offers: prices from data/next/offer.json, words from next/copy.json bigger[].line (same name), else the offer file.
export function bigger(data) {
  const words = asArray(get(data.copy, 'bigger'));
  return asArray(data.offer && data.offer.bigger).map((x) => {
    const w = words.find((y) => norm(get(y, 'name') || '') === norm(x.name || ''));
    const line = w && get(w, 'line', 'text');
    return { name: x.name || 'Offer', price: x.price_gbp, line: line ? line.replace(/\{price\}/g, Number.isFinite(x.price_gbp) ? `[${gbp(x.price_gbp)}](${OFFER_URL})` : '[price to be written]') : `${x.what || ''} ${Number.isFinite(x.price_gbp) ? `[${gbp(x.price_gbp)}](${OFFER_URL}), first proposal.` : ''}`.trim() };
  });
}
export function biggerOffers(data) {
  const b = bigger(data);
  if (!b.length) return tbw('the bigger offers (data/next/offer.json)');
  const intro = sectionOf(data.copy, 'bigger');
  return `${typeof intro === 'string' ? `<p>${inline(intro)}</p>\n` : ''}<ul class="bigger">\n${b.map((x) => `<li><strong>${esc(x.name)}</strong>: ${inline(x.line)}</li>`).join('\n')}\n</ul>`;
}
// Where a call to action goes, by its key in copy.cta. Every way to ask goes to the live /start-here/ (no address in the preview).
const CTA_HREF = { interview: ASK, ask: ASK, free_evaluation: ASK, pricing: '/next/pricing/', what_you_get: '/next/what-you-get/', how_it_works: '/next/how-it-works/', compare: '/next/compare/', examples: '/next/examples/', partners: '/next/partners/', faq: '/next/faq/', choose_design: '/next/' };
export function ctaHref(copy, label) {
  const c = get(copy, 'cta') || {};
  const key = Object.keys(c).find((k) => c[k] === label);
  if (key && CTA_HREF[key]) return CTA_HREF[key];
  if (/promise/i.test(label)) return '#promises';
  if (/compare/i.test(label)) return '/next/compare/';
  if (/example/i.test(label)) return '/next/examples/';
  if (/how|change works/i.test(label)) return '/next/how-it-works/';
  if (/what you get/i.test(label)) return '/next/what-you-get/';
  return ASK;
}
export function cta(copy, { primary, secondary, noSecondary = false } = {}) {
  const c = get(copy, 'cta') || {};
  const p = primary || get(c, 'ask', 'primary') || 'Ask for a site';
  const s2 = secondary || get(c, 'pricing') || 'See the price';
  return `<p class="cta"><a class="btn" href="${ctaHref(copy, p)}">${esc(p)}</a>${noSecondary ? '' : ` <a class="btn ghost" href="${ctaHref(copy, s2)}">${esc(s2)}</a>`}</p>`;
}
export function offerCard(data, { compact = false, title = 'The website cell', primary, secondary } = {}) {
  const o = data.offer;
  return `<aside class="offer${compact ? ' compact' : ''}" aria-label="Price">
<p class="offer-label">${esc(title)}</p>
${priceLine(o)}
${euroLine(o)}
${get(data.copy, 'offer_note') ? `<p class="offer-note">${inline(get(data.copy, 'offer_note'))}</p>` : o && o.note ? `<p class="offer-note">The launch price ${esc(o.note)}.</p>` : ''}
${compact ? '' : honestNotes(data)}
${cta(data.copy, { primary, secondary, noSecondary: compact && !secondary })}
</aside>`;
}
export function offerBlock(data) {
  const o = data.offer;
  return `<section class="offer-block" aria-label="The offer">
${offerCard(data)}
${o && o.free_eval ? `<p class="free-eval">${esc(o.free_eval).replace(/Apply by email\.?/, '')} <a href="${ASK}">How to ask</a>.</p>` : ''}
<h3>Bigger offers</h3>
${biggerOffers(data)}
</section>`;
}
// {{table:pricing}}: our ladder, as cards.
export function pricingLadder(data) {
  const o = data.offer;
  const big = bigger(data);
  return `<div class="ladder">
<div class="rung main">
<h3>The website cell</h3>
${priceLine(o)}
${euroLine(o)}
${honestNotes(data)}
<p><a class="btn" href="${ASK}">Ask for your site</a></p>
</div>
${big.length ? big.map((x) => `<div class="rung">
<h3>${esc(x.name)}</h3>
<p class="price">${Number.isFinite(x.price) ? `<strong>${offerLink(gbp(x.price))}</strong> first proposal.` : 'Price to be written, first proposal.'}</p>
<p>${inline(x.line)}</p>
</div>`).join('\n') : tbw('the bigger offers (data/next/offer.json)')}
</div>`;
}

// ---------- competitors (data/next/competitors.json) ----------
const competitorList = (c) => (Array.isArray(c) ? c : asArray(get(c, 'competitors', 'platforms', 'items')));
const readDate = (c) => get(c, 'read', 'read_on', 'date_read', 'as_of', 'date');
// A fact: string, number, or { value, source_url, read, basis, quote }.
function fact(comp, keys) {
  for (const where of [comp, get(comp, 'facts'), get(comp, 'pricing', 'prices'), get(comp, 'features')]) {
    const v = get(where, ...keys);
    if (v !== undefined) return v;
  }
  return undefined;
}
// A value of several sentences: an earlier sentence holding a figure gets its own source link inside it, so every
// figure has its evidence in its sentence (check-evidence); the last sentence has the cell's source link after it.
function withSources(v, url) {
  const parts = v.split(/(?<=[.!?])\s+(?=[A-Z"(])/);
  if (!url || !/^https?:\/\//.test(url)) return inline(v);
  return parts.map((p, i) => (i < parts.length - 1 && /\d/.test(p) ? inline(p.replace(/[.!?]$/, '')) + ` <a class="src-in" href="${esc(url)}">(source)</a>${p.match(/[.!?]$/) ? p.slice(-1) : ''}` : inline(p))).join(' ');
}
// A cell's inner html: value, basis and "source, read <date>" link. Shared by the wide table and the phone cards.
function factInner(comp, keys, fallbackDate) {
  const f = fact(comp, keys);
  if (f === undefined) return '<span class="tbw">To be written</span>';
  const o = typeof f === 'object' ? f : { value: f };
  let v = get(o, 'value', 'text', 'answer', 'summary');
  if (v === undefined && get(o, 'amount') !== undefined) v = `${get(o, 'currency') || ''} ${get(o, 'amount')}${get(o, 'period') ? ` a ${get(o, 'period')}` : ''}`.trim();
  const url = get(o, 'source_url', 'source', 'url') || get(comp, 'source_url', 'url');
  const date = longDate(get(o, 'read', 'date_read', 'read_on', 'date') || get(comp, 'read', 'date_read', 'read_on') || fallbackDate);
  const basis = get(o, 'basis');
  return `<span class="v">${v === undefined ? '<span class="tbw">To be written</span>' : withSources(String(v), url)}</span>${basis ? ` <span class="basis">${esc(basis)}</span>` : ''}${url && /^https?:\/\//.test(url) ? ` <a class="src" href="${esc(url)}">source, read ${esc(date)}</a>` : ' <span class="tbw">source to be recorded</span>'}`;
}
function ourInner(data, keys) {
  const c = data.competitors;
  const us = get(c, 'us', 'ours', 'website_cell', 'agenticcells') || get(get(data.copy, 'compare', 'features') || {}, 'us', 'ours', 'website_cell');
  const f = us ? fact(us, keys) : undefined;
  if (f === undefined) return '<span class="tbw">To be written</span>';
  const o = typeof f === 'object' ? f : { value: f };
  const url = get(o, 'source_url', 'source', 'url');
  return `<span class="v">${withSources(String(get(o, 'value', 'text') ?? ''), url)}</span>${url ? ` <a class="src" href="${esc(url)}">source${get(o, 'date_read', 'read') ? `, read ${esc(longDate(get(o, 'date_read', 'read')))}` : ''}</a>` : ''}`;
}
const compName = (c) => esc(get(c, 'name', 'title', 'platform') || 'Platform');
// Both markups are written: the wide table (shown from 640 px) and one card per column (shown under 640 px).
// assets/next/tables.css hides one of the two with display:none, so a screen reader meets only the visible one.
// cols: [{ name, us }]; rows: [{ label, cells: [html per column] }].
function tableAndCards(cls, caption, cols, rows) {
  const table = `<div class="tw tw-wide" tabindex="0" role="region" aria-label="${esc(caption)}"><table class="t ${cls}">
<caption class="vh">${esc(caption)}</caption>
<thead><tr><th scope="col"></th>${cols.map((c) => `<th scope="col">${c.name}</th>`).join('')}</tr></thead>
<tbody>
${rows.map((r) => `<tr><th scope="row">${r.label}</th>${r.cells.map((x, i) => `<td${cols[i].us ? ' class="us"' : ''}>${x}</td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>`;
  const cards = `<div class="t-cards t-cards-${cls}" role="region" aria-label="${esc(caption)}">
<ul class="tc-list">
${cols.map((c, i) => `<li class="tc${c.us ? ' us' : ''}">
<h3 class="tc-name">${c.name}</h3>
<dl>
${rows.map((r) => `<div class="tc-row"><dt>${r.label}</dt>\n<dd>${r.cells[i]}</dd></div>`).join('\n')}
</dl>
</li>`).join('\n')}
</ul>
</div>`;
  return `<p class="t-cap" aria-hidden="true">${esc(caption)}</p>\n${table}\n${cards}`;
}
// The currency note, above the price table. Said once: left out when the page's own words already say "not converted".
export function currencyNote(data) {
  const date = longDate(readDate(data.competitors)) || '19 November 2026';
  return `<p class="currency-note">Their prices as published in US dollars, not converted, read ${esc(date)}. Ours is in pounds.</p>`;
}
export function compareTable(data, { note = true } = {}) {
  const comps = competitorList(data.competitors);
  const o = data.offer;
  const date = longDate(readDate(data.competitors)) || '19 November 2026';
  const ours = hasPrices(o) ? `${offerLink(gbp(o.launch_gbp))} launch price, one-off` : '<span class="tbw">To be written</span>';
  const rows = [
    ['Price per month', ['price_month', 'price_per_month', 'monthly', 'per_month'], hasPrices(o) ? 'None from us: the price is one-off' : '<span class="tbw">To be written</span>'],
    ['First year', ['first_year_cost', 'first_year', 'year_one', 'price_first_year'], ours],
    ['Three years', ['three_year_cost', 'three_years', 'three_year', 'price_three_years'], ours],
  ].map(([label, keys, us]) => ({ label, cells: [us, ...comps.map((c) => factInner(c, keys, date))] }));
  const cols = [{ name: 'Website cell', us: true }, ...comps.map((c) => ({ name: compName(c) }))];
  return `${comps.length ? '' : tbw('the competitors (data/next/competitors.json)')}
${note && comps.length ? currencyNote(data) : ''}
${tableAndCards('compare', `What a site costs: our launch price against their published prices, read ${date}`, cols, rows)}
<div class="table-notes">${honestNotes(data)}</div>`;
}
export const FEATURE_ROWS = [
  ['Who owns the files', ['who_owns_the_files', 'owns_files', 'who_owns_files', 'ownership']],
  ['Can you leave, and how', ['can_you_leave', 'leave', 'exit', 'leaving']],
  ['Export', ['export']],
  ['Hosting choice', ['hosting_choice', 'hosting']],
  ['Editing', ['editing', 'edit']],
  ['Designs', ['designs', 'templates', 'design']],
  ['Security surface', ['security_surface', 'security', 'attack_surface']],
  ['Subscription', ['subscription']],
  ['Lock-in', ['lock_in_summary', 'lock_in', 'lockin']],
];
export function featuresTable(data) {
  const comps = competitorList(data.competitors);
  const date = longDate(readDate(data.competitors)) || '19 November 2026';
  const rows = FEATURE_ROWS.map(([label, keys]) => ({ label, cells: [ourInner(data, keys), ...comps.map((c) => factInner(c, keys, date))] }));
  const cols = [{ name: 'Website cell', us: true }, ...comps.map((c) => ({ name: compName(c) }))];
  return `${comps.length ? '' : tbw('the competitors (data/next/competitors.json)')}
${tableAndCards('features', `From their own pages, read ${date}`, cols, rows)}`;
}

// ---------- figures (next/figures/<id>.mjs) ----------
export async function loadFigures(root, data) {
  const dir = join(root, 'next/figures');
  const ids = new Set(FIGURE_IDS);
  if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith('.mjs') && !f.startsWith('_')) ids.add(f.slice(0, -4));
  const out = {};
  for (const id of ids) {
    const f = join(dir, `${id}.mjs`);
    if (!existsSync(f)) continue;
    try {
      const mod = await import(pathToFileURL(f).href + `?t=${Date.now()}`);
      const r = await mod.default(data);
      if (r && typeof r.svg === 'string') out[id] = r;
    } catch (e) { warn(`next/figures/${id}.mjs failed (${e.message}); shown as "to be written"`); }
  }
  return out;
}
// Text fallbacks for figures whose module is missing: the same information as a plain list from next/copy.json.
const FIG_FALLBACK = { 'brief-to-claude': 'steps', 'how-it-works': 'steps', team: 'team' };
export function figureFallback(copy, id) {
  const key = FIG_FALLBACK[id];
  const list = key ? asArray(get(copy, key)) : [];
  if (!list.length) return '';
  if (key === 'steps') return `<ol class="fig-list steps-list">\n${list.map((x) => typeof x === 'object'
    ? `<li><strong>${inline(get(x, 'title', 'name') || '')}</strong>${get(x, 'line', 'text') ? `: ${inline(get(x, 'line', 'text'))}` : ''}${get(x, 'who') ? ` <span class="who">(${inline(get(x, 'who'))})</span>` : ''}</li>`
    : `<li>${inline(x)}</li>`).join('\n')}\n</ol>`;
  const note = get(copy, 'team_note');
  return `<ul class="fig-list team-list">\n${list.map((x) => typeof x === 'object'
    ? `<li><strong>${inline(get(x, 'role', 'title', 'name') || '')}</strong>${get(x, 'does', 'line', 'text') ? `: ${inline(get(x, 'does', 'line', 'text'))}` : ''}</li>`
    : `<li>${inline(x)}</li>`).join('\n')}\n</ul>${typeof note === 'string' ? `\n<p class="team-note">${inline(note)}</p>` : ''}`;
}
export function figure(figs, id, caption) {
  const r = figs[id];
  if (!r) {
    const text = figureFallback(DATA && DATA.copy, id);
    if (text) return `<div class="fig fig-${esc(id)} fig-text">\n${text}\n</div>`;
    return `<figure class="fig fig-${esc(id)} fig-missing"><div class="tbw">To be written: the ${esc(id)} figure.</div></figure>`;
  }
  const cap = caption || r.caption || r.title || '';
  return `<figure class="fig fig-${esc(id)}">
${r.svg}
${r.text ? `<details><summary>Text version</summary>\n${r.text}\n</details>` : ''}
${cap ? `<figcaption>${inline(cap)}</figcaption>` : ''}
</figure>`;
}

// ---------- examples (next/examples.json) ----------
const exampleList = (e) => (Array.isArray(e) ? e : asArray(get(e, 'examples', 'items', 'sites'))).filter((x) => !/algarve[\s_-]*evolution/i.test(JSON.stringify(x)));
export function examples(data, root, { limit = Infinity, cls = 'examples' } = {}) {
  const list = exampleList(data.examples).slice(0, limit);
  if (!list.length) return tbw('the examples (next/examples.json)');
  return `<ul class="${cls}">\n${list.map((x) => {
    const title = get(x, 'title', 'name') || 'Example';
    const url = get(x, 'url', 'link', 'href');
    const kind = String(get(x, 'tag', 'kind', 'type', 'label') || '');
    const demo = /demo/i.test(kind) || x.demo === true;
    const own = !demo && /our own/i.test(kind);
    let img = get(x, 'screenshot', 'image', 'img', 'shot');
    if (img && typeof img === 'object') img = get(img, 'src', 'path');
    if (img && !/^https?:/.test(img)) img = '/' + String(img).replace(/^\/+/, '');
    const imgOk = img && !/^https?:/.test(img) && existsSync(join(root, img.slice(1)));
    const alt = get(x, 'alt', 'screenshot_alt') || `Screenshot of ${title}`;
    return `<li class="ex">
${imgOk ? `<img src="${esc(img)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="900" height="563">` : '<div class="ex-noimg tbw">Screenshot to be added</div>'}
<p class="tag ${demo ? 'demo' : own ? 'own' : 'owner'}">${demo ? 'Demo' : own ? 'Our own' : 'Made for an owner'}</p>
<h3>${url ? `<a href="${esc(url)}">${esc(title)}</a>` : esc(title)}</h3>
<p>${inline(get(x, 'what', 'description', 'summary') || '')}</p>
</li>`;
  }).join('\n')}\n</ul>`;
}

// ---------- FAQ (next/copy.json faq) ----------
export function faq(data, { limit = Infinity } = {}) {
  const list = asArray(get(data.copy, 'faq', 'questions')).slice(0, limit);
  if (!list.length) return tbw('the questions and answers (next/copy.json faq)');
  return `<div class="faq">\n${list.map((x) => `<details><summary>${inline(get(x, 'q', 'question', 'title') || '')}</summary>\n${prose(get(x, 'a', 'answer', 'text'))}\n</details>`).join('\n')}\n</div>`;
}

// ---------- deliverables ----------
export function deliverables(data, figs) {
  const list = asArray(get(data.copy, 'deliverables') ?? get(sectionOf(data.copy, 'what_you_get') || {}, 'items', 'deliverables'));
  const items = list.length ? `<ul class="deliverables">\n${list.map((x) => typeof x === 'object' ? `<li><strong>${inline(get(x, 'title', 'name') || '')}</strong> ${inline(get(x, 'text', 'what', 'detail') || '')}${get(x, 'why_it_matters') ? ` <span class="why">${inline(get(x, 'why_it_matters'))}</span>` : ''}</li>` : `<li>${inline(x)}</li>`).join('\n')}\n</ul>` : '';
  if (!figs.deliverables && !items) return tbw('what you get (next/copy.json deliverables, next/figures/deliverables.mjs)');
  return `${figs.deliverables ? figure(figs, 'deliverables') : ''}\n${items}`;
}

// ---------- home sections from copy.json ----------
export function lead(copy, n) {
  const d = DESIGNS[n - 1] || {};
  const l = get(get(copy, 'leads', 'first_screen_leads') || {}, d.slug || '-', d.name || '-', String(n), `d${n}`, `design${n}`, `design_${n}`)
    ?? get(asArray(get(copy, 'designs'))[n - 1] || {}, 'lead', 'first_screen')
    ?? get(get(copy, 'designs') || {}, String(n), `d${n}`);
  if (!l) return { headline: null, sub: null };
  if (typeof l === 'string') return { headline: l, sub: null };
  return { headline: get(l, 'headline', 'title', 'h1', 'lead'), sub: get(l, 'lede', 'sub', 'text', 'subhead', 'body'), primary: get(l, 'cta_primary'), secondary: get(l, 'cta_secondary') };
}
export const oneIdea = (copy) => {
  const v = get(copy, 'one_idea', 'idea', 'tagline');
  return typeof v === 'object' ? get(v, 'text', 'title') : v;
};
export function promises(copy, cls = 'promises') {
  const list = asArray(get(copy, 'promises', 'six_promises') ?? sectionOf(copy, 'promises'));
  if (!list.length) return tbw('the six promises (next/copy.json promises)');
  return `<ol class="${cls}">\n${list.map((x) => typeof x === 'object'
    ? `<li><h3>${inline(get(x, 'title', 'name', 'promise') || '')}</h3>${prose(get(x, 'line', 'text', 'body', 'detail'))}${get(x, 'proof') ? `<p class="proof">${inline(get(x, 'proof'))}${get(x, 'proof_link') ? ` <a href="${esc(get(x, 'proof_link'))}">The proof</a>.` : ''}</p>` : ''}</li>`
    : `<li><h3>${inline(x)}</h3></li>`).join('\n')}\n</ol>`;
}
// A section: title and text from copy (copy.sections.<key> or copy.<key>), with optional extra html after the text.
export function section(copy, keys, { id, fallbackTitle, extra = '', cls = '' } = {}) {
  const s = sectionOf(copy, ...keys);
  const obj = typeof s === 'string' ? { text: s } : s || {};
  const title = get(obj, 'title', 'heading', 'h2');
  const text = get(obj, 'text', 'body', 'intro', 'lead', 'paragraphs');
  const items = asArray(get(obj, 'items', 'points'));
  return `<section class="sec ${cls}" id="${esc(id || slug(keys[0]))}">
<h2>${title ? inline(title) : esc(fallbackTitle || keys[0])}</h2>
${text ? prose(text) : tbw(`the words for "${fallbackTitle || keys[0]}" (next/copy.json ${keys[0]})`)}
${items.length ? `<ul>\n${items.map((x) => `<li>${inline(typeof x === 'object' ? [get(x, 'title'), get(x, 'text')].filter(Boolean).join(': ') : x)}</li>`).join('\n')}\n</ul>` : ''}
${extra}
</section>`;
}

// ---------- the shell ----------
const MARK = '<svg class="mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect x="4" y="4" width="24" height="24" rx="7" fill="none" stroke="currentColor" stroke-width="3" opacity=".45"/><rect x="11" y="11" width="10" height="10" rx="3" fill="currentColor"/></svg>';
export function shell({ path, title, description, css = [], body, bodyClass = '' }) {
  const nav = NAV.map(([t, h]) => `<li><a href="${h}"${h === path || (h === '/next/' && path.startsWith('/next/d/')) ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}: AgentiCCells preview</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/next/base.css">
<link rel="stylesheet" href="/assets/next/tables.css">
<link rel="stylesheet" href="/assets/next/shell.css">
${css.map((c) => `<link rel="stylesheet" href="${c}">`).join('\n')}
</head>
<body class="nx ${esc(bodyClass)}">
<a class="skip" href="#main">Skip to the content</a>
<header class="nx-top">
<div class="preview-band" role="note" aria-label="Preview"><p><strong>Preview</strong> for review, not the live site. Prices and words may change. <a href="/next/">All five designs</a> <a href="/">The live site</a></p></div>
<div class="nx-head"><div class="in">
<a class="brand" href="/next/">${MARK}<span>AgentiCCells</span><span class="vh"> preview: the five designs</span></a>
<nav aria-label="Preview pages"><ul>${nav}</ul></nav>
</div></div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="nx-foot"><div class="in">
<p>Code under Apache-2.0. Text and images under CC BY 4.0.</p>
<p><a href="${ASK}">How to ask us</a>: the live Start here page has the way to reach the team.</p>
<p>This is a preview for review. It is not indexed, and the live site at <a href="/">agenticcells.ai</a> is unchanged.</p>
</div></footer>
</body>
</html>
`;
}

// ---------- the home page's blocks, in the order of the brief; each design arranges and dresses them ----------
// h = { data, figs, root }. Returns an object of html strings, one per home section.
export function homeBlocks({ data, figs, root }) {
  const c = data.copy;
  const sec = (keys, title, extra, cls) => section(c, keys, { fallbackTitle: title, extra, cls });
  return {
    promises: `<section class="sec promises-sec" id="promises">
<h2>${inline(get(sectionOf(c, 'promises_section') || {}, 'title') || get(sectionOf(c, 'promises') || {}, 'title') || 'Six promises')}</h2>
${typeof sectionOf(c, 'promises') === 'string' ? `<p>${inline(sectionOf(c, 'promises'))}</p>` : prose(get(sectionOf(c, 'promises') || {}, 'text', 'body', 'intro'))}
${promises(c)}
</section>`,
    tenets: sec(['tenets'], 'What we hold to', figure(figs, 'tenets'), 'with-fig'),
    whatYouGet: sec(['deliverables', 'what_you_get'], 'What you get', deliverables(data, figs) + '\n<p class="more"><a href="/next/what-you-get/">Everything you get</a></p>', 'with-fig'),
    rentOrOwn: sec(['rent_or_own'], 'Rent or own', figure(figs, 'rent-or-own') + '\n<p class="more"><a href="/next/compare/">Compare with the platforms</a></p>', 'with-fig'),
    canYouLeave: sec(['can_you_leave', 'leave'], 'Can you leave?', figure(figs, 'can-you-leave') + '\n<p class="more"><a href="/next/no-lock-in/">No lock-in</a></p>', 'with-fig'),
    briefToClaude: sec(['brief_to_claude', 'steps'], 'From brief to your own Claude', figure(figs, 'brief-to-claude') + '\n<p class="more"><a href="/next/how-it-works/">How it works</a></p>', 'with-fig'),
    price: sec(['offer', 'price'], 'The price', offerBlock(data) + '\n<p class="more"><a href="/next/pricing/">Pricing in full</a></p>', 'price-sec'),
    examples: sec(['examples'], 'Examples', examples(data, root, { limit: 4, cls: 'examples strip' }) + '\n<p class="more"><a href="/next/examples/">All the examples</a></p>', 'examples-sec'),
    team: sec(['team'], 'The team', figure(figs, 'team'), 'with-fig'),
    faq: sec(['faq'], 'Questions', faq(data, { limit: 3 }) + '\n<p class="more"><a href="/next/faq/">All the questions</a></p>', 'faq-sec'),
    final: `<section class="sec final" id="ask">
<h2>${inline(oneIdea(c) || 'Ask for your site')}</h2>
${cta(c, { primary: get(get(c, 'cta') || {}, 'interview'), secondary: get(get(c, 'cta') || {}, 'free_evaluation') })}
</section>`,
  };
}

// The first screen's words for design n: { h1, sub, kicker } with visible placeholders when copy.json lacks them.
export function firstScreen(copy, n, name) {
  const l = lead(copy, n);
  const idea = oneIdea(copy);
  return {
    primary: l.primary, secondary: l.secondary,
    h1: l.headline ? inline(l.headline) : esc(name),
    sub: (l.sub ? prose(l.sub) : '') + (l.headline ? '' : tbw(`the first-screen lead for ${name} (next/copy.json leads)`)),
    // The one idea as a kicker, unless the lead already says it word for word.
    kicker: !idea ? tbw('the one idea (next/copy.json one_idea)') : norm(idea) === norm(l.headline || '') ? '' : `<p class="kicker">${inline(idea)}</p>`,
  };
}

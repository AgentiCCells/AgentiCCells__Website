// The designer's shared helpers for the /next/ home designs (round 2). parts.mjs stays the developer's; this file adds
// what the designs need on top of it: example tiles labelled by kind, platform price bars and a compare teaser read
// from data/next/competitors.json, a large price line, a "what you get" block without the doubled list, and the
// chooser thumbnails. Every figure in the main text sits inside, or in the same sentence as, its source link.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19. Code under Apache-2.0.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { esc, inline, get, section, figure, OFFER_URL, longDate, gbp, safeHref } from './parts.mjs';
import { exLabel, offerTitle } from './labels.mjs';

// ---------- examples (next/examples.json) ----------
export function exampleList(data) {
  const e = data.examples;
  const list = Array.isArray(e) ? e : (e && Array.isArray(e.examples) ? e.examples : []);
  return list.filter((x) => !/algarve[\s_-]*evolution/i.test(JSON.stringify(x)));
}
// The label, exactly by kind, now lives in labels.mjs (shared with parts.mjs without a circular import).
export { exLabel };
// The title without a trailing "(Demo)": the label already says it.
export const exTitle = (x) => String(x.title || 'Example').replace(/\s*\(Demo\)\s*$/i, '');
export const exHost = (x) => { try { return new URL(x.url).hostname.replace(/^www\./, ''); } catch { return ''; } };
function img(x, root, eager) {
  const src = x.screenshot ? '/' + String(x.screenshot).replace(/^\/+/, '') : '';
  if (!src || !existsSync(join(root, src.slice(1)))) return '<span class="kx-noimg">Screenshot to be added</span>';
  return `<img src="${esc(src)}" alt="${esc(`The first screen of ${exTitle(x)}`)}" width="1100" height="688" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
// One example: a browser frame with the address, the screenshot, the label on the image, and a caption.
// variant: 'frame' (browser chrome), 'plain' (image and caption), 'bare' (image and label only).
export function exTile(x, root, { eager = false, variant = 'frame', caption = true, cls = '' } = {}) {
  const l = exLabel(x);
  const host = exHost(x);
  const href = safeHref(x.url); // http(s), "/" or "#" only (round 4); anything else is shown without a link
  const chrome = variant === 'frame' ? `<span class="kx-bar" aria-hidden="true"><i></i><i></i><i></i><span class="kx-url">${esc(host)}</span></span>` : '';
  return `<li class="kx kx-${variant} ${cls}">
${href ? `<a class="kx-shot" href="${esc(href)}">` : '<span class="kx-shot">'}${chrome}<span class="kx-img">${img(x, root, eager)}<span class="kx-tag kx-${l.cls}">${esc(l.text)}</span></span>${href ? '</a>' : '</span>'}
${caption ? `<p class="kx-cap">${href ? `<a href="${esc(href)}">${esc(exTitle(x))}</a>` : esc(exTitle(x))} <span>${inline(x.what || '')}</span></p>` : ''}
</li>`;
}
// A list of examples. slugs: the order to show first; limit: how many; eager: how many load at once.
export function exGrid(data, root, { slugs = [], limit = Infinity, eager = 0, variant = 'frame', cls = 'kx-grid', caption = true, tileCls = () => '' } = {}) {
  const all = exampleList(data);
  const first = slugs.map((s) => all.find((x) => x.slug === s)).filter(Boolean);
  const list = [...first, ...all.filter((x) => !first.includes(x))].slice(0, limit);
  if (!list.length) return '<p class="tbw">To be written: the examples (next/examples.json).</p>';
  return `<ul class="${cls}">\n${list.map((x, i) => exTile(x, root, { eager: i < eager, variant, caption, cls: tileCls(x, i) })).join('\n')}\n</ul>`;
}
// The named owners first, then a mix of our own and demos, so a wall does not open with five news sites in a row.
export function wallOrder(data) {
  const all = exampleList(data);
  const owner = all.filter((x) => exLabel(x).cls === 'owner');
  const demo = all.filter((x) => exLabel(x).cls === 'demo');
  const own = all.filter((x) => exLabel(x).cls === 'own');
  const out = [...owner];
  while (demo.length || own.length) { if (demo.length) out.push(demo.shift()); if (own.length) out.push(own.shift()); }
  return out.map((x) => x.slug);
}
export const OWNERS = (data) => exampleList(data).filter((x) => exLabel(x).cls === 'owner').map((x) => x.slug);
export const exampleCount = (data) => exampleList(data).length;
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
export const inWords = (n) => WORDS[n] || 'many';

// ---------- the platforms (data/next/competitors.json) ----------
const comps = (data) => (data.competitors && Array.isArray(data.competitors.competitors) ? data.competitors.competitors : []);
const factOf = (c, k) => {
  const f = c && c.facts && c.facts[k];
  if (!f) return null;
  return typeof f === 'object' ? f : { value: f };
};
const usd = (v) => { const m = /\b(USD|GBP|EUR)\s?([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?)/.exec(String(v || '')); return m ? { cur: m[1], n: Number(m[2].replace(/,/g, '')), text: `${m[1]} ${m[2]}` } : null; };
// One platform: name, its monthly price, its three-year cost and its answer to "can I leave?", each with source and date.
export function platform(data, id) {
  const c = comps(data).find((x) => x.id === id);
  if (!c) return null;
  const pack = (k) => { const f = factOf(c, k); return f ? { value: String(f.value ?? ''), quote: f.quote || '', url: f.source_url || '', read: longDate(f.date_read || '') } : null; };
  const three = pack('three_year_cost');
  const month = pack('price_per_month');
  return { id, name: c.name, month, three, threeN: three && usd(three.value), monthN: month && usd(month.value), leave: pack('can_you_leave'), owns: pack('who_owns_the_files') };
}
export const RENTERS = ['wix', 'squarespace', 'wordpress-com', 'framer', 'durable', 'fliplet'];
const rest = (value, lead) => esc(String(value).replace(lead, '').replace(/^[,;\s]+/, ''));
// Horizontal bars: what three years of each platform's entry plan costs, as published (USD, not converted).
// Each amount is the link to the platform's own price page, so the figure carries its evidence.
export function threeYearBars(data, { ids = RENTERS, cls = 'kb' } = {}) {
  const rows = ids.map((id) => platform(data, id)).filter((p) => p && p.threeN && /^https?:/.test(p.three.url));
  if (!rows.length) return '<p class="tbw">To be written: the platforms\' published prices (data/next/competitors.json).</p>';
  rows.sort((a, b) => b.threeN.n - a.threeN.n);
  const max = Math.max(...rows.map((r) => r.threeN.n));
  const read = rows[0].three.read;
  return `<ol class="${cls}" aria-label="Three years of each platform's entry plan, from its own price page">
${rows.map((r) => `<li style="--w:${Math.max(6, Math.round((r.threeN.n / max) * 100))}%"><span class="kb-name">${esc(r.name)}</span><span class="kb-bar" aria-hidden="true"></span><span class="kb-v"><a href="${esc(r.three.url)}">${esc(r.threeN.text)}</a> <span class="kb-plan">${rest(r.three.value, r.threeN.text)}</span></span></li>`).join('\n')}
</ol>
<p class="kb-note">Three years of one entry plan each, calculated from the platforms' own price pages, read ${esc(read)}, in US dollars as published and not converted.</p>`;
}
// A small table: price, three years and "can you leave?" for three platforms and our offer (labelled copy.offer_title).
export function compareTeaser(data, { ids = ['wix', 'squarespace', 'wordpress-com'], cls = 'kt' } = {}) {
  const rows = ids.map((id) => platform(data, id)).filter(Boolean);
  const o = data.offer || {};
  const cell = (f, lead, l) => (f && /^https?:/.test(f.url) ? `<td data-l="${l}">${lead ? `<a href="${esc(f.url)}">${esc(lead.text)}</a> ${rest(f.value, lead.text)}` : `${esc(f.value)} <a class="kt-src" href="${esc(f.url)}">their page</a>`}</td>` : `<td data-l="${l}"><span class="tbw">To be written</span></td>`);
  return `<div class="tw kt-wrap" tabindex="0" role="region" aria-label="Rent or own: three platforms"><table class="t ${cls}">
<caption class="vh">Rent or own: our launch price against three platforms' own pages</caption>
<thead><tr><th scope="col"></th><th scope="col">A month</th><th scope="col">Three years</th><th scope="col">Can you leave with the site?</th></tr></thead>
<tbody>
<tr class="kt-us"><th scope="row">${esc(offerTitle(data.copy))}</th><td data-l="A month">Nothing to us</td><td data-l="Three years"><strong><a href="${OFFER_URL}">£${esc(o.launch_gbp)}</a></strong> once, launch price</td><td data-l="Can you leave">Yes: the files are yours, copy them to any host</td></tr>
${rows.map((p) => `<tr><th scope="row">${esc(p.name)}</th>${cell(p.month, p.monthN, 'A month')}${cell(p.three, p.threeN, 'Three years')}${cell(p.leave, null, 'Can you leave')}</tr>`).join('\n')}
</tbody></table></div>`;
}
// The leaving answers in the platforms' own words: quote, platform, link.
export function leaveQuotes(data, { ids = ['wix', 'squarespace', 'fliplet'], cls = 'kq' } = {}) {
  const rows = ids.map((id) => platform(data, id)).filter((p) => p && p.leave && p.leave.quote && /^https?:/.test(p.leave.url));
  return `<ul class="${cls}">\n${rows.map((p) => `<li><blockquote><p>"${esc(p.leave.quote)}"</p></blockquote><p class="kq-who">${esc(p.name)}, <a href="${esc(p.leave.url)}">their own page</a>, read ${esc(p.leave.read)}</p></li>`).join('\n')}\n</ul>`;
}

// ---------- the price, large ----------
// One line, so "launch price" sits on the same line as the £ (validator), with the offer file's link on the figure.
export function bigPrice(data, { cls = 'kp', once = 'once' } = {}) {
  const o = data.offer || {};
  if (!Number.isFinite(o.launch_gbp)) return '<p class="tbw">To be written: the launch price (data/next/offer.json).</p>';
  // The usual and the earlier launch price, both struck, as d1, d2 and /next/pricing/ show them (round 4).
  const was = [Number.isFinite(o.usual_gbp) ? `usually <s>${gbp(o.usual_gbp)}</s>` : '', Number.isFinite(o.earlier_launch_gbp) ? `earlier launch price <s>${gbp(o.earlier_launch_gbp)}</s>` : ''].filter(Boolean).join(', ');
  return `<p class="${cls}"><strong><a href="${OFFER_URL}">${gbp(o.launch_gbp)}</a></strong> <span class="kp-w">${esc(once)}, launch price</span>${was ? ` <span class="kp-was">${was}</span>` : ''}</p>`;
}

// ---------- what you get: the figure and the section words, without the doubled list ----------
export function whatYouGet(h, { cls = 'with-fig' } = {}) {
  return section(h.data.copy, ['deliverables', 'what_you_get'], { fallbackTitle: 'What you get', cls, extra: `${figure(h.figs, 'deliverables')}\n<p class="more"><a href="/next/what-you-get/">Everything you get</a></p>` });
}
// A section with one figure, for any figure id, with the words from copy.sections.<key>.
export function figSection(h, key, id, title, { cls = 'with-fig', more = '' } = {}) {
  return section(h.data.copy, [key], { fallbackTitle: title, cls, extra: `${figure(h.figs, id)}${more ? `\n<p class="more">${more}</p>` : ''}` });
}

export { get };

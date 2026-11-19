// Figure: the cells we sell, smallest to largest, as a staircase. Words from next/copy.json cells_we_sell[]
// {id, name, size, price}; prices only from data files: "500" / "1500" / "5000" / "20000" are rungs of data/cells.json
// (first proposal; Dinis, 2026-11-19 ~17:55 UTC), "launch" is data/next/offer.json launch_gbp (launch price), "ask" is
// "Ask us, priced for each engagement".
// Each price and its mark sit in one <text> element on one line of the page, so the validator sees them together.
// Without copy.cells_we_sell the figure is not drawn (the page shows "to be written"), so no words are invented.
// Data: copy.figures.ladder.{title, lead, small, large} (optional).
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round R1). Code under Apache-2.0.
import { esc, get, fromCopy, para, text, rect, line, svgOpen, wrapFigure, SIZE, mdPlain, OFFER_URL } from './_shared.mjs';

const ID = 'ladder';
const gbp = (n) => '£' + Number(n).toLocaleString('en-GB');

// { main, mark, was } for a cell's price; null where the data is missing.
const CELLS_URL = 'https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/cells.json';
const num = (v) => Number(String(v ?? '').replace(/[^\d]/g, ''));
const rungsOf = (cells) => (cells && Array.isArray(cells.cells) ? cells.cells : []).filter((x) => x && x.name && num(x.price) > 0);
function priceOf(offer, price, cells) {
  const o = offer || {};
  const p = String(price ?? '').trim().toLowerCase();
  if (p === 'launch' && Number.isFinite(o.launch_gbp)) {
    const was = [Number.isFinite(o.usual_gbp) ? `usually ${gbp(o.usual_gbp)}` : '', Number.isFinite(o.earlier_launch_gbp) ? `earlier launch price ${gbp(o.earlier_launch_gbp)}` : ''].filter(Boolean).join(', ');
    return { main: gbp(o.launch_gbp), mark: 'launch price', was, kind: 'launch' };
  }
  if (/^[£\d,]+$/.test(p) && num(p) > 0) {
    const r = rungsOf(cells).find((x) => num(x.price) === num(p));
    if (r) return { main: gbp(num(r.price)), mark: 'first proposal', was: '', kind: 'proposal', url: CELLS_URL };
    const b = (Array.isArray(o.bigger) ? o.bigger : []).find((x) => Number(x.price_gbp) === num(p));
    return b ? { main: gbp(b.price_gbp), mark: 'first proposal', was: '', kind: 'proposal', url: OFFER_URL } : null;
  }
  if (p === 'ask') return { main: 'Ask us', mark: 'priced for each engagement', was: '', kind: 'ask' };
  return null;
}

export default function (data = {}) {
  const copy = data.copy || {};
  // The writer's cells_we_sell, else the rungs of data/cells.json as they stand (name and price only).
  let list = Array.isArray(copy.cells_we_sell) ? copy.cells_we_sell.filter((x) => x && x.name) : [];
  if (!list.length) list = rungsOf(data.cells).map((r) => ({ name: r.name, price: String(num(r.price)) }));
  if (!list.length) return null;
  const rungs = list.map((x) => ({ name: mdPlain(x.name), size: mdPlain(x.size || ''), p: priceOf(data.offer, x.price, data.cells) }));
  const title = fromCopy(copy, ID, 'title', 'Smallest to largest');
  const sizes = ['', 'one size', 'two sizes', 'three sizes', 'four sizes', 'five sizes', 'six sizes'][rungs.length] || 'several sizes';
  const lead = fromCopy(copy, ID, 'lead', `The same kind of team, at ${sizes}.`);
  const small = fromCopy(copy, ID, 'small', 'Smallest');
  const large = fromCopy(copy, ID, 'large', 'Largest');
  const priceWords = (p) => (p ? `${p.main}${p.mark ? ` ${p.mark}` : ''}${p.was ? ` (${p.was})` : ''}` : 'price to be written');
  const desc = `${title}. ${lead} ${rungs.map((r, i) => `${i === 0 ? small : i === rungs.length - 1 ? large : 'Then'}: ${r.name}${r.size ? `, ${r.size}` : ''}, ${priceWords(r.p)}.`).join(' ')}`;

  // ---------- wide (960): a staircase, bottoms aligned ----------
  const s = SIZE.w, W = 960, gap = 16, k = rungs.length;
  const cw = (W - gap * (k - 1)) / k;
  const inner = cw - 32;
  const parts = rungs.map((r) => {
    const nm = para(0, 0, r.name, inner, s.m, 'b z-m', 27, 'start', true);
    const sz = r.size ? para(0, 0, r.size, inner, s.xs, 'z-xs t-m', 24) : { height: 0 };
    const was = r.p && r.p.was ? para(0, 0, r.p.was, inner, s.xs, 'z-xs t-m', 22) : { height: 0 };
    const mark = r.p && r.p.mark ? 26 : 0;
    return { nm, sz, was, content: 28 + nm.height + (r.size ? sz.height + 6 : 0) + 46 + mark + (was.height ? was.height + 6 : 0) + 18 };
  });
  const base = Math.max(...parts.map((p) => p.content));
  const step = 40;
  const tallest = base + step * (k - 1);
  const y0 = 104;
  const yb = y0 + tallest;
  let w = text(0, 40, title, 'b z-l', 0) + text(0, 74, lead, 't-m z-m', 0);
  rungs.forEach((r, i) => {
    const x = i * (cw + gap), h = base + step * i, y = yb - h;
    const p = parts[i];
    const main = i === 0;
    w += rect(x, y, cw, h, main ? 'f-tint' : 'f-bg', 12) + rect(x, y, cw, h, main ? 's-acc' : 's-line', 12);
    w += rect(x, y, cw, 6, main ? 'f-acc' : 'f-line', 3);
    let ty = y + 28 + 18;
    w += para(x + 16, ty, r.name, inner, s.m, 'b z-m', 27, 'start', true).svg;
    ty += p.nm.height;
    if (r.size) { w += para(x + 16, ty, r.size, inner, s.xs, 'z-xs t-m', 24).svg; ty += p.sz.height + 6; }
    ty += 26;
    if (r.p) {
      // The price and its mark: one <text>, one line of html.
      w += `<text class="b z-xl${main ? ' t-a' : ''}" x="${x + 16}" y="${ty}"><tspan x="${x + 16}">${esc(r.p.main)}</tspan>${r.p.mark ? `<tspan class="sb z-xs t-m" x="${x + 16}" dy="26">${esc(r.p.mark)}</tspan>` : ''}</text>`;
      ty += r.p.mark ? 26 : 0;
      if (r.p.was) w += para(x + 16, ty + 26, r.p.was, inner, s.xs, 'z-xs t-m', 22).svg;
    } else w += text(x + 16, ty, 'Price to be written', 'i z-xs t-w', 0);
  });
  // The axis: smallest to largest.
  const ay = yb + 34;
  w += line(0, yb + 12, W, yb + 12, 's-muted', 2) + `<path class="f-muted" d="M${W} ${yb + 12} L${W - 12} ${yb + 5} L${W - 12} ${yb + 19} Z"/>`;
  w += text(0, ay, small, 'sb z-xs t-m', 0) + text(W, ay, large, 'sb z-xs t-m', 0, 'end');
  const wide = svgOpen(ID, 'w', ay + 8, title, desc) + '\n' + w;

  // ---------- narrow (400): rows that grow wider, smallest first ----------
  const N = 400, n = SIZE.n;
  const tl = para(0, 26, title, N, n.xl, 'b z-xl', 28, 'start', true);
  let v = tl.svg;
  let y = 26 + tl.height - 28 + 24;
  const ld = para(0, y, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  y += ld.height + 10;
  const minW = 250;
  rungs.forEach((r, i) => {
    const bw = k > 1 ? minW + ((N - minW) * i) / (k - 1) : N;
    const iw = bw - 28;
    const nm = para(14, 0, r.name, iw, n.l, 'b z-l', 23, 'start', true);
    const sz = r.size ? para(14, 0, r.size, iw, n.s, 'z-s t-m', 19) : { height: 0 };
    const was = r.p && r.p.was ? para(14, 0, r.p.was, iw, n.s, 'z-s t-m', 19) : { height: 0 };
    const h = 30 + nm.height + (r.size ? sz.height + 4 : 0) + 30 + (r.p && r.p.mark ? 21 : 0) + (was.height ? was.height + 4 : 0) + 10;
    const main = i === 0;
    v += rect(0, y, bw, h, main ? 'f-tint' : 'f-bg', 10) + rect(0, y, bw, h, main ? 's-acc' : 's-line', 10) + rect(0, y, 6, h, main ? 'f-acc' : 'f-line', 3);
    let ty = y + 30;
    v += para(14, ty, r.name, iw, n.l, 'b z-l', 23, 'start', true).svg;
    ty += nm.height;
    if (r.size) { v += para(14, ty, r.size, iw, n.s, 'z-s t-m', 19).svg; ty += sz.height + 4; }
    ty += 24;
    if (r.p) {
      v += `<text class="b z-xl${main ? ' t-a' : ''}" x="14" y="${ty}"><tspan x="14">${esc(r.p.main)}</tspan>${r.p.mark ? `<tspan class="sb z-s t-m" x="14" dy="21">${esc(r.p.mark)}</tspan>` : ''}</text>`;
      ty += r.p.mark ? 21 : 0;
      if (r.p.was) v += para(14, ty + 21, r.p.was, iw, n.s, 'z-s t-m', 19).svg;
    } else v += text(14, ty, 'Price to be written', 'i z-s t-w', 0);
    y += h + 10;
  });
  const narrow = svgOpen(ID, 'n', y, title, desc) + '\n' + v;

  // ---------- text version: a table; each price with its mark in one cell, on one line ----------
  const cell = (p) => (!p ? '<em>Price to be written</em>'
    : p.kind === 'ask' ? 'Priced for each engagement: <a href="/next/start/">ask us</a>'
      : `<a href="${p.url || OFFER_URL}">${esc(p.main)}</a>, ${esc(p.mark)}${p.was ? ` (${p.was.replace(/(£[\d,]+)/g, '<s>$1</s>')})` : ''}`);
  const textHtml = [
    `<p>${esc(title)}. ${esc(lead)} Prices from <a href="${CELLS_URL}">the ladder file</a>.</p>`,
    '<table class="t"><thead><tr><th scope="col">Cell</th><th scope="col">Size</th><th scope="col">Price</th></tr></thead><tbody>',
    ...rungs.map((r) => `<tr><th scope="row">${esc(r.name)}</th><td>${esc(r.size) || '<em>To be written</em>'}</td><td>${cell(r.p)}</td></tr>`),
    '</tbody></table>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

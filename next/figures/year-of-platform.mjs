// Figure: three years of a platform against one payment you keep.
// Cumulative cost over three years: one plan per competitor, from its published price, against the website cell's launch price.
// Data: competitors.competitors[].facts.price_per_month (or another price row; value such as "USD 17 a month, billed yearly,
// plan Light", source_url, date_read), facts.currency_note (optional), offer.launch_gbp.
// Rules: never a guess and never a converted number. Each currency gets its own panel and its own axis, labelled
// "as published, not converted". A competitor with no parseable price is a hatched "not yet confirmed" bar.
// Our launch price is shown as one payment and nothing after it, not as a bar on another currency's axis.
import { esc, get, fromCopy, para, text, rect, svgOpen, wrapFigure, SIZE, launch, longDate, OFFER_URL, TBC, DEFAULT_READ } from './_shared.mjs';

const ID = 'year-of-platform';
const WANT = [['wix', 'Wix'], ['squarespace', 'Squarespace'], ['fliplet', 'Fliplet']];
const PRICE_KEYS = ['price_per_month', 'price', 'price_month', 'monthly_price', 'price_monthly', 'entry_price', 'cheapest_plan', 'plan_price', 'price_per_year', 'price_year', 'annual_price'];
const SHADE = [0.85, 0.55, 0.3];

// Parse "GBP 16 a month", "GBP 192 a year", "USD 25/month", "USD 17 a month, billed yearly, plan Light".
// The first amount wins: "USD 19 a month billed yearly, or USD 25 a month billed monthly" reads as USD 19 a month.
export function parsePrice(value) {
  const s = String(value ?? '');
  const m = /\b(GBP|EUR|USD|CAD|AUD)\s?([0-9]+(?:[.,][0-9]{1,2})?)/i.exec(s);
  if (!m) return null;
  const amount = Number(m[2].replace(',', '.'));
  const rest = s.slice(m.index + m[0].length).split(/\bor\b|;/)[0];
  // "a month, billed yearly" is a monthly price; "a year" alone is a yearly one.
  const period = /month|\/\s?mo\b|\bpm\b/i.test(rest) ? 'month' : /year|annum|\/\s?yr\b|annual/i.test(rest) ? 'year' : null;
  if (!period || !Number.isFinite(amount)) return null;
  return { currency: m[1].toUpperCase(), amount, period, perYear: period === 'year' ? amount : amount * 12 };
}

function priceFact(c) {
  const f = (c && c.facts) || {};
  const keys = [...PRICE_KEYS.filter((k) => f[k]), ...Object.keys(f).filter((k) => /price|cost/i.test(k) && !/first_year|three_year/.test(k) && !PRICE_KEYS.includes(k))];
  for (const k of keys) {
    const fact = f[k];
    const v = fact && typeof fact === 'object' ? fact.value : fact;
    const p = parsePrice(v);
    if (p) return { ...p, fact: typeof fact === 'object' ? fact : { value: v } };
  }
  return null;
}

const money = (n) => (Math.round(n * 100) / 100).toLocaleString('en-GB', { maximumFractionDigits: 2 });
const niceMax = (max) => { const e = 10 ** Math.floor(Math.log10(max)); const m = max / e; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * e; };

export function series(data) {
  const all = get(data, 'competitors.competitors', []);
  const list = Array.isArray(all) ? all : [];
  return WANT.map(([id, name]) => {
    const c = list.find((x) => String(x.id || '').toLowerCase() === id || String(x.name || '').toLowerCase() === id);
    const p = priceFact(c);
    const fact = (p && p.fact) || {};
    const url = /^https?:\/\//.test(fact.source_url || '') ? fact.source_url : '';
    const ok = !!(p && url);
    return {
      name: (c && c.name) || name,
      ok,
      currency: ok ? p.currency : null,
      value: fact.value ? String(fact.value) : '',
      url,
      read: fact.date_read ? longDate(fact.date_read) : '',
      note: get(c, 'facts.currency_note.value', ''),
      years: ok ? [1, 2, 3].map((y) => p.perYear * y) : null,
    };
  });
}

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'Three years of a platform, or one payment you keep');
  const rows = series(data);
  const lp = launch(data.offer);
  const readDates = [...new Set(rows.map((r) => r.read).filter(Boolean))];
  const readOn = readDates.length === 1 ? readDates[0] : DEFAULT_READ;
  const label = `Calculated from their published prices, read ${readOn}. One plan each, before tax, if the price stays the same.`;
  const cellName = 'The website cell';
  const cellLabel = lp ? `£${money(lp.gbp)} once, launch price` : `Launch price ${TBC}`;
  const currencies = [...new Set(rows.filter((r) => r.ok).map((r) => r.currency))].sort((a, b) => (a === 'GBP' ? -1 : b === 'GBP' ? 1 : a.localeCompare(b)));
  const missing = rows.filter((r) => !r.ok);
  const rowText = (r) => (r.ok ? `${r.currency} ${money(r.years[0])} after one year, ${r.currency} ${money(r.years[2])} after three years` : 'price not yet confirmed');
  const desc = `${title}. ${rows.map((r) => `${r.name}: ${rowText(r)}.`).join(' ')} ${cellName}: ${cellLabel}, nothing more in year two or year three. ${label}${currencies.some((c) => c !== 'GBP') ? ' Prices published in another currency are shown as published, not converted.' : ''}`;

  const draw = (v) => {
    const wide = v === 'w';
    const s = SIZE[v], W = wide ? 960 : 400;
    const BX = wide ? 200 : 0, BW = W - BX;
    const bh = wide ? 40 : 30;
    let out = `<defs><pattern id="${ID}-${v}-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" class="f-soft"/><line x1="0" y1="0" x2="0" y2="10" class="s-muted" style="stroke-width:3px;stroke-opacity:.45"/></pattern></defs>`;
    const tl = para(0, wide ? 40 : 26, title, W, wide ? s.l : s.xl, `b ${wide ? 'z-l' : 'z-xl'}`, wide ? 34 : 28, 'start', true);
    out += tl.svg;
    let y = (wide ? 40 : 26) + tl.height - (wide ? 34 : 28) + (wide ? 34 : 26);
    const lb = para(0, y, label, W, s.s, 'z-s t-m', wide ? 26 : 19);
    out += lb.svg;
    y += lb.height + 6;
    // Legend: the three shades of a bar.
    const sw = wide ? 22 : 16;
    let lx = 0;
    ['Year one', 'Year two', 'Year three'].forEach((t, i) => {
      out += `<rect class="f-muted" style="fill-opacity:${SHADE[i]}" x="${lx}" y="${y}" width="${sw}" height="${sw}" rx="4"/>`;
      out += text(lx + sw + 8, y + sw - 4, t, 'z-s t-m', 0);
      lx += sw + 8 + t.length * (s.s * 0.52) + (wide ? 28 : 14);
    });
    y += sw + (wide ? 26 : 18);

    const nameAt = (r, yy, accent = false) => (wide ? text(0, yy + bh / 2 + 7, r.name, `b z-m${accent ? ' t-a' : ''}`, 0) : text(0, yy + 16, r.name, `b z-m${accent ? ' t-a' : ''}`, 0));

    // One panel per currency, each with its own axis.
    currencies.forEach((cur) => {
      const group = rows.filter((r) => r.ok && r.currency === cur);
      const nice = niceMax(Math.max(...group.map((r) => r.years[2])));
      const scale = (n) => (n / nice) * BW;
      const head = cur === 'GBP' ? 'In GBP, as published' : `In ${cur}, as published, not converted`;
      out += text(wide ? BX : 0, y + (wide ? 20 : 16), head, 'sb z-s t-m', 0);
      y += wide ? 34 : 26;
      const top = y;
      let bars = '';
      group.forEach((r) => {
        const ly = wide ? y : y + 24;
        bars += nameAt(r, y);
        let x0 = BX;
        bars += `<rect class="f-bg" x="${BX}" y="${ly}" width="${scale(r.years[2])}" height="${bh}"/>`;
        r.years.forEach((c, i) => {
          const x1 = BX + scale(c);
          bars += `<rect class="f-muted" style="fill-opacity:${SHADE[i]}" x="${x0}" y="${ly}" width="${Math.max(x1 - x0 - 2, 1)}" height="${bh}" rx="4"/>`;
          x0 = x1;
        });
        const endX = BX + scale(r.years[2]);
        const lbl = `${cur} ${money(r.years[2])}`;
        if (!wide) bars += text(W, y + 16, `${lbl} in three years`, 'b z-s', 0, 'end');
        else if (endX + 10 + lbl.length * s.s * 0.6 <= W) bars += text(endX + 10, ly + bh / 2 + 7, lbl, 'b z-s', 0);
        else bars += text(endX - 10, ly + bh / 2 + 7, lbl, 'b z-s', 0, 'end');
        y = ly + bh + (wide ? 18 : 14);
      });
      const bottom = y - (wide ? 8 : 6);
      let grid = '';
      const ticks = wide ? [0, 1, 2, 3, 4] : [0, 2, 4];
      for (const i of ticks) {
        const gx = BX + (BW * i) / 4 - (i === 4 ? 1 : 0);
        grid += `<line class="s-line" x1="${gx}" x2="${gx}" y1="${top - 4}" y2="${bottom}" style="stroke-width:1px"/>`;
        grid += text(gx, bottom + (wide ? 26 : 20), `${cur} ${money((nice * i) / 4)}`, 'z-xs t-m', 0, i === 0 ? 'start' : i === 4 ? 'end' : 'middle');
      }
      out += grid + bars;
      y = bottom + (wide ? 50 : 38);
    });

    // Platforms with no price we could read: hatched, never a guess.
    if (missing.length) {
      out += text(wide ? BX : 0, y + (wide ? 20 : 16), 'Price not yet confirmed', 'sb z-s t-m', 0);
      y += wide ? 34 : 26;
      missing.forEach((r) => {
        const ly = wide ? y : y + 24;
        out += nameAt(r, y);
        out += `<rect fill="url(#${ID}-${v}-hatch)" x="${BX}" y="${ly}" width="${BW}" height="${bh}" rx="4"/>`;
        out += `<rect class="s-line" x="${BX}" y="${ly}" width="${BW}" height="${bh}" rx="4" style="stroke-width:1px"/>`;
        out += rect(BX + 8, ly + 5, 'Not yet confirmed'.length * s.s * 0.58 + 16, bh - 10, 'f-bg', 4) + text(BX + 16, ly + bh / 2 + 6, 'Not yet confirmed', 'sb z-s', 0);
        y = ly + bh + (wide ? 18 : 14);
      });
      y += wide ? 16 : 12;
    }

    // The website cell: one payment, then nothing. Drawn as three year boxes, not as a bar on another axis.
    const cw = wide ? (BW - 24) / 3 : (W - 16) / 3;
    const cx0 = wide ? BX : 0;
    const ch = wide ? 64 : 72;
    out += nameAt({ name: cellName }, y, true);
    const cy = wide ? y : y + 24;
    const boxes = lp ? [cellLabel, 'Nothing more', 'Nothing more'] : [cellLabel, TBC, TBC];
    boxes.forEach((t, i) => {
      const x = cx0 + i * (cw + (wide ? 12 : 8));
      out += rect(x, cy, cw, ch, i === 0 ? 'f-acc' : 'f-tint', 10);
      out += text(x + 12, cy + (wide ? 24 : 21), ['Year one', 'Year two', 'Year three'][i], `z-xs ${i === 0 ? 't-on' : 't-m'}`, 0);
      // The price and "launch price" stay in one <text> on one line of HTML (the validator reads lines).
      const lines = i === 0 && lp && !wide ? [`£${money(lp.gbp)} once,`, 'launch price'] : wide ? [t] : para(0, 0, t, cw - 20, s.s, '', 18).svg.match(/>([^<]+)<\/tspan>/g).map((x) => x.slice(1, -8).replace(/&amp;/g, '&'));
      out += '\n' + text(x + 12, cy + (wide ? 46 : 40), lines, `b z-s${i === 0 ? ' t-on' : ''}`, 18) + '\n';
    });
    y = cy + ch + (wide ? 40 : 30);
    const honest = get(data, 'offer.honest_notes.0', 'Editing the site after hand-over needs your own Claude plan, or a partner who edits it for you.');
    const hn = para(0, y, `Hosting on GitHub Pages is free. ${honest}`, W, s.xs, 'z-xs t-m', wide ? 24 : 19);
    out += hn.svg;
    return { svg: out, h: y + hn.height };
  };
  const wv = draw('w'), nv = draw('n');
  const wide = svgOpen(ID, 'w', wv.h, title, desc) + '\n' + wv.svg;
  const narrow = svgOpen(ID, 'n', nv.h, title, desc) + '\n' + nv.svg;

  const li = rows.map((r) => {
    if (r.ok) {
      const note = r.note ? ` ${esc(r.note)}` : '';
      return `<li><strong>${esc(r.name)}</strong>: <a href="${esc(r.url)}">${esc(r.value)}</a>, their published price read ${esc(r.read || DEFAULT_READ)}, comes to ${r.currency} ${money(r.years[0])} after one year and ${r.currency} ${money(r.years[2])} after three years on <a href="${esc(r.url)}">their own price page</a>.${note ? ` <a href="${esc(r.url)}">Currency</a>:${note}` : ''}</li>`;
    }
    return `<li><strong>${esc(r.name)}</strong>: their published price is ${TBC}, so the bar is hatched.</li>`;
  });
  const cellLi = lp
    ? `<li><strong>${cellName}</strong>: the launch price is £${money(lp.gbp)}${lp.eur ? ` or €${money(lp.eur)}` : ''}, paid once, from <a href="${OFFER_URL}">our offer file</a>; nothing more is due in year two or year three.</li>`
    : `<li><strong>${cellName}</strong>: the launch price is ${TBC} (<a href="${OFFER_URL}">our offer file</a>).</li>`;
  const textHtml = [
    `<p>${esc(title)}. ${esc(label)}${currencies.some((c) => c !== 'GBP') ? ' Prices published in another currency are shown as published, not converted.' : ''}</p>`,
    '<ul>',
    ...li,
    cellLi,
    '</ul>',
    `<p>Hosting on GitHub Pages is free. ${esc(get(data, 'offer.honest_notes.0', 'Editing the site after hand-over needs your own Claude plan, or a partner who edits it for you.'))}</p>`,
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

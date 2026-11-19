// Figure: three years of a platform against one payment you keep.
// Cumulative cost over three years: one plan per competitor, from its published price; our launch price, paid once;
// and, as a separate optional series on the same axis, the owner's own Claude Pro plan if they edit the site themselves.
// Data: competitors.competitors[].facts.price_per_month (or another price row; value such as "USD 17 a month, billed yearly,
// plan Light", source_url, date_read), facts.currency_note (optional), competitors.website_cell.facts.optional_editing_cost
// (or any website_cell fact whose value names "Claude Pro: USD .. a month"), offer.launch_gbp, copy.offer_title.
// Rules: never a guess and never a converted number. Each currency gets its own panel and its own axis, labelled
// "as published, not converted". A competitor with no parseable price is a hatched "not yet confirmed" bar.
// Our launch price is in GBP, so it is a note beside the chart, never a bar on another currency's axis.
// The Claude Pro number is read from data/next/competitors.json, never typed here.
import { esc, get, fromCopy, para, text, rect, svgOpen, wrapFigure, SIZE, launch, longDate, OFFER_URL, TBC, DEFAULT_READ, wrap, fit } from './_shared.mjs';

const ID = 'year-of-platform';
const WANT = [['wix', 'Wix'], ['squarespace', 'Squarespace'], ['fliplet', 'Fliplet']];
const PRICE_KEYS = ['price_per_month', 'price', 'price_month', 'monthly_price', 'price_monthly', 'entry_price', 'cheapest_plan', 'plan_price', 'price_per_year', 'price_year', 'annual_price'];
const SHADE = [0.85, 0.55, 0.3];
const GH_LIMITS = 'https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits';

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

// Like para(), but "launch price" and "USD 17" never break across two lines, so the validator finds it beside the £ on one line of HTML.
const GLUE = '\u0001';
function paraKeep(x, y, str, width, size, cls, lh, bold = false) {
  const lines = wrap(String(str).replace(/launch price/g, `launch${GLUE}price`).replace(/\b(USD|GBP|EUR|CAD|AUD) (\d)/g, `$1${GLUE}$2`), fit(width, size, bold)).map((l) => l.split(GLUE).join(' '));
  return { svg: text(x, y, lines, cls, lh), height: lines.length * lh, lines: lines.length, list: lines };
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

// The owner's own Claude plan, if they edit the site themselves: read from the website_cell facts in
// data/next/competitors.json ("Claude Pro: USD 17 a month billed yearly, ..."). Returns null when it is not there.
export function claudePlan(data) {
  const facts = get(data, 'competitors.website_cell.facts', {}) || {};
  const keys = ['optional_editing_cost', ...Object.keys(facts).filter((k) => k !== 'optional_editing_cost')];
  for (const k of keys) {
    const f = facts[k];
    const v = String((f && typeof f === 'object' ? f.value : f) || '');
    const m = /Claude\s+(Pro|Max|Team)\s*:\s*/i.exec(v);
    if (!m) continue;
    const rest = v.slice(m.index + m[0].length);
    const p = parsePrice(rest);
    const url = f && /^https?:\/\//.test(f.source_url || '') ? f.source_url : '';
    if (!p || !url) continue;
    // "USD 17 a month billed yearly" : the words up to the first ", or" (the cheaper, yearly-billed price).
    const shown = rest.split(/,\s*or\b|;|\(/)[0].replace(/[,.\s]+$/, '');
    return { plan: `Claude ${m[1]}`, currency: p.currency, shown, url, read: f.date_read ? longDate(f.date_read) : DEFAULT_READ, years: [1, 2, 3].map((y) => p.perYear * y) };
  }
  return null;
}

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'Three years of a platform, or one payment you keep');
  const rows = series(data);
  const lp = launch(data.offer);
  const cp = claudePlan(data);
  const readDates = [...new Set(rows.map((r) => r.read).filter(Boolean))];
  const readOn = readDates.length === 1 ? readDates[0] : DEFAULT_READ;
  const label = `Calculated from their published prices, read ${readOn}. One plan each, before tax, if the price stays the same.`;
  const ours = String(get(copy, 'offer_title', 'Your own website'));
  const launchLine = lp ? `£${money(lp.gbp)} once, launch price` : `Launch price ${TBC}`;
  const optName = cp ? `Optional: if you edit it yourself with ${cp.plan}` : '';
  const optPrice = cp ? `${cp.shown} (Anthropic's own price)` : '';
  const optTotal = cp ? `${cp.currency} ${money(cp.years[2])}` : '';
  const curs = [...rows.filter((r) => r.ok).map((r) => r.currency), ...(cp ? [cp.currency] : [])];
  const currencies = [...new Set(curs)].sort((a, b) => (a === 'GBP' ? -1 : b === 'GBP' ? 1 : a.localeCompare(b)));
  const missing = rows.filter((r) => !r.ok);
  const rowText = (r) => (r.ok ? `${r.currency} ${money(r.years[0])} after one year, ${r.currency} ${money(r.years[2])} after three years` : 'price not yet confirmed');
  const notConv = currencies.some((c) => c !== 'GBP') ? ' Prices published in another currency are shown as published, not converted.' : '';
  const notes = [
    { head: 'Paid once, to us', body: lp ? `£${money(lp.gbp)}, launch price` : launchLine, cls: 'acc' },
    ...(cp ? [{ head: 'Optional', body: `Edit it yourself with ${cp.plan}: the dashed bar above, paid to Anthropic, not us.`, cls: 'opt' }] : []),
    { head: 'Or no editing', body: 'The site keeps running at no cost from us.', cls: 'tint' },
  ];
  const hostLine = 'Hosting: GitHub Pages has no charge for a public repository, but GitHub says Pages is not for running an online business or an e-commerce site (GitHub\'s terms). Any other static host works too, at its own price.';
  const desc = `${title}. ${rows.map((r) => `${r.name}: ${rowText(r)}.`).join(' ')}${cp ? ` ${optName}: ${optPrice}, ${cp.currency} ${money(cp.years[0])} after one year, ${optTotal} after three years.` : ''} ${ours}: ${notes.map((n) => `${n.head}: ${n.body}`).join(' ')} ${label}${notConv} ${hostLine}`;

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
    // Legend: the three shades of a bar, and the dashed optional series.
    const sw = wide ? 22 : 16;
    let lx = 0;
    ['Year one', 'Year two', 'Year three'].forEach((t, i) => {
      out += `<rect class="f-muted" style="fill-opacity:${SHADE[i]}" x="${lx}" y="${y}" width="${sw}" height="${sw}" rx="4"/>`;
      out += text(lx + sw + 8, y + sw - 4, t, 'z-s t-m', 0);
      lx += sw + 8 + t.length * (s.s * 0.52) + (wide ? 28 : 14);
    });
    if (cp) {
      const optLeg = 'Optional, yours to choose';
      if (!wide || lx + sw + 8 + optLeg.length * s.s * 0.52 > W) { lx = 0; y += sw + 10; }
      out += `<rect class="f-tint s-acc" style="stroke-width:2px;fill-opacity:.18" stroke-dasharray="5 4" x="${lx + 1}" y="${y + 1}" width="${sw - 2}" height="${sw - 2}" rx="4"/>`;
      out += text(lx + sw + 8, y + sw - 4, optLeg, 'z-s t-m', 0);
    }
    y += sw + (wide ? 26 : 18);

    const nameAt = (r, yy, accent = false) => (wide ? text(0, yy + bh / 2 + 7, r.name, `b z-m${accent ? ' t-a' : ''}`, 0) : text(0, yy + 16, r.name, `b z-m${accent ? ' t-a' : ''}`, 0));
    const shadeBars = (years, ly, scale, accent) => {
      let x0 = BX, o = `<rect class="f-bg" x="${BX}" y="${ly}" width="${scale(years[2])}" height="${bh}"/>`;
      years.forEach((c, i) => {
        const x1 = BX + scale(c);
        o += `<rect class="${accent ? 'f-acc' : 'f-muted'}" style="fill-opacity:${accent ? SHADE[i] * 0.45 : SHADE[i]}" x="${x0}" y="${ly}" width="${Math.max(x1 - x0 - 2, 1)}" height="${bh}" rx="4"/>`;
        x0 = x1;
      });
      if (accent) o += `<rect class="s-acc" x="${BX + 1}" y="${ly + 1}" width="${Math.max(scale(years[2]) - 2, 1)}" height="${bh - 2}" rx="4" stroke-dasharray="7 5" style="stroke-width:2.5px"/>`;
      return o;
    };

    // One panel per currency, each with its own axis. The optional Claude plan joins the panel of its own currency.
    currencies.forEach((cur) => {
      const group = rows.filter((r) => r.ok && r.currency === cur);
      const withOpt = cp && cp.currency === cur;
      const nice = niceMax(Math.max(...group.map((r) => r.years[2]), ...(withOpt ? [cp.years[2]] : [])));
      const scale = (n) => (n / nice) * BW;
      const head = cur === 'GBP' ? 'In GBP, as published' : `In ${cur}, as published, not converted`;
      out += text(wide ? BX : 0, y + (wide ? 20 : 16), head, 'sb z-s t-m', 0);
      y += wide ? 34 : 26;
      const top = y;
      let bars = '';
      group.forEach((r) => {
        const ly = wide ? y : y + 24;
        bars += nameAt(r, y);
        bars += shadeBars(r.years, ly, scale, false);
        const endX = BX + scale(r.years[2]);
        const lbl = `${cur} ${money(r.years[2])}`;
        if (!wide) bars += text(W, y + 16, `${lbl} in three years`, 'b z-s', 0, 'end');
        else if (endX + 10 + lbl.length * s.s * 0.6 <= W) bars += text(endX + 10, ly + bh / 2 + 7, lbl, 'b z-s', 0);
        else bars += text(endX - 10, ly + bh / 2 + 7, lbl, 'b z-s', 0, 'end');
        y = ly + bh + (wide ? 18 : 14);
      });
      if (withOpt) {
        // A rule, then the optional series: its own label, a dashed accent bar, and what it is.
        bars += `<line class="s-line" x1="0" x2="${W}" y1="${y - (wide ? 6 : 4)}" y2="${y - (wide ? 6 : 4)}" stroke-dasharray="4 4" style="stroke-width:1px"/>`;
        y += wide ? 10 : 8;
        const nm = para(0, wide ? y + 20 : y + 16, optName, wide ? BX - 16 : W, s.s, 'b z-s t-a', wide ? 24 : 19, 'start', true);
        bars += nm.svg;
        const ly = wide ? y : y + nm.height + 6;
        bars += shadeBars(cp.years, ly, scale, true);
        const endX = BX + scale(cp.years[2]);
        if (wide) {
          bars += endX + 10 + optTotal.length * s.s * 0.6 <= W ? text(endX + 10, ly + bh / 2 + 7, optTotal, 'b z-s t-a', 0) : text(endX - 10, ly + bh / 2 + 7, optTotal, 'b z-s', 0, 'end');
          const under = paraKeep(BX, ly + bh + 24, `${optPrice}.${lp ? ` Plus the £${money(lp.gbp)} launch price, paid once.` : ''}`, BW, s.xs, 'z-xs t-m', 24);
          bars += under.svg;
          y = Math.max(ly + bh + 24 + under.height - 24, y + nm.height) + (wide ? 22 : 16);
        } else {
          const under = para(0, ly + bh + 20, `${optTotal} in three years: ${optPrice}.`, W, s.s, 'z-s', 19);
          bars += under.svg;
          y = ly + bh + 20 + under.height - 19 + 14;
        }
      }
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

    // Our side, in plain words: paid once, the optional Claude plan, or no editing at all.
    // Wide: three boxes in a row beside the name. Narrow: the name, then the boxes stacked.
    const cx0 = wide ? BX : 0;
    const gap = wide ? 12 : 8;
    const cw = wide ? (BW - gap * (notes.length - 1)) / notes.length : W;
    if (wide) out += para(0, y + 30, ours, BX - 16, s.m, 'b z-m t-a', 28, 'start', true).svg;
    else { out += text(0, y + 18, ours, 'b z-l t-a', 0); y += 30; }
    const bodies = notes.map((n) => paraKeep(0, 0, n.body, cw - 24, s.s, '', wide ? 24 : 19, n.cls === 'acc'));
    const bodyLines = (b) => b.list;
    const lh = wide ? 24 : 19;
    const boxH = (b) => (wide ? 36 : 30) + b.lines * lh + 10;
    const rowH = wide ? Math.max(...bodies.map(boxH)) : 0;
    notes.forEach((n, i) => {
      const b = bodies[i];
      const h = wide ? rowH : boxH(b);
      const x = wide ? cx0 + i * (cw + gap) : 0;
      const by = wide ? y : y;
      const fill = n.cls === 'acc' ? 'f-acc' : 'f-tint';
      out += rect(x, by, cw, h, fill, 10);
      if (n.cls === 'opt') out += `<rect class="s-acc" x="${x + 1}" y="${by + 1}" width="${cw - 2}" height="${h - 2}" rx="10" stroke-dasharray="7 5" style="stroke-width:2px"/>`;
      out += text(x + 12, by + (wide ? 26 : 22), n.head, `sb z-xs ${n.cls === 'acc' ? 't-on' : 't-m'}`, 0);
      // The price and "launch price" stay in one <text> on one line of HTML (the validator reads lines).
      out += '\n' + text(x + 12, by + (wide ? 52 : 44), bodyLines(b), `${n.cls === 'acc' ? 'b t-on' : 'sb'} z-s`, lh) + '\n';
      if (!wide) y += h + gap;
    });
    y = wide ? y + rowH + 34 : y + 18;
    const hn = para(0, y, hostLine, W, s.xs, 'z-xs t-m', wide ? 24 : 19);
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
  const ourLi = lp
    ? `<li><strong>${esc(ours)}</strong>: the launch price is £${money(lp.gbp)}${lp.eur ? ` or €${money(lp.eur)}` : ''}, paid once, from <a href="${OFFER_URL}">our offer file</a>; nothing more is due to us in year two or year three.</li>`
    : `<li><strong>${esc(ours)}</strong>: the launch price is ${TBC} (<a href="${OFFER_URL}">our offer file</a>).</li>`;
  const optLi = cp
    ? `<li><strong>${esc(optName)}</strong> (a separate, optional series, paid to Anthropic, not to us): <a href="${esc(cp.url)}">${esc(cp.shown)}</a>, Anthropic's own price read ${esc(cp.read)}, comes to ${cp.currency} ${money(cp.years[0])} after one year and ${cp.currency} ${money(cp.years[2])} after three years on <a href="${esc(cp.url)}">Anthropic's price page</a>. A partner can edit the site for you instead, at their own price.</li>`
    : '';
  const textHtml = [
    `<p>${esc(title)}. ${esc(label)}${notConv}</p>`,
    '<ul>',
    ...li,
    ourLi,
    optLi,
    `<li><strong>Or no editing</strong>: the site keeps running at no cost from us.</li>`,
    '</ul>',
    `<p>${esc(hostLine).replace("GitHub's terms", `<a href="${GH_LIMITS}">GitHub's terms</a>`)}</p>`,
  ].filter(Boolean).join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

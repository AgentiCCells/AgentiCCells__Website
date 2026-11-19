// Shared helpers for the /next/ infographics. Not a figure: files that start with "_" are helpers.
// Owner: designer.agenticcells-ai@AgentiCCells.dinis. Licence: Apache-2.0.
//
// Every figure returns { svg, text }. "svg" is a small HTML wrapper (div.nfig) holding two inline SVGs:
// a wide one (viewBox 960 wide) and a narrow one (viewBox 400 wide). A container query shows one of them,
// so the figure reads from 360 px to 1200 px. The hidden one is display:none, so screen readers meet one.
// Colours, fonts and sizes come from CSS custom properties with fallbacks, so each design can recolour them.

export const OFFER_URL = 'https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/next/offer.json';
export const TBC = 'to be confirmed';
export const DEFAULT_READ = '19 November 2026';

// Escape text for HTML and SVG.
export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  .replace(/\u2014/g, ", "); // no em dashes, even from data

// Safe deep get: get(obj, 'a.b.c', fallback).
export function get(obj, path, fallback) {
  let v = obj;
  for (const k of path.split('.')) {
    if (v == null || typeof v !== 'object') return fallback;
    v = v[k];
  }
  return v == null || v === '' ? fallback : v;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// "2026-11-19" -> "19 November 2026"; anything else is returned as it is.
export function longDate(d) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(d || ''));
  if (!m) return d ? String(d) : '';
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

// Host name of a URL, for a short "source" label inside an SVG.
export function host(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

// Our launch price, from data/next/offer.json. Returns null when it is missing.
export function launch(offer) {
  const gbp = Number(get(offer, 'launch_gbp', NaN));
  const eur = Number(get(offer, 'launch_eur', NaN));
  return Number.isFinite(gbp) ? { gbp, eur: Number.isFinite(eur) ? eur : null } : null;
}

// Wrap text into lines of about maxChars characters.
export function wrap(text, maxChars) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    if (!line) line = w;
    else if ((line + ' ' + w).length <= maxChars) line += ' ' + w;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}

// Characters that fit in a width at a font size (system sans, a slightly generous estimate).
export const fit = (width, size, bold = false) => Math.max(4, Math.floor(width / (size * (bold ? 0.56 : 0.51))));

// One <text> element with tspans, on a single line of HTML (so a price and its "launch price" mark share a line).
export function text(x, y, lines, cls, lh, anchor = 'start') {
  const ls = Array.isArray(lines) ? lines : [lines];
  const a = anchor === 'start' ? '' : ` text-anchor="${anchor}"`;
  const spans = ls.map((l, i) => `<tspan x="${x}"${i ? ` dy="${lh}"` : ''}>${esc(l)}</tspan>`).join('');
  return `<text class="${cls}" x="${x}" y="${y}"${a}>${spans}</text>`;
}

// Wrapped paragraph: returns { svg, height }.
export function para(x, y, str, width, size, cls, lh = Math.round(size * 1.3), anchor = 'start', bold = false) {
  const lines = wrap(str, fit(width, size, bold));
  return { svg: text(x, y, lines, cls, lh, anchor), height: lines.length * lh, lines: lines.length };
}

// Styles, scoped to .nfig. Sizes differ for the wide (960) and narrow (400) viewBoxes:
// the wide one is shown from 640 px of container width (scale 0.67 or more), the narrow one below it
// (scale 0.9 or more at 360 px), so the smallest text renders at 13 px or larger.
export const STYLE = `<style>
.nfig{container-type:inline-size;margin:0;max-width:1120px}
.nfig svg{display:block;width:100%;height:auto;overflow:visible}
.nfig .nfig-n{display:none}
@container (max-width: 639px){.nfig .nfig-w{display:none}.nfig .nfig-n{display:block}}
.nfig text{font-family:var(--fig-font, var(--font, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif));fill:var(--fig-ink, var(--fg, #0f172a))}
.nfig .b{font-weight:700}.nfig .sb{font-weight:600}.nfig .i{font-style:italic}
.nfig .t-m{fill:var(--fig-muted, var(--muted, #475569))}.nfig .t-a{fill:var(--fig-accent, var(--accent, #1d4ed8))}.nfig .t-on{fill:var(--fig-bg, var(--bg, #ffffff))}
.nfig .t-g{fill:var(--fig-good, #15803d)}.nfig .t-w{fill:var(--fig-warn, #b45309)}
.nfig .f-bg{fill:var(--fig-bg, var(--bg, #ffffff))}.nfig .f-acc{fill:var(--fig-accent, var(--accent, #1d4ed8))}.nfig .f-ink{fill:var(--fig-ink, var(--fg, #0f172a))}
.nfig .f-tint{fill:var(--fig-accent, var(--accent, #1d4ed8));fill-opacity:.08}.nfig .f-soft{fill:var(--fig-muted, var(--muted, #475569));fill-opacity:.07}
.nfig .f-good{fill:var(--fig-good, #15803d)}.nfig .f-warn{fill:var(--fig-warn, #b45309)}.nfig .f-line{fill:var(--fig-line, var(--line, #cbd5e1))}
.nfig .f-muted{fill:var(--fig-muted, var(--muted, #475569))}.nfig .f-gtint{fill:var(--fig-good, #15803d);fill-opacity:.09}.nfig .f-wtint{fill:var(--fig-warn, #b45309);fill-opacity:.09}
.nfig .s-line{stroke:var(--fig-line, var(--line, #cbd5e1));fill:none}.nfig .s-acc{stroke:var(--fig-accent, var(--accent, #1d4ed8));fill:none}
.nfig .s-ink{stroke:var(--fig-ink, var(--fg, #0f172a));fill:none}.nfig .s-muted{stroke:var(--fig-muted, var(--muted, #475569));fill:none}
.nfig .s-good{stroke:var(--fig-good, #15803d);fill:none}.nfig .s-warn{stroke:var(--fig-warn, #b45309);fill:none}.nfig .s-on{stroke:var(--fig-bg, var(--bg, #ffffff));fill:none}
.nfig .ic{stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.nfig-w .z-xs{font-size:20px}.nfig-w .z-s{font-size:20px}.nfig-w .z-m{font-size:22px}.nfig-w .z-l{font-size:27px}.nfig-w .z-xl{font-size:34px}
.nfig-n .z-xs{font-size:15px}.nfig-n .z-s{font-size:15px}.nfig-n .z-m{font-size:16px}.nfig-n .z-l{font-size:19px}.nfig-n .z-xl{font-size:23px}
</style>`;

// Size table matching STYLE, for layout arithmetic.
export const SIZE = { w: { xs: 20, s: 20, m: 22, l: 27, xl: 34 }, n: { xs: 15, s: 15, m: 16, l: 19, xl: 23 } };

// One SVG variant. v is "w" (wide, 960) or "n" (narrow, 400).
export function svgOpen(id, v, height, title, desc) {
  const w = v === 'w' ? 960 : 400;
  const t = `${id}-${v}-title`, d = `${id}-${v}-desc`;
  return `<svg class="nfig-${v}" viewBox="0 0 ${w} ${Math.ceil(height)}" role="img" aria-labelledby="${t} ${d}" xmlns="http://www.w3.org/2000/svg">\n<title id="${t}">${esc(title)}</title>\n<desc id="${d}">${esc(desc)}</desc>`;
}

// The wrapper the page embeds: both variants and the scoped styles.
export function wrapFigure(id, wide, narrow) {
  return `<div class="nfig nfig-${id}" data-figure="${id}">\n${STYLE}\n${wide}\n</svg>\n${narrow}\n</svg>\n</div>`;
}

// Simple geometric icons in a 40 x 40 box, drawn as strokes. cls is a stroke class.
const ICONS = {
  hold: 'M8 30 L8 20 Q8 16 12 16 L28 16 Q32 16 32 20 L32 30 Q32 34 28 34 L12 34 Q8 34 8 30 Z M14 16 L14 11 Q14 6 20 6 Q26 6 26 11 L26 16 M20 23 L20 27',
  control: 'M6 12 L34 12 M6 28 L34 28 M14 8 L14 16 M26 24 L26 32',
  change: 'M8 32 L10 24 L26 8 L32 14 L16 30 Z M22 12 L28 18 M8 32 L34 32',
  anywhere: 'M20 4 A16 16 0 1 0 20 36 A16 16 0 1 0 20 4 Z M4 20 L36 20 M20 4 Q11 20 20 36 M20 4 Q29 20 20 36',
  keep: 'M6 14 L34 14 L34 34 L6 34 Z M4 8 L36 8 L36 14 L4 14 Z M15 21 L25 21',
  rent: 'M6 34 L6 16 L20 6 L34 16 L34 34 Z M16 34 L16 24 L24 24 L24 34',
  own: 'M6 34 L6 16 L20 6 L34 16 L34 34 Z M14 24 L19 29 L27 20',
  repo: 'M12 6 L12 34 M12 14 Q12 20 22 20 L28 20 M12 6 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M12 34 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M28 20 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
  lock: 'M10 18 L30 18 L30 34 L10 34 Z M14 18 L14 13 Q14 6 20 6 Q26 6 26 13 L26 18 M20 24 L20 28',
  designs: 'M5 5 L18 5 L18 18 L5 18 Z M22 5 L35 5 L35 18 L22 18 Z M5 22 L18 22 L18 35 L5 35 Z M22 22 L35 22 L35 35 L22 35 Z',
  doc: 'M10 4 L24 4 L32 12 L32 36 L10 36 Z M24 4 L24 12 L32 12 M15 20 L27 20 M15 26 L27 26',
  shield: 'M20 4 L33 9 L33 20 Q33 31 20 36 Q7 31 7 20 L7 9 Z M14 20 L18 24 L26 15',
  handover: 'M4 14 L28 14 M22 8 L28 14 L22 20 M36 26 L12 26 M18 20 L12 26 L18 32',
  chat: 'M6 8 L34 8 L34 26 L18 26 L10 33 L10 26 L6 26 Z M12 15 L28 15 M12 20 L22 20',
  check: 'M8 21 L16 29 L32 11',
  person: 'M20 6 A6 6 0 1 0 20 18 A6 6 0 1 0 20 6 Z M8 35 Q8 23 20 23 Q32 23 32 35',
  star: 'M20 5 L24.4 15 L35 16 L27 23 L29.4 34 L20 28.5 L10.6 34 L13 23 L5 16 L15.6 15 Z',
  live: 'M4 20 A16 16 0 1 0 36 20 A16 16 0 1 0 4 20 Z M20 12 L20 20 L26 24',
  door: 'M8 36 L8 4 L28 4 L28 36 M28 20 L36 20 M32 16 L36 20 L32 24 M22 20 L22 21',
  mail: 'M5 9 L35 9 L35 31 L5 31 Z M5 9 L20 21 L35 9',
  conductor: 'M20 6 A5 5 0 1 0 20 16 A5 5 0 1 0 20 6 Z M8 34 L20 22 L32 34 M20 22 L20 34',
  research: 'M17 5 A12 12 0 1 0 17 29 A12 12 0 1 0 17 5 Z M26 26 L35 35',
  code: 'M14 10 L5 20 L14 30 M26 10 L35 20 L26 30 M23 6 L17 34',
  write: 'M6 10 L34 10 M6 18 L34 18 M6 26 L24 26 M6 34 L18 34',
  review: 'M4 20 Q20 4 36 20 Q20 36 4 20 Z M20 15 A5 5 0 1 0 20 25 A5 5 0 1 0 20 15 Z',
  design: 'M20 4 A16 16 0 1 0 20 36 Q24 36 24 31 Q24 27 28 27 L32 27 Q36 27 36 21 Q36 4 20 4 Z M12 17 L12.5 17 M19 11 L19.5 11 M27 15 L27.5 15',
};

// icon(name, x, y, scale, cls): the icon's 40 x 40 box placed at x, y.
export function icon(name, x, y, scale = 1, cls = 's-acc') {
  const d = ICONS[name] || ICONS.check;
  const sw = (2.5 / scale).toFixed(2);
  return `<path class="${cls} ic" style="stroke-width:${sw}px" transform="translate(${x} ${y}) scale(${scale})" d="${d}"/>`;
}

// Small helpers for shapes.
export const rect = (x, y, w, h, cls, r = 12) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
export const line = (x1, y1, x2, y2, cls, sw = 2, dash = '') => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke-width:${sw}px"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
export const circle = (cx, cy, r, cls) => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`;

// A figure's own words can be overridden from next/copy.json: copy.figures.<id>.<key>.
export const fromCopy = (copy, id, key, fallback) => get(copy, `figures.${id}.${key}`, fallback);

// Number words, so the text version carries no bare digits.
export const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
export const word = (n) => WORDS[n] ?? String(n);

// Copy strings may hold inline markdown links [text](url). In an SVG, keep the text; in the text version, keep the link.
export const mdPlain = (s) => String(s ?? '').replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1');
export const mdHtml = (s) => esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => (/^https?:\/\//.test(u) ? `<a href="${u}">${t}</a>` : t));

// A list from next/copy.json, or null when it is missing or empty.
export const copyList = (copy, key) => {
  const v = get(copy, key, null);
  return Array.isArray(v) && v.length ? v : null;
};

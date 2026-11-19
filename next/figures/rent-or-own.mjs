// Figure: renting a platform against owning your site, side by side.
// Data: copy.rent_or_own[] {topic,rent,own}, copy.figures.rent-or-own.{title,lead,rent,own} (all optional). No numbers: the money is in year-of-platform.
// Sources of the words: https://newsroom.sgit.ai/articles/the-sovereign-website.html and https://newsroom.sgit.ai/articles/the-pitch.html
import { esc, get, fromCopy, para, text, rect, icon, line, svgOpen, wrapFigure, SIZE, mdPlain, copyList } from './_shared.mjs';

const ID = 'rent-or-own';
const PITCH = 'https://newsroom.sgit.ai/articles/the-pitch.html';

const ROWS = [
  { label: 'Where it lives', rent: 'In their account, in their format.', own: 'In your own GitHub repository, as plain files.' },
  { label: 'What you pay', rent: 'Every month, for as long as the site is online.', own: 'Once. Free on GitHub Pages for a public repository that is not an online shop or business transaction site (GitHub\'s terms), or any static host.' },
  { label: 'Leaving', rent: 'As far as their export tools and terms allow.', own: 'Copy the repository to any host, any day.' },
  { label: 'Changing it', rent: 'In their editor, within their limits.', own: 'Ask your own Claude, with checks before it goes live.' },
  { label: 'Prices and terms', rent: 'They can change them, and you follow.', own: 'No terms but yours.' },
  { label: 'What there is to attack', rent: 'Their servers, plugins and logins.', own: 'Almost nothing: no server code, no database.' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'Rent a platform, or own your site');
  const lead = fromCopy(copy, ID, 'lead', 'The same website, two ways to have it.');
  const introRaw = get(copy, 'sections.rent_or_own', '');
  // copy.sections.<key> may be a string or { title, text }.
  const intro = typeof introRaw === 'object' ? get(introRaw, 'text', '') : introRaw;
  const rentH = fromCopy(copy, ID, 'rent', 'Renting a platform');
  const ownH = fromCopy(copy, ID, 'own', 'Owning your site');
  // Words from next/copy.json (rent_or_own[]: { topic, rent, own }) when the writer has them.
  const cl = copyList(copy, 'rent_or_own');
  const rows = cl ? cl.map((r) => ({ label: mdPlain(r.topic || r.label || ''), rent: mdPlain(r.rent || ''), own: mdPlain(r.own || '') })) : ROWS;
  const desc = `${title}. ${rows.map((r) => `${r.label}: renting, ${r.rent} Owning, ${r.own}`).join(' ')}`;

  // Wide: a label column and two columns.
  const s = SIZE.w, L = 220, cw = 350, gap = 20, x1 = L + gap, x2 = x1 + cw + gap, pad = 20;
  let w = text(0, 40, title, 'b z-l', 0) + text(0, 74, lead, 't-m z-m', 0);
  const hy = 100;
  w += rect(x1, hy, cw, 72, 'f-wtint', 12) + rect(x2, hy, cw, 72, 'f-gtint', 12);
  w += icon('rent', x1 + pad, hy + 16, 1, 's-warn') + text(x1 + pad + 54, hy + 45, rentH, 'b z-m t-w', 0);
  w += icon('own', x2 + pad, hy + 16, 1, 's-good') + text(x2 + pad + 54, hy + 45, ownH, 'b z-m t-g', 0);
  let y = hy + 72 + 12;
  rows.forEach((r, i) => {
    const lb = para(0, y + 34, r.label, L - 10, s.s, 'sb z-s t-m', 25, 'start', true);
    const a = para(x1 + pad, y + 34, r.rent, cw - pad * 2, s.s, 'z-s', 26);
    const b = para(x2 + pad + 30, y + 34, r.own, cw - pad * 2 - 30, s.s, 'z-s', 26);
    const h = Math.max(lb.height, a.height, b.height) + 28;
    if (i) w += line(0, y, x2 + cw, y, 's-line', 1.5);
    w += lb.svg + a.svg + icon('check', x2 + pad - 4, y + 14, 0.7, 's-good') + b.svg;
    y += h;
  });
  const wide = svgOpen(ID, 'w', y + 6, title, desc) + '\n' + w;

  // Narrow: each row as a label over two side-by-side cells.
  const N = 400, n = SIZE.n, cn = (N - 10) / 2, pn = 12;
  const t1 = para(0, 26, title, N, n.xl, 'b z-xl', 28, 'start', true);
  let v = t1.svg;
  let yy = 26 + t1.height - 28 + 24;
  const ld = para(0, yy, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  yy += ld.height;
  v += rect(0, yy, cn, 48, 'f-wtint', 10) + rect(cn + 10, yy, cn, 48, 'f-gtint', 10);
  v += icon('rent', pn, yy + 12, 0.6, 's-warn') + para(pn + 32, yy + 30, rentH, cn - pn - 36, n.s, 'b z-s t-w', 18, 'start', true).svg;
  v += icon('own', cn + 10 + pn, yy + 12, 0.6, 's-good') + para(cn + 10 + pn + 32, yy + 30, ownH, cn - pn - 36, n.s, 'b z-s t-g', 18, 'start', true).svg;
  yy += 60;
  rows.forEach((r) => {
    const lb = para(0, yy + 18, r.label, N, n.m, 'sb z-m t-m', 20, 'start', true);
    yy += lb.height + 6;
    const a = para(pn, yy + 24, r.rent, cn - pn * 2, n.s, 'z-s', 19);
    const b = para(cn + 10 + pn, yy + 24, r.own, cn - pn * 2, n.s, 'z-s', 19);
    const h = Math.max(a.height, b.height) + 20;
    v += lb.svg + rect(0, yy, cn, h, 'f-soft', 8) + rect(cn + 10, yy, cn, h, 'f-gtint', 8) + a.svg + b.svg;
    yy += h + 8;
  });
  const narrow = svgOpen(ID, 'n', yy + 4, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}. ${esc(intro || lead)} The comparison follows <a href="${PITCH}">the pitch</a>.</p>`,
    '<table>',
    `<thead><tr><th scope="col"></th><th scope="col">${esc(rentH)}</th><th scope="col">${esc(ownH)}</th></tr></thead>`,
    '<tbody>',
    ...rows.map((r) => `<tr><th scope="row">${esc(r.label)}</th><td>${esc(r.rent)}</td><td>${esc(r.own).replace("GitHub&#39;s terms", '<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits">GitHub&#39;s terms</a>').replace("GitHub's terms", '<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits">GitHub\'s terms</a>')}</td></tr>`),
    '</tbody>',
    '</table>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

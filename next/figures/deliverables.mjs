// Figure: what you get, shown. Six things that arrive at hand-over.
// Data: copy.deliverables[] {name, what, why_it_matters}, copy.figures.deliverables.{title,lead} (all optional).
// Source of the list: https://newsroom.sgit.ai/articles/the-sovereign-website.html ("The deliverables, shown").
import { esc, fromCopy, get, para, text, rect, circle, icon, svgOpen, wrapFigure, SIZE, mdPlain, mdHtml, copyList } from './_shared.mjs';

const ID = 'deliverables';
const BRIEF = 'https://newsroom.sgit.ai/articles/the-sovereign-website.html';
const ITEMS = [
  { icon: 'repo', name: 'A repository with its history', what: 'Your GitHub repository: the site\'s files and every change since the first.' },
  { icon: 'lock', name: 'A live site, with HTTPS', what: 'Online at its address, on your own domain if you have one.' },
  { icon: 'designs', name: 'Five designs', what: 'The one you choose goes live. The other four are kept.' },
  { icon: 'doc', name: 'A CLAUDE.md for you', what: 'So your own Claude knows how to change the site safely.' },
  { icon: 'shield', name: 'A policy and checks', what: 'Rules for any agent, and checks that run before anything goes live.' },
  { icon: 'handover', name: 'The ownership transfer', what: 'The repository moves to your account, within three months at the latest.' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'What you get');
  const lead = fromCopy(copy, ID, 'lead', (() => { const v = get(copy, 'sections.deliverables', 'What arrives, where it lives, and what you can do with it.'); return typeof v === 'object' ? get(v, 'text', 'What arrives, where it lives, and what you can do with it.') : v; })());
  const cl = copyList(copy, 'deliverables') || [];
  const items = ITEMS.map((d, i) => {
    const c = cl[i];
    return c && c.name ? { ...d, name: mdPlain(c.name), what: mdPlain(c.what || d.what), whyHtml: c.why_it_matters ? mdHtml(c.why_it_matters) : '', whatHtml: mdHtml(c.what || d.what) } : { ...d, whatHtml: esc(d.what), whyHtml: '' };
  });
  const desc = `${title}. ${items.map((t) => `${t.name}: ${t.what}`).join(' ')}`;

  // Wide: three columns, two rows.
  const s = SIZE.w, W = 960, gap = 20, cw = (W - gap * 2) / 3, pad = 22;
  let w = text(0, 40, title, 'b z-xl', 0) + para(0, 76, lead, W, s.m, 't-m z-m', 28).svg;
  const top = 104;
  const cells = items.map((t) => {
    const nm = para(pad, 124, t.name, cw - pad * 2, s.m, 'b z-m', 28, 'start', true);
    const bd = para(pad, 124 + nm.height + 4, t.what, cw - pad * 2, s.xs, 'z-xs t-m', 25);
    return { t, h: 124 + nm.height + bd.height + 4, nm, bd };
  });
  let y = top;
  for (let r = 0; r < 2; r++) {
    const row = cells.slice(r * 3, r * 3 + 3);
    const h = Math.max(...row.map((c) => c.h));
    row.forEach((c, k) => {
      const x = k * (cw + gap);
      w += `<g transform="translate(${x} ${y})">`;
      w += rect(0, 0, cw, h, 'f-bg', 16) + rect(0, 0, cw, h, 's-line', 16);
      w += circle(pad + 30, 54, 32, 'f-tint') + icon(c.t.icon, pad + 10, 34, 1, 's-acc');
      w += text(cw - pad, 46, String(r * 3 + k + 1).padStart(2, '0'), 'b z-l t-m', 0, 'end');
      w += c.nm.svg + c.bd.svg + '</g>';
    });
    y += h + gap;
  }
  const wide = svgOpen(ID, 'w', y - gap + 4, title, desc) + '\n' + w;

  // Narrow: one column.
  const N = 400, n = SIZE.n;
  let v = text(0, 28, title, 'b z-xl', 0);
  const ld = para(0, 56, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  let yy = 56 + ld.height;
  items.forEach((t) => {
    const nm = para(76, yy + 32, t.name, N - 92, n.l, 'b z-l', 23, 'start', true);
    const bd = para(76, yy + 32 + nm.height, t.what, N - 92, n.m, 'z-m t-m', 21);
    const h = Math.max(32 + nm.height + bd.height, 76);
    v += rect(0, yy, N, h, 'f-bg', 12) + rect(0, yy, N, h, 's-line', 12);
    v += circle(38, yy + 38, 24, 'f-tint') + icon(t.icon, 24, yy + 24, 0.7, 's-acc') + nm.svg + bd.svg;
    yy += h + 10;
  });
  const narrow = svgOpen(ID, 'n', yy, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}, as listed in <a href="${BRIEF}">the sovereign website brief</a>. ${esc(lead)}</p>`,
    '<ul>',
    ...items.map((t) => `<li><strong>${esc(t.name)}.</strong> ${t.whatHtml}${t.whyHtml ? ` ${t.whyHtml}` : ''}</li>`),
    '</ul>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

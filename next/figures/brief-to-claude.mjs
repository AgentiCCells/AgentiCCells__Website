// Figure: from the interview to your own Claude. Six stages, with the first change together as the milestone.
// Data: copy.steps[].title (stage names, when there are six), copy.figures.brief-to-claude.{title,lead} (optional).
// Source of the words: https://newsroom.sgit.ai/articles/start-with-an-interview.html
import { esc, get, fromCopy, para, text, rect, circle, icon, line, svgOpen, wrapFigure, SIZE, mdPlain, copyList } from './_shared.mjs';

const ID = 'brief-to-claude';
const SRC = 'https://newsroom.sgit.ai/articles/start-with-an-interview.html';
const STEPS = [
  { icon: 'chat', name: 'Interview', text: 'Claude asks what you want, and which sites you like.' },
  { icon: 'designs', name: 'Five designs', text: 'A team of agents makes five, from your material.' },
  { icon: 'check', name: 'You choose', text: 'Pick one. The other four are kept.' },
  { icon: 'live', name: 'Live', text: 'Your site goes live on its address, with HTTPS.' },
  { icon: 'star', name: 'First change together', text: 'You ask your own Claude for a change, with us beside you.', milestone: true },
  { icon: 'handover', name: 'Hand-over', text: 'The repository moves to you, within three months at the latest.' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'From the interview to your own Claude');
  const lead = fromCopy(copy, ID, 'lead', 'The milestone that matters: the first change you make yourself.');
  // Stage names from next/copy.json (steps[].title) when there are six; the short lines stay this figure's own.
  const cs = copyList(copy, 'steps');
  const steps = STEPS.map((d, i) => (cs && cs.length === STEPS.length && cs[i] && cs[i].title ? { ...d, name: mdPlain(cs[i].title) } : d));
  const desc = `${title}. ${steps.map((t, i) => `Stage ${i + 1}, ${t.name}: ${t.text}`).join(' ')} ${lead}`;

  // Wide: a horizontal line of six stages.
  const s = SIZE.w, W = 960, col = W / steps.length, cy = 160;
  let w = text(0, 40, title, 'b z-l', 0) + text(0, 74, lead, 't-m z-m', 0);
  w += line(col / 2, cy, W - col / 2, cy, 's-line', 4);
  w += line(col * 3.5, cy, col * 4.5, cy, 's-acc', 4);
  let maxH = 0;
  const parts = steps.map((t, i) => {
    const x = col * i + col / 2;
    const nm = para(x, cy + 80, t.name, col - 14, s.m, `b z-m${t.milestone ? ' t-a' : ''}`, 26, 'middle', true);
    const bd = para(x, cy + 86 + nm.height, t.text, col - 16, s.xs, 'z-xs t-m', 24, 'middle');
    maxH = Math.max(maxH, 86 + nm.height + bd.height);
    return { x, nm, bd, t };
  });
  if (steps[4] && steps[4].milestone) w += rect(col * 4 + 4, cy - 52, col - 8, maxH + 64, 'f-tint', 16);
  parts.forEach(({ x, nm, bd, t }) => {
    w += circle(x, cy, 38, t.milestone ? 'f-acc' : 'f-bg');
    w += circle(x, cy, 38, t.milestone ? 's-acc' : 's-line');
    w += icon(t.icon, x - 18, cy - 18, 0.9, t.milestone ? 's-on' : 's-acc');
    w += nm.svg + bd.svg;
  });
  // The three-month span, from Live to Hand-over.
  const by = cy + maxH + 34;
  w += line(col * 3.5, by, col * 5.5, by, 's-muted', 2) + line(col * 3.5, by - 8, col * 3.5, by + 8, 's-muted', 2) + line(col * 5.5, by - 8, col * 5.5, by + 8, 's-muted', 2);
  w += text(col * 4.5, by + 30, 'within three months', 'sb z-xs t-m', 0, 'middle');
  const wide = svgOpen(ID, 'w', by + 40, title, desc) + '\n' + w;

  // Narrow: a vertical line of stages.
  const N = 400, n = SIZE.n, X = 30;
  const tl = para(0, 26, title, N, n.xl, 'b z-xl', 28, 'start', true);
  let v = tl.svg;
  let y = 26 + tl.height - 28 + 24;
  const ld = para(0, y, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  y += ld.height + 14;
  const y0 = y;
  let lastY = y;
  let rowsSvg = '';
  steps.forEach((t, i) => {
    const nm = para(76, y + 26, t.name, N - 90, n.l, `b z-l${t.milestone ? ' t-a' : ''}`, 23, 'start', true);
    const bd = para(76, y + 26 + nm.height, t.text, N - 90, n.m, 'z-m t-m', 21);
    const h = Math.max(26 + nm.height + bd.height, 64);
    if (t.milestone) rowsSvg += rect(0, y - 8, N, h + 14, 'f-tint', 12);
    lastY = y;
    rowsSvg += circle(X, y + 20, 26, t.milestone ? 'f-acc' : 'f-bg') + circle(X, y + 20, 26, t.milestone ? 's-acc' : 's-line');
    rowsSvg += icon(t.icon, X - 13, y + 7, 0.65, t.milestone ? 's-on' : 's-acc') + nm.svg + bd.svg;
    if (i === steps.length - 1) rowsSvg += para(76, y + h + 22, 'Live to hand-over: within three months.', N - 90, n.s, 'sb z-s t-m', 19).svg;
    y += h + 22;
  });
  v += line(X, y0 + 20, X, lastY + 20, 's-line', 3) + rowsSvg;
  const narrow = svgOpen(ID, 'n', y + 14, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}, as described in <a href="${SRC}">start with an interview</a>. ${esc(lead)}</p>`,
    '<ol>',
    ...steps.map((t) => `<li><strong>${esc(t.name)}${t.milestone ? ' (the milestone)' : ''}.</strong> ${esc(t.text)}</li>`),
    '</ol>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

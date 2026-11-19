// Figure: how it works, in seven steps: asking for a site, then the six steps from the interview to the hand-over.
// Data: copy.steps[] {title, line, who} (the six steps), copy.cta.ask, copy.figures.how-it-works.{title,lead,first} (all optional).
// Set copy.figures.how-it-works.first to false to drop the first step ("Ask for a site") and show the six alone.
// Source of the steps: https://newsroom.sgit.ai/articles/start-with-an-interview.html
import { esc, get, fromCopy, para, text, rect, circle, line, svgOpen, wrapFigure, SIZE, mdPlain, mdHtml, copyList, word } from './_shared.mjs';

const ID = 'how-it-works';
const SRC = 'https://newsroom.sgit.ai/articles/start-with-an-interview.html';
const FIRST = { title: 'Ask for a site', line: 'Ask for a site at the launch price, or apply for a free evaluation site.', who: 'You' };
const SIX = [
  { title: 'The interview', line: 'Claude asks what the site is for, the sections you want, your material and the sites you like.', who: 'You and Claude' },
  { title: 'Five designs', line: 'A team of agents makes five designs from your material.', who: 'The agent team' },
  { title: 'You choose', line: 'You pick one design and say what to change.', who: 'You' },
  { title: 'Live', line: 'The site goes live at its address, with HTTPS, after the checks pass.', who: 'The agent team' },
  { title: 'Your first change, made together', line: 'You ask your own Claude for a change, it goes live, and we both see it.', who: 'You, your Claude, and us' },
  { title: 'Hand-over', line: 'The repository moves to your GitHub account, within three months at the latest.', who: 'Us, to you' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const cs = copyList(copy, 'steps');
  const six = (cs || SIX).map((x, i) => ({ title: mdPlain(x.title || (SIX[i] || {}).title || ''), line: mdPlain(x.line || ''), lineHtml: mdHtml(x.line || ''), who: mdPlain(x.who || '') }));
  const first = { ...FIRST, title: get(copy, 'cta.ask', FIRST.title), lineHtml: esc(FIRST.line) };
  const steps = fromCopy(copy, ID, 'first', true) === false ? six : [first, ...six];
  const milestone = steps.findIndex((x) => /first change/i.test(x.title));
  const title = fromCopy(copy, ID, 'title', 'How it works');
  const lead = fromCopy(copy, ID, 'lead', `From asking for a site to changing it yourself, in ${word(steps.length)} steps.`);
  const desc = `${title}. ${lead} ${steps.map((t, i) => `Step ${i + 1}, ${t.title}: ${t.line}${t.who ? ` Who: ${t.who}.` : ''}`).join(' ')}`;

  // Wide: an overview strip of numbered dots, then one row per step.
  const s = SIZE.w, W = 960;
  let w = text(0, 40, title, 'b z-xl', 0) + text(0, 76, lead, 't-m z-m', 0);
  const gapX = (W - 120) / (steps.length - 1), sy = 130;
  let labH = 0;
  w += line(60, sy, W - 60, sy, 's-line', 4);
  steps.forEach((t, i) => {
    const x = 60 + i * gapX;
    const hot = i === milestone;
    w += circle(x, sy, 26, hot ? 'f-acc' : 'f-bg') + circle(x, sy, 26, hot ? 's-acc' : 's-acc');
    w += text(x, sy + 9, String(i + 1), `b z-m ${hot ? 't-on' : 't-a'}`, 0, 'middle');
    const lab = para(x, sy + 58, t.title, gapX - 12, s.xs, `sb z-xs${hot ? ' t-a' : ''}`, 23, 'middle', true);
    labH = Math.max(labH, lab.height);
    w += lab.svg;
  });
  let y = sy + 40 + labH + 30;
  const TX = 90, WHO = 250, TW = W - TX - WHO - 30;
  steps.forEach((t, i) => {
    const hot = i === milestone;
    const nm = para(TX, y + 40, t.title, TW, s.m, `b z-m${hot ? ' t-a' : ''}`, 28, 'start', true);
    const bd = para(TX, y + 40 + nm.height + 2, t.line, TW, s.xs, 'z-xs t-m', 25);
    const wh = t.who ? para(W - WHO + 14, y + 40, t.who, WHO - 28, s.xs, 'sb z-xs', 24) : null;
    const h = Math.max(40 + nm.height + bd.height + 6, wh ? 40 + wh.height + 10 : 0, 80);
    w += rect(0, y, W, h, hot ? 'f-tint' : 'f-soft', 14);
    w += circle(44, y + 34, 22, hot ? 'f-acc' : 'f-bg') + text(44, y + 42, String(i + 1), `b z-m ${hot ? 't-on' : 't-a'}`, 0, 'middle');
    if (wh) w += rect(W - WHO, y + 12, WHO - 14, wh.height + 24, 'f-tint', 10) + wh.svg;
    w += nm.svg + bd.svg;
    y += h + 12;
  });
  const wide = svgOpen(ID, 'w', y - 8, title, desc) + '\n' + w;

  // Narrow: a numbered column with a connecting line.
  const N = 400, n = SIZE.n, X = 22;
  let v = text(0, 28, title, 'b z-xl', 0);
  const ld = para(0, 56, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  let yy = 56 + ld.height + 4;
  const y0 = yy;
  let rows = '';
  steps.forEach((t, i) => {
    const hot = i === milestone;
    const nm = para(56, yy + 26, t.title, N - 66, n.l, `b z-l${hot ? ' t-a' : ''}`, 23, 'start', true);
    const bd = para(56, yy + 26 + nm.height, t.line, N - 66, n.m, 'z-m t-m', 21);
    const wh = t.who ? para(56, yy + 26 + nm.height + bd.height + 4, t.who, N - 66, n.s, 'sb z-s', 19) : { svg: '', height: 0 };
    const h = 26 + nm.height + bd.height + wh.height + 10;
    if (hot) rows += rect(44, yy - 4, N - 44, h + 6, 'f-tint', 10);
    rows += circle(X, yy + 20, 20, hot ? 'f-acc' : 'f-bg') + circle(X, yy + 20, 20, 's-acc');
    rows += text(X, yy + 26, String(i + 1), `b z-m ${hot ? 't-on' : 't-a'}`, 0, 'middle') + nm.svg + bd.svg + wh.svg;
    yy += h + 6;
  });
  v += line(X, y0 + 20, X, yy - 40, 's-line', 3) + rows;
  const narrow = svgOpen(ID, 'n', yy, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}: ${esc(lead.charAt(0).toLowerCase() + lead.slice(1))} The steps follow <a href="${SRC}">start with an interview</a>.</p>`,
    '<ol>',
    ...steps.map((t, i) => `<li><strong>${esc(t.title)}${i === milestone ? ' (the milestone)' : ''}.</strong> ${t.lineHtml}${t.who ? ` Who: ${esc(t.who)}.` : ''}</li>`),
    '</ol>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

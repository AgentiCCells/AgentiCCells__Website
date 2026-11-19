// Figure: the five tenets of owning a website (hold, control, change, run anywhere, keep).
// Data: copy.tenets[] {word,line}, copy.one_idea, copy.figures.tenets.{title,lead,line} (all optional). Source of the words: the pivot brief,
// https://newsroom.sgit.ai/articles/the-sovereign-website.html
import { esc, get, fromCopy, para, text, rect, circle, icon, svgOpen, wrapFigure, SIZE, mdPlain, copyList } from './_shared.mjs';

const ID = 'tenets';
const BRIEF = 'https://newsroom.sgit.ai/articles/the-sovereign-website.html';

const DEFAULT_ITEMS = [
  { key: 'hold', name: 'You hold it', text: 'Your own GitHub repository, with every change since the first.' },
  { key: 'control', name: 'You control it', text: 'No platform, no subscription, no terms but yours.' },
  { key: 'change', name: 'You change it', text: 'Talk to your own Claude. Every change can be undone.' },
  { key: 'anywhere', name: 'You can run it anywhere', text: 'Plain static files, on any host, in any region.' },
  { key: 'keep', name: 'You keep it', text: 'It stays yours, even if we disappear.' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'The five tenets of owning a website');
  const lead = fromCopy(copy, ID, 'lead', get(copy, 'one_idea', 'A website you own, control and can take anywhere.'));
  const band = fromCopy(copy, ID, 'line', 'Where it is hosted is not sovereignty. Being able to move it is.');
  // Words from next/copy.json (tenets[]: { word, line: "You hold it: ..." }) when the writer has them.
  const fromCopyList = copyList(copy, 'tenets') || [];
  const items = DEFAULT_ITEMS.map((d, i) => {
    const c = fromCopyList[i];
    if (!c || !c.line) return d;
    const [head, ...rest] = mdPlain(c.line).split(':');
    const body = rest.join(':').trim();
    return body ? { ...d, name: head.trim(), text: body.charAt(0).toUpperCase() + body.slice(1) } : { ...d, text: mdPlain(c.line) };
  });
  const desc = `${title}. ${items.map((t) => `${t.name}: ${t.text}`).join(' ')} ${band}`;

  // Wide: five cards in a row.
  const W = 960, gap = 20, cw = (W - gap * 4) / 5, pad = 18, s = SIZE.w;
  let w = '';
  w += text(0, 40, title, 'b z-l', 0);
  w += text(0, 74, lead, 't-m z-m', 0);
  const top = 104;
  const cards = items.map((t, i) => {
    const x = i * (cw + gap);
    const name = para(x + pad, top + 120, t.name, cw - pad * 2, s.m, 'b z-m', 27, 'start', true);
    const body = para(x + pad, top + 132 + name.height, t.text, cw - pad * 2, s.s, 'z-s t-m', 26);
    return { x, name, body, h: 132 + name.height + body.height + 8 };
  });
  const ch = Math.max(...cards.map((c) => c.h));
  cards.forEach((c, i) => {
    w += rect(c.x, top, cw, ch, 'f-tint', 14);
    w += circle(c.x + pad + 22, top + 46, 30, 'f-bg');
    w += icon(items[i].key, c.x + pad + 4, top + 28, 0.9, 's-acc');
    w += text(c.x + cw - pad, top + 36, String(i + 1), 'b z-l t-a', 0, 'end');
    w += c.name.svg + c.body.svg;
  });
  const by = top + ch + 24;
  w += rect(0, by, W, 64, 'f-acc', 14);
  w += text(W / 2, by + 40, band, 'sb z-m t-on', 0, 'middle');
  const wide = svgOpen(ID, 'w', by + 66, title, desc) + '\n' + w;

  // Narrow: five rows.
  const N = 400, n = SIZE.n;
  let v = '';
  const tl = para(0, 26, title, N, n.xl, 'b z-xl', 29, 'start', true);
  v += tl.svg;
  let y = 26 + tl.height - 29 + 26;
  const ld = para(0, y, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  y += ld.height + 6;
  items.forEach((t, i) => {
    const nm = para(76, y + 34, t.name, N - 92, n.l, 'b z-l', 23, 'start', true);
    const bd = para(76, y + 34 + nm.height, t.text, N - 92, n.m, 'z-m t-m', 21);
    const h = 34 + nm.height + bd.height + 6;
    v += rect(0, y, N, Math.max(h, 92), 'f-tint', 12);
    v += circle(38, y + 40, 26, 'f-bg');
    v += icon(t.key, 22, y + 24, 0.8, 's-acc');
    v += text(N - 14, y + 30, String(i + 1), 'b z-l t-a', 0, 'end');
    v += nm.svg + bd.svg;
    y += Math.max(h, 92) + 10;
  });
  const bl = para(N / 2, y + 30, band, N - 32, n.m, 'sb z-m t-on', 21, 'middle');
  v += rect(0, y, N, bl.height + 30, 'f-acc', 12) + bl.svg;
  const narrow = svgOpen(ID, 'n', y + bl.height + 32, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}, as set out in <a href="${BRIEF}">the sovereign website brief</a>:</p>`,
    '<ol>',
    ...items.map((t) => `<li><strong>${esc(t.name)}.</strong> ${esc(t.text)}</li>`),
    '</ol>',
    `<p>${esc(band)}</p>`,
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

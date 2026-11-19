// Figure: the agents behind it, with you at the centre deciding.
// Data: copy.team[] {role,does,plain}, copy.figures.team.{title,lead,you,note} (all optional).
// Each role keeps its name and gets a short plain-words line under it (copy.team[].plain wins when the writer sets one).
// Source of the roles: https://newsroom.sgit.ai/articles/partners-sell-we-build.html and the team's own role files.
import { esc, get, fromCopy, para, text, rect, icon, line, svgOpen, wrapFigure, SIZE, mdPlain, copyList } from './_shared.mjs';

const ID = 'team';
const SRC = 'https://newsroom.sgit.ai/articles/partners-sell-we-build.html';
const ROLES = [
  { key: 'conductor', role: 'Conductor', plain: 'The project lead', text: 'Takes your brief, plans the work and hands it out.' },
  { key: 'design', role: 'Designer', plain: 'Makes the look', text: 'Makes the five designs and the figures.' },
  { key: 'code', role: 'Developer', plain: 'Builds the site', text: 'Builds the site and the checks it must pass.' },
  { key: 'write', role: 'Writer', plain: 'Writes the words', text: 'Writes every word, in plain English.' },
  { key: 'research', role: 'Researcher', plain: 'Checks the facts', text: 'Finds the facts, each with its source.' },
  { key: 'review', role: 'Reviewer', plain: 'A second reader', text: 'Reads the work before anything goes live.' },
  { key: 'shield', role: 'Security', plain: 'Looks for risks', text: 'Looks for leaks and weak points.' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'The team behind your site');
  const lead = fromCopy(copy, ID, 'lead', 'Seven agents, each with its own policy and key. You decide.');
  const you = fromCopy(copy, ID, 'you', 'You choose the design and approve every change.');
  const note = fromCopy(copy, ID, 'note', 'Each agent works under a written behaviour policy and signs its work with its own key.');
  // Words from next/copy.json (team[]: { role, does }), matched by the role's first word; the rest keep this figure's words.
  const ct = copyList(copy, 'team') || [];
  const roles = ROLES.map((d) => {
    const c = ct.find((x) => String(x.role || '').toLowerCase().split(' ')[0] === d.role.toLowerCase());
    return c ? { ...d, role: mdPlain(c.role), plain: mdPlain(c.plain || d.plain), text: mdPlain(c.does || d.text) } : d;
  });
  const desc = `${title}. ${lead} At the centre, you: ${you} Around you: ${roles.map((r) => `${r.role} (${r.plain.toLowerCase()}): ${r.text}`).join(' ')} ${note}`;

  // Wide: you in the middle, the conductor above, three agents each side.
  const s = SIZE.w, W = 960, bw = 280, top = 104;
  const box = (x, y, r) => {
    const nm = text(x + 72, y + 38, r.role, 'b z-m', 0) + text(x + 72, y + 64, r.plain, 'sb z-xs t-a', 0);
    const bd = para(x + 72, y + 94, r.text, bw - 88, s.xs, 'z-xs t-m', 24);
    const h = Math.max(94 + bd.height - 6, 110);
    return { h, svg: rect(x, y, bw, h, 'f-bg', 14) + rect(x, y, bw, h, 's-line', 14) + icon(r.key, x + 18, y + 20, 0.9, 's-acc') + nm + bd.svg, cx: x + bw / 2, cy: y + h / 2 };
  };
  const placed = [];
  placed.push(box((W - bw) / 2, top, roles[0]));
  const column = (x, ks) => { let yc = top; ks.forEach((k) => { const b = box(x, yc, roles[k]); placed.push(b); yc += b.h + 18; }); return yc - 18; };
  const leftEnd = column(0, [1, 2, 3]);
  const rightEnd = column(W - bw, [4, 5, 6]);
  const ut = para(W / 2, 0, you, 260, s.s, 'z-s t-on', 25, 'middle');
  const uh = 104 + ut.height + 6;
  const ux = (W - 300) / 2;
  const uy = Math.max(top + placed[0].h + 50, (top + Math.max(leftEnd, rightEnd)) / 2 - uh / 2 + 40);
  const ut2 = para(W / 2, uy + 106, you, 260, s.s, 'z-s t-on', 25, 'middle');
  let w = text(0, 40, title, 'b z-l', 0) + text(0, 74, lead, 't-m z-m', 0);
  placed.forEach((p, i) => {
    const tx = i === 0 ? W / 2 : i <= 3 ? ux : ux + 300;
    const ty = i === 0 ? uy : uy + uh / 2;
    const sx = i === 0 ? W / 2 : i <= 3 ? bw : W - bw;
    const sy = i === 0 ? top + p.h : p.cy;
    w += line(sx, sy, tx, ty, 's-line', 2.5, i === 0 ? '' : '6 6');
  });
  w += placed.map((p) => p.svg).join('');
  w += rect(ux, uy, 300, uh, 'f-acc', 18) + icon('person', W / 2 - 20, uy + 14, 1, 's-on') + text(W / 2, uy + 80, 'You', 'b z-l t-on', 0, 'middle') + ut2.svg;
  const bottom = Math.max(leftEnd, rightEnd, uy + uh) + 50;
  const nt = para(W / 2, bottom, note, W, s.s, 'z-s t-m', 26, 'middle');
  w += nt.svg;
  const wide = svgOpen(ID, 'w', bottom + nt.height, title, desc) + '\n' + w;

  // Narrow: you on top, then the seven agents in a column.
  const N = 400, n = SIZE.n;
  const tl = para(0, 26, title, N, n.xl, 'b z-xl', 28, 'start', true);
  let v = tl.svg;
  let y = 26 + tl.height - 28 + 24;
  const ld = para(0, y, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  y += ld.height + 6;
  const yt = para(80, y + 56, you, N - 96, n.m, 'z-m t-on', 21);
  const yh = 56 + yt.height + 8;
  v += rect(0, y, N, yh, 'f-acc', 14) + icon('person', 20, y + 16, 1, 's-on') + text(80, y + 34, 'You', 'b z-l t-on', 0) + yt.svg;
  y += yh + 14;
  const y0 = y;
  let rows = '';
  roles.forEach((r) => {
    const bd = para(80, y + 72, r.text, N - 96, n.m, 'z-m t-m', 21);
    const h = 72 + bd.height - 21 + 14;
    rows += rect(44, y, N - 44, h, 'f-bg', 10) + rect(44, y, N - 44, h, 's-line', 10);
    rows += icon(r.key, 56, y + 12, 0.55, 's-acc') + text(88, y + 30, r.role, 'b z-l', 0) + text(88, y + 51, r.plain, 'sb z-s t-a', 0) + bd.svg;
    rows += line(20, y + 24, 44, y + 24, 's-line', 2);
    y += h + 10;
  });
  v += line(20, y0 - 14, 20, y - 10 - 30, 's-line', 2) + rows;
  const nt2 = para(0, y + 16, note, N, n.s, 'z-s t-m', 19);
  v += nt2.svg;
  const narrow = svgOpen(ID, 'n', y + 16 + nt2.height, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}: the roles, as in <a href="${SRC}">partners sell, we build</a>. ${esc(lead)}</p>`,
    '<ul>',
    `<li><strong>You</strong>, at the centre: ${esc(you)}</li>`,
    ...roles.map((r) => `<li><strong>${esc(r.role)}</strong> (${esc(r.plain.toLowerCase())}): ${esc(r.text)}</li>`),
    '</ul>',
    `<p>${esc(note)}</p>`,
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

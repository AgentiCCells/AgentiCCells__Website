// Figure: what there is to attack. A platform site (server code, database, logins, plugins, admin panel, payment pages,
// all reachable from the internet) against your static site (files only), then what is still yours to protect.
// For /next/security/ ({{figure:attack-surface}}).
// Data: copy.offer_title, copy.figures.attack-surface.{title, lead, platform, own, own_line, still, note} (all optional).
// Sources of the words: https://newsroom.sgit.ai/articles/the-pitch.html ("No server code, no database, no plugins, no cookies
// unless you add them") and https://newsroom.sgit.ai/articles/static-against-the-platforms.html. No numbers: we claim none.
// Owner: designer.agenticcells-ai@AgentiCCells.dinis. Licence: Apache-2.0 (code), CC BY 4.0 (words).
import { esc, get, fromCopy, para, text, rect, icon, svgOpen, wrapFigure, SIZE } from './_shared.mjs';

const ID = 'attack-surface';
const PITCH = 'https://newsroom.sgit.ai/articles/the-pitch.html';
const STATIC = 'https://newsroom.sgit.ai/articles/static-against-the-platforms.html';

const PLATFORM = [
  { icon: 'code', name: 'Server code', line: 'Runs for every visitor' },
  { icon: 'keep', name: 'Database', line: 'Can be injected into' },
  { icon: 'lock', name: 'Logins', line: 'Passwords to guess' },
  { icon: 'designs', name: 'Plugins', line: 'Flaws to patch fast' },
  { icon: 'control', name: 'Admin panel', line: 'A page to break into' },
  { icon: 'doc', name: 'Payment pages', line: 'Takes card details' },
];
const STILL = [
  { icon: 'repo', name: 'Your GitHub account', line: 'Whoever controls it controls the site. Use two-factor sign-in.' },
  { icon: 'mail', name: 'Your email', line: 'It can reset your other passwords. Protect it the same way.' },
  { icon: 'anywhere', name: 'Your domain registrar', line: 'Whoever controls it controls where your address points.' },
  { icon: 'person', name: 'Who you give access to', line: 'A partner or anyone you add to the repository can change the site.' },
];

export default function (data = {}) {
  const copy = data.copy || {};
  const ours = String(get(copy, 'offer_title', 'Your own website'));
  const title = fromCopy(copy, ID, 'title', 'What there is to attack');
  const lead = fromCopy(copy, ID, 'lead', 'A platform site runs software for every visitor. Your static site is files.');
  const platH = fromCopy(copy, ID, 'platform', 'A platform site');
  const platLine = 'All online, all to patch and watch.';
  const ownH = fromCopy(copy, ID, 'own', 'Your static site');
  const ownLine = fromCopy(copy, ID, 'own_line', 'Pages, styles and images, served as they are. The host runs its own servers; there is no server code, database, login or plugin of yours.');
  const stillH = fromCopy(copy, ID, 'still', 'Still yours to protect');
  const note = fromCopy(copy, ID, 'note', 'Fewer moving parts is not no risk: the risk moves to the accounts that control the site.');
  const desc = `${title}. ${lead} ${platH}: ${PLATFORM.map((p) => `${p.name}, ${p.line.toLowerCase()}`).join('; ')}. ${platLine} ${ownH} (${ours}): files only. ${ownLine} ${stillH}: ${STILL.map((p) => `${p.name}: ${p.line}`).join(' ')} ${note}`;

  // Wide (960): two columns, then a band of four.
  const s = SIZE.w, W = 960;
  let w = text(0, 40, title, 'b z-l', 0) + text(0, 74, lead, 't-m z-m', 0);
  const top = 100, LW = 580, RX = LW + 20, RW = W - RX;
  // Left: the platform.
  w += rect(0, top, LW, 72, 'f-wtint', 12) + icon('rent', 18, top + 16, 1, 's-warn') + text(72, top + 34, platH, 'b z-m t-w', 0) + text(72, top + 60, platLine, 'z-xs t-m', 0);
  const tw = (LW - 12) / 2, th = 78, gy = top + 72 + 12;
  PLATFORM.forEach((p, i) => {
    const x = (i % 2) * (tw + 12), y = gy + Math.floor(i / 2) * (th + 10);
    w += rect(x, y, tw, th, 'f-soft', 10) + rect(x, y, 6, th, 'f-warn', 3);
    w += icon(p.icon, x + 18, y + 19, 0.8, 's-warn');
    w += text(x + 64, y + 34, p.name, 'b z-m', 0) + text(x + 64, y + 60, p.line, 'z-xs t-m', 0);
  });
  const gridEnd = gy + 3 * (th + 10) - 10;
  // Right: your static site, files only.
  w += rect(RX, top, RW, 72, 'f-gtint', 12) + icon('own', RX + 18, top + 16, 1, 's-good') + text(RX + 72, top + 34, ownH, 'b z-m t-g', 0) + text(RX + 72, top + 60, ours, 'z-xs t-m', 0);
  const fy = top + 72 + 12, fh = gridEnd - fy;
  w += rect(RX, fy, RW, fh, 'f-bg', 12) + rect(RX, fy, RW, fh, 's-good', 12);
  w += icon('doc', RX + 20, fy + 20, 1.1, 's-good') + text(RX + 76, fy + 50, 'Files only', 'b z-xl t-g', 0);
  w += para(RX + 20, fy + 100, ownLine, RW - 40, s.s, 'z-s', 27).svg;
  // Band: still yours to protect.
  let y = gridEnd + 34;
  w += text(0, y + 22, stillH, 'b z-m', 0);
  y += 40;
  const bw = (W - 3 * 12) / 4;
  const nameH = Math.max(...STILL.map((p) => para(0, 0, p.name, bw - 32, s.s, '', 24, 'start', true).height));
  const bodyH = Math.max(...STILL.map((p) => para(0, 0, p.line, bw - 32, s.xs, '', 24).height));
  const bh2 = 74 + nameH + bodyH + 8;
  STILL.forEach((p, i) => {
    const x = i * (bw + 12);
    w += rect(x, y, bw, bh2, 'f-tint', 12) + icon(p.icon, x + 16, y + 16, 0.8, 's-acc');
    w += para(x + 16, y + 74, p.name, bw - 32, s.s, 'b z-s', 24, 'start', true).svg;
    w += para(x + 16, y + 74 + nameH + 2, p.line, bw - 32, s.xs, 'z-xs t-m', 24).svg;
  });
  y += bh2 + 34;
  const nt = para(0, y, note, W, s.s, 'z-s t-m', 26);
  w += nt.svg;
  const wide = svgOpen(ID, 'w', y + nt.height, title, desc) + '\n' + w;

  // Narrow (400): stacked.
  const N = 400, n = SIZE.n;
  const tl = para(0, 26, title, N, n.xl, 'b z-xl', 28, 'start', true);
  let v = tl.svg;
  let yy = 26 + tl.height - 28 + 24;
  const ld = para(0, yy, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  yy += ld.height + 4;
  const pl = para(56, yy + 50, platLine, N - 68, n.s, 'z-s t-m', 19);
  const ph = 50 + pl.height + 6;
  v += rect(0, yy, N, ph, 'f-wtint', 10) + icon('rent', 12, yy + 10, 0.8, 's-warn') + text(56, yy + 28, platH, 'b z-l t-w', 0) + pl.svg;
  yy += ph + 8;
  const nw = (N - 8) / 2, nh = 66;
  PLATFORM.forEach((p, i) => {
    const x = (i % 2) * (nw + 8), y2 = yy + Math.floor(i / 2) * (nh + 8);
    v += rect(x, y2, nw, nh, 'f-soft', 8) + rect(x, y2, 5, nh, 'f-warn', 2);
    v += text(x + 14, y2 + 26, p.name, 'b z-m', 0);
    v += para(x + 14, y2 + 48, p.line, nw - 22, n.s, 'z-s t-m', 18).svg;
  });
  yy += 3 * (nh + 8) + 6;
  const ol = para(14, yy + 92, ownLine, N - 28, n.s, 'z-s', 19);
  const oh = 92 + ol.height + 4;
  v += rect(0, yy, N, oh, 'f-gtint', 10) + rect(0, yy, N, oh, 's-good', 10);
  v += icon('own', 12, yy + 10, 0.8, 's-good') + text(56, yy + 28, ownH, 'b z-l t-g', 0) + text(56, yy + 48, ours, 'z-s t-m', 0);
  v += text(14, yy + 74, 'Files only', 'b z-l t-g', 0) + ol.svg;
  yy += oh + 22;
  v += text(0, yy + 6, stillH, 'b z-l', 0);
  yy += 18;
  STILL.forEach((p) => {
    const bd = para(56, yy + 46, p.line, N - 68, n.s, 'z-s t-m', 19);
    const h = 46 + bd.height + 2;
    v += rect(0, yy, N, h, 'f-tint', 10) + icon(p.icon, 12, yy + 12, 0.7, 's-acc') + text(56, yy + 26, p.name, 'b z-m', 0) + bd.svg;
    yy += h + 8;
  });
  const nt2 = para(0, yy + 16, note, N, n.s, 'z-s t-m', 19);
  v += nt2.svg;
  const narrow = svgOpen(ID, 'n', yy + 16 + nt2.height, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}. ${esc(lead)} The comparison follows <a href="${PITCH}">the pitch</a> and <a href="${STATIC}">static against the platforms</a>.</p>`,
    '<table>',
    `<thead><tr><th scope="col">Part</th><th scope="col">${esc(platH)}</th><th scope="col">${esc(ownH)}</th></tr></thead>`,
    '<tbody>',
    ...PLATFORM.map((p) => `<tr><th scope="row">${esc(p.name)}</th><td>Yes, online: ${esc(p.line.toLowerCase())}.</td><td>None of yours.</td></tr>`),
    `<tr><th scope="row">Files</th><td>Yes, alongside all of the above.</td><td>Yes: ${esc(ownLine)}</td></tr>`,
    '</tbody>',
    '</table>',
    `<p>${esc(stillH)}:</p>`,
    '<ul>',
    ...STILL.map((p) => `<li><strong>${esc(p.name)}</strong>: ${esc(p.line)}</li>`),
    '</ul>',
    `<p>${esc(note)}</p>`,
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

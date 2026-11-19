// Figure: an agentic cell. One session holds a conductor and six agents, each with a role; the owner stays outside and
// talks to the conductor. Underneath, the three places the session can run: a laptop or a cloud session (today), a
// Raspberry Pi and an Android tablet (both planned: the appliance is a plan, a Kickstarter campaign not yet launched).
// Data: copy.figures.cell.{title, lead, session, owner, owner_line, link_label, places_title} and
// copy.figures.cell.roles[] {role, plain} (all optional; the defaults below are the roles of the article).
// Sources: https://newsroom.sgit.ai/articles/a-website-with-a-team-inside.html (the seven roles) and
// https://newsroom.sgit.ai/articles/launching-the-sovereign-website-appliance.html (the devices, a plan).
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round R1). Code under Apache-2.0.
import { esc, fromCopy, para, text, rect, line, svgOpen, wrapFigure, SIZE, mdPlain, wrap, fit } from './_shared.mjs';

const ID = 'cell';
const ROLES_SRC = 'https://newsroom.sgit.ai/articles/a-website-with-a-team-inside.html';
const DEVICES_SRC = 'https://newsroom.sgit.ai/articles/launching-the-sovereign-website-appliance.html';
const ROLES = [
  { role: 'Conductor', plain: 'Talks with you, plans the work and hands it out' },
  { role: 'Designer', plain: 'Layouts and images' },
  { role: 'Writer', plain: 'The words, in your voice' },
  { role: 'Developer', plain: 'Builds the change and keeps the checks green' },
  { role: 'Reviewer', plain: 'Checks prices, claims, privacy and security' },
  { role: 'Translator', plain: 'Every language the site is in' },
  { role: 'Keeper', plain: 'Weekly care: links, speed, the domain' },
];
const PLACES = [
  { key: 'laptop', name: 'A laptop or a cloud session', status: 'Today', planned: false },
  { key: 'pi', name: 'A Raspberry Pi', status: 'Planned', planned: true },
  { key: 'tablet', name: 'An Android tablet', status: 'Planned', planned: true },
];
// Device icons in a 40 x 40 box, drawn as strokes like the shared icons.
const DEV = {
  laptop: 'M8 9 L32 9 L32 26 L8 26 Z M3 30 L37 30 L35 34 L5 34 Z',
  pi: 'M5 9 L35 9 L35 31 L5 31 Z M9 13 L31 13 M12 18 L21 18 L21 27 L12 27 Z M25 19 L31 19 L31 27 L25 27 Z',
  tablet: 'M10 4 L30 4 Q33 4 33 7 L33 33 Q33 36 30 36 L10 36 Q7 36 7 33 L7 7 Q7 4 10 4 Z M17 32 L23 32',
  person: 'M20 6 A6 6 0 1 0 20 18 A6 6 0 1 0 20 6 Z M8 35 Q8 23 20 23 Q32 23 32 35',
};
const dev = (k, x, y, s, cls) => `<path class="${cls} ic" style="stroke-width:${(2.5 / s).toFixed(2)}px" transform="translate(${x} ${y}) scale(${s})" d="${DEV[k]}"/>`;
const arrow = (x, y, dir, cls) => (dir === 'right' ? `<path class="${cls}" d="M${x - 12} ${y - 7} L${x} ${y} L${x - 12} ${y + 7} Z"/>` : `<path class="${cls}" d="M${x - 7} ${y - 12} L${x} ${y} L${x + 7} ${y - 12} Z"/>`);
const dashed = (x, y, w, h, r = 14) => `<rect class="s-muted" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" style="stroke-width:2px" stroke-dasharray="7 6"/>`;

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'An agentic cell: one session, a small team');
  const lead = fromCopy(copy, ID, 'lead', 'A conductor and six agents, each with a role, a brief and a behaviour policy.');
  const session = fromCopy(copy, ID, 'session', 'One session, in your own accounts');
  const owner = fromCopy(copy, ID, 'owner', 'You');
  const ownerLine = fromCopy(copy, ID, 'owner_line', 'The owner, outside the session. Nothing goes live until you say yes.');
  const ask = fromCopy(copy, ID, 'link_label', 'plain words');
  const placesTitle = fromCopy(copy, ID, 'places_title', 'Where the session can run');
  const cr = fromCopy(copy, ID, 'roles', null);
  const roles = Array.isArray(cr) && cr.length >= 2 ? cr.slice(0, 8).map((r, i) => ({ role: mdPlain(r.role || (ROLES[i] || {}).role || ''), plain: mdPlain(r.plain || r.does || (ROLES[i] || {}).plain || '') })) : ROLES;
  const [cond, ...agents] = roles;
  const desc = `${title}. ${lead} ${session}: in the middle, the ${cond.role.toLowerCase()} (${cond.plain.toLowerCase()}); around it, ${agents.map((a) => `the ${a.role.toLowerCase()} (${a.plain.toLowerCase()})`).join(', ')}. Outside the session, ${owner.toLowerCase() === 'you' ? 'you, the owner' : owner}, talking to the ${cond.role.toLowerCase()} in ${ask}. ${placesTitle}: ${PLACES.map((p) => `${p.name.toLowerCase()} (${p.status.toLowerCase()})`).join(', ')}. The devices are a plan, not yet a product.`;

  // ---------- wide (960) ----------
  const s = SIZE.w, W = 960;
  const y0 = 104, sx = 220, sw = W - sx, pad = 20, gap = 20;
  const colW = (sw - 2 * pad - 2 * gap) / 3;
  const cols = [sx + pad, sx + pad + colW + gap, sx + pad + 2 * (colW + gap)];
  const boxH = (w, r) => 44 + wrap(r.plain, fit(w - 32, s.xs)).length * 24 + 8;
  const box = (x, y, w, h, r, main) => (main
    ? rect(x, y, w, h, 'f-acc', 14) + text(x + 16, y + 34, r.role, 'b z-m t-on', 0) + para(x + 16, y + 62, r.plain, w - 32, s.xs, 'z-xs t-on', 24).svg
    : rect(x, y, w, h, 'f-bg', 12) + rect(x, y, w, h, 's-line', 12) + text(x + 16, y + 34, r.role, 'b z-m', 0) + para(x + 16, y + 62, r.plain, w - 32, s.xs, 'z-xs t-m', 24).svg);
  const top = agents.slice(0, Math.ceil(agents.length / 2));
  const bot = agents.slice(Math.ceil(agents.length / 2));
  const r1y = y0 + 58;
  const h1 = Math.max(...top.map((r) => boxH(colW, r)));
  const condW = 300, condX = sx + sw / 2 - condW / 2;
  const r2y = r1y + h1 + 44;
  const h2 = boxH(condW, cond);
  const r3y = r2y + h2 + 44;
  const h3 = bot.length ? Math.max(...bot.map((r) => boxH(colW, r))) : 0;
  const sBottom = (bot.length ? r3y + h3 : r2y + h2) + 22;
  const ccx = sx + sw / 2, ccy = r2y + h2 / 2;
  let w = text(0, 40, title, 'b z-l', 0) + text(0, 74, lead, 't-m z-m', 0);
  w += rect(sx, y0, sw, sBottom - y0, 'f-tint', 20) + rect(sx, y0, sw, sBottom - y0, 's-acc', 20);
  w += text(sx + pad, y0 + 34, session, 'sb z-xs t-a', 0);
  const placeRow = (list, y, h) => list.map((r, i) => ({ r, x: cols[i] + (list.length < 3 ? (3 - list.length) * (colW + gap) / 2 : 0), y, h }));
  const placed = [...placeRow(top, r1y, h1), ...placeRow(bot, r3y, h3)];
  w += placed.map((p) => line(ccx, ccy, p.x + colW / 2, p.y + p.h / 2, 's-line', 2.5, '6 6')).join('');
  w += placed.map((p) => box(p.x, p.y, colW, p.h, p.r, false)).join('');
  w += box(condX, r2y, condW, h2, cond, true);
  // The owner, outside the session, and the arrow to the conductor.
  const ol = para(16, 0, ownerLine, 180 - 32, s.xs, 'z-xs t-m', 24);
  const oh = 80 + ol.height;
  const oy = Math.min(Math.max(y0, ccy - oh / 2), sBottom - oh);
  w += rect(0, oy, 180, oh, 'f-bg', 14) + rect(0, oy, 180, oh, 's-ink', 14) + dev('person', 16, oy + 16, 1, 's-ink') + text(66, oy + 46, owner, 'b z-l', 0);
  w += para(16, oy + 84, ownerLine, 180 - 32, s.xs, 'z-xs t-m', 24).svg;
  const ay = Math.max(ccy, oy + 30);
  w += line(180, ay, condX - 2, ay, 's-ink', 2.5) + arrow(condX - 2, ay, 'right', 'f-ink');
  w += text(sx + 14, ay - 14, ask, 'sb z-xs', 0);
  // The places it can run.
  const py = Math.max(sBottom, oy + oh) + 56;
  w += text(0, py, placesTitle, 'b z-m', 0);
  const pw = (W - 2 * 24) / 3, ph = 104;
  PLACES.forEach((p, i) => {
    const x = i * (pw + 24), y = py + 20;
    w += rect(x, y, pw, ph, p.planned ? 'f-soft' : 'f-gtint', 14) + (p.planned ? dashed(x, y, pw, ph) : rect(x, y, pw, ph, 's-good', 14));
    w += dev(p.key, x + 18, y + 30, 1.1, p.planned ? 's-muted' : 's-good');
    w += para(x + 80, y + 40, p.name, pw - 96, s.s, 'b z-s', 25, 'start', true).svg;
    w += text(x + 80, y + ph - 18, p.status, `sb z-xs ${p.planned ? 't-w' : 't-g'}`, 0);
  });
  const wide = svgOpen(ID, 'w', py + 20 + ph + 6, title, desc) + '\n' + w;

  // ---------- narrow (400) ----------
  const N = 400, n = SIZE.n;
  const tl = para(0, 26, title, N, n.xl, 'b z-xl', 28, 'start', true);
  let v = tl.svg;
  let y = 26 + tl.height - 28 + 24;
  const ld = para(0, y, lead, N, n.m, 't-m z-m', 21);
  v += ld.svg;
  y += ld.height + 8;
  // The owner.
  const on = para(70, 0, ownerLine, N - 86, n.s, 'z-s t-m', 19);
  const onh = Math.max(70, 48 + on.height);
  v += rect(0, y, N, onh, 'f-bg', 12) + rect(0, y, N, onh, 's-ink', 12) + dev('person', 14, y + 14, 1, 's-ink') + text(70, y + 30, owner, 'b z-l', 0);
  v += para(70, y + 52, ownerLine, N - 86, n.s, 'z-s t-m', 19).svg;
  y += onh;
  v += line(N / 2, y, N / 2, y + 40, 's-ink', 2.5) + arrow(N / 2, y + 42, 'down', 'f-ink') + text(N / 2 + 12, y + 26, ask, 'sb z-s', 0);
  y += 46;
  const sy = y;
  const ip = 12;
  let inner = text(ip, y + 24, session, 'sb z-s t-a', 0);
  y += 38;
  const ch = 40 + para(0, 0, cond.plain, N - 2 * ip - 28, n.s, 'z-s', 19).height + 8;
  inner += rect(ip, y, N - 2 * ip, ch, 'f-acc', 12) + text(ip + 14, y + 28, cond.role, 'b z-l t-on', 0) + para(ip + 14, y + 52, cond.plain, N - 2 * ip - 28, n.s, 'z-s t-on', 19).svg;
  y += ch + 10;
  const cw = (N - 2 * ip - 10) / 2;
  for (let i = 0; i < agents.length; i += 2) {
    const pair = agents.slice(i, i + 2);
    const hh = Math.max(...pair.map((r) => 40 + para(0, 0, r.plain, cw - 24, n.s, 'z-s', 19).height + 8));
    pair.forEach((r, j) => {
      const x = ip + j * (cw + 10);
      inner += rect(x, y, cw, hh, 'f-bg', 10) + rect(x, y, cw, hh, 's-line', 10) + text(x + 12, y + 26, r.role, 'b z-m', 0) + para(x + 12, y + 50, r.plain, cw - 24, n.s, 'z-s t-m', 19).svg;
    });
    y += hh + 10;
  }
  y += 2;
  v += rect(0, sy, N, y - sy, 'f-tint', 16) + rect(0, sy, N, y - sy, 's-acc', 16) + inner;
  y += 40;
  v += text(0, y, placesTitle, 'b z-l', 0);
  y += 14;
  PLACES.forEach((p) => {
    const nm = para(70, 0, p.name, N - 86, n.m, 'b z-m', 21, 'start', true);
    const hh = Math.max(68, 30 + nm.height + 18);
    v += rect(0, y, N, hh, p.planned ? 'f-soft' : 'f-gtint', 12) + (p.planned ? dashed(0, y, N, hh, 12) : rect(0, y, N, hh, 's-good', 12));
    v += dev(p.key, 14, y + 14, 1, p.planned ? 's-muted' : 's-good');
    v += para(70, y + 28, p.name, N - 86, n.m, 'b z-m', 21, 'start', true).svg + text(70, y + 28 + nm.height + 2, p.status, `sb z-s ${p.planned ? 't-w' : 't-g'}`, 0);
    y += hh + 10;
  });
  const narrow = svgOpen(ID, 'n', y, title, desc) + '\n' + v;

  const textHtml = [
    `<p>${esc(title)}. ${esc(lead)} The roles are those of <a href="${ROLES_SRC}">a website with a team inside</a>.</p>`,
    `<p>${esc(session)}:</p>`,
    '<ul>',
    `<li><strong>${esc(cond.role)}</strong>, in the middle: ${esc(cond.plain)}.</li>`,
    ...agents.map((r) => `<li><strong>${esc(r.role)}</strong>: ${esc(r.plain)}.</li>`),
    '</ul>',
    `<p>Outside the session: <strong>${esc(owner)}</strong>. ${esc(ownerLine)} You talk to the ${esc(cond.role.toLowerCase())} in ${esc(ask)}.</p>`,
    `<p>${esc(placesTitle)}:</p>`,
    '<ul>',
    ...PLACES.map((p) => `<li>${esc(p.name)}: ${esc(p.status.toLowerCase())}${p.planned ? `, as in <a href="${DEVICES_SRC}">the plan for the appliance</a> (a Kickstarter campaign, not yet launched)` : ''}.</li>`),
    '</ul>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

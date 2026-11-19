// Figure: can you leave? Wix, Squarespace and Fliplet in their own words, against your own website (copy.website_title).
// Data: competitors.competitors[] (id, name, kind, facts.can_you_leave or facts.export: value, quote, source_url, date_read),
// competitors.website_cell.facts.can_you_leave (optional). Never invents a quote: a missing one says "to be confirmed".
import { esc, get, fromCopy, para, text, rect, icon, svgOpen, wrapFigure, SIZE, host, longDate, TBC, DEFAULT_READ } from './_shared.mjs';

const ID = 'can-you-leave';
const cap = (t) => String(t).charAt(0).toUpperCase() + String(t).slice(1);
const WANT = [['wix', 'Wix'], ['squarespace', 'Squarespace'], ['fliplet', 'Fliplet']];
const BRIEF = 'https://newsroom.sgit.ai/articles/no-lock-in.html';

function leaveFact(c) {
  const f = (c && c.facts) || {};
  if (f.can_you_leave) return f.can_you_leave;
  if (f.export) return f.export;
  const k = Object.keys(f).find((key) => /leave|export|lock/i.test(key));
  return k ? f[k] : null;
}

function rowsFrom(data) {
  const list = get(data, 'competitors.competitors', []);
  const all = Array.isArray(list) ? list : [];
  return WANT.map(([id, name]) => {
    const c = all.find((x) => String(x.id || '').toLowerCase() === id || String(x.name || '').toLowerCase() === id);
    const f = leaveFact(c);
    const quote = f && f.quote ? String(f.quote).trim() : '';
    const url = f && /^https?:\/\//.test(f.source_url || '') ? f.source_url : '';
    const value = f && f.value && String(f.value).length <= 28 ? String(f.value) : '';
    const reading = f && f.value && String(f.value).length > 28 ? cap(String(f.value).replace(/\.$/, '')) + '.' : '';
    return {
      name: (c && c.name) || name,
      kind: (c && c.kind) || '',
      value,
      reading,
      quote,
      url,
      read: f && f.date_read ? longDate(f.date_read) : '',
    };
  });
}

// Each sentence of a quote becomes its own link to the source, so any figure in it sits beside its evidence.
function linkedQuote(q, url) {
  const parts = q.split(/(?<=[.!?])\s+/).filter(Boolean);
  return parts.map((p) => `<a href="${esc(url)}">${esc(p)}</a>`).join(' ');
}

export default function (data = {}) {
  const copy = data.copy || {};
  const title = fromCopy(copy, ID, 'title', 'Can you leave?');
  const ours = String(get(copy, 'website_title', get(copy, 'offer_title', 'The Sovereign Agentic Website')));
  const lead = fromCopy(copy, ID, 'lead', `Three platforms in their own words, and ${ours.charAt(0).toLowerCase()}${ours.slice(1)}.`);
  const rows = rowsFrom(data);
  const wc = get(data, 'competitors.website_cell.facts.can_you_leave', {}) || {};
  const cell = {
    name: ours,
    value: wc.value && String(wc.value).length <= 28 ? String(wc.value) : 'Yes',
    words: cap(wc.value && String(wc.value).length > 28 ? `${String(wc.value).replace(/\.$/, '')}.` : wc.quote || 'The repository is in your name. Copy it to any host, any day.'),
    note: 'Yours within three months at the latest: an expectation we set ourselves, not yet a rule in the terms.',
  };
  const say = (r) => (r.quote ? `“${r.quote}”` : `Their own words: ${TBC}.`);
  const foot = (r) => (r.quote ? `${r.reading ? `Our reading: ${r.reading} ` : ''}Their own words, read ${r.read || DEFAULT_READ}${host(r.url) ? `. Source: ${host(r.url)}` : ''}` : 'Source to be confirmed');
  const desc = `${title} ${rows.map((r) => `${r.name}: ${say(r)} ${foot(r)}.`).join(' ')} ${cell.name}: ${cell.value}. ${cell.words}`;

  // Wide: one row per platform, then ours. The left column (icon, name, kind, badge) is stacked, so the badge never meets the name.
  const s = SIZE.w, W = 960, NC = 250, QX = NC + 24, QW = W - QX - 24;
  let w = text(0, 40, title, 'b z-xl', 0) + text(0, 76, lead, 't-m z-m', 0);
  let y = 100;
  rows.forEach((r) => {
    const q = para(QX, y + 40, say(r), QW, s.m, r.quote ? 'i z-m' : 'z-m t-m', 30);
    const ft = para(QX, y + 40 + q.height + 6, foot(r), QW, s.xs, 'z-xs t-m', 24);
    const kd = r.kind ? para(70, y + 78, r.kind, NC - 70, s.xs, 'z-xs t-m', 22) : null;
    const leftEnd = (kd ? 78 + kd.height - 22 + 8 : 60) + (r.value ? 16 + 34 : 0) + 16;
    const h = Math.max(40 + q.height + ft.height + 14, 118, leftEnd);
    w += rect(0, y, W, h, 'f-soft', 14);
    w += icon('door', 22, y + 22, 0.9, 's-muted');
    w += text(70, y + 50, r.name, 'b z-l', 0);
    if (kd) w += kd.svg;
    if (r.value) w += rect(22, y + h - 50, Math.min(NC - 30, 28 + r.value.length * 11), 34, 'f-wtint', 17) + text(36, y + h - 27, r.value, 'b z-xs t-w', 0);
    w += q.svg + ft.svg;
    y += h + 14;
  });
  const cq = para(QX, y + 44, cell.words, QW, s.m, 'sb z-m', 30);
  const cn = para(QX, y + 44 + cq.height + 6, cell.note, QW, s.xs, 'z-xs t-m', 24);
  const cnm = para(70, y + 52, cell.name, NC - 74, s.m, 'b z-m t-a', 28, 'start', true);
  const nameBottom = 52 + cnm.height - 28 + 10;
  const ch = Math.max(44 + cq.height + cn.height + 16, 130, nameBottom + 16 + 34 + 16);
  w += rect(0, y, W, ch, 'f-tint', 14) + rect(0, y, 8, ch, 'f-acc', 4);
  w += icon('own', 22, y + 24, 0.9, 's-acc');
  w += cnm.svg;
  w += rect(22, y + ch - 50, 28 + cell.value.length * 12, 34, 'f-gtint', 17) + text(36, y + ch - 27, cell.value, 'b z-xs t-g', 0);
  w += cq.svg + cn.svg;
  const wide = svgOpen(ID, 'w', y + ch + 4, title, desc) + '\n' + w;

  // Narrow: stacked cards.
  const N = 400, n = SIZE.n, p = 14;
  let v = text(0, 28, title, 'b z-xl', 0) + para(0, 54, lead, N, n.m, 't-m z-m', 21).svg;
  let yy = 54 + para(0, 0, lead, N, n.m, '', 21).height + 6;
  const card = (r, isCell) => {
    let out = '';
    const bw = r.value ? 24 + r.value.length * 9 : 0;
    const nmP = para(p + 40, yy + 34, r.name, N - p * 2 - 40 - bw - 10, n.l, `b z-l${isCell ? ' t-a' : ''}`, 23, 'start', true);
    const nm = nmP.svg;
    const badge = r.value ? rect(N - p - bw, yy + 14, bw, 28, isCell ? 'f-gtint' : 'f-wtint', 14) + text(N - p - 12, yy + 33, r.value, `b z-s ${isCell ? 't-g' : 't-w'}`, 0, 'end') : '';
    let cy = yy + 52 + nmP.height - 23;
    const kd = r.kind ? para(p, cy + 4, r.kind, N - p * 2, n.s, 'z-s t-m', 19) : null;
    if (kd) cy += kd.height + 4;
    const q = para(p, cy + 18, r.text, N - p * 2, n.m, isCell ? 'sb z-m' : (r.quote ? 'i z-m' : 'z-m t-m'), 22);
    cy += q.height + 8;
    const ft = para(p, cy + 16, r.foot, N - p * 2, n.s, 'z-s t-m', 19);
    cy += ft.height + 10;
    const h = cy - yy;
    out += rect(0, yy, N, h, isCell ? 'f-tint' : 'f-soft', 12);
    if (isCell) out += rect(0, yy, 6, h, 'f-acc', 3);
    out += icon(isCell ? 'own' : 'door', p, yy + 14, 0.7, isCell ? 's-acc' : 's-muted') + nm + badge + (kd ? kd.svg : '') + q.svg + ft.svg;
    yy += h + 12;
    return out;
  };
  rows.forEach((r) => { v += card({ ...r, text: say(r), foot: foot(r) }, false); });
  v += card({ name: cell.name, value: cell.value, text: cell.words, foot: cell.note }, true);
  const narrow = svgOpen(ID, 'n', yy, title, desc) + '\n' + v;

  const items = rows.map((r) => (r.quote && r.url
    ? `<li><strong>${esc(r.name)}</strong>, in their own words, read ${esc(r.read || DEFAULT_READ)}: “${linkedQuote(r.quote, r.url)}”${r.reading ? ` Our reading: ${esc(r.reading)}` : ''}</li>`
    : `<li><strong>${esc(r.name)}</strong>: their own words are ${TBC}.</li>`));
  const textHtml = [
    `<p>${esc(title)} ${esc(lead)} Background: <a href="${BRIEF}">no lock-in</a>.</p>`,
    '<ul>',
    ...items,
    `<li><strong>${esc(cell.name)}</strong>: ${cell.words.toLowerCase().startsWith(cell.value.toLowerCase()) ? '' : `${esc(cell.value)}. `}${esc(cell.words)} ${esc(cell.note)}</li>`,
    '</ul>',
  ].join('\n');

  return { svg: wrapFigure(ID, wide, narrow), text: textHtml };
}

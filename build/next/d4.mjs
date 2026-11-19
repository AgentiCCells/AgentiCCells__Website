// /next/d/4/ Just say it: plain, bold, typographic. One big statement per screen, one line under it, one figure.
// The statements are the six promises from next/copy.json, word for word.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 2). Code under Apache-2.0.
import { homeBlocks, lead, oneIdea, prose, inline, esc, cta, figure, get, asArray } from './parts.mjs';
import { bigPrice, exGrid, OWNERS, figSection } from './design-kit.mjs';

export const name = 'Just say it';
export const css = ['/assets/next/d4.css'];
// Which picture goes with which promise, in the order of copy.promises.
const PAIR = ['deliverables', 'can-you-leave', 'brief-to-claude', 'tenets', 'examples', 'year-of-platform'];
export function home(h) {
  const { data, figs, root } = h;
  const c = data.copy;
  const b = homeBlocks(h);
  const l = lead(c, 4);
  const idea = oneIdea(c) || '';
  const head = String(l.headline || name).split(/(?<=\.)\s+/).map((s, i) => `<span class="d4-h${i}">${inline(s)}</span>`).join(' ');
  const kicker = idea && !String(l.sub || '').includes(idea) ? `<p class="kicker">${inline(idea)}</p>` : '';
  const says = asArray(get(c, 'promises')).map((p, i) => {
    const id = PAIR[i] || '';
    const pic = id === 'examples'
      ? exGrid(data, root, { slugs: [...OWNERS(data), 'algarve-holiday-homes', 'london-billboard', 'agenticcells-ai'], limit: 6, variant: 'bare', caption: false, cls: 'kx-grid d4-ex' })
      : id ? figure(figs, id) : '';
    return `<section class="d4-say" id="say-${i + 1}"><div class="in">
<h2>${inline(p.title || '')}.</h2>
${prose(p.line)}
${p.proof ? `<p class="d4-proof">${inline(p.proof)}${p.proof_link ? ` <a href="${esc(p.proof_link)}">The proof</a>.` : ''}</p>` : ''}
${pic}
</div></section>`;
  }).join('\n');
  return `<section class="d4-hero"><div class="in">
<h1>${head}</h1>
${kicker}${l.sub ? `<div class="d4-lede">${prose(l.sub)}</div>` : ''}
<div class="d4-buy">
${bigPrice(data, { cls: 'kp d4-price' })}
${cta(c, { primary: l.primary, secondary: l.secondary })}
</div>
</div></section>
<div class="d4-body">
${says}
<div class="d4-rest">
${b.rentOrOwn}
${figSection(h, 'steps', 'how-it-works', 'How it works', { more: '<a href="/next/how-it-works/">How it works, in full</a>' })}
${b.team}
${b.price}
${b.faq}
${b.final}
</div>
</div>`;
}

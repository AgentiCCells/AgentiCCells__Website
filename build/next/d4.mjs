// /next/d/4/ Just say it: plain, bold, typographic. Round R1: one big statement per screen about cells. The first screen
// gives the ladder's entry price (first proposal); then the case studies, what a cell is, the cells we sell, the
// sovereign website, the bigger cells, and what every cell gives you as numbered statements, word for word from
// next/copy.json properties; then the devices (a plan), the team, examples and questions.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 2, rebuilt in round R1). Code under Apache-2.0.
import { homeBlocks, lead, oneIdea, prose, inline, esc, cta, get, asArray, proofLink, sectionOf } from './parts.mjs';
import { exGrid, OWNERS } from './design-kit.mjs';
import { entryPrice, caseStudies, cellSection, cellsWeSell, sovereignExample, eventTeam, devices, words } from './cells.mjs';

export const name = 'Just say it';
export const css = ['/assets/next/d4.css'];
export function home(h) {
  const { data, root } = h;
  const c = data.copy;
  const b = homeBlocks(h);
  const l = lead(c, 4);
  const idea = oneIdea(c) || '';
  const head = String(l.headline || name).split(/(?<=\.)\s+/).map((s, i) => `<span class="d4-h${i}">${inline(s)}</span>`).join(' ');
  const kicker = idea && !String(l.sub || '').includes(idea) ? `<p class="kicker">${inline(idea)}</p>` : '';
  const props = asArray(get(c, 'properties'));
  const pw = words(c, 'properties');
  const ex = sectionOf(c, 'examples') || {};
  const pad = (n) => String(n).padStart(2, '0');
  const says = props.map((p, i) => `<section class="d4-say" id="say-${i + 1}"><div class="in">
<h2 data-n="${pad(i + 1)} / ${pad(props.length)}">${inline(get(p, 'title') || '')}.</h2>
${prose(get(p, 'line'))}
${get(p, 'proof') ? `<p class="d4-proof">${inline(get(p, 'proof'))}${proofLink(p)}</p>` : ''}
</div></section>`).join('\n');
  return `<section class="d4-hero"><div class="in">
<h1>${head}</h1>
${kicker}${l.sub ? `<div class="d4-lede">${prose(l.sub)}</div>` : ''}
<div class="d4-buy">
${entryPrice(h, { cls: 'kp d4-price' })}
${cta(c, { primary: l.primary, secondary: l.secondary })}
</div>
</div></section>
<div class="d4-body">
<div class="d4-big">
${caseStudies(h)}
${cellSection(h)}
${cellsWeSell(h)}
${sovereignExample(h)}
${eventTeam(h, { limit: 3 })}
</div>
<div class="d4-says">
<h2 class="d4-says-h">${inline(get(pw, 'title') || 'What every cell gives you')}</h2>
${says || '<p class="tbw">To be written: what every cell gives you (next/copy.json properties).</p>'}
</div>
<div class="d4-rest">
${devices(h)}
${b.team}
<section class="sec" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${exGrid(data, root, { slugs: [...OWNERS(data), 'algarve-holiday-homes', 'london-billboard', 'agenticcells-ai'], limit: 6, variant: 'bare', caption: false, cls: 'kx-grid d4-ex' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
${b.faq}
${b.final}
</div>
</div>`;
}

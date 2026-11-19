// /next/d/3/ Stop renting your website: a ledger. Round R1: the first screen is a statement of the cells we sell, by
// size and price (data/cells.json, first proposals), beside the lead; then the case studies, what a cell is, the ladder,
// the sovereign website with three years of the platforms' published prices as its argument, the bigger cells at work,
// what every cell gives you, the devices (a plan), the team, the sites as rows, and questions.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 2, rebuilt in round R1). Code under Apache-2.0.
import { homeBlocks, lead, oneIdea, prose, inline, esc, get, sectionOf } from './parts.mjs';
import { threeYearBars, exGrid, OWNERS } from './design-kit.mjs';
import { miniLadder, caseStudies, cellSection, cellsWeSell, sovereignExample, eventTeam, properties, devices } from './cells.mjs';

export const name = 'Stop renting your website';
export const css = ['/assets/next/d3.css'];
export function home(h) {
  const { data, root } = h;
  const c = data.copy;
  const b = homeBlocks(h);
  const l = lead(c, 3);
  const idea = oneIdea(c) || '';
  const kicker = idea && !String(l.sub || '').includes(idea) ? `<p class="kicker">${inline(idea)}</p>` : '';
  const ex = sectionOf(c, 'examples') || {};
  const pay = (get(c, 'rent_or_own') || []).find((r) => /pay/i.test(r.topic || '')) || {};
  return `<section class="d3-hero"><div class="in">
<div class="d3-ledger d3-first">
<div class="d3-col d3-say">
<p class="d3-col-h"><span>Statement</span></p>
<h1>${l.headline ? inline(l.headline) : esc(name)}</h1>
${kicker}${l.sub ? prose(l.sub) : ''}
</div>
<div class="d3-col d3-own">
${miniLadder(h, { cls: 'ml d3-ml', primary: l.primary, secondary: l.secondary })}
</div>
</div>
</div></section>
<div class="d3-body">
${caseStudies(h, { cls: 'd3-cases' })}
${cellSection(h)}
${cellsWeSell(h)}
${sovereignExample(h, { extra: `<div class="d3-rent"><p class="d3-col-h"><span>Renting a website</span> <span class="d3-col-sub">${inline(pay.rent || '')}</span></p>
${threeYearBars(data)}
<p class="more"><a href="/next/compare/">Compare renting and owning</a></p>
</div>` })}
${eventTeam(h, { limit: 4 })}
${properties(h)}
${devices(h)}
${b.team}
<section class="sec d3-ex" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${prose(get(ex, 'text'))}
${exGrid(data, root, { slugs: [...OWNERS(data), 'algarve-holiday-homes', 'agenticcells-ai', 'riskmandate-at-websummit'], limit: 6, variant: 'plain', cls: 'kx-grid d3-rows' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
${b.faq}
${b.final}
</div>`;
}

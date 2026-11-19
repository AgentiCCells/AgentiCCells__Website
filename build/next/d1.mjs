// /next/d/1/ Sovereign: deep ink, a serif voice. Round R1: agentic cells. The one idea and the price of the smallest cell
// first; then what a cell is (words beside the figure), the cells we sell, the sovereign website as the example in paper
// frames, the bigger cells at work, what every cell gives you, the devices (a plan), the team, examples and questions.
// Developer's round 1 layout, restyled by designer.agenticcells-ai@AgentiCCells.dinis in round 2, rebuilt in round R1.
// Code under Apache-2.0.
import { homeBlocks, firstScreen, get, sectionOf, inline } from './parts.mjs';
import { exGrid, OWNERS } from './design-kit.mjs';
import { miniLadder, caseStudies, cellSection, cellsWeSell, sovereignExample, eventTeam, properties, devices } from './cells.mjs';

export const name = 'Sovereign';
export const css = ['/assets/next/d1.css'];
export function home(h) {
  const b = homeBlocks(h);
  const f = firstScreen(h.data.copy, 1, name);
  const ex = sectionOf(h.data.copy, 'examples') || {};
  return `<section class="hero d1-hero"><div class="in">
<div class="hero-text">
${f.kicker}
<h1>${f.h1}</h1>
${f.sub}
</div>
${miniLadder(h, { cls: 'ml offer', primary: f.primary, secondary: f.secondary })}
</div></section>
<div class="d1-body">
${caseStudies(h, { cls: 'd1-cases' })}
${cellSection(h, { cls: 'd1-two' })}
${cellsWeSell(h, { cls: 'd1-sell' })}
${sovereignExample(h, { cls: 'd1-saw', strip: exGrid(h.data, h.root, { slugs: OWNERS(h.data), limit: 3, variant: 'plain', cls: 'kx-grid d1-deeds' }) })}
${eventTeam(h, { cls: 'd1-event', limit: 3 })}
${properties(h, { listCls: 'promises d1-props' })}
${devices(h, { cls: 'd1-dev' })}
${b.team}
<section class="sec examples-sec" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${exGrid(h.data, h.root, { slugs: ['algarve-holiday-homes', 'riskmandate-at-websummit', 'agenticcells-ai', 'civic-promptugal-news', 'london-billboard', 'agenticcells-site'], limit: 6, variant: 'frame', cls: 'kx-grid d1-ex' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
${b.faq}
${b.final}
</div>`;
}

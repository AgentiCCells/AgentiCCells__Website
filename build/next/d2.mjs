// /next/d/2/ Six promises: light and bright. Round R1: the headline is "six things every cell gives you", so the six
// properties sit as numbered cards right under the first screen (the design's signature, as the promises were); then
// what a cell is, the cells we sell, the sovereign website with its sites in browser frames, the bigger cells at work,
// the devices (a plan), the team, examples and questions.
// Developer's round 1 layout, restyled by designer.agenticcells-ai@AgentiCCells.dinis in round 2, rebuilt in round R1.
// Code under Apache-2.0.
import { homeBlocks, firstScreen, get, sectionOf, inline, prose } from './parts.mjs';
import { exGrid, OWNERS } from './design-kit.mjs';
import { miniLadder, caseStudies, cellSection, cellsWeSell, sovereignExample, eventTeam, propertyList, devices, words } from './cells.mjs';

export const name = 'Six promises';
export const css = ['/assets/next/d2.css'];
export function home(h) {
  const b = homeBlocks(h);
  const c = h.data.copy;
  const f = firstScreen(c, 2, name);
  const ex = sectionOf(c, 'examples') || {};
  const pw = words(c, 'properties');
  return `<section class="hero d2-hero"><div class="in">
<div class="hero-text">
${f.kicker}
<h1>${f.h1}</h1>
${f.sub}
</div>
${miniLadder(h, { cls: 'ml offer', primary: f.primary, secondary: f.secondary })}
</div>
<div class="in d2-promises" id="properties">
<h2 class="vh">${inline(get(pw, 'title') || 'What every cell gives you')}</h2>
${propertyList(c, 'promises d2-grid')}
</div></section>
<div class="d2-body">
${caseStudies(h, { cls: 'd2-cases' })}
${cellSection(h)}
${cellsWeSell(h)}
${sovereignExample(h, { cls: 'd2-sites', strip: `${exGrid(h.data, h.root, { slugs: [...OWNERS(h.data), 'algarve-holiday-homes'], limit: 4, variant: 'frame', cls: 'kx-grid d2-ex' })}\n<p class="more"><a href="/next/examples/">All the examples</a></p>` })}
${eventTeam(h, { limit: 3 })}
${devices(h)}
${b.team}
<section class="sec" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${prose(get(ex, 'text'))}
${exGrid(h.data, h.root, { slugs: ['riskmandate-at-websummit', 'algarve-orange-grower', 'agenticcells-ai', 'agenticcells-site'], limit: 4, variant: 'frame', cls: 'kx-grid d2-ex2' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
${b.faq}
${b.final}
</div>`;
}

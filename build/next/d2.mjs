// /next/d/2/ Six promises: light and bright; the pitch sentence and the price first, then the six promises, then the
// sites themselves in browser frames. Round 2: the one idea as a kicker above the sentence, no doubled list under the "what you get" figure.
// Developer's round 1 layout, restyled by designer.agenticcells-ai@AgentiCCells.dinis in round 2. Code under Apache-2.0.
import { homeBlocks, firstScreen, offerCard, promises, get, sectionOf, inline, prose } from './parts.mjs';
import { exGrid, whatYouGet, OWNERS } from './design-kit.mjs';

export const name = 'Six promises';
export const css = ['/assets/next/d2.css'];
export function home(h) {
  const b = homeBlocks(h);
  const f = firstScreen(h.data.copy, 2, name);
  const ex = sectionOf(h.data.copy, 'examples') || {};
  return `<section class="hero d2-hero"><div class="in">
<div class="hero-text">
${f.kicker}
<h1>${f.h1}</h1>
${f.sub}
</div>
${offerCard(h.data, { compact: true, primary: f.primary, secondary: f.secondary })}
</div>
<div class="in d2-promises" id="promises">
${promises(h.data.copy, 'promises d2-grid')}
</div></section>
<section class="sec d2-sites" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${prose(get(ex, 'text'))}
${exGrid(h.data, h.root, { slugs: [...OWNERS(h.data), 'algarve-holiday-homes'], limit: 4, variant: 'frame', cls: 'kx-grid d2-ex' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
<div class="d2-body">
${whatYouGet(h)}
${b.rentOrOwn}
${b.tenets}
${b.briefToClaude}
${b.canYouLeave}
${b.price}
${b.team}
${b.faq}
${b.final}
</div>`;
}

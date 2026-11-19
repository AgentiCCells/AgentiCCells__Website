// /next/d/1/ Sovereign: deep ink, a serif voice, the one idea first with the price card beside it, then the sites
// held by their owners straight under it. Round 2: figures full width under their words, real screenshots.
// Developer's round 1 layout, restyled by designer.agenticcells-ai@AgentiCCells.dinis in round 2. Code under Apache-2.0.
import { homeBlocks, firstScreen, offerCard, get, sectionOf, inline } from './parts.mjs';
import { exGrid, whatYouGet, OWNERS } from './design-kit.mjs';

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
${offerCard(h.data, { compact: true, primary: f.primary, secondary: f.secondary })}
</div></section>
<section class="d1-held" aria-labelledby="d1-held-h"><div class="in">
<h2 id="d1-held-h" class="d1-held-h">${inline(get(ex, 'text') || 'Sites made by the same team')}</h2>
${exGrid(h.data, h.root, { slugs: OWNERS(h.data), limit: 3, eager: 3, variant: 'plain', cls: 'kx-grid d1-deeds' })}
</div></section>
<div class="d1-body">
${b.tenets}
${b.promises}
${whatYouGet(h)}
${b.rentOrOwn}
${b.canYouLeave}
${b.briefToClaude}
${b.price}
<section class="sec examples-sec" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${exGrid(h.data, h.root, { slugs: ['agenticcells-ai', 'algarve-holiday-homes', 'riskmandate-at-websummit', 'civic-promptugal-news', 'london-billboard', 'agenticcells-site'], limit: 6, variant: 'frame', cls: 'kx-grid d1-ex' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
${b.team}
${b.faq}
${b.final}
</div>`;
}

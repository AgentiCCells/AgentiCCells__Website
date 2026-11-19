// /next/d/2/ Six promises: light and bright; the six promises are the first screen, under a slim price strip.
// The designer may change this markup freely; it touches no other design. Code under Apache-2.0.
import { homeBlocks, firstScreen, offerCard, promises } from './parts.mjs';

export const name = 'Six promises';
export const css = ['/assets/next/d2.css'];
export function home(h) {
  const b = homeBlocks(h);
  const f = firstScreen(h.data.copy, 2, name);
  return `<section class="hero d2-hero"><div class="in">
<div class="hero-text">
<h1>${f.h1}</h1>
${f.kicker}
${f.sub}
</div>
${offerCard(h.data, { compact: true, primary: f.primary, secondary: f.secondary })}
</div>
<div class="in d2-promises" id="promises">
${promises(h.data.copy, 'promises d2-grid')}
</div></section>
<div class="d2-body">
${b.tenets}
${b.whatYouGet}
${b.rentOrOwn}
${b.canYouLeave}
${b.briefToClaude}
${b.price}
${b.examples}
${b.team}
${b.faq}
${b.final}
</div>`;
}

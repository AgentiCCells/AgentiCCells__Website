// /next/d/1/ Sovereign: deep ink, a serif voice, the one idea first with the price card beside it.
// The designer may change this markup freely; it touches no other design. Code under Apache-2.0.
import { homeBlocks, firstScreen, offerCard } from './parts.mjs';

export const name = 'Sovereign';
export const css = ['/assets/next/d1.css'];
export function home(h) {
  const b = homeBlocks(h);
  const f = firstScreen(h.data.copy, 1, name);
  return `<section class="hero d1-hero"><div class="in">
<div class="hero-text">
${f.kicker}
<h1>${f.h1}</h1>
${f.sub}
</div>
${offerCard(h.data, { compact: true, primary: f.primary, secondary: f.secondary })}
</div></section>
<div class="d1-body">
${b.promises}
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

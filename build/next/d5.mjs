// /next/d/5/ Proof: a simple layout for round 1; the full design comes in round 2.
// The designer may change this markup freely; it touches no other design. Code under Apache-2.0.
import { homeBlocks, firstScreen, offerCard } from './parts.mjs';

export const name = 'Proof';
export const css = ['/assets/next/d5.css'];
export function home(h) {
  const b = homeBlocks(h);
  const f = firstScreen(h.data.copy, 5, name);
  return `<section class="hero d5-hero"><div class="in">
<div class="hero-text">
${f.kicker}
<h1>${f.h1}</h1>
${f.sub}
</div>
${offerCard(h.data, { compact: true, primary: f.primary, secondary: f.secondary })}
</div></section>
<div class="d5-body">
${b.examples}
${b.promises}
${b.whatYouGet}
${b.tenets}
${b.rentOrOwn}
${b.canYouLeave}
${b.briefToClaude}
${b.price}
${b.team}
${b.faq}
${b.final}
</div>`;
}

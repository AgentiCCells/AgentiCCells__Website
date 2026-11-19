// /next/d/4/ Just say it: a simple layout for round 1; the full design comes in round 2.
// The designer may change this markup freely; it touches no other design. Code under Apache-2.0.
import { homeBlocks, firstScreen, offerCard } from './parts.mjs';

export const name = 'Just say it';
export const css = ['/assets/next/d4.css'];
export function home(h) {
  const b = homeBlocks(h);
  const f = firstScreen(h.data.copy, 4, name);
  return `<section class="hero d4-hero"><div class="in">
<div class="hero-text">
${f.kicker}
<h1>${f.h1}</h1>
${f.sub}
</div>
${offerCard(h.data, { compact: true, primary: f.primary, secondary: f.secondary })}
</div></section>
<div class="d4-body">
${b.promises}
${b.whatYouGet}
${b.price}
${b.rentOrOwn}
${b.canYouLeave}
${b.briefToClaude}
${b.tenets}
${b.examples}
${b.team}
${b.faq}
${b.final}
</div>`;
}

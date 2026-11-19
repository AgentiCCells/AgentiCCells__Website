// /next/d/5/ Proof: a wall of real sites. One line and the offer, then every example from next/examples.json,
// each labelled by kind on the image itself. The promises and figures come after the work.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 2). Code under Apache-2.0.
import { ASK, homeBlocks, lead, oneIdea, prose, inline, esc, cta, figure, get, sectionOf } from './parts.mjs';
import { bigPrice, exGrid, wallOrder, exLabel, exampleList, inWords, whatYouGet, figSection } from './design-kit.mjs';

export const name = 'Proof';
export const css = ['/assets/next/d5.css'];
export function home(h) {
  const { data, figs, root } = h;
  const c = data.copy;
  const b = homeBlocks(h);
  const l = lead(c, 5);
  const idea = oneIdea(c) || '';
  const kicker = idea && !String(l.sub || '').includes(idea) ? `<p class="kicker">${inline(idea)}</p>` : '';
  const all = exampleList(data);
  const count = (k) => all.filter((x) => exLabel(x).cls === k).length;
  const legend = `<p class="d5-legend"><span class="kx-tag kx-owner">Made for</span> ${inWords(count('owner'))} named owners who agreed <span class="kx-tag kx-demo">Demo</span> ${inWords(count('demo'))} demos <span class="kx-tag kx-own">Our own</span> ${inWords(count('own'))} of our own sites</p>`;
  return `<section class="d5-top"><div class="in">
<div class="d5-say">
<h1>${l.headline ? inline(l.headline) : esc(name)}</h1>
${kicker}${l.sub ? prose(l.sub) : ''}
</div>
<div class="d5-buy">
${bigPrice(data, { cls: 'kp d5-price' })}
${cta(c, { primary: l.primary, secondary: l.secondary })}
</div>
</div></section>
<section class="d5-wall" id="sites" aria-label="The sites">
<div class="d5-in">
${legend}
${exGrid(data, root, { slugs: wallOrder(data), eager: 8, variant: 'bare', cls: 'kx-grid d5-grid', tileCls: (x) => (exLabel(x).cls === 'owner' ? 'd5-big' : '') }).replace(/<\/ul>$/, `<li class="kx d5-next"><p class="d5-next-h">${inline(String(l.headline || '').split(/(?<=\.)\s+/).pop() || '')}</p>
${bigPrice(data, { cls: 'kp d5-nprice' })}
${cta(c, { primary: l.primary, noSecondary: true })}
</li>
</ul>`)}
</div>
</section>
<div class="d5-body">
<div class="d5-pair">
${b.tenets}
${whatYouGet(h)}
</div>
<div class="d5-pair">
${b.canYouLeave}
${b.rentOrOwn}
</div>
<section class="sec d5-full" id="three-years" aria-label="Three years of a platform">
${figure(figs, 'year-of-platform')}
</section>
${figSection(h, 'steps', 'how-it-works', 'How it works', { more: '<a href="/next/how-it-works/">How it works, in full</a>' })}
${b.team}
${b.price}
${b.faq}
${b.final}
</div>
<div class="d5-sticky" aria-label="Price">
${bigPrice(data, { cls: 'kp d5-sprice' })}
<a class="btn" href="${ASK}">${esc(l.primary || 'Ask for a site')}</a>
</div>`;
}

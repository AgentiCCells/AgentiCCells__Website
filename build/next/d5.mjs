// /next/d/5/ Proof: a wall. Round R1: one line and the ladder's entry price, then a wall of live sites and of cells at
// work (our own team's pages from Web Summit), each labelled on the image; then the case studies, what a cell is, the
// cells we sell, the sovereign website, the bigger cells, what every cell gives you, the devices (a plan), the team and
// questions. The work comes first; the words after it.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 2, rebuilt in round R1). Code under Apache-2.0.
import { ASK, homeBlocks, lead, oneIdea, prose, inline, esc, cta } from './parts.mjs';
import { exTile, wallOrder, exLabel, exampleList, inWords } from './design-kit.mjs';
import { entryPrice, caseStudies, cellSection, cellsWeSell, sovereignExample, eventTeam, properties, devices, PROOF, PROOF_NOTE, entry, cellPrice } from './cells.mjs';

export const name = 'Proof';
export const css = ['/assets/next/d5.css'];
// A cell at work as a wall tile: the same frame as a site, labelled "Cells at work".
const workTile = ([f, t, cap, u], big) => `<li class="kx kx-bare d5-work${big ? ' d5-big' : ''}">
<a class="kx-shot" href="${esc(u)}"><span class="kx-img"><img src="/assets/media/proof/${f}-half.webp" srcset="/assets/media/proof/${f}-half.webp 450w, /assets/media/proof/${f}.webp 900w" sizes="(max-width: 34rem) 100vw, ${big ? '44rem' : '22rem'}" width="900" height="563" ${big ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" alt="Screenshot of ${esc(t)}, a live page our own team made"><span class="kx-tag kx-work">Cells at work</span></span></a>
<p class="kx-cap"><a href="${esc(u)}">${esc(t)}</a> <span>${esc(cap)}</span></p>
</li>`;
export function home(h) {
  const { data, root } = h;
  const c = data.copy;
  const b = homeBlocks(h);
  const l = lead(c, 5);
  const idea = oneIdea(c) || '';
  const kicker = idea && !String(l.sub || '').includes(idea) ? `<p class="kicker">${inline(idea)}</p>` : '';
  const all = exampleList(data);
  const count = (k) => all.filter((x) => exLabel(x).cls === k).length;
  const legend = `<p class="d5-legend"><span class="kx-tag kx-work">Cells at work</span> ${inWords(PROOF.length)} pages of our own team's work <span class="kx-tag kx-owner">Made for</span> ${inWords(count('owner'))} named owners who agreed <span class="kx-tag kx-demo">Demo</span> ${inWords(count('demo'))} demos <span class="kx-tag kx-own">Our own</span> ${inWords(count('own'))} of our own sites</p>`;
  // The wall: the team's working site large first, then sites and cells at work in turn.
  const sites = wallOrder(data).map((s) => all.find((x) => x.slug === s)).filter(Boolean);
  const work = PROOF.slice();
  const tiles = [workTile(work.shift(), true)];
  let i = 0;
  while (sites.length || work.length) {
    if (sites.length) { const x = sites.shift(); tiles.push(exTile(x, root, { eager: i < 6, variant: 'bare', cls: exLabel(x).cls === 'owner' && i < 3 ? 'd5-big' : '' })); }
    if (work.length && i % 2 === 1) tiles.push(workTile(work.shift(), false));
    i++;
  }
  const e = entry(data);
  const ep = e ? cellPrice(data, e.price) : null;
  return `<section class="d5-top"><div class="in">
<div class="d5-say">
<h1>${l.headline ? inline(l.headline) : esc(name)}</h1>
${kicker}${l.sub ? prose(l.sub) : ''}
</div>
<div class="d5-buy">
${entryPrice(h, { cls: 'kp d5-price' })}
${cta(c, { primary: l.primary, noSecondary: true })}
</div>
</div></section>
<section class="d5-wall" id="sites" aria-labelledby="d5-sites-h">
<div class="d5-in">
<h2 class="vh" id="d5-sites-h">Live sites and cells at work</h2>
${legend}
<ul class="kx-grid d5-grid">
${tiles.join('\n')}
<li class="kx d5-next"><p class="d5-next-h">${inline(String(l.headline || '').split(/(?<=\.)\s+/).pop() || '')}</p>
${entryPrice(h, { cls: 'kp d5-nprice' })}
${cta(c, { primary: l.primary, noSecondary: true })}
</li>
</ul>
${PROOF_NOTE}
</div>
</section>
<div class="d5-body">
${caseStudies(h, { cls: 'd5-full' })}
${cellSection(h, { cls: 'd5-full' })}
${cellsWeSell(h, { cls: 'd5-full' })}
${sovereignExample(h)}
${eventTeam(h, { grid: '<p class="more"><a href="#sites">The cells at work, on the wall above</a></p>' })}
${properties(h, { listCls: 'promises d5-props' })}
${devices(h)}
${b.team}
${b.faq}
${b.final}
</div>
<div class="d5-sticky" aria-label="Price">
${ep ? `<p class="kp d5-sprice cp">${ep.html}</p>` : ''}
<a class="btn" href="${ASK}">${esc(l.primary || 'Ask for a site')}</a>
</div>`;
}

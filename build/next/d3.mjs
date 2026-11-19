// /next/d/3/ Stop renting your website: a ledger. The first screen sets three years of the platforms' published
// prices against one payment; then the chart, rent or own, can you leave and the compare teaser, before anything else.
// Written by designer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 2). Code under Apache-2.0.
import { homeBlocks, lead, oneIdea, prose, inline, esc, cta, figure, get, sectionOf } from './parts.mjs';
import { bigPrice, threeYearBars, compareTeaser, exGrid, whatYouGet, OWNERS } from './design-kit.mjs';

export const name = 'Stop renting your website';
export const css = ['/assets/next/d3.css'];
export function home(h) {
  const { data, figs, root } = h;
  const c = data.copy;
  const b = homeBlocks(h);
  const l = lead(c, 3);
  const idea = oneIdea(c) || '';
  const sub = l.sub ? prose(l.sub) : '';
  const kicker = idea && !String(l.sub || '').includes(idea) ? `<p class="kicker">${inline(idea)}</p>` : '';
  const pay = (get(c, 'rent_or_own') || []).find((r) => /pay/i.test(r.topic || '')) || {};
  const ex = sectionOf(c, 'examples') || {};
  return `<section class="d3-hero"><div class="in">
<div class="d3-head">
<h1>${l.headline ? inline(l.headline) : esc(name)}</h1>
${kicker}${sub}
</div>
<div class="d3-ledger">
<div class="d3-col d3-rent">
<p class="d3-col-h"><span>Renting</span> <span class="d3-col-sub">${inline(pay.rent || '')}</span></p>
${threeYearBars(data)}
</div>
<div class="d3-col d3-own">
<p class="d3-col-h"><span>Owning</span> <span class="d3-col-sub">${inline(pay.own || '')}</span></p>
${bigPrice(data, { cls: 'kp d3-price' })}
${get(c, 'offer_note') ? `<p class="d3-note">${inline(get(c, 'offer_note'))}</p>` : ''}
${cta(c, { primary: l.primary, secondary: l.secondary })}
</div>
</div>
</div></section>
<div class="d3-body">
<section class="sec d3-stmt" id="three-years" aria-label="Three years of a platform">
${figure(figs, 'year-of-platform')}
</section>
${b.rentOrOwn}
${b.canYouLeave}
<section class="sec d3-teaser" id="compare">
<h2>Rent or own, in short</h2>
${compareTeaser(data)}
<p class="more"><a href="/next/compare/">${esc(get(get(c, 'cta') || {}, 'compare') || 'Compare renting and owning')}</a>: every platform, every row, each with its source.</p>
</section>
${whatYouGet(h)}
${b.briefToClaude}
<section class="sec d3-ex" id="examples">
<h2>${inline(get(ex, 'title') || 'Examples')}</h2>
${prose(get(ex, 'text'))}
${exGrid(data, root, { slugs: [...OWNERS(data), 'algarve-holiday-homes', 'agenticcells-ai', 'riskmandate-at-websummit'], limit: 6, variant: 'plain', cls: 'kx-grid d3-rows' })}
<p class="more"><a href="/next/examples/">All the examples</a></p>
</section>
${b.price}
${b.faq}
${b.final}
</div>`;
}

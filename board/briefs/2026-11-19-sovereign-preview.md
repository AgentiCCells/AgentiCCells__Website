# Brief: the sovereign website, as a preview at /next/

Kept by conductor.agenticcells-ai@AgentiCCells.dinis (session https://claude.ai/code/session_01Kw9UwBFAEwyPc1Pt1idWxz), started 2026-11-19 ~03:40 UTC.

## Dinis's words (verbatim, with the time)
Dinis Cruz, 2026-11-19 ~03:35 UTC, in conductor.b's session (relayed by conductor.b@AgentiCCells.dinis):

> "Okay, so I'm off to bed now. So can you set up a team and start a team and do all this stuff so that when I wake up in the morning, I can review it and we can look at this. And remember that you should have 5 designs and make these designs, again, very product driven. This needs to be very visual, lots of examples, lots of infographics, lots of pages to explain stuff, and it needs to be a proper pricing, like, you know, pricing comparison, you know, feature comparison with other types of sites. It needs to be a very professional, but again, different styles. 5 can make the 5 versions, you just look from the top. So make it very visual because we want to go to market and sell a lot of those 50 quid ones. But of course, you still have the bigger ones, like the 500 and the 1500. No, actually, the 1500 and the 5K. We still have it, and we're just lowering the price of the first one."

Sources that set the product (Dinis's own articles, newsroom.sgit.ai/articles/): the-sovereign-website (the pivot brief), the-pitch, sovereignty-you-can-move, no-lock-in, static-against-the-platforms, fliplet-and-the-website-cell, partners-sell-we-build, you-bring-the-business, the-website-cell, the-cell-is-the-unit, fork-it, a-hub-for-agentic-sites, a-team-like-this. conductor.b's draft: AgentiCCells__Site__Factory, team/conductor.b/briefs/2026-11-19__agenticcells-ai-sovereign-website.md.

## The one idea
"A website you own, control and can take anywhere." Sovereignty is being able to move the site, its data and its schema; not where it is hosted.

## What goes live tonight, and where
Everything new lives under **/next/** on agenticcells.ai, marked "Preview", `noindex`, not in any sitemap, and linked from nowhere on the current site. The current home page and current prices stay as they are until Dinis says so. Release only through team/release.sh to dev.

## File contract (so roles can work in parallel)
| Path | Owner | What |
|---|---|---|
| data/next/offer.json | conductor | The preview's prices. The only place a preview price is written. |
| data/next/competitors.json | researcher | Every competitor fact: value, quote, source URL, date read, "from their own page". |
| next/copy.json | writer | Every word on the five home designs (same words in all five). |
| next/pages/*.md | writer | The explain pages: what-you-get, how-it-works, sovereignty, no-lock-in, security, examples, partners, faq, pricing, compare. |
| next/figures/*.svg and next/figures/*.md | designer | The infographics, each an accessible inline SVG (title, desc, role="img") with a text version in the .md beside it. |
| next/examples.json | researcher | Examples from the hub and the factory: only owners who agreed, demos labelled. |
| build/pages/next.mjs, assets/next/ | developer | The build of /next/: chooser, five designs, pages, tables from data. |
| build/validate.js (the /next/ part only) | developer | Scoped checks for /next/; never weaker than today's checks. |

## Rules that the checks enforce (read before writing anything)
- No em dashes anywhere. No hype words. Plain British English. They/them for people.
- A line of HTML that holds `£`, `$` or `€` followed by a digit must say "launch price" or "first proposal" on the same line. Our own prices only use £ or €. Write competitor prices with ISO codes ("USD 17 a month", "GBP 16 a month"), each with its link and date.
- Every figure (a count, money, a percentage, a duration) in a page's main text needs an external evidence link in the same sentence. Write small counts in words ("five designs"), and link every competitor figure to its source.
- Never name a person or a customer without recorded consent (data/cells-registry.json "consent"). Algarve Evolution is never shown, named or linked.
- Mark proposals as proposals and simulations as simulations.

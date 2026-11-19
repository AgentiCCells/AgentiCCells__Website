# Round R1: the builder of agenticcells.ai (design and build)

2026-11-19. Written by designer.agenticcells-ai@AgentiCCells.dinis, acting as the builder, a sub-agent of the conductor. Brief: board/briefs/2026-11-19-refactor-agentic-cells.md. It includes Dinis's own words at about 17:55 UTC: the four-rung ladder, and PrompTugal.news and the Sovereign Agentic Website as the case studies. I also followed three later notes from the conductor (the writer's R1 and R2 keys, website_title, the routes). Nothing was committed or pushed. I did not run or wrap build/build.mjs; I only read PROOF_SHOTS from it. I did not delete site/: only build/next-local.mjs wrote into it. I edited no check, and I added no email address or mailto anywhere.

## Files
- New: build/next/cells.mjs, the agentic-cells sections:
  - what a cell is, with the agentic web as an aside;
  - the cells we sell, as a ladder;
  - the compact ladder for first screens, and the ladder's entry price;
  - the case studies;
  - the sovereign website as the example;
  - a bigger cell at work, with the proof screenshots;
  - what every cell has;
  - the devices (marked "Plan");
  - the explain-page list for /next/sovereign-website/.
- New figures:
  - next/figures/cell.mjs: one session, a conductor and six agents with their roles, and the owner outside, talking to the conductor in plain words. Below that, where the session can run: a laptop or a cloud session (today), and a Raspberry Pi and an Android tablet (both "Planned"). The roles come from the article "a website with a team inside" and the devices from the appliance plan; both are linked in the text version.
  - next/figures/ladder.mjs: the cells we sell as a staircase, smallest to largest. Each price and its mark are in one `<text>` element, so they sit on one line of the page.
- Rebuilt: build/next/d1.mjs to d5.mjs.
- Changed:
  - build/next/parts.mjs: the nav; the footer list; the data/cells.json load; the CTA routes; tokens may now hold `_` and `-`; website_title is used for the website's columns and cards.
  - build/next/labels.mjs: `websiteTitle()`.
  - build/next/design-kit.mjs: the compare teaser row is labelled with website_title.
  - build/pages/next.mjs: the new pages and tokens; the chooser; the /next/sovereign-website/ link list.
  - assets/next/base.css and d1.css to d5.css.
  - attack-surface, can-you-leave and year-of-platform figures: labelled with website_title.
  - next/DESIGNS.md: a new line for each design, and a Round R1 section.
  - assets/next/thumbs/d1.jpg to d5.jpg.

## What the homes do now
- **Prices.** They come from data/cells.json: £500, £1,500, £5,000 and £20,000, each a first proposal. A cells_we_sell price of "500", "1500", "5000" or "20000" is a rung. "launch" is the £50 from data/next/offer.json, and "ask" shows as "Priced for each engagement: ask us". No price is typed in copy, and nothing says "from £".
- **The first screen.** Each design shows its lead and either a compact four-rung ladder (designs one to three) or the entry price, "One agent £500, first proposal", set large (designs four and five).
- **The £50.** It appears once on each home, in the sovereign website's case-study card. The writer also had it in a sovereign_example point. On the homes that point is left out while case studies exist, and it stays on the explain pages. The {{offer}} token now gives the ladder on every page except /next/sovereign-website/, which keeps the £50 card, labelled "The Sovereign Agentic Website".
- **Order** (designs one, three and four):
  1. the first screen;
  2. the case studies;
  3. what a cell is, with the cell figure;
  4. the cells we sell: the ladder figure and the cards;
  5. the sovereign website (design three adds the platforms' three-year bars here);
  6. a bigger cell at work, with the web-summit.sgit.ai screenshots from assets/media/proof/ and captions that name no one;
  7. what every cell has;
  8. the devices (marked "Plan");
  9. the team;
  10. examples;
  11. questions;
  12. the final call to action.
- **Where designs two and five differ:**
  - Design two puts what every cell has as the numbered cards straight under the first screen, because its headline is "Six things every cell gives you."
  - Design five leads with a wall that mixes live sites with "Cells at work" tiles, the team's working site first and large. It has no separate examples section, because the wall is the examples.
- **Nav:** Designs, Cells, Case studies, Agentic web, Sovereign website, Team work, Pricing, Examples, FAQ, Start, Review. The other explain pages are in the footer list and are linked from the foot of /next/sovereign-website/.
- **New pages:**
  - /next/cells/, /next/case-studies/, /next/agentic-web/, /next/sovereign-website/ and /next/team-work/.
  - Tokens: `{{cells}}` (the ladder cards), `{{proof}}` (the screenshots) and `{{case_studies}}` or `{{case-studies}}`.
  - `{{table:pricing}}` now shows the four rungs with the honest notes. The euro note on /next/pricing/ is left out while the ladder is in use, because it is about the £50.

## Checks (last run, after the last change)
- `node build/next-local.mjs`: 23 pages.
- `node build/validate.js`: OK. The only warnings are V-OG lengths on live pages.
- `node build/check-evidence.mjs`: OK.
- `node build/check-internal-links.mjs`: all resolve.
- `node build/leak-scan.mjs`: OK (779 files).
- Chromium (Playwright) against `python3 -m http.server 8131 -d site`, all 23 /next/ pages at 390x844 and 1366x768: 46 of 46 OK. Each page returned 200, has one h1, and showed no console errors, no requests to other hosts, no horizontal scroll and no "to be written" box. The server was stopped afterwards.
- No em dashes or hype words in the changed files.
- Thumbnails: 1366x768, JPEG quality 72, taken after the writer's R2 copy landed. Sizes are 87 to 137 KB.

## Looked at and fixed
- The entry price's comma sat apart from the figure. The large price is now one run of text.
- The cell figure was squeezed into its narrow form beside the words. It is now full width, with the words and points in two columns above it.
- The ladder figure repeated the section heading. Its title is now "Smallest to largest".
- On the case-study card, the sovereign website's offer line is added only when the writer's words do not already state it.
- In "A bigger cell at work", the screenshot note sat far below the screenshots. It is now under them.

## Left for others
- next/figures/README.md needs rows for cell and ladder (not in this round's files).
- The developer: twice, in a reused browser context, a 390 px home page loaded scrolled about 200 px down (d1 once, d3 once). I could not repeat it in a fresh page. It may come from the nav's `scroll-initial-target`. Worth a look.
- The writer: the sovereign_example point "Its own launch offer: £50 ..." is hidden on the homes, as above. If the £50 should appear only in the case study everywhere, take it out of sovereign_example.

## Refused or blocked
Nothing refused or blocked.

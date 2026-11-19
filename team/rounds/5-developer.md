# Round 5: the developer of agenticcells.ai

2026-11-19. Written by developer.agenticcells-ai@AgentiCCells.dinis, a sub-agent of the conductor, for the conductor's round 5 brief: seven fixes from team/rounds/4-*.md and board/reviews/2026-11-19-next-preview-r3.md (items 11, 13 in part, 18). Nothing committed or pushed. build/build.mjs not run or wrapped. site/ not deleted (only build/next-local.mjs wrote into it). No check edited. No email address or mailto anywhere.

## Files changed
- build/next/parts.mjs: `bigger()` gives a `short` line without the price; the pricing ladder uses it. New `noSelfButtons()`, `claudeNote()`, `firstClause()`, `GLANCE_ROWS`, `glanceTable()`. The compare table's "Three years" cell for us carries the Claude Pro note.
- build/pages/next.mjs: the `{{table:glance}}` token; every page passes through `noSelfButtons()`.
- build/next/d3.mjs: "Rent or own" and the short table are one section.
- build/next/design-kit.mjs: the short rent-or-own table's cells carry `data-l` (their column's name) for the phone layout; its region label no longer says "in short".
- next/pages/compare.md: one line, `{{table:glance}}`, after the opening paragraph.
- next/figures/README.md: an attack-surface row; year-of-platform's new data (website_cell.facts.optional_editing_cost, copy.offer_title) and its three-part "our side"; can-you-leave's copy.offer_title.
- assets/next/tables.css, base.css, d2.css: the visual pass (below).

## The fixes
1. **Bigger-offer cards on /next/pricing/ show the price once.** The card prints "£1,500 first proposal." then the words without the "{price}, first proposal." part. Taken from copy.bigger[].line by removing that part. The lists elsewhere (offer block, designs) still use the full line, with its price.
2. **No button to the page it is on.** Any `btn ghost` link whose href is the page's own path is removed from the finished page, so "See the price" never shows on /next/pricing/. Today /next/pricing/ has no offer card (the writer took `{{offer}}` out in round 4), so this is a guard; it also covers any later card.
3. **d3: one heading.** The "Rent or own" section now holds the rent-or-own figure, the short three-platform table and the "Compare renting and owning" link. The separate "Rent or own, in short" heading is gone. The section keeps `id="compare"`. On d3 the h2 is visually hidden, as for every home section that opens with a figure, and the figure carries the title.
4. **"At a glance" on /next/compare/.** `{{table:glance}}` renders an h2 "At a glance" and a table: four rows (Who owns the files, Can you leave, Subscription, Three-year cost) by our column first, then the seven others from data/next/competitors.json. Each cell is the value's first clause, up to the first ";", ":", " (" or sentence end. A comma does not end a clause, so a "but" stays with what it qualifies: Wix reads "You can leave and keep your domain, but the site itself cannot move to another host". Each cell ends with a small "source" link to that fact's source_url. Under 640 px it shows as stacked cards, one per column, with the row name and value side by side. A line under it says the full answers and dates are in the tables below.
5. **Our "Three years" cell.** In the compare table and the glance table it now ends "..., plus [Claude Pro](https://claude.com/pricing) if you edit it yourself". The link is website_cell.facts.optional_editing_cost.source_url. If that fact goes missing, the note goes too.
6. **next/figures/README.md**: done (above).
7. **Visual pass of the five homes at 1366x768 and 390x844.** I looked at full-page screenshots. Fixed in CSS:
   - d1, d3 and every page with the brief-to-claude figure, at 390: the narrow SVG draws its last note about 28 units below its own viewBox, so the note ran over "Text version". base.css now leaves 2.2rem under that SVG. The real fix belongs to the designer: raise the narrow viewBox height in next/figures/brief-to-claude.mjs (it measured 1011 against 983). No other figure overflows on any page at either width.
   - d2 at 1366: in the full-width (even) sections, the lead line under a hidden figure heading sat at the window's left edge, because base.css's `margin: 0` won over d2's centring. d2.css centres it; every d2 section now starts at the same x (123 px).
   - d3 at 390: the short rent-or-own table scrolled sideways with most columns cut off. Under 640 px it is now one card per platform, each value under its column name (tables.css, `data-l`).
   - d1 (and every design using `.promises`) at 1366: the six promises were laid out four then two. They are now three by two from 60rem.
   - The price section on every home: a large gap between "Bigger offers", its intro and the list (grid gap plus paragraph margins). base.css tightens it.
   - Looked at and left alone: d4 and d5 have nothing clipped or overlapping. d5's full-width header is a choice of the design.

## Checks (last run, after the last change)
- `node build/next-local.mjs`: 18 pages.
- `node build/validate.js`: OK. The only warnings are four V-OG lengths on live pages, not /next/.
- `node build/check-evidence.mjs`: OK.
- `node build/check-internal-links.mjs`: all resolve.
- `node build/leak-scan.mjs`: OK (760 files, 447 binary skipped).
- Chromium (Playwright) against `python3 -m http.server 8129 -d site`, all 18 /next/ pages at 1366x768 and 390x844: ALL OK, 36 of 36. Every page returned status 200 and has one h1, with no console errors, no requests to other hosts and no horizontal scroll. The script also flags clipped boxes. The only ones it found are the visually hidden home headings, and on d2 an example URL cut with an ellipsis on purpose. The server was stopped afterwards.
- No em dashes in the changed files.

## Left for others
- **Designer:** brief-to-claude.mjs narrow viewBox height (above); the CSS margin can go once it is fixed.
- **Length of /next/compare/ at 390** (review item 11): 20,855 px. Round 4 measured 21,944 px; the review read 19,793 px on an older version. The glance cards add about 1,100 px at the top, where a buyer meets them first. The rest of the length is the two full tables as cards. The review's other half of item 11, one link per value instead of two in the full tables, is still open. It changes `withSources()`/`factInner()`, which the evidence check depends on, so it needs its own round.
- **Writer or researcher:** the glance shows "Partly" for Squarespace's "Can you leave". That is its value's first clause, and the full sentence is in the table below. If a fuller short answer is wanted, put it first in competitors.json.

## Refused or blocked
Nothing refused or blocked.

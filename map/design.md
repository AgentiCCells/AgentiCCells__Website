# Map: the site's design

Kept by designer@AgentiCCells.dinis. Brief: board/briefs/designer.md. Goal (Dinis, 2026-11-15): "I want to start selling this website". Aim: clear, calm, credible.

## D1 · Visual identity (2026-11-15)

### Text mark
- The wordmark is the word "AgentiCCells" set in the body font, bold, one step larger than body text, in the text colour. Markup: `<a class="brand" href="/">` in build/build.mjs.
- Before the word is a small outlined rounded square in the accent colour, drawn in CSS (`.brand::before`): one cell. No image file, nothing to license.
- The two capital Cs are not styled apart from the other letters. Reason: queue item D7 holds any "CC" styling until researcher@'s S4 answers whether Creative Commons' trademark policy allows it. The capitals already make the double C visible in plain text.

### Colours
Two palettes, chosen by `prefers-color-scheme`. One accent (a deep teal, lightened for dark mode), neutrals with a slight cool tint, no other colours on content pages. Why: a single calm accent reads as a business tool, not a campaign; teal keeps it apart from the default link blue without loud colour.

| Token | Light | Dark | Use |
|---|---|---|---|
| --bg | #ffffff | #111518 | page |
| --surface | #f4f6f6 | #1a2025 | code, later cards |
| --fg | #16191d | #e7eaed | text |
| --muted | #4f5861 | #a7b0b8 | footer, table heads, notes |
| --accent | #0a5c6b | #6ec6d6 | links, the mark, focus ring |
| --on-accent | #ffffff | #111518 | text on an accent fill (buttons, D2) |
| --line | #d5dbdf | #2e373e | rules and borders (not text) |

Contrast, measured with the WCAG 2.x relative-luminance formula (script run in the designer session, 2026-11-15). AA needs 4.5:1 for body text.

| Pair | Light on bg | Light on surface | Dark on bg | Dark on surface |
|---|---|---|---|---|
| fg | 17.63 | 16.26 | 15.20 | 13.62 |
| muted | 7.24 | 6.67 | 8.34 | 7.47 |
| accent | 7.62 | 7.02 | 9.36 | 8.39 |

on-accent on accent: 7.62 (light), 9.36 (dark). Every text pair passes AA and AAA (7:1).

### Type
- System font stack (`system-ui` and platform fallbacks), monospace stack for code. Why: no font file to host, license or download; fast; the validator forbids other hosts anyway. If a brand font is wanted later, it must be self-hosted with its licence recorded here.
- Scale: ratio 1.25 from a 1rem body (1rem, 1.25, 1.563, 1.953, 2.441). h1 is fluid between steps 3 and 4. Body is 17px from 768px wide up. Line length capped at 42rem.
- Focus: a 3px accent outline on `:focus-visible` (more in D6).

### Checked
- `node build/build.mjs` and `node build/validate.js`: OK.
- Playwright (pre-installed Chromium), home, cells and console pages at 390px and 1280px, light and dark: no horizontal scroll (scrollWidth equals viewport width in all twelve cases); screenshots looked at.
- Seen, left for later items: on the console board, item codes such as `ACC-001` break across two lines at 1280px (from `overflow-wrap:anywhere`, older than D1): D4. The header nav wraps to a second line at 1280px: D3.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Visual identity: text mark, palette, type scale | designer@ | brief, queue D1, D7 | assets/style.css, `.brand` in build/build.mjs, this file | team/activity/designer.jsonl, D1 commit |

## D2 · Home page layout (2026-11-15)
- First screen: the h1 and the opening sentence become a `.hero` section with one call to action, a button "Email agent@riskmandate.ai" (template markup in build/build.mjs, `hero()`, home page only). No words in content/ changed.
- Lists whose every item starts with a **bold lead** get `class="points"` and show as cards in a grid (one column at 390px, two at 1280px). On the home page: "What you get in week one" and "Four properties". The same rule also applies on other pages with such lists.
- The ladder table (`{{ladder}}`) carries `data-label` on each cell; under 40rem each row is a card with its labels.
- Numbered lines ("1. ...") now render as an ordered list (`ol.steps`) with numbered badges; before, "How to start" showed as one run-on paragraph.
- The CTA is the email for now. When writer@'s /website-cell/ page exists (W10), D9 makes that the main call to action.

### Checked
- `node build/build.mjs` and `node build/validate.js`: OK.
- Playwright, home, cells, about and console at 390px and 1280px, light and dark: scrollWidth equals viewport width in all sixteen cases; screenshots looked at.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 2 | Home layout: hero and CTA, point cards, ladder cards, numbered steps | designer@ | queue D2, content/index.md | assets/style.css, build/build.mjs (markup and classes) | team/activity/designer.jsonl, D2 commit |

## D9 · The /website-cell/ seven-step diagram (2026-11-15)
- An inline SVG (`figure.flow`) inserted by build/build.mjs before the numbered steps on /website-cell/ only. One vertical column of seven numbered nodes with who acts at each (you, us, our agents, your browser). Vertical so it reads at 390px with no scroll. Has `<title>`, `<desc>` and a caption that says it is a proposal not yet run end to end. No words in content/ changed; the "who acts" labels are a reading of writer@'s steps, so writer@ should confirm them.
- Colours come from the palette variables, so light and dark both work. No external files, no script.
- The page already shows the CTA as the home page's main call to action (writer@, 3f2848c); the button on /website-cell/ itself is left to D3 and writer@.
- Checked: build and validate OK; Playwright over http at 390px and 1280px, light and dark: scrollWidth equals viewport width in all four; screenshots looked at.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 3 | Seven-step diagram for the offer page | designer@ | queue D9, content/website-cell.md | build/build.mjs, assets/style.css | team/activity/designer.jsonl, D9 commit |

## D3 · Navigation and footer (2026-11-15)
- Nav links are 44px-high tap targets (min-height 2.75rem), the nav takes its own row under the mark, and the current page shows a bold label with an accent underline plus `aria-current="page"` (already in the template). The footer is three short lines: contact, licences, version in monospace. Markup change in build/build.mjs `page()`; no words in content/ changed.
- Checked: build and validate OK; Playwright at 390px and 1280px, light and dark, on /, /website-cell/ and /console/: scrollWidth equals viewport in all twelve; one 390px dark screenshot looked at. At 390px the nav takes three rows; a menu button would need a script, which the brief forbids.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 4 | Nav tap targets, footer structure | designer@ | queue D3 | assets/style.css, build/build.mjs | team/activity/designer.jsonl, D3 commit |

## D4 · Console styling (2026-11-15)
- assets/console.css only; no change to build/pages/console.mjs or any words. Status shows as a pill with a symbol (tick, play, pause, circle) and colour, so it is not colour alone; done is green, doing is the accent, waits is amber, each with light and dark values. Status text from the board can be long, so the pill wraps instead of clipping.
- Under 40rem the board, agents and schedule tables become labelled cards (labels come from CSS, matching the column headings in console.mjs; if console@ changes the columns, update the labels). From 40rem: zebra rows.
- Timeline: monospace time, tag as a small outlined label, commits marked with an accent rule and tint. Day links are 44px tap targets.
- Checked: build and validate OK; Playwright on /console/ and /console/2026-11-15/ at 390px and 1280px, light and dark: scrollWidth equals viewport in all eight; board and timeline screenshots looked at. Contrast of the new status colours was not measured numerically (D6 will).

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 5 | Console status pills, table cards, timeline | designer@ | queue D4 | assets/console.css | team/activity/designer.jsonl, D4 commit |

## D10 navigation and logo mark (designer@AgentiCCells.dinis, 2026-11-15)
- Before (reviewer@ shots, 21:55): nine links over two lines at 1280 px, three on a phone; outlined square as the mark.
- After: five primary links (Home, The website cell, Cells, The method, About) on one line at 1280 px (header 77 px tall, measured); at 390 px a "Menu" button (details/summary, no script) opens a list with the current page marked. Open source, The console, How this site was built and Case study moved to a "More" row in the footer. Checked light and dark at 390 and 1280 px: no horizontal scroll (scrollWidth equals viewport).
- Mark: inline SVG of two overlapping C arcs (the back one lighter), accent colour. It makes no claim about Creative Commons' "CC" (D7 holds).
- Layout width for header, main and footer is 46 rem from 48 rem up, so the mark lines up with the text.

## D11 link styling and rhythm (designer@AgentiCCells.dinis, 2026-11-15)
- Before: links used the default underline (about 1.5 px at body size, 0.15em offset); a bare "source" or "Link" looked like body text; h2 had 2 rem above it.
- After: inline links have a 1 px underline at 0.22em offset, softened to 55% accent, thickening to 2 px on hover; "source", "link" and "code" links get class `cite` (80% size, tap area 32 px high through a transparent ::after, no change to line height); h2 has 3 rem above it (1 rem when it follows h1); `ul.points` cards fill their grid row so heights match in each row. Buttons, nav and the mark keep no underline. Words in content/ unchanged; markup change only in build/build.mjs `inline()` and the ladder links.
- Checked: build and validate OK; Playwright on /, /about/, /cells/ at 390 and 1280 px, light and dark: scrollWidth equals viewport in all twelve. Looked at /about/ at 390 px before and after (screenshots kept in the scratchpad, not in git). Contrast of the softened underline was not measured; the link text colour is unchanged (D6 will check).

## D5 cell diagram and home hero (designer@AgentiCCells.dinis, 2026-11-16)
- Why: reviewer@ (2026-11-15 23:10) problem 2: the home page had no hero or picture of a cell (D-RV2).
- Diagram: inline SVG in `build/build.mjs` (`CELL`), no external files, theme colours from the palette, `title` and `desc` for screen readers. Shows a membrane ("your environment"), a conductor, three agents each with a key, a board, a console, and "You: see it, stop it" outside. A proposal, as the caption says.
- Hero: two columns from 48 rem (text and buttons left, diagram right), one column on phones; header, main and footer widen to 62 rem on the home page only (body class `home`); main button goes to /website-cell/, the email is the ghost button. Markup and CSS only; no words in content/ changed.
- Checked with Playwright at 390 and 1280 px, light and dark: no horizontal scroll (scrollWidth equals viewport in all four). Contrast: palette unchanged.
- Open: the caption and the button label are mine as a stopgap; writer@ may reword them (inbox note). D-RV2's logo part was done in D10; D5 also applies to the method page, not yet placed there.

## D6 · Accessibility pass (designer@AgentiCCells.dinis, 2026-11-16)
Method: axe-core 4.10.2 (rules wcag2a, wcag2aa, wcag21aa, best-practice) in Chromium over a local server of the built site: all 17 pages, 390 and 1280 px, light and dark. (A first run from file:// had no CSS and was discarded.) Axe is run from a scratch folder; it is not added to the repository.
- Result: 0 violations. Axe could not decide contrast for text over the hero gradient and SVG diagrams; measured by hand instead (WCAG ratios, light / dark): fg on bg 17.6 / 15.2; muted on bg 7.2 / 8.3; muted on surface 6.7 / 7.5; muted on the cell figure tint 6.4 / 7.3; accent on bg 7.6 / 9.4; accent on surface 7.0 / 8.4; on-accent on accent 7.6 / 9.4. The hero gradient runs from surface to bg, so every pair above covers it. All at least 4.5:1. Console status pills passed axe in both themes.
- Headings: one h1 per page, no skipped levels (checked on home, console, website cell). Images: the pages use inline SVG with titles; no img elements, so no alt text to add.
- Keyboard: 21 tab stops on the home page, every one with a visible outline (3 px accent) at both widths and in both themes; the Menu summary shows a focus ring.
- Changed: a "Skip to the content" link (first tab stop, visible on focus, moves focus to main); `main` is the skip target; reduced-motion and forced-colours rules.
- Not done: screen reader run (no reader in this session); the line colour (1.4:1 on bg) is decoration only, not the only cue for any control.

## D8 synthetic-user test (designer@AgentiCCells.dinis, 2026-11-16)
Method: Playwright and Chromium over a local server of the built site (commit of origin/dev at run time); three scripted buyers, five questions each, at 390 and 1280 px. A script checks that the page answering each question loads (200) and contains the words that answer it, and for the first-screen questions whether the element is inside the viewport (844 px and 800 px tall). This is a simulation of buyers, not real buyers; it finds missing or buried answers, not whether the answers persuade. Script kept in the scratchpad, not in git.
- CTO (what is it; can I see and stop agents; licence; where keys live; is the console real): all five answered, at both widths. The first sentence ("small teams of AI agents") is in the first screen. Not tested: whether the method page's wording convinces.
- Ops lead (week one; price; how to start; what you need from me; is anything sold): all five answered, at both widths. The price sits on /cells/, two clicks from home; "nothing sold yet" appears on /website-cell/ and on home, not in the hero.
- Solo founder (can I buy a website; price; technical?; what I own; who to contact): four of five answered in the first screen or one click. **Stuck:** at 390 px the first "£500" is 1,025 px down the home page, below the first screen (844 px); at 1280 px it is in the first screen. This is reviewer@'s W-RV3 on a phone, now measured.
- Measured on home: no horizontal scroll at either width; 9 links under 32 px high at 390 px and 12 at 1280 px outside the `cite` class (D-RV3 is still open for them).
- Limits: word matching can pass a page that is hard to read; no real reader was involved; 17 pages, one browser.

## D-CELL · The cell page layout (2026-11-16, designer@)
Source: Dinis Cruz, "The cell is the unit" (newsroom.sgit.ai, 2026-11-16, "What to build next" 2). A proposal, as the article's catalogue is.
- Layout: main column (what it does as the lede, what you get, examples, use cases, behaviour policy) and a side panel "Four ways to start" (Free: the recipe / Our agent helps you / We help you, £1,500 / We set it up, from £500, the prices as first proposals). Panel beside the text from 64rem; under it as a card list below that. CSS only, no script, nothing third-party: the last block of assets/style.css.
- Worked example: /website-cell/ (content/website-cell.md, sections reordered to the convention, "Four ways to start" added; the recipe and the helper agent are marked as proposals because neither exists yet). The convention for writer@ is in assets/README.md.
- Measured with Playwright at 390 and 1366 px, light and dark: no horizontal scroll (scrollWidth equals the viewport in all four); at 1366 px the panel heading and list line up (heading 48 px, list starts 48 px lower, same left edge).
- Limit: the build wraps nothing, so the panel is the heading plus the list after it, placed with a grid and `:has()` (supported by current browsers; without it the page is one column and still correct). A wrapper in build/build.mjs would be simpler; left to dev@.

## D-FIVE · Design switcher and two more home designs (designer@, 2026-11-16)
Brief: board/briefs/two-sites-2026-11-16.md. Model: the five designs of Silvio Switha's site (a bar with "Choose a design", each design its own page).
- Switcher: a slim "Design" bar above the header on `/`, `/d/editorial/` and `/d/console/`: three links, current one marked `aria-current`. Plain links, no script, so the choice is the address and is not remembered between visits (Silvio's site remembers it with a script; ours does not, on purpose).
- Calm (`/`): the existing design, unchanged. Editorial (`/d/editorial/`): paper, serif headings, numbered sections with the heading in a side column, ruled lists. Console (`/d/console/`): dark or pale blue panels, mono labels, cards. Same words in all three: the pages are built from the home page's own HTML (`build/build.mjs`, `sectioned()`), so writer@'s edits to content/index.md show in all three.
- Files: assets/designs.css (loaded on the two design pages only), the bar in assets/style.css, `DESIGNS` and `designBar()` in build/build.mjs. The two extra designs are `noindex` and not in the sitemap, so the content is not duplicated for search.
- Checked with Chromium, 390 and 1366 px, light and dark, all three designs: no horizontal scroll (scrollWidth equals the viewport width). Contrast: palettes chosen for at least 4.5:1 (body text on its background about 14:1 to 17:1; muted and accent text not yet measured with a tool, so treat as to check).
- Not done: further designs (Silvio's has five); a remembered choice; designs for inner pages.

## D-FIVE (continued) · Third and fourth home designs: Gallery and Proof (designer@, 2026-11-17)
Brief: Dinis, board/briefs/two-sites-2026-11-16.md ("the 5 designs really go to town"); conductor@'s run note, 2026-11-17. The switcher now has five links: Calm, Editorial, Console, Gallery, Proof. Same home-page words in all five; the two new designs add only images and short captions.
- **Gallery** (`/d/gallery/`): photos first. A wide photo of the team inside the MEO Arena opens the page with the hero text below it; after the offer strip a three-photo strip (the RiskMandate stand, backstage, and the 1.8 s arena clip as a `<video controls muted preload="none">`, no autoplay, no script). Warm paper and berry in light, near-black and rose in dark; pill buttons; numbered sections as headings with rules. Photos are Dinis's Web Summit 2026 set (assets/media/websummit-2026/); resized WebP copies (117, 75 and 55 KB) were made because the 1600 px JPEGs are 280 to 330 KB, over the 200 KB image limit. The originals stay.
- **Proof** (`/d/proof/`): "The evidence wall" after the offer strip: eleven screenshots of live pages we or our newsroom made, each numbered and linked to the live page (team site, universe view, X-ray, pulse, company map, the map article, RiskMandate, PrompTugal.news, the Storm site, Lisbon Tech Fringe, a native app), then the page's sections as a numbered record (§01, §02, mono headings). Blue accent. Screenshots are researcher@'s from research/proof/shots/, resized (assets/media/proof/, source and licence in its README).
- Names and numbers: alt text and captions name no one (the badges show first names; only people recorded as agreeing may be named, and the captions do not rely on that). No figure is published in the new captions, so there is nothing to link; the map article is linked as the source of the counts it holds.
- Not used: the orange-grower screenshot, and `riskmandate-rules.jpg` (I could not find its live URL in researcher@'s catalogue, and no link means no entry).
- Checked: build and validate OK; Chromium over a local server, all five designs, 390 and 1366 px, light and dark (20 loads): no horizontal scroll (scrollWidth equals the viewport), no broken image. Contrast measured (WCAG ratio, light / dark) for the new palettes: Gallery fg 16.8 / 17.2, muted 7.4 / 9.4, accent 6.4 / 9.5, on-accent 7.0 / 9.4; Proof fg 16.8 / 16.1, muted 7.1 / 9.0, accent 7.2 / 9.1, on-accent 7.8 / 8.9; all at least 4.5:1 against bg (muted and accent also against surface, at least 6.7). Not checked: axe on the new pages; the video on a phone; page weight (Gallery is 10,498 px tall at 390 px, Proof 12,624 px).
- Open: the design choice is still not remembered between visits; the new designs are `noindex` and not in the sitemap, like the other two.

## D-FIVE-IMPROVE-2 · Editorial lifted (designer@, 2026-11-17)
Editorial was the one design with no pictures, so it read as Calm in a serif. Now a printed front page: a double-ruled dateline (Lisbon, November 2026, licences), "Plate 1" (the RiskMandate stand photo, grayscale with a sepia tint and a thin frame, badges already blurred in the file) beside the opening at 48rem and up with the cell diagram under it, and under the offer strip a row of three numbered figures (Fig. 1 to 3: RiskMandate, the X-ray, the map article), screenshots from research/proof/shots/ in grayscale that take colour on hover or focus, each linked to its live page. Captions name no one and carry no figure. Same words in all five designs; markup in `ED_*` in build/build.mjs, styles at the end of assets/designs.css. Checked with Chromium at 390 and 1366 px, light and dark: no horizontal scroll, images load, palette unchanged (contrast figures above still apply; the new text uses --muted and --accent on --bg). Not checked: axe on the page.

## D7 logo mark without a two-C glyph (designer@AgentiCCells.dinis, 2026-11-17)
- Reason: researcher@'s S4 note (research/cc-trademark.md, 2026-11-16) says no circle-C, no two-C glyph, no look-alike of the CC logo. The D10 mark was two overlapping C arcs, which is a two-C glyph.
- Now: a rounded square outline (a cell, lighter) with a solid rounded square inside it (the nucleus), accent colour, inline SVG in `MARK` in build/build.mjs. No letters, no arcs, no circle. The wordmark is the plain word "AgentiCCells" as before.
- Open for Dinis: whether the name itself is acceptable (S4 options A, B, C); nothing has been sent to Creative Commons.

## D-SELL selling first screen (designer@AgentiCCells.dinis, 2026-11-17)
- After the offer strip on the home page (all five designs): the example wall, six cards (Silvio Switha, José Bota and Yiheng Wang, tagged "Made for ...", all with consent recorded in data/cells-registry.json; then the personal site, RiskMandate at Web Summit and the made-up orange grower, tagged Demo). Each card links to the hub page of that site. Screenshots are the first screen of each live site at 1100 x 480, taken 2026-11-17, in assets/example-*.webp with half-width copies (12 to 37 KB each). The book card moved out of the wall to its own section.
- Then a price block: £500 one-off, "first proposal", "not yet sold", what you give, what you get, one button (mailto, "Ask for a site like these") and a link to the seven steps. The block reads data/offer.json: with `launch_gbp` null (now) it shows £500 only; once set, it strikes through £500 and shows the launch price linked to that file (tested with 250, then reverted).
- Checked at 390 and 1366 px, light and dark: no horizontal scroll; wall starts at 2,832 px on a phone (was 6,079); 390 px home is 12,310 px (was 11,746; +564, the price block); transfer 728 KB (budget 1.5 MB). a11y-check: no problems on the Gallery.

## D-PARTNER-INFO partner figures (designer@AgentiCCells.dinis, 2026-11-17)
- `build/partner-figs.mjs` makes four inline-SVG figures for each of three partner types: `flow` (the six steps of a deal), `lanes` (who does what: partner, AgentiCCells, agent team under policies, customer), `fit` (partner, customer, our factory, riskmandate.ai policies, the customer's GitHub and Claude) and `money` (who invoices, the 50/50 split, what the partner keeps).
- Token, on a line of its own in content/: `{{partner-fig:flow|lanes|fit|money:freelancer|consultancy|firm}}`. Twelve figures in all.
- One system: 360-unit portrait viewBox (scales to 390 px with text of 13 to 16 px), one grid, one stroke weight, same colour roles. One accent and one glyph per type (freelancer teal and one person, consultancy amber and three people, firm violet and a building); step wording differs per type (who finds, the "After" step). CSS is `.pfig` in assets/style.css, light and dark by token, text always on `--fg` or `--muted`.
- Accessible: each figure has a title, a full description in `<desc>`, and a caption. The only number is the 50/50 split, linked to the brief that records it. Marked as a proposal.
- Words in the figures are English only; locale builds show the same figure.
- Checked at 390 and 1280 px, light and dark, no horizontal scroll. Screenshots: board/debriefs/shots/2026-11-17-partner-figs/.

## D-SITEWIDE top bar and design layer (designer@AgentiCCells.dinis, 2026-11-17)
See board/debriefs/designer-2026-11-17.md. `header.topbar` and `.page-head` in assets/style.css; per-design tints at the end of assets/designs.css; `DESIGN_JS`, `designChooser` and `keyNav` in build/build.mjs.

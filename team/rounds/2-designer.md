# Round 2: designer.agenticcells-ai@AgentiCCells.dinis

19 November 2026. Sub-agent of conductor.agenticcells-ai@ in session https://claude.ai/code/session_01Kw9UwBFAEwyPc1Pt1idWxz. Nothing committed or pushed. build/build.mjs not run and not wrapped. site/ not deleted (only build/next-local.mjs wrote into it). build/pages/next.mjs and build/next/parts.mjs are not changed by me.

Dinis's words, 19 November 2026 ~03:35 UTC (board/briefs/2026-11-19-sovereign-preview.md): "you should have 5 designs and make these designs, again, very product driven. This needs to be very visual, lots of examples, lots of infographics ... very professional, but again, different styles."

## What changed

### New: build/next/design-kit.mjs (shared helpers for the designs)
- Example tiles, labelled by kind:
  - "Made for <name>" only where next/examples.json records consent to be named;
  - "Demo";
  - "Our own".
  - The label sits on the image.
  - There are three variants: a browser frame with the address, plain, and bare.
- Platform bars: three years of each platform's entry plan, from data/next/competitors.json. Each amount is the link to the platform's own price page. Amounts are in USD as published, not converted.
- A compare teaser table: a month, three years, and "can you leave with the site?". It covers the website cell, Wix, Squarespace and WordPress.com, each with its link.
- A large price line, written on one line so "launch price" sits beside the £.
- "What you get" without the doubled list under its figure.
- A one-figure section helper.

### Design 3, Stop renting your website: built (build/next/d3.mjs, assets/next/d3.css)
- **Style:** an account statement, with ruled lines, mono figures, red for renting and green for owning.
- **First screen:** the headline, the one idea and the lede, then a two-column ledger:
  - "Renting" shows bars for Fliplet, Durable, Squarespace, Wix, Framer and WordPress.com, each amount linked to its source.
  - "Owning" shows £50 set large with "launch price", the offer note and the two buttons.
- **Next sections, in this order:** the year-of-platform chart, rent or own, can you leave, then "Rent or own, in short" (the compare teaser and a link to /next/compare/).
- **Examples:** a compact list of six, each with a screenshot.
- **On a phone,** owning comes first, so the price is near the top.

### Design 4, Just say it: built (d4.mjs, d4.css)
- **Style:** plain, bold and typographic. Near-black page, warm white type, one yellow accent, statements up to about 6rem.
- **First screen:** "Just say it." in white and "Your site changes." in yellow; the one idea; the lede; the price; the two buttons.
- **Then the six promises, one per screen.** Each uses copy.json's words exactly, with its proof link and one picture:
  - You own it: what you get.
  - Nobody can lock you in: can you leave.
  - You change it by talking to Claude: brief to your own Claude.
  - You can run it anywhere: the tenets.
  - It looks better: six screenshots.
  - Almost nothing to attack, and it costs once: three years of a platform.
- **After the promises:** rent or own, how it works, the team, the price, questions, and a yellow final band.
- **Numbering:** the "01 / 06" counters are drawn by CSS, so no bare number sits in the text.
- **Direction change:** next/DESIGNS.md had a dark chat hero for this design. It now records this direction, from the conductor's round 2 brief.

### Design 5, Proof: built (d5.mjs, d5.css)
- **First strip:** the headline, the one idea and the lede on the left; £50 with "launch price" and the two buttons on the right.
- **Then the wall:** all twenty sites from next/examples.json on a grey wall.
  - The three named owners are double size.
  - A legend counts the kinds in words: three named owners, six demos, eleven of our own.
  - The wall ends with a blue tile: "Then ask for yours.", the price and the button.
- **After the wall:** figures in pairs, then one per row.
- **On a phone,** a price bar stays at the foot of the screen (sticky, in the page flow).

### Design 1, Sovereign: polished
- **Bug fixed:** the two-column section layout put each figure into a narrow column. The figures fell back to their tall narrow form, and the deliverables list overlapped the figure. Figures now run full width under their words.
- **New strip under the hero:** the three named owners' sites ("Made for José Bota" and the others) in paper frames.
- **Examples:** six framed screenshots.
- **What you get:** no doubled list.

### Design 2, Six promises: polished
- **Bug fixed:** the promise cards sat in the hero's left column with an empty right column. They now fill the width, three across.
- **The one idea:** the writer's new d2 lede no longer contains it, so it is back as a kicker above the pitch sentence.
- **New band after the promises:** four sites in browser frames.
- **What you get:** no doubled list.

### All five homes
- A section whose figure carries its own heading now hides its h2 visually; screen readers still get it. The page no longer shows the same heading twice. The section's words stay visible. (base.css, designer round 2 block.)

### Chooser thumbnails
- **Files:** assets/next/thumbs/d1.jpg to d5.jpg.
- **How they were made:** Chromium at 1366x768, deviceScaleFactor 1, JPEG quality 72, after the eager images had decoded.
- **Sizes:**
  - d1.jpg: 131,993 bytes
  - d2.jpg: 138,240 bytes
  - d3.jpg: 113,080 bytes
  - d4.jpg: 83,398 bytes
  - d5.jpg: 134,692 bytes
  - All are under 150 KB.
- **Chooser code:** the developer's chooser already picks the files up. I made no change to next.mjs. I briefly edited it before I saw the developer's version, then reverted my edit at once.
- **Aspect ratio:** base.css now shows the thumbnails at 1366/768 instead of 4/3, so the sides are not cropped.

### Figures (the conductor's three requests)
1. **GitHub Pages wording.** year-of-platform.mjs and rent-or-own.mjs now say: "Free on GitHub Pages for a public repository that is not an online shop or business transaction site (GitHub's terms), or any static host." In both text versions, "GitHub's terms" links to https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits.
2. **brief-to-claude.mjs reads all copy.steps (seven now).**
   - Each step gets an icon and a short line, matched by its title.
   - The milestone, Live and Hand-over are found by name, not by position.
   - The three months now say "an expectation we set ourselves, not yet a rule in the terms", in the SVG and in the text version.
3. **Section words may be objects.** rent-or-own.mjs and deliverables.mjs now read copy.sections.<key>.text when the value is an object.

### next/DESIGNS.md
- Design 4 is rewritten to the new direction.
- Design 3's first screen notes what was built.
- The Round 2 note is updated.

## Check outputs (last run, after the last change)
- `node build/next-local.mjs`: next-local: wrote 18 pages under site/next/
- `node build/validate.js`: OK (warnings only, none about /next/)
- `node build/check-evidence.mjs`: evidence: every figure on the published pages has an evidence link in its sentence
- `node build/check-internal-links.mjs`: internal links: all resolve
- `node build/leak-scan.mjs`: OK (746 files, 447 binary skipped)

**Chromium (Playwright)** against `python3 -m http.server 8124 -d site`, all 18 /next/ pages at 390x844 and 1366x768:
- Result: ALL OK, 36 of 36.
- Every page returned status 200, with no console errors, no requests to other hosts and no horizontal scroll.
- The server was stopped afterwards.

**First screen of each home at 1366x768,** bottom edge in px from the top of the page:

| Design | h1 | One idea | Price | First button |
|---|---|---|---|---|
| d1 | 262 | 262 | 210 | 334 |
| d2 | 407 | 142 | 236 | 360 |
| d3 | 216 | 172 | 435 | 560 |
| d4 | 350 | 417 | 598 | 593 |
| d5 | 190 | 219 | 222 | 212 |

All are inside 768.

## Screenshots looked at
- First screens of every home at 1366 and 390, and the chooser.
- Full pages of d1 to d5 at 1366, as contact sheets.
- Crops of the d5 wall, the d1 middle section and the chooser cards.

Location: /tmp/claude-0/-home-user-AgentiCCells--Website/0f5569d1-39d5-5ff3-894c-c784583807fb/scratchpad/shots/ (first_*, full_*), plus sheet*.png and the crops in the same scratchpad.

Fixed after looking:
- d1's narrow, overlapping figures.
- d2's half-width promise grid.
- d4's yellow button text on a yellow button.
- d4's preview-band links in yellow on pale yellow.
- A trailing comma inside the d3 bar links ("USD 900,").
- d3's bar rows were too wide on a phone.
- The doubled headings.
- The d5 wall had one orphan tile in its last row (the closing tile now fills that row).
- The cropped chooser thumbnails.

## For the conductor
1. **parts.mjs examples() still labels owners "Made for an owner".** It is used on /next/examples/. To label them exactly by kind, the one-line change is:
   - add `import { exLabel } from './design-kit.mjs';`
   - in examples(), use `const l = exLabel(x);` and render `<p class="tag ${l.cls}">${esc(l.text)}</p>`

   design-kit.mjs imports from parts.mjs, so the import is circular. ES modules allow this here, because both sides only use the other's functions at call time.
2. **/next/what-you-get/ still shows the deliverables figure and the same list under it,** through parts.mjs deliverables(). The homes use the kit's whatYouGet() instead.
3. **Each figure's SVG still carries its own title.** The homes hide the section h2 visually rather than drop the figure's heading. If you prefer, I can add a figure option to leave the SVG title out (it needs a layout change in all eight figures).
4. **WordPress.com is the cheapest bar in d3** (USD 99 over three years on its three-year term, from its own page). I kept it because leaving it out would be selective, and the bar's link shows the source.
5. **The d4 counter shows "/ 06" from CSS.** If the number of promises in copy.json changes, change that one line in d4.css.
6. **Contrast figures in DESIGNS.md for d4 are estimates,** marked as such. They were not measured with a tool.

## Refused or blocked
Nothing was refused.

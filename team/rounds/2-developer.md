# Round 2: the developer of agenticcells.ai

2026-11-19. Written by the developer agent of agenticcells.ai (the same identity as team/rounds/1-developer.md). The seven round 2 tasks from the conductor. I did not commit or push anything; the conductor commits. I did not run build/build.mjs or wrap it, did not delete site/, and did not edit any check in build/.

## Files changed
- build/next/parts.mjs: the table and card markup, the currency note, the euro note, text fallbacks for figures, section headings, the Review nav item, and the shell's landmarks and stylesheet links.
- build/pages/next.mjs: the new chooser, the /next/review/ page, the euro note on /next/pricing/, and the currency note rule.
- assets/next/tables.css (new): the wide table from 640 px, one card per column under 640 px.
- assets/next/shell.css (new): focus rings, the skip link, the Preview band's colours, the chooser's large cards, the explain row, the figure fallbacks and the notes. It is a new file because base.css now belongs to the designer.
- The shell links base.css, then tables.css, then shell.css, then the design's sheet.

## The tasks
1. **Tables on a phone.** compareTable and featuresTable write both versions. The first is the wide table (`.tw-wide`). The second is a list of cards (`.t-cards`), one per column with "Website cell" first. Each card has the name as an h3, then a `dl` with each row label and its value, basis and "source, read 19 November 2026" link. tables.css hides one version with display:none at 639.98 px, so assistive technology only meets the visible one. Each version is a labelled region. "Website cell" and a pound price are never on the same line, as the validator's V-OFFER rule requires.
2. **Text fallbacks.** If a figure's module is missing, figure() shows copy.steps as a numbered list for brief-to-claude and how-it-works. For the team figure it shows copy.team as a list, plus team_note. Other missing figures still show "To be written". sectionOf() now ignores a top-level copy.<key> array, such as steps or team, because that is content and not the section's words. Headings come from copy.sections.<key>.title when it is set; the promises heading also reads sections.promises.title. I tested this with an empty figure set; all figures exist in this run.
3. **Currency note.** "Their prices as published in US dollars, not converted, read 19 November 2026. Ours is in pounds." goes above the price table, with the date taken from competitors.json. It is left out when the page's own markdown contains "not converted". compare.md now says that itself, so the note shows only on /next/no-lock-in/.
4. **/next/review/.** Title "Morning review", in the same shell. The content comes from next/review.md, with optional front matter and the same tokens. The file does not exist yet, so the page shows "To be written." "Review" is now last in the nav, and the chooser links to the page.
   - Any address-shaped string in review.md is changed on the page only; the file itself is not touched. An agent name in the "role, at sign, AgentiCCells" form shows as its role part, and any other address becomes "[address removed]". Without this, the validator's no-email-address rule would fail the whole /next/ build on an agent signature.
5. **Chooser.** Five large cards, each one a link to its design.
   - Each card shows the thumbnail assets/next/thumbs/d<n>.jpg if it exists, with alt="" and the size read from the JPEG. Until then it shows the round 1 placeholder. The thumbs folder does not exist yet.
   - Then the design name as an h3, and one line: the "The story:" text from next/DESIGNS.md, falling back to "For:" and then to the built-in blurb.
   - Below the cards is a row of links to the eleven explain pages, each with the first sentence of its front-matter description.
6. **Euro note on /next/pricing/.** It sits right after the offer block: "Prices in euros. The launch price is (euro price) on our European pages (launch price), paid once." The price links to data/next/offer.json, and the whole note is on one line.
7. **Accessibility.**
   - Skip link: the first Tab reaches it, and Enter moves focus to `<main id="main" tabindex="-1">`.
   - Landmarks: one header (now holding the Preview band and the brand and nav), one nav labelled "Preview pages", one main and one footer.
   - Focus: a visible 3 px focus ring on links, summary and tabindex elements.
   - Keyboard: details and summary open with Enter or Space, tested on the FAQ and on a figure's text version.
   - Contrast: the Preview band text is 8.4:1 and its links 10.5:1; the focus colour is 10.0:1 on white.

## Checks
- `node build/next-local.mjs`: 18 pages.
- `node build/validate.js`: OK.
- `node build/check-evidence.mjs`: every figure has an evidence link.
- `node build/check-internal-links.mjs`: all resolve.
- `node build/leak-scan.mjs`: OK.
- Chromium (Playwright) with `python3 -m http.server 8125 -d site`, all 18 pages at 390x844 and 1366x768: ALL OK.
  - On every page: status 200, no console errors, no requests to other hosts, no horizontal scroll, one h1, and no images missing alt or failing to load.
  - At 390 px only the cards show; at 1366 px only the tables show.
  - The server was stopped.

## Notes for others
- compare.md says "not converted, read 19 November 2026 ..." twice (lines 9 and 15); that is for the writer to fix.
- While I was working, line 81 of build/pages/next.mjs briefly called `thumb(d.n, root)`, which I had not written; the build failed with "thumb is not a function". The next read showed my code again. design-kit.mjs has its own thumb(); the chooser uses the one in next.mjs. Both read the same file path.

## Refused or blocked
- Nothing was refused by me. A privacy hook in this session blocked a shell command that held agent names written in address form, so this note gives the names in words.

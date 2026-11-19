# Round 1: developer.agenticcells-ai@AgentiCCells.dinis

2026-11-19. The /next/ preview framework, from board/briefs/2026-11-19-sovereign-preview.md and -preview-contract.md, with the conductor's change during the round: no email address anywhere in /next/. Every "Email us", "Ask for a site" and {{contact}} link goes to the live /start-here/. render() takes no contact argument. Nothing committed or pushed; the conductor commits.

## Files made
- build/pages/next.mjs: the hook. It returns `[]` and pushes 17 complete documents into ctx.files: next/index.html (the chooser), next/d/1 to 5, and the eleven explain pages (what-you-get, how-it-works, sovereignty, no-lock-in, security, examples, partners, faq, pricing, compare, start). It exports `async render({ root })`; it is async because it imports next/figures/*.mjs.
- build/next/parts.mjs: the shared parts. Tolerant data loading, the shell (Preview band, header and nav, footer), a small markdown renderer with the tokens, price placeholders, the offer, the ladder, the compare and features tables, figures, examples, FAQ and the home blocks.
- build/next/d1.mjs to d5.mjs: one home page module per design. d1 Sovereign and d2 Six promises are designed; d3 to d5 use a simple layout with their own section order.
- build/next-local.mjs: renders into the existing site/. It replaces only site/next/ and site/assets/next/ (copied from assets/next/, as the full build does), and stops if site/index.html is missing.
- assets/next/base.css, d1.css, d2.css, and d3.css to d5.css (minimal stubs).
- build/validate.js: the /next/ part (below).

## How the data is read
- Prices come only from data/next/offer.json. The price line is `<s>£500</s> <s>£250</s> <strong>£50</strong> launch price, one-off.`, with £50 linked to the offer file. There is also a euro line ("€50 launch price"). Bigger offers are "first proposal", with words from copy.json bigger[].line ({price} filled in).
- copy.json placeholders {launch}, {launch_eur}, {usual}, {earlier} and {price} are filled everywhere, FAQ answers included. Inline markdown links are rendered as links.
- Figures: the contract ids, plus any next/figures/*.mjs whose name does not start with "_" (_shared.mjs is a helper). A missing figure shows a visible "To be written" box.
- The tables use competitors.json `competitors[].facts.<row>` and `website_cell.facts`. Each cell shows its value, its basis, and "source, read <date>" linked to source_url. When a value has several sentences, any earlier sentence that holds a figure gets its own "(source)" link, so the figure has evidence in its own sentence. The phone layout scrolls inside the wrapper, with the first column sticky.
- Example tags: Demo, Made for an owner, and Our own (examples.json uses kind "our own"; calling those "Made for an owner" would be untrue).
- A missing file or field renders a visible "To be written: ..." placeholder. In this run no placeholder remains on any page.

## Validator diff (build/validate.js, +46 lines, 1 line changed)
- V-OFFER, scoped: for files under site/next/ only, the allowed £ set is data/next/offer.json's launch_gbp, usual_gbp, earlier_launch_gbp and bigger[].price_gbp, plus the data/cells.json ladder. Every other page keeps the old set, and the old error text is unchanged.
- V-NEXT, new checks:
  - data/next/offer.json must exist when site/next/ does.
  - launch_gbp, launch_eur, usual_gbp and earlier_launch_gbp must be positive whole numbers, with launch_gbp < earlier_launch_gbp < usual_gbp.
  - offer_label and note must be present.
  - bigger must be non-empty, each offer with a name, a whole-number price_gbp and status "first proposal".
  - No pressure wording.
  - Every site/next/**/*.html must have the noindex meta, class="preview-band" and `<html lang="en-GB">`, and no mailto link or email address.
  - No page outside site/next/ may link to /next/.
  - No site/*.xml may list a /next/ URL.
- No other check changed.

## Checks run (after `node build/next-local.mjs`)
- `node build/validate.js`: OK (warnings only; none are about /next/)
- `node build/check-evidence.mjs`: evidence: every figure on the published pages has an evidence link in its sentence
- `node build/check-internal-links.mjs`: internal links: all resolve
- `node build/leak-scan.mjs`: OK (733 files, 437 binary skipped)
- Chromium (Playwright) against `python3 -m http.server 8123 -d site`, all 17 pages at 390x844 and 1366x768: ALL OK (status 200, no console errors, no requests to other hosts, scrollWidth <= innerWidth). The price on the first screen at 1366x768 ends at 213 to 301 px from the top, inside 768. Server stopped. Screenshots: /tmp/claude-0/shots/next*.png, compare-*.png.

## Left for round 2
- Designs 3 to 5: real styles and markup (build/next/d3.mjs to d5.mjs, assets/next/d3.css to d5.css). next/DESIGNS.md did not exist during this round, so d1 and d2 follow my reading of the brief; the designer may restyle them in their own modules.
- Chooser thumbnails are CSS placeholders: swap them for real screenshots.
- copy.json has no section headings, so the home section titles ("Six promises", "What you get", "Rent or own" and so on) are labels written in the build. The writer could add `sections.<key>.title`; the reader already accepts an object there.
- The tables are long on a phone with seven competitors. A stacked-card view, or a pick-two-to-compare view, may read better.
- The copy.json `steps` and `team` arrays are shown only through their figures. There is no text fallback if a figure is missing.

## Refused or blocked
- Nothing was refused. I did not run build/build.mjs and wrote no wrapper for it.

# Round 4: the developer of agenticcells.ai

2026-11-19. Written by developer.agenticcells-ai@AgentiCCells.dinis, a sub-agent of the conductor, for the [developer] items in board/reviews/2026-11-19-next-preview-r3.md (1, 4, 5, 7, 11 in part, 21) and board/security/2026-11-19-next-preview.md (9). Nothing committed or pushed. build/build.mjs not run or wrapped. site/ not deleted (only build/next-local.mjs wrote into it). No check edited. No email address or mailto anywhere.

## Files changed
- build/next/parts.mjs: `ASK` is now `/next/start/`; new `safeHref()`; `inline()`, `examples()`, `proofLink()` and the features table's own column use it; fenced code blocks in `markdown()`; the shell's nav hint, current-page scroll and footer list of every page; the Copy script and a minimal frame, only on a page that has a code block.
- build/next/design-kit.mjs: `bigPrice()` (d3, d4, d5) shows the earlier £250 struck as well as the usual £500; `exTile()` links only a safe URL.
- build/pages/next.mjs: each figure once per explain page; on /next/start/ its own "Ask for a site" links point to its how-to-ask section; explain pages' body class is `explain x-<slug>` (was `explain <slug>`, see 9).

## The fixes
1. **Every ask goes to /next/start/.** `{{contact}}`, every CTA ("Ask for a site", "Own your site", "Try the interview", "Apply for a free evaluation site", "How to ask"), d5's sticky button, the ladder's button and the footer now point to /next/start/. No page under site/next/ contains "start-here". On /next/start/ itself these links go to the page's how-to-ask heading: the first heading whose id starts `how-to-ask`, else one starting `ask` (today "Ask for a site: send the brief and your material"). If the writer adds a "How to ask" heading, the links follow it with no code change. The footer line now reads "How to ask for a site: the Start page of this preview says how."
2. **Fenced code on /next/start/.** ```` ``` ```` blocks render as `<div class="code-box" role="group" aria-label="..."><pre tabindex="0"><code>`, escaped, line breaks kept. The info string after the opening fence names the box for a screen reader (a single language word does not); default "Text to copy". A small inline script, only on pages with a code box, adds a "Copy" button (clipboard, else it selects the text and says to press Ctrl+C or Cmd+C) and a visually hidden status line. Without script the text is selectable and no button appears (checked with JavaScript off). A minimal frame (`border`, `pre-wrap`) sits in a `<style>` before the stylesheets, so assets/next/ can restyle `.code-box` and `.code-copy`; without `pre-wrap` the prompt scrolled the page sideways at 390.
3. **d3, d4, d5 prices.** Each reads "£50 once, launch price, usually ~~£500~~, earlier launch price ~~£250~~", from data/next/offer.json (`usual_gbp`, `earlier_launch_gbp`), all on the one line that says "launch price". d5's sticky phone bar still hides the struck prices (d5.css, the designer's).
4. **/next/what-you-get/ figure.** In my build the figure was already once (round 3; the live site the reviewer read was older). Now also guarded generally: a second token for the same figure on an explain page renders nothing. Chromium: no figure repeated on any /next/ page.
5. **Link schemes.** `safeHref(u)` allows only `https?://host`, a site path `/...` (not `//host`) and `#anchor`; anything else (javascript:, data:, mailto:, a bare relative path) returns null and the text shows without a link. Used in `inline()` (every copy, page and FAQ link), examples, example tiles (design-kit), proof links and the features table's own column. Competitor cells and the designer's figures already allowed only http(s). Chromium: every `href` on all 18 pages matches the allowed set.
   Test (node, against parts.mjs):
   ```
   inline('Click [here](javascript:alert(1)) or [data](data:text/html,x) or [mail](mailto:a) or [host](//evil.example) or [ok](https://example.com/) or [page](/next/faq/) or [anchor](#top) or [rel](foo/bar)')
   => Click here) or data or mail or host or <a href="https://example.com/">ok</a> or <a href="/next/faq/">page</a> or <a href="#top">anchor</a> or rel
   ```
   The javascript: URL is not a link; the stray ")" is the URL's own bracket left as text.
6. **{{figure:attack-surface}}.** next/figures/attack-surface.mjs (the designer's, new) loads: the loader lists it, and `{{figure:attack-surface}}` renders its SVG with a text version. next/pages/security.md has no such token yet (it still has `{{figure:rent-or-own}}`), so nothing shows on /next/security/ until the writer adds it.
7. **/next/review/.** Reads next/review.md (the conductor's). Its markdown table (the five designs) renders as a table in a scrollable, focusable region; links inside it work. Email addresses are still removed.
8. **Phone nav.** The nav scrolls sideways at 390. The current page's item carries `style="scroll-initial-target: nearest"`, so the browser scrolls the nav to show it on load, with no script and the order unchanged (Chromium 157: the current link is inside the nav's visible box on all 18 pages at 390; browsers without the property start at the left, as before). The nav has `aria-describedby` a visually hidden hint: "10 links. On a narrow screen the list scrolls sideways. Every page is also listed at the foot of the page." The footer now has a second nav, "All preview pages", with every explain page, including No lock-in, Security and Partners, which the top nav lacks (review item 21). The right-edge fade is the designer's.
9. **Found and fixed: nav squeezed on /next/examples/ at 1366.** The body class `examples` matched the examples grid rule `.examples { display: grid }` in base.css, so the header's nav was 75 px wide and its first links sat off the left edge. Explain pages' body class is now `x-<slug>`; no CSS used the old classes.

## Checks (last run, after the last change)
- `node build/next-local.mjs`: 18 pages.
- `node build/validate.js`: OK at my last change; **FAILED (10) on the final run**, after the designer's working-tree change to next/figures/year-of-platform.mjs: the figure's SVG now breaks "£50 once, launch" and "price" into two `<tspan>` lines, so line 2 holds "£50" without "launch price" (V-NEXT price rule). Same figure on /next/compare/, /next/pricing/, d3, d4, d5. Not my file; for the designer: keep "£50 once, launch price" on one line, or put "launch price" in the line with the £.
- `node build/check-evidence.mjs`: every figure has an evidence link in its sentence.
- `node build/check-internal-links.mjs`: all resolve.
- `node build/leak-scan.mjs`: OK (755 files, 447 binary skipped).
- Chromium (Playwright) against `python3 -m http.server 8128 -d site`, all 18 /next/ pages at 390x844 and 1366x768: ALL OK, 36 of 36 (status 200, no console errors, no requests to other hosts, no horizontal scroll, one h1, current nav link visible, no repeated figure, every href allowed). Copy button tested: clipboard gets the prompt, the button reads "Copied". The server was stopped afterwards.

## Left for others
- **Designer:** year-of-platform.mjs line split (above). `.code-box`, `.code-copy` and `.foot-pages` are unstyled apart from the minimal frame. The prompt box at 390 wraps each line where the author broke it plus where it wraps; a smaller mono size would read better.
- **Writer:** add `{{figure:attack-surface}}` to security.md (item 6). /next/start/ could have a "## How to ask" heading for the links to land on. The "how to ask" line itself is the writer's (no address in the preview).
- **Review item 11 (compare length, two links per value):** not done this round; it needs the writer's "at a glance" rows and is a larger change to the tables.
- **Security item 6 (CI commit range and signatures):** waits for Dinis's word on the trailer, as the review says, and changes a check, which this brief excludes.

## Refused or blocked
Nothing refused. Validate's final failure is in a file being edited by another role at the same time (above).

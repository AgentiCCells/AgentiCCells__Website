# /next/ preview: the technical contract (round 1)

Kept by conductor.agenticcells-ai@AgentiCCells.dinis. Read with board/briefs/2026-11-19-sovereign-preview.md.

## Addresses
- /next/ : the chooser. A "Preview" band on every page: "Preview for review, not the live site. Prices and words may change." Links to the five designs and the explain pages.
- /next/d/1/ Sovereign, /next/d/2/ Six promises, /next/d/3/ Stop renting your website, /next/d/4/ Just say it, /next/d/5/ Proof (a wall of real sites).
- Explain pages, shared by all designs: /next/what-you-get/, /next/how-it-works/, /next/sovereignty/, /next/no-lock-in/, /next/security/, /next/examples/, /next/partners/, /next/faq/, /next/pricing/, /next/compare/, /next/start/ (how to ask for one).
- Every /next/ page: `<meta name="robots" content="noindex">`, a title, a description, og:title and og:description, `<html lang="en-GB">`, not in any sitemap, not linked from any page outside /next/.

## Files
- data/next/offer.json (conductor): prices. data/next/competitors.json (researcher). next/examples.json (researcher).
- next/copy.json (writer): the home page words, the same for all five designs, plus one first-screen lead per design.
- next/pages/<slug>.md (writer): front matter `title:` and `description:` then markdown. Tokens on a line of their own: `{{figure:<id>}}`, `{{table:compare}}`, `{{table:features}}`, `{{table:pricing}}`, `{{examples}}`, `{{offer}}`, `{{deliverables}}`, `{{faq}}`.
- next/figures/<id>.mjs (designer): `export default function (data) { return { svg, text } }`; `svg` is an inline SVG string with role="img", `<title>` and `<desc>`; `text` is the same information as an HTML list or table. `data` is `{ offer, competitors, copy, examples }`. Figure ids: tenets, rent-or-own, can-you-leave, brief-to-claude, team, year-of-platform, deliverables, how-it-works.
- build/pages/next.mjs (developer): the build hook. It returns `[]` pages and writes complete HTML documents for /next/ through `ctx.files` (its own shell and styles, not the main site template). Contact links use `ctx.contact` only; no file may contain an email address.
- build/next-local.mjs (developer): renders the same /next/ files into an existing site/ folder (site/next/), so the checks can run without the full build. Never delete site/.
- assets/next/: styles (one base sheet and one per design), example screenshots (next/examples.json names them).

## How to check your work
- The full build (build/build.mjs) is run only by the conductor, through team/release.sh. Do not run it, and do not write a wrapper for it.
- After `node build/next-local.mjs`: `node build/validate.js`, `node build/check-evidence.mjs`, `node build/leak-scan.mjs`, and Chromium (Playwright, preinstalled: `require('playwright')`) at 390 and 1366 px against a static server on site/ (for example `python3 -m http.server -d site 8123`).
- Rules the checks enforce: no em dashes; no hype words (revolutionary, cutting-edge, seamless, world-class, game-changing); a line holding £, $ or € followed by a digit must also say "launch price" or "first proposal"; every figure in a page's main text needs an external link in its sentence (write small counts as words); no long hex or base64-looking strings in text.

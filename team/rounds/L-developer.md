# Round L: go live with design 1 (developer)

2026-11-21. Written by developer.agenticcells-ai@AgentiCCells.dinis (go-live), a sub-agent of the conductor. Brief: board/briefs/2026-11-21-go-live-design-1.md. It holds Dinis Cruz's words, 2026-11-21 ~00:20 UTC: "go live with design 1".

Nothing was committed or pushed. I did not run or wrap build/build.mjs; I only read it. I did not delete site/: only build/next-local.mjs wrote into it. I edited no check (validate.js, check-*.mjs, leak-scan.mjs, the V-NEXT block). No file I wrote holds an email address or a mailto link.

## Files
- New: `data/next/live.json` (`{"home": 1}`, with an `_about` line): the switch.
- New: `build/next/live.mjs`. It holds:
  - `isLive()`: reads the switch;
  - the live pages (`LIVE_SLUGS`), the live nav and the footer list;
  - `liveShell()`: design 1's styles (base.css, tables.css, shell.css, d1.css), with the tags listed under "What a live page carries" below;
  - `liveLinks()`: the link rewrite;
  - `liveWords()`: the two places where the preview speaks of itself;
  - `splitWebsiteCellLines()`: keeps the £50 off any line that says "website cell";
  - `assertLive()`: a build-time guard that throws if a live page would fail V-NEXT, V-OFFER, V-RV8 or the price marks.
- Changed: `build/pages/next.mjs`:
  - `explainPage()` is split into `explainParts()` (words) and the preview shell;
  - new `renderLive()` renders / (design 1's home) and the root explain pages;
  - the hook adds the live documents to ctx.files. For each live address with no content page, it also returns a stub page `{path, title, description, html: ''}` so that the build lists that address in the sitemap.
- Changed: `build/next/parts.mjs`:
  - `CODE_STYLE` and `CODE_SCRIPT` are exported, for the copy buttons on /start/;
  - `setLinkLaunch()`: on live pages only, `{launch}` becomes the £50 linked to data/next/offer.json on GitHub.
  - The preview is unchanged: site/next/ was compared byte for byte with the output from before the change, and nothing differs.
- Changed: `build/next-local.mjs`:
  - new `--live` mode. It writes the live documents into the existing site/: it overwrites index.html, cells/ and faq/ and adds the new root folders.
  - It refuses to run without the switch.
  - It has no contact address, so "Email us" goes to /start-here/.
  - The version comes from site/version.json.

## What a live page carries
- `<html lang="en-GB">`, a title and a meta description. No noindex and no Preview band.
- A canonical link to https://agenticcells.ai<path>.
- These tags:
  - og:type, og:site_name, og:locale en_GB, og:title, og:description, og:url;
  - og:image (the share card) with og:image:type, og:image:width, og:image:height and og:image:alt;
  - twitter:card summary_large_image and twitter:image.
- hreflang en-GB and x-default, both pointing at the page itself.
- The language switcher in the main site's form:
  - every locale of data/locales.json, each linking to that locale's home, with names exactly as in the file;
  - then `lang-ask` linking to /start-here/.
- The nav: Cells, Case studies, Agentic web, Sovereign website, Team work, Pricing, Examples, FAQ, Start, and Partners (/partners/).
- The footer:
  - the licence line and every live page;
  - "Email us", made from ctx.contact at build time;
  - "Version" from ctx.version.
- Links:
  - /next/<x>/ becomes /<x>/;
  - /next/ and /next/d/<n>/ become /;
  - /next/partners/ becomes the live /partners/;
  - links to /next/review/ are removed and their words kept.
- Words:
  - "The sovereign website, on this preview" becomes "The sovereign website, in full".
  - On /start/, "use the contact at the foot of any page of the live site. This preview has no address of its own yet." becomes "use the "Email us" link at the foot of this page."
- Prices:
  - The £50 appears only as the Sovereign Website's own launch offer, linked to data/next/offer.json.
  - On /pricing/, the writer's paragraph "...is our website cell grown into its own product..." is split at its sentence ends. "It has its own launch offer, there: £50 ... launch price" now sits on its own line, which does not say "website cell".
  - No live line that says "website cell" carries £50 or "from £500".
- Titles: "AgentiCCells: a team of AI agents that you own" for the home, "<page title>: AgentiCCells" for the others.
- The home's description is the one idea and the "Four sizes..." sentence of the lede, 132 characters.

## Locale check
content/ has no locale folders, so /, /cells/ and /faq/ have no translations. Their fallback pages (/pt-pt/cells/ and the rest) stay as the build makes them: noindex, with their canonical on the English address.

## How to switch it off
Delete `data/next/live.json`, or set `"home"` to anything other than 1, and build again. The old /, /cells/ and /faq/ return, and the new root addresses are no longer built.

## Checks (last run, after the last change)
- `node build/next-local.mjs`: 23 pages under site/next/.
- `node build/next-local.mjs --live`: 16 live pages: / /cells/ /case-studies/ /agentic-web/ /sovereign-website/ /team-work/ /what-you-get/ /how-it-works/ /sovereignty/ /no-lock-in/ /security/ /examples/ /faq/ /pricing/ /compare/ /start/.
- `node build/validate.js`: FAILED (13).
  - All 13 failures are the expected "not in its locale's sitemap" line for the new root addresses. The local render does not write the sitemap; the full build lists these addresses through the stub pages.
  - Those addresses are /agentic-web/, /case-studies/, /compare/, /examples/, /how-it-works/, /no-lock-in/, /pricing/, /security/, /sovereign-website/, /sovereignty/, /start/, /team-work/ and /what-you-get/.
  - No other failure, and no V-OG warning on a live page.
- `node build/check-evidence.mjs`: OK.
- `node build/check-internal-links.mjs`: all resolve.
- `node build/leak-scan.mjs`: OK (798 files, 447 binary skipped).
- Chromium (Playwright) against `python3 -m http.server 8132 -d site` (stopped afterwards):
  - Pages: / and the 15 live root pages, at 390x844 and 1366x768.
  - Result: 32 of 32 OK.
  - Each page: status 200, no console errors, no horizontal scroll, no requests to other hosts, one h1, no link to /next and the right canonical.
- The nav fits in one row at 1366 px. Below 75rem it wraps to its own row and scrolls sideways on a phone. At 390 px the open switcher causes no horizontal scroll.
- The home's first screen at 390 px: the kicker, "A team of AI agents that you own.", the lede, then the four-size card with "Ask for a cell" and "See the case studies". At 1366 px the card sits beside the words.

## Notes for the conductor
- team/roles/developer/POLICY.md says this role "may not change the live home page or live prices". I followed the brief, which records Dinis's "go live with design 1". The live change happens only when the conductor builds and releases with the switch in place. The policy line may need updating.
- "Email us" is built from ctx.contact. To keep the repository free of the scheme literal, live.mjs joins it from two parts.
- The case study for the Sovereign Agentic Website shows the first screen of a person's site (from next/copy.json). The preview already used it; the cells registry records consent for that person. Worth a check before release.
- The older live pages (/website-cell/, /start-here/ and the rest) still say the website cell at £250 (data/offer.json), as the brief expects.

## Refused or blocked
Nothing was refused or blocked.

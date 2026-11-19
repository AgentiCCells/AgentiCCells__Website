# Round 1: researcher notes (2026-11-19)

By researcher.agenticcells-ai@AgentiCCells.dinis, for conductor.agenticcells-ai@AgentiCCells.dinis. Brief: board/briefs/2026-11-19-sovereign-preview.md and board/briefs/2026-11-19-preview-contract.md.

## What I wrote
- data/next/competitors.json: seven competitors (Wix, Squarespace, WordPress.com, Fliplet, Framer, Durable, a freelancer from Upwork's published guide), 15 rows each, every fact with its source page, date read and basis; our own column (website_cell) from Dinis's articles, offer.json, GitHub's Pages docs and Anthropic's pricing page; 16 quote checks on the three newsroom articles and two others; a list of pages that could not be read.
- next/examples.json: 20 examples that answered 200 over https today, plus a `_held_back` list with the reason for each site left out.
- assets/next/examples/<slug>.jpg: 20 screenshots, 1280x800 first screen, resized to 1100 px wide, JPEG quality 70, each between 40 KB and 133 KB.

## How I read the pages
curl and Chromium (Playwright, locale en-GB, Europe/London). Our network address is in the United States, so every competitor priced in US dollars. No UK (GBP) price could be read. All competitor prices are written as USD with the billing period; first-year and three-year figures are my arithmetic, marked "calculated from their published price", before tax and assuming no price change.

## Points for the conductor and for Dinis
1. GBP prices: none could be read from here. Either accept USD with a note, or ask someone in the UK to read the four main pricing pages.
2. GitHub Pages terms: GitHub's own docs say Pages "is not intended for or allowed to be used as a free web-hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions". A brochure site is probably fine, but the "hosting is free" line should link this page and not promise free hosting for a shop. Recorded in website_cell.hosting_cost.note. Ask Dinis how he wants it worded.
3. Framer contradicts itself: one help article says you can download the site and host it anywhere; another says "Framer does not offer HTML export for self-hosting". Both recorded; the lock-in cell says "unclear".
4. Quote checks: all Fliplet terms quotes confirmed; Wix and Squarespace export quotes confirmed. Not confirmed: (a) Fliplet credits list, not word for word (page now says "publishing actions, hosted projects"); (b) "WordPress can export everything" in static-against-the-platforms: WordPress.com's own export page says the XML leaves out theme, design, plugins and the image files; (c) "a year of Wix costs about GBP 108 to 300" in the-sovereign-website: could not check in GBP; Light is USD 17 a month billed yearly. Price-rise and market figures were not re-checked.
5. Consent: data/cells-registry.json records consent only for José Bota, Silvio Switha and Yiheng Wang. The factory briefs record Dinis saying yes for Marc Noah, Indi Gupte, Mondweep Chakravorty and SUSTAIN-NOBILITY, but the registry does not; I held them back. Gabriel DaCruz has no consent recorded anywhere, though the live site already shows his site and the-sovereign-website lists "Gabriel" as named with consent. Ask Dinis to confirm and have the registry updated; then they can be added.
6. The hub (hub.agenticcells.site) is held back only because its first screen shows the Gabriel DaCruz card.
7. data/cells-registry.json in this repository has unresolved git merge-conflict markers (`<<<<<<< HEAD` around version_seen for agenticcells-ai). It is not valid JSON. Anything that parses it will fail. Not my file; the conductor should fix it.
8. vicky-wang.agenticcells.site did not answer (no DNS). It is the same person as yiheng-wang, which is included.
9. PrompTugal.news sites are marked "our own" (made by AgentiCCells cells at Dinis's request, per the public factory requests). If Dinis would rather they were not presented as ours, change their kind.
10. Upwork's guide gives hourly rates only; the freelancer first-year figure is design time for the smallest project it describes (10 hours), and says so.

## Not done
- Durable's terms of service: the page loaded, but I did not find an ownership or export clause, so those cells say "not stated on their pages".
- Framer's terms of service were not read; who owns the files is "not stated" for now.
- No self-hosted WordPress.org host was added; WordPress.com covers the WordPress row.

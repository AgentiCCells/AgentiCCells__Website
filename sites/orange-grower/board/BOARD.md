# Board: the orange grower
| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Brief from Dinis's words | sites@ | done (draft) |
| 2 | Decisions needed from Dinis (below) | Dinis | waiting |
| 3 | Product and price data (invented), data.js | sites@ | done (draft) |
| 4 | Page design: mobile first, example banner, English and Portuguese | sites@ | done (draft, in draft/) |
| 5 | Simulated order flow, no payment, nothing sent or saved | sites@ | done (draft; tested in Chromium: flow, prices, both languages, no requests) |
| 6 | Gates in the site's own repository: Agent trailer, build, validate, leak scan, Pages deploy, v0.1.N tag by CI | sites@ | done |
| 10 | Images from OpenRouter: OPENROUTER_API_KEY is not set in this session; the draft uses hand-drawn SVG | Dinis | waiting |
| 8 | Own repository AgentiCCells/AgentiCCells__Site__Algarve-Orange-Grower: created and attached by Dinis, cloned | Dinis | done |
| 9 | Vault: SG_SEND_ACCESS_KEY into this session; write key escrowed before anything is published; read key published; vault pushed with its .sg_vault data in the repository | sites@ | vault 797hd9f1 made and pushed to the sgit server; leak audit clean; pushed to dev with CI (49d3a5b). Write keys for all three vaults sealed to the DC Vault Registry (sha256:55895cae08d33653) per Dinis's SEND-KEYS-TO-REGISTRY instructions, 2026-11-16; QR given to Dinis; plaintext copies shredded. Read key published on the site, hub.json and README (22ce8d2) |
| 7 | hub.json for the site (shape as in the repository's hub.json) | sites@ | not started |
| 11 | One professional page (sites-design@): generated grove hero (src/img/grove.jpg, Gemini 2.5 Flash Image via OpenRouter, prompt in src/img/README.md, captioned "generated; not a real farm"), striped example banner, farm news strip, variety cards, order builder beside a hand-drawn SVG map of the Algarve (farm, zones A and B, arrow to Lisbon for C); the chosen zone lights up through CSS :has, no new script; app.js ids unchanged. Checked in Chromium at 390 and 1366 px, light and dark, order flow to the quote, no console errors, local and live | sites-design@ | done 2026-11-16, live v0.1.1 (e7f7bb8) |
| 12 | Map chooses the zone: tap zone A, B, the Lisbon arrow (C) or the farm on the SVG, or use the key (buttons, keyboard, aria-pressed); live price line (#map-price) shows the zone's rule, then crates, delivery and total; the step 3 quote refreshes on a zone change. Tested in Chromium at 390 and 1366 px, both languages, totals checked by hand, no console errors, no other hosts, locally and live | sites-dev@ | done 2026-11-16, live v0.1.2 (5353cac) |
| 13 | Smoke test (scripts/smoke.mjs) in CI and release.sh: every built page in Chromium at 390 and 1280 px; fails on a non-200 page or asset, a console error, or a request to another host; walks the order to the pretend confirmation. Shown to fail on planted faults | sites-dev@ | done 2026-11-16, live v0.1.3 (008baf3) |

## Questions for Dinis
1. (Answered by Dinis: its own repository; see 8.) Where does it live? Options: a folder in this repository (sites/orange-grower/, no new repository, nothing to create) or its own repository (I may not create repositories; you would).
2. Language: English only, or English and Portuguese?
3. How does the order request leave the page? Option A: a "mailto:" link that opens the buyer's own email with the order filled in. Option B: a printable or copyable order summary. Neither sends anything from our side.
4. The farm's name and the invented prices: may I invent them (marked invented), or do you want to give them?

## Next sites queued (Dinis, 2026-11-16)
- AgentiCCells__Site__Algarve-Evolution (to be briefed).
- A personal site for one person (to be briefed). Not named here until Dinis confirms that person has agreed to be named (CLAUDE.md).

- For sites-dev@ (map item): the map is inline SVG in src/index.html, `aside#map`; zones are `path.zone-A`, `path.zone-B`, the Lisbon arrow is `g.to-lisbon`, the farm is `g.farm`. Clicking one could set `#zone` and go to step 2; the highlight already follows `#zone` with no script.

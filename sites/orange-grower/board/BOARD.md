# Board: the orange grower
| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Brief from Dinis's words | sites@ | done (draft) |
| 2 | Decisions needed from Dinis (below) | Dinis | waiting |
| 3 | Product and price data (invented), data.js | sites@ | done (draft) |
| 4 | Page design: mobile first, example banner, English and Portuguese | sites@ | done (draft, in draft/) |
| 5 | Simulated order flow, no payment, nothing sent or saved | sites@ | done (draft; tested in Chromium: flow, prices, both languages, no requests) |
| 6 | Gates in the site's own repository | sites@ | waits on 8 |
| 10 | Images from OpenRouter: OPENROUTER_API_KEY is not set in this session; the draft uses hand-drawn SVG | Dinis | waiting |
| 8 | Own repository (Dinis creates and attaches it; I may not create repositories) | Dinis | waiting |
| 9 | Vault: SG_SEND_ACCESS_KEY into this session; write key escrowed before anything is published; read key published; vault pushed with its .sg_vault data in the repository | sites@ | blocked on 8 and the key |
| 7 | hub.json for the site (shape as in the repository's hub.json) | sites@ | not started |

## Questions for Dinis
1. (Answered by Dinis: its own repository; see 8.) Where does it live? Options: a folder in this repository (sites/orange-grower/, no new repository, nothing to create) or its own repository (I may not create repositories; you would).
2. Language: English only, or English and Portuguese?
3. How does the order request leave the page? Option A: a "mailto:" link that opens the buyer's own email with the order filled in. Option B: a printable or copyable order summary. Neither sends anything from our side.
4. The farm's name and the invented prices: may I invent them (marked invented), or do you want to give them?

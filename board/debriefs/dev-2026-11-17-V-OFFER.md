# dev@ debrief: V-OFFER, 2026-11-17

Done (queue item V-OFFER; Dinis, ~19:30 UTC, board/briefs/website-cell-sales-2026-11-17.md).

- `data/offer.json`: writer@ wrote it first (W-SELL1) with an `{{offer}}` block token; I kept their file and fields and added the inline `{{price}}` token, the strip and the validator checks. `launch_gbp` stays null: Dinis has not chosen.
- `build/build.mjs`: `{{price}}` in content/ becomes the anchor price, or, once `launch_gbp` is set, the launch price (linked to data/offer.json as its evidence) with "usually £500" beside it. The offer strip under the home hero reads the same file. No countdown wording anywhere.
- Content: the website cell's price figure on seven lines (home, start-here, website-cell, cells, faq, build-your-own-website) is now `{{price}}`; no other words changed. Ladder prices in data/cells.json, the job-seeker cell and the "from £500" line stay as they are (other things, not this price).
- `build/validate.js`: fails if offer.json is malformed (launch must be null or below anchor, no countdown or pressure wording); fails if any built page shows a launch price while `launch_gbp` is null; fails if a line near "website cell" states a £ amount that is neither the anchor, the launch price nor a ladder price.
- Checked by trying it: with launch 50 every page showed the linked launch price and the build passed the evidence check; a hand-typed £400 on /website-cell/ failed the build (and the evidence check); with launch null all passes. Released with launch null.

Facts for REALITY.md: data/offer.json exists; the build reads it; the validator enforces it.
For Dinis to decide: the launch price (50, 250 or 20% off) and when it starts; set `launch_gbp` and push. Nothing else needs changing.
Not done: live check after deploy (conductor@ to curl /website-cell/).

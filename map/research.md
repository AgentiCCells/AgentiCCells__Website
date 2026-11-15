# Map: how a claim moves from a research note to a published page

Status: first pass by researcher@AgentiCCells.dinis, 2026-11-15. Steps 1 to 3 have happened (evidence given); steps 4 to 7 are the route, marked proposal where nobody has done them yet.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Gather claims | a person with a research tool (Perplexity), for Dinis | the market | research/01-vendor-market-map.md, 02-positioning-brief.md | research/LINKS.md: "Vendor facts and prices in them are claims: re-check before quoting." |
| 2 | Read the network the method comes from | reading helper for conductor@ | board/READING.md | board/reading-notes.md | ce387a1 |
| 3 | Re-check each claim at its source | researcher@ | a claim and the vendor's own page or licence file, by curl, public and read only | a row in research/checked-claims.md: claim, source URL, date, status | research/checked-claims.md, research/stack-checked.json (c2b458b) |
| 4 | Turn checked facts into data | writer@ (stack) | research/stack-checked.json | data/stack.json | proposal: writer@ copies it |
| 5 | Write the page from data, not from notes | writer@ | data/, checked-claims.md rows marked confirmed | content/*.md with the source link and date beside each fact | proposal |
| 6 | Gate | the validator, in CI | content/, data/ | "OK", or the release stops | build/validate.js (today it checks cells.json; a check that every figure has a source and date is a proposal, see reading-notes Q8) |
| 7 | Re-check before it goes stale | researcher@ | checked-claims.md rows older than the agreed period | updated rows; changed facts flagged to writer@ | proposal: period to be decided by Dinis |

## Rules on the way
- A claim is material until step 3 confirms it. Rows marked changed, not found, not reachable or superseded are not quoted.
- Opinions in the research briefs ("no direct competitor") are not claims a vendor page can confirm; they stay in research/ and are not published as findings.
- Prices are the vendor's own, with the date checked. Our own prices live only in data/cells.json, marked first proposal.

## What a customer would buy from this (proposal)
A claims register for their own site or sales material: every fact with its source, date and status, re-checked on a schedule, and a gate that refuses an unsourced figure.

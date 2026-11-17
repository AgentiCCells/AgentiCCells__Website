# Debrief: ambassador@AgentiCCells.dinis, 2026-11-17 (first run, item B1)

## Done
- New page /stack/ ("Part of a stack"): links under us (SGit, SHarness, keys, ABP), beside us (RiskMandate, with the agreed line) and on top (hub, summit site, book, newsroom), plus six newsroom articles. In the footer menu.
- A short "Part of a stack" block, with the agreed line, on home, method, open source, the book, case study, console, FAQ and team pages. A "see where we fit" line on cells, start here, website cell and about (these already linked riskmandate.ai).
- board/drafts/outreach/proof-pack.md: sites, hub cells, book, newsroom articles, gaps. Every link returned 200 on 2026-11-17 (curl). It carries no figures.
- Build and validate print OK. Validate warns on 11 figures without evidence links on three pages, none from this run.

## Not done / for Dinis
- Newsroom article links were taken from The intersection's own links and checked for 200; their content was not re-read.
- Check live links with build/check-links.mjs after deploy. The proof pack is a draft: Dinis sends.
- Facts for REALITY.md (conductor records): /stack/ exists once released; the proof pack exists.

## Run B2 (2026-11-17, ambassador@)
- Read in full: deploy-sgit-from-ci, shipping-an-ios-app-with-agents, build-on-voicedebrief (.md twins, HTTP 200).
- Added all three to board/drafts/outreach/proof-pack.md with caveats; added a "Worked examples to read" block to /stack/ with links and no figures; marked the three entries read in board/newsroom-seen.json.
- Did not add to the case studies: none shows a sold cell. Candidate cells (own-environment sgit deploy, agent-built iOS pipeline) are proposals only.
- Facts for REALITY.md: the sgit AWS templates are beta and the article's job is an unvalidated sketch; the App Store wait is one submission (author's account).
- Dinis to decide: whether either pipeline should become a named cell on the ladder.

## Run B3 (ambassador@, 2026-11-17)
- Did: read the researcher's routing and both newsroom articles in full. Added a "How the work is handed out" paragraph and a link to "Your own agentic cell" on /stack/ (marked as a plan). Added both to the proof pack with do-not-name notes. Marked the seen list read: full.
- Not done, on purpose: no author, company or rated party named; no ratings offered; the article's "free for the first ten cells" is not repeated on the site; no figures added.
- For REALITY.md: /stack/ now points at the two articles. Nothing was sent or posted.

## Run: B-SELL (scheduled, 2026-11-17 evening)
- Did: README plus six drafts in board/drafts/outreach/website-cell/ (artists, musicians, AI technologists, consultants, companies, partners). Each has the example link, what we need (photos, video, description), £500 from data/offer.json, no subscription or support from us, reply to agent@riskmandate.ai. Nothing sent. No recipient named.
- Choices: the launch price is not decided (`launch_gbp` null), so every draft has a `[LAUNCH PRICE]` placeholder for Dinis. The only person-named example is Gabriel DaCruz's site (Dinis named it: "you saw my brother"). Other markets point at the hub and tell Dinis to check consent before naming anyone. Partner terms are the 50/50 first draft; /partners/ and /deploy/ pages did not exist yet, so drafts link none and say "planned".
- Facts for REALITY.md: data/cells-registry.json on origin/dev holds two sets of merge-conflict markers (lines ~10 to 18, from the "Refresh cell versions" commits). The build and validator still print OK, but the file is not valid JSON (node require fails). dev@ should fix it; I did not touch it. Also /console/ is 132 KB, over its 120 KB warning budget.
- For Dinis: choose the launch price; sign off the partner terms (what the 50/50 is of, when paid); confirm the AI-technologist, consultant and artist examples agreed to be used.

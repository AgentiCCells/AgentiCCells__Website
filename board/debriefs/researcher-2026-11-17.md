
## S-EVID (2026-11-17)
Did: read every figure in content/ and data/ and the built pages, checked each against the public file or page (fetched 200 on raw.githubusercontent.com, newsroom .md twins, Robert Half and Greenhouse releases), recomputed costs.jsonl and the activity counts. Output: research/evidence-map.md; note to writer@ in board/inbox/writer-from-researcher-3.md.
Found: most figures have evidence. Wrong or stale: our-team-as-a-cell costs paragraph (17 runs now, "Ten used Opus" is 12 of 15, "nothing after 19:09" false), log line count 299 vs 357. No public evidence: hub "two of five". Many cites are plain text, not links. "More than 2,000" (Robert Half) not found in the release text.
For REALITY.md: costs.jsonl lines 1 to 15 sum to 10.31 (10 finished 9.17, 5 failed 1.14); file has 17 lines, 11.62 in all, at d6464e8; team/activity has 357 lines in 16 files.
Dinis to decide: nothing new. Not done: the console's dated pages (excepted); S2 re-checks vendor claims.

## S-PACK (2026-11-17, later run)
Did: drafted the trust page as research/trust-draft.md from public files (board/abp/README.md, data/abp.json, CLAUDE.md, pages.yml, check-commits.mjs, leak-scan.mjs, team/keygen.sh and keys.json, board/security/ notes, the HOLD rule). Each claim links to its file; all linked repo paths verified present. Note to writer@ in board/inbox/writer-from-researcher-4.md.
Deviation: the queue said content/trust.md, but researcher@'s brief says it may not edit content/, so the draft sits in research/ for writer@ to copy.
Found: the page can only say that limits are rules, not walls (abp README: 20 of 23 capabilities, three gaps open). It lists what we cannot show: third-party review, threat model, incident handling, audit export and retention, a named responsible person.
For REALITY.md: nothing new; the figures are as at 2026-11-15 and will go stale if board/abp/ is refreshed.
Dinis to decide: whether to give a named security contact; whether to close the three abp gaps, so the page can say more. Not tested: that HOLD.md stops an agent that ignores it.

## S-NEWS (2026-11-17, later run)
Did: read in full the .md twins of agents-rating-agents, who-hands-out-the-work, relate-debriefed, memory-is-a-lifecycle. Added a dated section to research/newsroom-cells.md with Dinis's key sentences, what each asks of the site, and a table mapping the "memory lifecycle" questions to what our team does. Marked the four entries read: full in board/newsroom-seen.json. Notes: board/inbox/writer-from-researcher-5.md, ambassador-from-researcher-1.md, conductor-from-researcher-3.md.
Found: who-hands-out-the-work is our own model in five lines and no page says it. Gaps in our own team: REALITY.md is edited in place (no "closed" marking); no check or brief enforces "no role approves its own work" (searched build/, team scripts, .github/, CLAUDE.md, reviewer brief). Relate and GAMMA-Ray are not things to sell now.
Care taken: did not name the two third-party post authors; no customer named.
For REALITY.md: newsroom v0.14.136 on 2026-11-17; articles No. 448 and 449 as above.
Dinis to decide: whether a role may approve its own work, and whether to enforce it; whether customers may brief a role directly. Not done: did not read the third-party posts, Neo4j or GAMMA-Ray sources; no vendor claims re-checked (S2).


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

## Run S-NEWS3 and S-NEWS2 (researcher@, 2026-11-17, scheduled run)
- Did: read four newsroom `.md` twins in full (keys-after-payment, the-payment-desk, the-atm-that-asked-twice, patient-vaults-answered); new section in research/newsroom-cells.md; board/newsroom-seen.json marked read; notes board/inbox/writer-from-researcher-6.md and conductor-from-researcher-rm.md.
- Worked: all four fetched with 200.
- Not done: no vendor, regulation or original-article check; S2 (re-check claims) not started.
- For REALITY.md: newsroom at v0.14.139; articles No. 452 to 454 exist (2026-11-17); the keys-after-payment design is a proposal, not built (Dinis's own words).
- Dinis to decide: build the key-after-payment hand-over for the website cell? Link payment-desk and patient-vault articles from trust.md?

## Run S2 (re-check of quoted claims), 2026-11-17
- Did: re-checked costs (script sum of team/costs.jsonl), roster count, abp 20 of 23, Robert Half and Greenhouse releases, licences and versions of Ruflo, sgit, Codex, Claude Code, workerd. Result in research/checked-claims.md section 5.
- Found: nothing wrong on the site; writer@'s S-EVID fixes landed. Robert Half's "more than 2,000 hiring managers" is now confirmed (it was open).
- Not done: hub "two of five" count and console counts (live, excepted); vendor prices (S3).
- For REALITY.md: 2026-11-17 researcher@: Ruflo 3.77.1 MIT, sgit 0.27.0 Apache-2.0, Codex 0.169.0 Apache-2.0 and Claude Code 2.1.326 (not open source) read from the registries and licence files.
- For Dinis: nothing.

## Run S-SCALE (2026-11-17, researcher@, scheduled run)
- Did: searched web-summit.sgit.ai and all 475 newsroom articles for 256 and 120,000. Neither has a public source. The newsroom says "around 250 named agents" (distinct names in commits; 224 sessions; more than 60 at once). Recorded in research/evidence-map.md section F. Read five 17 November articles and recorded them in research/newsroom-cells.md; updated board/newsroom-seen.json; notes to writer@ and conductor@.
- Did not work: github.com is 403 from agent sessions, so PrompTugal and web-summit run records were not read. web-summit.sgit.ai/version.json is 404.
- For REALITY.md: public figure is "around 250 named agents" (Ten days at Web Summit, 2026-11-14); no public source for 256 or 120,000 (checked 2026-11-17).
- Dinis must decide: whether a data-connection cell becomes a second cell; whether to publish the run record behind 120,000.

## Run: S3 weekly refresh (researcher@AgentiCCells.dinis, 2026-11-17)
- Re-read 11 vendor and licence facts against vendor pages and registries; results in research/checked-claims.md section 6.
- Changed: Azaris is a refund, not "pay nothing"; Dify page shows $590 a year, not $59 a month; Ruflo is 3.77.2; Brainverse typical deployment is about 6 weeks.
- Not done: Swarms pricing (HTTP 429), Workday/Flowise.
- For REALITY.md: no site page quotes a vendor price; market map section 6 wording on Azaris and Dify needs the corrections above if reused.
- Dinis to decide: nothing.

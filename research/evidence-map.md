# Evidence map: every figure on agenticcells.ai

By researcher@AgentiCCells.dinis, 2026-11-17, for S-EVID. Rule (Dinis, 2026-11-17 ~00:00 UTC, board/briefs/COMMON.md): "all data now should be mapped by proper evidence and linked to evidence to whatever that exists." No link, no figure.

Scope: `content/*.md` and `data/*.json` as built from dev at d6464e8. The console's dated pages (raw logs) are excepted. Figures that are only list numbers, nav order, commit hashes or dates of events are not listed unless they are claims. Each link was fetched on 2026-11-17 and answers 200 (the repository is public, read through raw.githubusercontent.com).

Statuses: **OK** (the page already links the evidence), **RELINK** (evidence exists, the page does not link it), **FIX** (the figure is wrong or stale against its evidence), **REMOVE** (no public evidence).

## A. Prices and sizes (ladder)

| Page | Figure | Evidence | Status |
|---|---|---|---|
| index, cells, website-cell, start-here, about, build-your-own-website, faq, job-seeker-cell, our-team-as-a-cell, data/cells.json | £500, £1,500, £5,000, £20,000 as the ladder | Dinis, [The intersection](https://newsroom.sgit.ai/articles/the-intersection.md), 2026-11-16: "£500, £1,500, £5,000 and £20,000"; and his words in [board/briefs/two-sites-2026-11-16.md](https://raw.githubusercontent.com/AgentiCCells/AgentiCCells__Website/dev/board/briefs/two-sites-2026-11-16.md) | OK on cells and about; **RELINK** on index, start-here, data/cells.json (they name no link: add the intersection link) |
| website-cell, cells, faq, index | £500 one-off website cell; "from £1,500" second mode | [Atomic cells, end to end](https://newsroom.sgit.ai/articles/atomic-cells-end-to-end.md), 2026-11-15 | OK |
| cells, our-team-as-a-cell | £5,000 "a week of setup"; £500 "set up in a session" | [board/BRIEF.md](https://raw.githubusercontent.com/AgentiCCells/AgentiCCells__Website/dev/board/BRIEF.md) table, Dinis, 2026-11-15 ("a week of setup") | **RELINK**: the text cites "board/BRIEF.md" as plain text, not a link |
| website-cell, faq | seven steps | the article's list: order, queue, build, preview, key, steer, handover (Atomic cells, end to end) | OK |
| website-cell | "three months to bring your own domain" | Atomic cells, end to end: "three months on our subdomain before their own domain" | OK |
| cells | "two of five" ways working on the hub, "checked 2026-11-16" | no public record of the check; the hub pages show only the current state | **FIX or REMOVE**: link the hub page each count rests on, or say "see the hub" and drop the count (the registry is [data/cells-registry.json](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/cells-registry.json)) |
| cells, index | "20,000 / 1,500 / 5,000 ... rungs do not match" (reconciliation text) | same two articles | OK |

## B. Our own measurements

| Page | Figure | Evidence | Status |
|---|---|---|---|
| faq, our-team-as-a-cell | "20 of 23 capabilities" shared reach | [board/abp/README.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md): "20 of 23 primitives" | OK on our-team; **RELINK** on faq (no link) |
| our-team-as-a-cell | "17 roles", three-line policies | [team/ROSTER.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/ROSTER.md): 17 rows | OK |
| our-team-as-a-cell | "16 log files and 299 lines" | [team/activity/](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/activity): at 2026-11-17 it is 16 files, 357 lines | **FIX**: the count was true when written and is now stale; link the directory at a commit and say "as of <commit>", or drop the lines count |
| our-team-as-a-cell | "15 recorded runs", "10.31 US dollars", "9.17 of it is 10 runs that finished; 1.14 is 5 that failed" | [team/costs.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/costs.jsonl): lines 1 to 15 sum to 10.31 (finished 10 runs, 9.17; failed 5, 1.14). Recomputed 2026-11-17. | OK for lines 1 to 15, but **FIX** the framing: the file now holds 17 runs (11.62 in all) |
| our-team-as-a-cell | "Nothing was recorded after 19:09 that day" | costs.jsonl lines 16 and 17: 2026-11-16 15:50 and 18:15 | **FIX**: false now; say "nothing between 19:09 on 15 November and 15:50 on 16 November" |
| our-team-as-a-cell | "Ten of those runs used Claude Opus 5.5" | costs.jsonl: 12 of the 15 are opus-5-5 (10 of the 10 finished runs) | **FIX**: say "all 10 finished runs", or "12 of 15" |
| our-team-as-a-cell | "since 19:08 UTC every run starts on Sonnet" | costs.jsonl: lines 13 to 17 are sonnet-5-5; Dinis's words in REALITY.md ("From 19:08 every agent run starts on claude-sonnet-5-5") | OK, add the REALITY.md link |
| our-team-as-a-cell | "Since 17:50 UTC that day each run has its own container" | REALITY.md says conductor-started runs "each in its own session" (18:08) and the container fact is in team/SCHEDULE.md only by implication | **RELINK or soften**: no file states "own container" with a time |
| our-team-as-a-cell | "limit was hit three times between 19:09 and about 08:00" | [team/SCHEDULE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/SCHEDULE.md) line 24 says the same; costs.jsonl records only the 19:09 failures | partial: OK as "per SCHEDULE.md", but only one of the three is in the log |
| our-team-as-a-cell | pace "from 08:12 UTC on 16 November" | team/SCHEDULE.md line 24 | OK |
| our-team-as-a-cell | 17:12, 17:28, 17:50 on 15 November | costs.jsonl lines 1 and 2 (17:12:23, 17:28:33); SCHEDULED.md; REALITY.md | OK (17:50: REALITY.md) |
| how-this-site-was-built | 16:23, 16:24, 16:30 to 16:37, 16:38, 16:42, 16:48, 17:01, 17:05 with commit hashes | `git log`: 4b251d2 16:23:11, 2a9c54c 16:24:05, 8d582be 16:24:26, 35837e9 16:31, 8e7db41 16:37:11, 657952a 16:37:26, ce760fa 16:38:22, 7b50de2 16:42:47, ce387a1 16:48:39, 0d0f508 17:01:36, 9b64de6 17:05:06 | OK in substance; **RELINK**: hashes are plain text; link each to https://github.com/AgentiCCells/AgentiCCells__Website/commit/<hash> |
| how-this-site-was-built | "16:20. A brief for the conductor" | [team/activity/conductor.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/activity/conductor.jsonl) first line, 2026-11-15T16:20:00Z "briefed" | **RELINK** |
| index, how-this-site-was-built | "nine agents" on day one | [case-study/2026-11-15-day-one.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/case-study/2026-11-15-day-one.md), title: "nine agents and a live, versioned site" | OK; but the roster now has 17 roles: say "on day one" (it does) |
| website-cell, about, our-team | "built from a commit; worked for one site, after three by hand" | [The site factory works](https://newsroom.sgit.ai/articles/the-site-factory-works.md) (page deliberately does not restate numbers) | OK |

## C. Third-party figures

| Page | Figure | Evidence | Status |
|---|---|---|---|
| job-seeker-cell | Robert Half: "more than 2,000 US hiring managers", 65%, 67% (March 2026) | [press release](https://press.roberthalf.com/2026-03-10-Robert-Half-survey-67-of-HR-leaders-report-AI-generated-applications-are-slowing-hiring) (fetched 2026-11-17: 65% of hiring managers on skills hard to verify; 67% appears in the same release). The "more than 2,000" was not found in the text I could read. | OK for 65% and 67%; **verify** "more than 2,000" against the survey method note or take it out |
| job-seeker-cell | Greenhouse: 91% of recruiters spotted candidate deception | [Greenhouse release](https://www.greenhouse.com/newsroom/an-ai-trust-crisis-70-of-hiring-managers-trust-ai-to-make-faster-and-better-hiring-decisions-only-8-of-job-seekers-call-it-fair): "Over nine in every ten (91%) recruiters have spotted candidate deception" | OK. The page says "we have not checked": change to "checked 2026-11-17 against the release" |
| open-source, data/stack.json | licences, versions (Ruflo 3.77.1, sgit 0.27.0), "checked 15 November" | each component's `source` field names the licence file or registry URL; [research/stack-checked.json](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/research/stack-checked.json) | OK (links in data, versions not shown on the page); the 15 November dates are three days old, S2 re-checks them |
| about | Web Summit: "Six people and their agents" | [Ten days at Web Summit](https://newsroom.sgit.ai/articles/ten-days-at-web-summit.md): "six of us, with our agents" | OK |
| about, faq | "Started on 15 November 2026" | [Starting AgentiCCells](https://newsroom.sgit.ai/articles/starting-agenticcells.md), 2026-11-15 | OK |

## D. Figures with no public evidence

None of the above falls here except the hub "two of five" count (section A), and the plain-text-only cites listed as RELINK. Pages carry no other numeric claims: the console page (`content/the-console.md`) has none, and `data/links.json` and `data/abp.json` carry no published figures beyond B.

Not checked: the live console and hub pages, which show counts from logs (excepted by the brief).

## E. For writer@ (also in board/inbox/writer-from-researcher-3.md)

1. Fix: our-team-as-a-cell costs paragraph (15 runs vs 17 in the file; "Ten ... used Opus" should be 12 of 15 or all 10 finished; "Nothing recorded after 19:09" is false); log count (299 vs 357) or date it to a commit.
2. Remove or relink: the hub "two of five" count on cells and website-cell.
3. Relink: faq "20 of 23" to board/abp/README.md; index, start-here, data/cells.json prices to The intersection; BRIEF.md and REALITY.md plain-text cites to links; commit hashes and the 16:20 line to the commit pages and the conductor log.
4. job-seeker-cell: replace "We have not checked these figures" with the check date; confirm or drop "more than 2,000".
5. Soften: "each run has its own container since 17:50": no file states it.

## F. The big numbers in Dinis's brief (S-SCALE, researcher@, 2026-11-17)

Searched: web-summit.sgit.ai (home page, fetched 2026-11-17), all 475 newsroom articles listed in [wire.json](https://newsroom.sgit.ai/newsroom/wire.json) (`.md` twins, fetched 2026-11-17, searched for 256, 120,000, 120k and every "N agents" phrase), and the PrompTugal articles. I could not open the PrompTugal or web-summit repositories (github.com answers 403 from agent sessions), so run records in those repositories were not read.

| Figure in the brief | Public source found | Status for writer@ |
|---|---|---|
| "the 256 agents" | None for 256. The newsroom says **"around 250"**: [Ten days at Web Summit](https://newsroom.sgit.ai/articles/ten-days-at-web-summit.md) ("six people and around 250 agents ... between 3 and 13 November"), with its own caveat: "'Around 250 agents' is the number of distinct agent names in the commits; it includes some renamed agents. Sessions are not agents." Also [Always-on agents at team scale](https://newsroom.sgit.ai/articles/always-on-agents-at-team-scale.md): "six people, around 250 named agents, 224 sessions, more than 60 at once." | **256: no public source found; leave it out.** Use "around 250 named agents" with a link to Ten days at Web Summit, and keep the caveat (names in commits, not live agents). |
| "where we ran 120,000" | **No public source found** for 120,000 of anything (agents, runs, sessions, commits, words). The nearest figures I found: PrompTugal.news repository "4,998 commits, of which 1,469 are releases" by 15 November and "61 agents in 43 roles" ([the newsroom we ran](https://newsroom.sgit.ai/articles/promptugal-news-the-newsroom-we-ran.md)); Web Summit team site "173 releases ... 283 source commits from 37 agents" on 4 November ([part five](https://newsroom.sgit.ai/articles/web-summit-part-five.md)); "134 sessions created in one day" on 11 November and "147 sessions and 106 hand-overs" ([Ten days](https://newsroom.sgit.ai/articles/ten-days-at-web-summit.md)). | **120,000: no public source found; leave it out.** If Dinis has a run record that shows it, it must be published first and linked. Do not round any of the nearer figures up to it. |
| (found while searching) web-summit.sgit.ai home page | "137 agents running" and "Seven of us" (page fetched 2026-11-17; it says seven people, the newsroom says six, because the page is later and counts a seventh person) | A live count that changes; do not quote without a date and link. |

Also: the Web Summit site's `/version.json` answers 404, so there is no release record there to cite.

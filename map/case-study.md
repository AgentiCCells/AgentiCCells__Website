# Map: writing the case study as it happens

Status: first pass by reporter@agenticcells.dinis, 2026-11-15.

| # | Step | Who | Output | Evidence |
|---|---|---|---|---|
| 1 | Read what changed since case-study/LAST_RUN: git log, team/activity/*.jsonl, board/, debriefs | reporter@ | notes in session only | team/activity/reporter.jsonl |
| 2 | Write it up in order, each statement linked to a commit, activity line, board item or debrief | reporter@ | case-study/<date>-*.md | case-study/2026-11-15-day-one.md |
| 3 | Record what went wrong and how it was found, from the debriefs | reporter@ | same file, "What went wrong" | board/debriefs/ |
| 4 | Move the marker | reporter@ | case-study/LAST_RUN | this commit |
| 5 | Each later run: a dated update (case-study/2026-11-15-evening.md, run 2, R5) | reporter@ | case-study/<date>-*.md, map rows | 2026-11-15 evening |

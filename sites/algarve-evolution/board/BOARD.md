# Board: Algarve Evolution
| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Content as data from promptugal.news and newsroom.sgit.ai: src/data/{events,programmes,figures,proposals,sources}.json, every item citing its source; rendered at build into an English page and a Portuguese page (/pt/); not-approved footer | sites-dev@ | done 2026-11-16, live v0.1.1 (a3cc75a, 0006a73) |
| 2 | Gate in scripts/validate.mjs: every item cites a source listed in sources.json, sources only from promptugal.news or newsroom.sgit.ai, en and pt for every text, proposals marked as proposals, every page carries the not-approved notice | sites-dev@ | done 2026-11-16 (0006a73) |
| 3 | Professional one-page design over the data blocks (`<!-- data:NAME -->` markers in src/index.html and src/pt/index.html) | sites-design@ | done 2026-11-16, live v0.1.2 (5f6eb51): src/style.css, hand-drawn hero src/assets/coast.svg (no model used), top banner and footer with the not-approved notice, figures as cards, pillars as cards, events as a timeline, proposals tagged, how to take part, data files, sources. Checked in Chromium at 390 and 1366 px, light and dark, no horizontal scroll, before and after release |

## Notes for the next run
- No person is named in the data. PrompTugal names people on Algarve Evolution only as roles until its own decision on naming people; the site follows the same rule until Dinis says otherwise.
- Membership differs by source: 106 (its own site, read 31 October 2026, via the SGit Newsroom) and 118 (Portugal Startup News, 1 November 2026, via PrompTugal). Both are shown.
- The SGit Newsroom articles are written by a speaker at the Vibathon whose company joined Algarve Evolution; PrompTugal calls that an insider's view. The four proposals are shown as proposals, not as Algarve Evolution's programmes.

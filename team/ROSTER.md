# The team: roles to start, in order, only when their work arrives

Every agent is a Claude session on the AgentiCCells account, named `role@agenticcells.dinis` (more people's agents follow the same pattern with their own name). Each makes its own key pair, publishes the public half in `team/keys.json`, and works from a brief in `board/briefs/`.

Each role below has an **Agent Behaviour Policy** in three lines: what it may reach, what it was asked to do, and what it may not do. Write it into the role's brief and keep it current.

| # | Role | Starts | Mandate | May reach | May not |
|---|---|---|---|---|---|
| 1 | `conductor@agenticcells.dinis` | day 1 | Keep the board, brief and start the other roles, keep REALITY.md, report to Dinis | the repositories, the team vault, the board | send anything outside, hold AWS credentials beyond DNS, remove HOLD.md |
| 2 | `dev@agenticcells.dinis` | day 1 | Build the website: structure, build script, validator, release | the website repository | publish without a passing validator; add trackers or third-party scripts |
| 3 | `dns@agenticcells.dinis` | when Dinis provides scoped credentials | Keep `dns/records.json` and apply it; run the weekly dangling-record check | the three hosted zones only | touch any other AWS resource |
| 4 | `writer@agenticcells.dinis` | week 1 | Write the site's words and the method's documentation, from the briefs and research | the website repository, `research/` | invent facts, name customers, publish prices beyond "first proposal" |
| 5 | `researcher@agenticcells.dinis` | week 1 | Keep the market map current; re-check vendor claims before they are quoted | the public web (read only), `research/` | use anything behind a login; contact anyone |
| 6 | `console@agenticcells.dinis` | week 1 to 2 | Turn the simulated console into the team's real console, read-only first | the repositories (read), the team vault lanes (read) | stop or start agents until Dinis approves the controls |
| 7 | `abp@agenticcells.dinis` | week 2 | Write and check each role's Agent Behaviour Policy; show reach against mandate | all briefs, `team/keys.json` | change another agent's access itself |
| 8 | `security@agenticcells.dinis` | week 2 | Leak scans, key hygiene, dependency checks; may create `board/HOLD.md` in an emergency and tell Dinis | everything, read only | remove HOLD.md; fix by weakening a check |
| 9 | `outreach@agenticcells.dinis` | when Dinis says | Draft messages to prospects, file them for Dinis | the CRM vault (drafts) | send anything |
| 10 | `designer@agenticcells.dinis` | 2026-11-15 (Dinis) | Make the site look like something a company would buy from | assets/, the page template | load anything from another host; change content words |
| 11 | `reporter@agenticcells.dinis` | 2026-11-15 (Dinis) | Document how the team and site are built, as a case study | the repository (read), case-study/ | invent events; name people who have not agreed; send anything |

Start 1 and 2 on day one. Start the others one at a time, each when its first board item is ready. Every role writes a debrief when its first piece of work is done.


2026-11-15: Dinis asked to start all roles, add designer@ and reporter@, and run every role on a schedule (team/SCHEDULE.md).

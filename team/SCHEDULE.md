# The schedule: when each agent wakes

Dinis, 2026-11-15 (see ACC-020): fire every agent on a schedule, several times a day, faster now "until we have this website in a good state", the conductor once an hour and a bit slower overnight, reading newsroom.sgit.ai for new guidance.

Times are Europe/London (assumed; change on Dinis's word). "Day" is 07:00 to 23:00 hourly; overnight runs every two hours (01, 03, 05). Minutes are staggered so pushes to dev rarely collide.

| Agent | When | How it runs |
|---|---|---|
| `conductor@agenticcells.dinis` | :07, day hourly, overnight 01/03/05 | wakes this conductor session (keeps its memory) |
| `dev@agenticcells.dinis` | :13, day hourly, overnight 01/03/05 | fresh session each run |
| `writer@agenticcells.dinis` | :19, day hourly, overnight 01/03/05 | fresh session |
| `designer@agenticcells.dinis` | :25, day hourly, overnight 01/03/05 | fresh session |
| `reporter@agenticcells.dinis` | :41, every 2 hours | fresh session |
| `console@agenticcells.dinis` | :53, every 3 hours | fresh session |
| `researcher@agenticcells.dinis` | :47, every 4 hours | fresh session |
| `security@agenticcells.dinis` | :35, every 4 hours | fresh session |
| `abp@agenticcells.dinis` | :37, every 6 hours | fresh session |
| `dns@agenticcells.dinis` | :11, 08:11 and 20:11 | fresh session |
| `outreach@agenticcells.dinis` | :17, 09:17 daily | fresh session |

**Model:** every run uses claude-sonnet-5-5; only the conductor uses another model (Dinis, 2026-11-15).

**How runs start (changed 2026-11-15 17:50 UTC, after testing):** the conductor's hourly wake starts every role that is due with `create_session`, with the repository attached (`source_url` https://github.com/AgentiCCells/AgentiCCells__Website, revision dev) and the role's prompt from `team/run-prompt.md`. Scheduled tasks that fire their own fresh sessions could not push: those sessions start with no repository attached, and the tool to attach one was missing in the second test. The ten role scheduled tasks below are paused, kept as a record.

A role is due when the current Europe/London hour matches its row above. The conductor records each start in team/activity/conductor.jsonl (action `briefed`, with the session id).

Each fresh-session run: read the rules and its brief, make a key for this run, take the top open item from `board/queue/<role>.md`, release through the gates, log, debrief, stop. A run with nothing to do logs `checked` and stops. `board/HOLD.md` stops every run.

Fresh sessions also mean each run has its own container, which closes part of gap 2 in board/abp/README.md for scheduled runs.

The scheduled tasks themselves are listed in claude.ai under the account's scheduled tasks; their IDs are recorded below by the conductor.

## Scheduled task IDs
| Agent | Scheduled task (role tasks PAUSED 2026-11-15 17:45 UTC) | Cron (Europe/London) |
|---|---|---|
| conductor@ | trig_01CbV6xVJpqAavDovmK3AbRD (wakes the conductor session) | `7 1,3,5,7-23 * * *` |
| dev@ | trig_0172Sot9BdxrBfe73hJVZ7Cx | `13 1,3,5,7-23 * * *` |
| writer@ | trig_01WUQ53PYXnJYKdi4oaqTUQf | `19 1,3,5,7-23 * * *` |
| designer@ | trig_016ypc3cvi7oVT2LFSPfJoxa | `25 1,3,5,7-23 * * *` |
| reporter@ | trig_01E96bYuSFBLwg8JYztX2a3m | `41 */2 * * *` |
| console@ | trig_01JQ9J7g6EEGduq1mMz5qv1o | `53 */3 * * *` |
| researcher@ | trig_014j8yHyWcZpPWiBSdTpxdAy | `47 */4 * * *` |
| security@ | trig_01Ee8vpCVDPBAGA8cmb6yc92 | `35 */4 * * *` |
| abp@ | trig_01HqTQZKFzqQuQyPtRpMqfKR | `37 */6 * * *` |
| dns@ | trig_01BUtuc6wSedVUfX8QRjNxuN | `11 8,20 * * *` |
| outreach@ | trig_01RYoEorR9k3CZo5KcZUZ5CB | `17 9 * * *` |

Measured when created (2026-11-15): scheduled sessions carry no connectors (no mail, Drive, Calendar or meetings tools) and start with no repository attached; they clone it over HTTPS. First test run: reporter@, fired by hand at 17:10 UTC.

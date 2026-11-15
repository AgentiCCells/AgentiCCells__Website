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

Each fresh-session run: read the rules and its brief, make a key for this run, take the top open item from `board/queue/<role>.md`, release through the gates, log, debrief, stop. A run with nothing to do logs `checked` and stops. `board/HOLD.md` stops every run.

Fresh sessions also mean each run has its own container, which closes part of gap 2 in board/abp/README.md for scheduled runs.

The scheduled tasks themselves are listed in claude.ai under the account's scheduled tasks; their IDs are recorded below by the conductor.

## Scheduled task IDs

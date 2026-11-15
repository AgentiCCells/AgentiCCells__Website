# Map: starting a team of agents

Status: first pass by conductor@agenticcells.dinis, 2026-11-15.

| # | Step | Who | Output | Evidence |
|---|---|---|---|---|
| 1 | Roster with an order and a policy per role | bootstrap pack | team/ROSTER.md | 4b251d2 |
| 2 | Rules every agent follows | bootstrap pack | CLAUDE.md | 4b251d2 |
| 3 | Environment check before starting roles | conductor@ | measured reach, ACC-016 | team/activity/conductor.jsonl |
| 4 | One key pair per agent, private half in its session only | each agent, `team/keygen.sh` | team/keys/<role>.json, team/keys.json | Dinis's rule, 2026-11-15 |
| 5 | A brief per role, with its policy (reach, mandate, may not) | conductor@ | board/briefs/<role>.md | this commit |
| 6 | Activity log per agent | each agent, `team/log.sh` | team/activity/<role>.jsonl | team/ACTIVITY.md |
| 7 | Policies written in the capability grammar, gaps measured | abp@ | board/abp/ | ACC-008 |
| 7a | Grant measured in one session (credential names, modes, tools, network), mandate taken from each brief; gap derived by a script, never hand-written | abp@ | board/abp/inputs.json, board/abp/derive.mjs, board/abp/<role>.md, data/abp.json | team/activity/abp.jsonl, ACC-008 |
| 7b | Policies for designer@ and reporter@; the move to one container per run recorded as a second deployment (`run`) and every policy re-derived against its own deployment | abp@ | board/abp/inputs.json, board/abp/derive.mjs v2, board/abp/designer.md, board/abp/reporter.md, data/abp.json | team/activity/abp.jsonl, board/queue/abp.md A1 |
| 8 | Each role's first debrief | each agent | board/debriefs/ | ACC-009 |

Authorisation model (Dinis, 2026-11-15): "the permission and the authorization happens because they have right access to the repo." Keys identify an agent; write access to the repository is what authorises it.

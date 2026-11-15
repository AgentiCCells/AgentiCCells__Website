# Brief: console@agenticcells.dinis
Given by conductor@, 2026-11-15. Read COMMON.md first, then board/ACC-007.md, research/LINKS.md, team/ACTIVITY.md.
Dinis, 2026-11-15: "the visibility that we're selling here is actually what we actually are doing."
Policy. May reach: this repository (read all; write build/pages/console.mjs, assets/console.*, your log and map); the simulated console vault (public, read only). Asked to: the team's real console, read-only. May not: stop or start agents, add controls, load third-party scripts, publish anything from ~/.agents or the environment.
Work (ACC-007):
1. build/pages/console.mjs using dev@'s page hook (if the hook is not on dev yet, write your module to its contract and add a minimal call in build.mjs; coordinate through board/inbox/). At build time it reads board/*.md (id, title, owner, status), team/keys.json (labels, fingerprints), team/activity/*.jsonl, and git log (hash, time, subject, Agent trailer; fall back to the subject when the trailer is missing). It renders /console/: the board, the agents and their keys, a timeline of activity and commits, and replay: /console/<date>/ for each day with activity. Static HTML, no JavaScript needed, works at 390px and in dark mode.
2. Also write site/console/console.json (the same data) for other tools.
3. The CI checkout must have full history (it does: fetch-depth 0).
Map: map/console.md.

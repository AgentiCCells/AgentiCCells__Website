# Map: the team's console, read-only (ACC-007)

Status: first pass by console@agenticcells.dinis, 2026-11-15.

| # | Step | Who | Read | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Make a key pair; publish the public half | console@, `team/keygen.sh` | - | team/keys/console.json | team/activity/console.jsonl |
| 2 | Read the brief, the hook contract and the validator | console@ | board/briefs/console.md, board/briefs/dev.md, build/validate.js | - | team/activity/console.jsonl |
| 3 | Page module to the page hook contract | console@ | board/ACC-*.md, team/keys.json, team/keys/*.json, team/activity/*.jsonl, git log | build/pages/console.mjs | this commit |
| 4 | Replay: the board and keys as committed at the end of each day | console@ | `git rev-list --before`, `git show <rev>:board/...` | /console/&lt;date&gt;/ | this commit |
| 5 | The same data for other tools | console@ | as step 3 | site/console/console.json | this commit |
| 6 | Gate: no key-shaped strings, only short fingerprints and short hashes | console@ | build/validate.js | validator prints OK | team/activity/console.jsonl |
| 7 | Release to dev with rebase; CI builds with full history (fetch-depth 0) | console@ | .github/workflows/pages.yml | https://agenticcells.com/console/ | git log |

Agent attribution for a commit: the `Agent:` trailer; if missing, an `Agent:` line in the body (older commits, see ACC-015); otherwise shown as "no Agent: trailer" with its subject.
Read-only by design: no controls, no JavaScript, no third-party scripts (brief policy, 2026-11-15).
| 8 | Follow-up: remove the duplicate hook left by the rebase; add `ctx.files` for non-HTML output | console@ | build/build.mjs at 6be062f | console.json written after site/ is cleared | team/activity/console.jsonl |

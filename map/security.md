# Map: keeping secrets out of the repository and the site

Status: first pass by security@AgentiCCells.dinis, 2026-11-15.

| # | Step | Who | Output | Evidence |
|---|---|---|---|---|
| 1 | Make own key pair, publish public half only | security@, `team/keygen.sh` | team/keys/security.json | team/activity/security.jsonl |
| 2 | Leak scan of tracked, new and built files, Node only | security@ | build/leak-scan.mjs | prints OK |
| 3 | Leak scan runs in the Pages workflow after validate | security@ | .github/workflows/pages.yml | this commit |
| 4 | One-off scan of the full git history | security@ | board/security/2026-11-15-history-scan.md | `node build/leak-scan.mjs --history` |
| 5 | Key folder permissions and the shared-container finding | security@ | board/security/2026-11-15-key-hygiene.md | stat, no values read |
| 6 | Dependency check and proposal to pin actions to SHAs | security@ | board/inbox/conductor-from-security-1.md | proposal, not changed |

Every agent: run `node build/build.mjs && node build/validate.js && node build/leak-scan.mjs` before each commit. A finding names file, line and kind; it never shows the value.

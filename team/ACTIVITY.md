# Activity: what every agent did, as files

Dinis, 2026-11-15: "let's map everything and have the visibility of everything that's flying here."

Every agent appends one JSON line per meaningful step to `team/activity/<role>.jsonl`, with `team/log.sh`. One file per agent, so agents never edit the same file. Lines are only ever appended, never edited.

| Field | Meaning |
|---|---|
| `time` | UTC, set by the script |
| `agent` | `role@AgentiCCells.person` |
| `item` | the board item (`ACC-nnn`), or `-` |
| `action` | started, read, wrote, built, checked, committed, pushed, released, asked, answered, blocked, decided, briefed, handed-over, done |
| `summary` | one plain sentence; never a secret, never a customer's name |
| `commit` | short hash, when there is one |

Together with git history (`Agent:` trailers), the board and `team/keys.json`, this is what the console reads. Lines added after the fact (reconstructed from commits) say so in the summary.

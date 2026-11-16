# Map: building specific sites with sites@ (interactive, Dinis directs)

Status: first rows by sites@AgentiCCells.dinis, 2026-11-15.

| # | Step | Who | Read | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Start, make key, read brief, board, newsroom articles | sites@ | CLAUDE.md, REALITY.md, briefs, ACC-021, ACC-024, two newsroom articles | team/keys/sites.json | team/activity/sites.jsonl |
| 2 | Dinis picks the site | Dinis | - | "start with the orange seller idea" (2026-11-15) | sites/orange-grower/brief.md |
| 3 | Write the brief from Dinis's words, open a board, list questions | sites@ | hub article, "The first example: an orange grower" | sites/orange-grower/brief.md, board/BOARD.md | team/activity/sites.jsonl |
| 4 | Dinis creates the site repositories and gives the team write access | Dinis | - | three repositories | sites/*/board |
| 5 | Per repository: vault boundary files first, then vault (sgit init), CI pipeline (trailer, build, validate, leak scan, Pages, v0.1.N tag), push to dev | sites@ | sgit.ai git-and-vaults guidance | .github/workflows/pages.yml, scripts/ | commits 49d3a5b, 869201d, e105f30 |
| 6 | Vault write keys handed to Dinis outside chat, for GitHub secrets and his password manager | sites@ to Dinis | - | file in the session scratchpad, deleted after | team/activity/sites.jsonl |

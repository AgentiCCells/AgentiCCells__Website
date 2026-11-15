# History scan, 2026-11-15

By security@agenticcells.dinis. Findings are described, never quoted.

## What was scanned
- Every commit reachable in this clone after `git fetch --depth=200 origin dev`, a fetch of every branch on origin (dev, main, claude/confident-davinci-fiu43e, agent/outreach, agent/researcher) and the tags. The clone was no longer shallow afterwards: 19 commits in all (source: `git rev-list --count --all`, 2026-11-15).
- Command: `node build/leak-scan.mjs --history`. It reads `git log -p --all` and scans the lines each commit added, with the same detectors as the tree scan (private key blocks, AWS keys, GitHub tokens, sgit vault and read keys, the bare `passphrase:vault_id` shape, JWTs, Google, Slack and Anthropic or OpenAI key shapes, secret-looking assignments, long high-entropy strings; public keys allowed only in team/keys.json and team/keys/*.json).
- Also checked: every file name ever added or deleted (no `.env`, `.pem`, `.key`, `id_rsa`, `passphrase`, `keygen.out`, `.agents`, credentials or archive files), and every commit message (no findings).
- The live site: https://agenticcells.com/, /version.json and /assets/style.css, fetched and scanned (no findings).

## Result
- **Clean.** The history scan printed `OK (19 commits)`. No secret shapes in added lines, file names or commit messages.
- Two commit author identities appear (one person, one agent); no other personal data was looked for beyond that.

## Limits
- Pattern based. A secret in an unusual shape (a short password, a word passphrase) is not caught.
- 40-character pure hex strings are allowed as git object ids (needed to pin actions to commit SHAs); an old-style 40-hex GitHub token would pass.
- Commits pushed after this scan are covered only by the tree scan in the Pages workflow and before each commit. Run `node build/leak-scan.mjs --history` again after large merges.

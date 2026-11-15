# Debrief: security@agenticcells.dinis, ACC-016 (security brief, first pass)

Date: 2026-11-15. Branch: agent/security, released to dev.

## Done
- build/leak-scan.mjs (Node built-ins only): scans every file git knows about (tracked, plus untracked files not ignored, so new files are caught before their first commit) and site/. Detects private key blocks, AWS key ids and secret assignments, GitHub tokens, sgit vault and read keys and the bare `passphrase:vault_id` shape, JWTs, Google, Slack and Anthropic or OpenAI shapes, secret-looking assignments and long high-entropy strings. Public keys only in team/keys.json and team/keys/*.json, and those files must not mention a private part. Reports file, line and kind, never the value. `--history` scans every commit's added lines.
- Pages workflow runs it after validate.
- History scan: clean (board/security/2026-11-15-history-scan.md).
- Key hygiene: 700/600 everywhere; shared-container finding recorded for abp@ (board/security/2026-11-15-key-hygiene.md).
- Dependencies: none; actions pinned to major tags; SHA pinning proposed (board/inbox/conductor-from-security-1.md).

## What worked
- A self-test with random synthetic samples (kept out of the repository) caught 12 of 12 shapes and passed 7 of 7 look-alikes (commit SHA, fingerprint, paths, pinned action, shell variable, URL, times).

## What did not, or limits
- Pattern based: short or word-based secrets are not caught. 40-hex strings are allowed as git object ids.
- I did not look up action SHAs: my brief limits GitHub tokens to this repository.

## Facts for REALITY.md
- 2026-11-15 security@: `node build/leak-scan.mjs` exists, prints OK on dev, and runs in the Pages workflow after validate.
- 2026-11-15 security@: full history (19 commits, all branches and tags) scanned clean.
- 2026-11-15 security@: every agent runs as one user (root) in one container; ~/.agents/<role>/ are 700 with files 600, but any agent can read any other agent's private key and its passphrase.
- 2026-11-15 security@: the build has no third-party dependencies.

## For Dinis to decide
- Pin workflow actions to commit SHAs (proposal in board/inbox).
- Whether keys should mean "this role signed": that needs one container or one user per agent. Today they cannot.

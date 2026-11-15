# Brief: security@agenticcells.dinis
Given by conductor@, 2026-11-15. Read COMMON.md first, then CLAUDE.md "Never" and "Releases".
Policy. May reach: everything in this repository, read; write build/leak-scan.mjs, a workflow step to run it, board/security/, your log and map. Asked to: leak scans, key hygiene, dependency checks. May not: remove board/HOLD.md; fix anything by weakening a check; read or print secret values. You may create board/HOLD.md only in an emergency (a live secret in the repository or on the site) and must then write board/inbox/conductor-from-security-hold.md saying why.
Work:
1. build/leak-scan.mjs (Node only): scans every tracked file (git ls-files) and site/ for secret shapes: private key blocks, AWS keys, GitHub tokens, sgit vault keys (`passphrase:vault_id` shapes), JWTs, long high-entropy strings; allows public keys only in team/keys.json and team/keys/*.json, and only if they contain no private part. Prints OK or fails. Add it to the Pages workflow after validate.
2. Scan the full git history once (git log -p) and record the result in board/security/2026-11-15-history-scan.md (findings described, never quoted).
3. Key hygiene: check ~/.agents/*/ permissions (700, files 600) and record. Record the shared-container finding for abp@.
4. Dependencies: confirm the build has none (Node built-ins only) and the workflow's actions are pinned to major versions; propose pinning to commit SHAs in an inbox note, do not change it.
Map: map/security.md.

# Debrief: abp@agenticcells.dinis, ACC-008

2026-11-15.

## What I did
- Read CLAUDE.md, REALITY.md, COMMON.md, my brief, the roster, every brief and reading-notes Q6; fetched the five abp.sgit.ai pages (site v0.12.1).
- Made my key pair (`team/keys/abp.json`, public half only).
- Measured the grant from inside my session: credential variable names, file modes, user, installed tools, outbound network, commit signatures, and the tools listed in my session. No value was read or printed.
- Wrote the grant and the nine mandates as data (`board/abp/inputs.json`) and a script (`board/abp/derive.mjs`) that derives each policy, so the gap is never written by hand. Outputs: `board/abp/<role>.md` x9, `data/abp.json`, `board/abp/README.md`.

## What worked
- Holding grant and mandate as two lists made the gap a set difference; `--check` recomputes and compares byte for byte.

## What did not
- The session harness refused one combined command (credential names plus a listing of other agents' key folders). I did not retry it; the conductor had already recorded that agents can read each other's folders, and root ownership (measured) is enough to show it.
- The grant is measured in my session only; other roles' grants are derived from sharing the container.
- Delta is at primitive level, as the model says; where a mandated primitive is granted far wider than asked (for example signing, `write.repository.tenant`), I list it separately as "wider than asked".

## Facts for REALITY.md (abp@, 2026-11-15)
- Every agent process runs as root; `~/.agents` is mode 755; so a 700 folder mode does not stop another agent reading it.
- Every commit on dev is signed by one SSH key set in `/root/.gitconfig`; the signature does not tell agents apart.
- Outbound HTTPS reaches arbitrary hosts (example.com, pypi.org answered 200).
- Installed: gh, gcloud, gsutil, bq, sgit, node, python3, systemctl. Not installed: aws, crontab, ssh.
- Mail, drive, calendar, meetings, GitHub connectors and session or scheduled-task creation are listed in an agent's session tools.
- Agent behaviour policies exist: `board/abp/`, `data/abp.json` (derived by `board/abp/derive.mjs`).

## What Dinis must decide
The three proposals in `board/abp/README.md`: remove cloud credentials from agent sessions, one container per role, connectors off for agent sessions. And whether to gate dev with a required check.

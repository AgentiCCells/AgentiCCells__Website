# Map: building and releasing the website

Status: first pass by conductor@agenticcells.dinis, 2026-11-15. Steps 1 to 9 are reconstructed from git and the session; later steps are added by the agents that do them.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Brief the conductor | Dinis | bootstrap pack (zip) | conductor session | session, 16:20 UTC |
| 2 | Read the brief, record what exists | conductor@ | pack, the live domains | REALITY.md, board items | 4b251d2 |
| 3 | Brief and start the developer | conductor@ | STRUCTURE.md | board/briefs/dev.md | 4b251d2 |
| 4 | Build skeleton, build script, validator, workflow | dev@ | brief | content/, data/, build/, .github/ | 2a9c54c |
| 5 | Check the developer's work independently | conductor@ | branch | "built site/", "OK" | 8d582be |
| 6 | Settle names, repository, domain, branch | Dinis, recorded by conductor@ | questions on the board | ACC-010 done, CNAME agenticcells.com, deploy from dev | 35837e9, 8e7db41, 657952a |
| 7 | Versioning in CI, not by agents | Dinis's rule, conductor@ | workflow | v0.1.N tags after each deploy | ce760fa |
| 8 | First release | conductor@ pushes to dev at Dinis's request; Dinis fixes Pages settings | dev | https://agenticcells.com, v0.1.0 | tag v0.1.0, 7b50de2 |
| 9 | Read the network the method comes from | reading helper for conductor@ | READING.md | board/reading-notes.md | ce387a1 |
| 10 | Write the site's words: home, method, cells, open source, console, about, how this site was built | writer@ | briefs, research/, reading notes, git history | content/*.md, data/stack.json (licences marked unchecked) | agent/writer commits, team/activity/writer.jsonl |

## What a customer would buy from this (proposal)
The same steps for their site: a brief, a developer agent, a validator that must print OK, CI that versions and deploys, a board and a map that show every step. Time so far: about 30 minutes of agent time to a live, versioned page (from the commit times above), plus the person's decisions. Price: see the ladder, first proposal.

## Blockers met, and how they were cleared
- Pages environment allowed only the old branch: fixed by Dinis in settings (no agent had that reach).
- Naming mix-up (singular and plural): settled by Dinis in one message.

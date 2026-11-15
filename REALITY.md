# Reality: what exists

A thing that is not in this file does not exist, whatever a brief says. Kept current by whoever ships.

## Exists (checked, with date and who checked)
- 2026-11-15 conductor@agenticcells.dinis: GitHub repository `AgentiCCell/AgentiCCell__Website` exists, with an initial commit (LICENSE Apache-2.0 text, README, .gitignore). The brief calls it `agenticcells-website`; the actual name differs.
- 2026-11-15 conductor: I can push to branch `claude/confident-davinci-fiu43e` of that repository. I am not permitted to push to any other branch, so nothing reaches `main` or Pages until Dinis merges.
- 2026-11-15 conductor: agenticcells.ai and agenticcells.com resolve to 208.91.197.27 (registrar default, not Route 53, not GitHub Pages). agenticcells.app has no address record yet. Checked with `getent`; `dig` is not installed here, so nameservers are not confirmed.
- 2026-11-15 conductor: Node v22.23.4 is available in this session.
- 2026-11-15 conductor: the bootstrap folder is copied into this repository: CLAUDE.md, board/ (ACC-001 to ACC-009, BRIEF.md), team/ROSTER.md, dns/, research/.

## Does not exist yet
- `sgit`: not installed in this session, so no agent key pairs exist. `team/keys.json` is empty.
- Route 53 hosted zones, nameserver switch, `dns/records.json`, GitHub domain verification (unchecked: no AWS or org access seen).
- The website build, validator, content, CNAME file, Pages workflow, Pages site.
- `agenticcells.com` redirect repository.
- The team contact address for the site's contact route.
- Any agent other than the conductor. The dev role is not yet started.
- The console, `board/HOLD.md` (absent, so work may proceed).

## Decided by Dinis (with his words and the date)
- 2026-11-15: "you are going to be the agent called conductor@AgentiCCell.dinis". Note the spelling: the brief uses `agenticcells`; Dinis's message uses `AgentiCCell`. To confirm with him (see ACC-010); until answered, commits use `conductor@agenticcells.dinis`.
- 2026-11-15: "here is your first brief, and agentic team to spin up here" (the bootstrap zip).
- Open decisions 1 to 4 in board/BRIEF.md remain open. Wording until decided: "fixed-price cells".

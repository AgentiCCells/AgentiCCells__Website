# Reality: what exists

A thing that is not in this file does not exist, whatever a brief says. Kept current by whoever ships.

## Exists (checked, with date and who checked)
- 2026-11-15 conductor@agenticcells.dinis: GitHub repository `AgentiCCell/AgentiCCell__Website` exists, with an initial commit (LICENSE Apache-2.0 text, README, .gitignore). The brief calls it `agenticcells-website`; the actual name differs.
- 2026-11-15 conductor: I can push to branch `claude/confident-davinci-fiu43e` of that repository. I am not permitted to push to any other branch, so nothing reaches `main` or Pages until Dinis merges.
- 2026-11-15 conductor: agenticcells.ai and agenticcells.com resolve to 208.91.197.27 (registrar default, not Route 53, not GitHub Pages). agenticcells.app has no address record yet. Checked with `getent`; `dig` is not installed here, so nameservers are not confirmed.
- 2026-11-15 conductor: Node v22.23.4 is available in this session.
- 2026-11-15 conductor: the bootstrap folder is copied into this repository: CLAUDE.md, board/ (ACC-001 to ACC-009, BRIEF.md), team/ROSTER.md, dns/, research/.

- 2026-11-15 conductor (checked by running them): `node build/build.mjs` prints "built site/" and `node build/validate.js` prints OK, on branch commit 2a9c54c. Built by dev@agenticcells.dinis: placeholder `content/index.md`, `data/cells.json`, `assets/style.css`, `CNAME`, `.github/workflows/pages.yml`.

## Does not exist yet
- The Pages workflow has never run (nothing on main); no Pages site is served.
- `content/` pages other than index, `data/stack.json`, `data/links.json`.
- `sgit`: not installed in this session, so no agent key pairs exist. `team/keys.json` is empty.
- Route 53 hosted zones, nameserver switch, `dns/records.json`, GitHub domain verification (unchecked: no AWS or org access seen).
- `agenticcells.com` redirect repository.
- The team contact address for the site's contact route.
- Any agent other than the conductor. The dev role has finished its first piece (ACC-003, In review).
- The console, `board/HOLD.md` (absent, so work may proceed).

## Decided by Dinis (with his words and the date)
- 2026-11-15: "you are going to be the agent called conductor@AgentiCCell.dinis". Note the spelling: the brief uses `agenticcells`; Dinis's message uses `AgentiCCell`. To confirm with him (see ACC-010); until answered, commits use `conductor@agenticcells.dinis`.
- 2026-11-15: "here is your first brief, and agentic team to spin up here" (the bootstrap zip).
- Open decisions 1 to 4 in board/BRIEF.md remain open. Wording until decided: "fixed-price cells".

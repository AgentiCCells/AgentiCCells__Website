# Reality: what exists

A thing that is not in this file does not exist, whatever a brief says. Kept current by whoever ships.

## Exists (checked, with date and who checked)
- 2026-11-15 conductor@agenticcells.dinis: the website repository is `AgentiCCells/AgentiCCells__Website` (plural), default branch `dev`. The old singular URL `AgentiCCell/AgentiCCell__Website` now leads to this same repository, and the earlier commits are here unchanged.
- 2026-11-15 conductor: I can push to branch `claude/confident-davinci-fiu43e` of this repository and no other, so nothing reaches `dev` or Pages until Dinis merges.
- 2026-11-15 16:40 conductor: agenticcells.com and www.agenticcells.com resolve to the four GitHub Pages addresses (185.199.108-111.153); http redirects to https; https answers 404 until the first deploy succeeds. Checked with `getent` and `curl`.
- 2026-11-15 16:40 conductor: first Pages run on dev (run 43736609996): build OK, version v0.1.0 worked out, validator OK; deploy job rejected before it started (no runner, no log), so no tag and no site yet. Most likely cause: the github-pages environment does not allow the dev branch to deploy.
- 2026-11-15 conductor: Node v22.23.4 is available in this session.
- 2026-11-15 conductor: the bootstrap folder is copied into this repository: CLAUDE.md, board/ (ACC-001 to ACC-009, BRIEF.md), team/ROSTER.md, dns/, research/.

- 2026-11-15 conductor (checked by running them): `node build/build.mjs` prints "built site/" and `node build/validate.js` prints OK, on branch commit 2a9c54c. Built by dev@agenticcells.dinis: placeholder `content/index.md`, `data/cells.json`, `assets/style.css`, `CNAME`, `.github/workflows/pages.yml`.

## Does not exist yet
- The Pages workflow has never run (nothing merged to dev); no Pages site is served.
- `content/` pages other than index, `data/stack.json`, `data/links.json`.
- Agent key pairs: none. `team/keys.json` is empty. sgit-ai v0.27.0 is installed in the conductor's session (2026-11-15), but keygen needs a passphrase and a vault for the private half (ACC-011).
- Route 53 hosted zones, nameserver switch, `dns/records.json`, GitHub domain verification (unchecked: no AWS or org access seen).
- The team contact address for the site's contact route.
- Any agent other than the conductor. The dev role has finished its first piece (ACC-003, In review).
- The console, `board/HOLD.md` (absent, so work may proceed).

## Decided by Dinis (with his words and the date)
- 2026-11-15: "you are going to be the agent called conductor@AgentiCCell.dinis". Settled the same day by Dinis: "all should be agenticcells" and "agenticcell was a mistake on my part". Every agent name, repository and domain uses `agenticcells`; this agent is `conductor@agenticcells.dinis`.
- 2026-11-15: "here is your first brief, and agentic team to spin up here" (the bootstrap zip).
- 2026-11-15: Dinis asked to clone `AgentiCCells/AgentiCCells__Website`, then said "I also changed the default branch to dev". Taken as: this is the repository, and `dev` is the release branch the Pages workflow deploys from.
- 2026-11-15: "ok, small change of plans for now the url is agenticcells.com". The site's custom domain (CNAME, validator, README, ACC-005) is now agenticcells.com. What agenticcells.ai does meanwhile is not decided.
- 2026-11-15: "agenticcells.com is configured to use GitHub and agenticcells.ai is a bit of a mess at the moment so we are not going to use it (until the NS stabelise)". agenticcells.ai is not used until its nameservers settle.
- 2026-11-15: "the version number, which should be v0.1.0, and then every push becomes v0.1.1, and then all the minor ones, is done by the CI pipeline, not by here." Implemented in .github/workflows/pages.yml: tags v0.1.N after each successful deploy.
- 2026-11-15: Dinis sent an updated briefing pack ("can you also see this updated briefing pack for you"). Merged: READING.md (eight sites, ten questions), the repository name AgentiCCells/AgentiCCells__Website, the GitHub organisation `AgentiCCells` with Pages host agenticcells.github.io.
- Open decisions 1 to 4 in board/BRIEF.md remain open. Wording until decided: "fixed-price cells".

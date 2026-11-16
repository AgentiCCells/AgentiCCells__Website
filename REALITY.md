# Reality: what exists

A thing that is not in this file does not exist, whatever a brief says. Kept current by whoever ships.

## Exists (checked, with date and who checked)
- 2026-11-15 conductor@AgentiCCells.dinis: the website repository is `AgentiCCells/AgentiCCells__Website` (plural), default branch `dev`. The old singular URL `AgentiCCell/AgentiCCell__Website` now leads to this same repository, and the earlier commits are here unchanged.
- 2026-11-15 conductor: I push to `claude/confident-davinci-fiu43e`, and to `dev` only when Dinis asks (he asked once, for the first release). Every push to `dev` deploys and takes the next version.
- 2026-11-15 16:40 conductor: agenticcells.com and www.agenticcells.com resolve to the four GitHub Pages addresses (185.199.108-111.153); http redirects to https. Checked with `getent` and `curl`.
- 2026-11-15 conductor: https://agenticcells.com answers 200 with the placeholder page; /version.json says v0.1.0; tag v0.1.0 is on commit ce760fa (set by CI). http://agenticcells.com and https://www.agenticcells.com redirect (301) to https://agenticcells.com/. Dinis: "site is live". (The first run's deploy was rejected by the github-pages environment; it went through after Dinis changed the settings.)
- 2026-11-15 conductor: Node v22.23.4 is available in this session.
- 2026-11-15 conductor: the bootstrap folder is copied into this repository: CLAUDE.md, board/ (ACC-001 to ACC-009, BRIEF.md), team/ROSTER.md, dns/, research/.

- 2026-11-15 conductor (checked by running them): `node build/build.mjs` prints "built site/" and `node build/validate.js` prints OK, on branch commit 2a9c54c. Built by dev@AgentiCCells.dinis: placeholder `content/index.md`, `data/cells.json`, `assets/style.css`, `CNAME`, `.github/workflows/pages.yml`.

- 2026-11-15 conductor: key pair for conductor@AgentiCCells.dinis, made in its session with sgit-ai v0.27.0 (`team/keygen.sh`); public half in team/keys/conductor.json and team/keys.json. Private half and passphrase only in the session (~/.agents/conductor/).
- 2026-11-15 conductor: this session's environment holds AWS access keys, GitHub tokens (GH_TOKEN, GITHUB_TOKEN) and a Google Cloud token (names checked, values not read). Every agent in this container can reach them. No agent is to use the AWS or Google Cloud credentials (ACC-016).
- 2026-11-15 conductor: activity logs (team/activity/, team/log.sh), the workflow map (map/), work queues (board/queue/) and the schedule (team/SCHEDULE.md).

- 2026-11-15 ~17:30 conductor (checked on dev at 0890c36 and later, and on the live site): https://agenticcells.com serves v0.1.7 with seven content pages (home, method, cells, open source, the console, about, how this site was built), a nav, a footer contact link to agent@riskmandate.ai, and the read-only console at /console/ with a daily replay and /console/console.json.
- CI on every push to dev runs, in order: the Agent: trailer check (build/check-commits.mjs), build, validate (links, titles, em dashes, key shapes, prices marked, CNAME, no third-party scripts, no hype words), the leak scan (build/leak-scan.mjs), deploy, tag. Full git history scan by security@: clean.
- dns/records.json and dns/check.mjs (dns@). Observed: agenticcells.com and agenticcells.ai on Route 53; agenticcells.app not delegated (NXDOMAIN). agenticcells.ai points at GitHub Pages with no site and no verification (ACC-018).
- research/stack-checked.json, research/checked-claims.md (researcher@); data/stack.json (writer@). From agent sessions github.com and api.github.com answer 403; raw.githubusercontent.com, npm and PyPI answer.
- board/abp/ (nine policies, derived by board/abp/derive.mjs), data/abp.json (abp@). Measured: every agent here shares one reach, 20 of 23 capabilities; every "may not" is prose only.
- board/drafts/outreach/ (three drafts, none sent).
- team/keys.json: nine public keys (conductor, dev, dns, writer, researcher, console, abp, security, outreach), each made in-session.
- Mail, Drive, Calendar, meetings and GitHub tools are available to agent sessions; no agent has used them.

- 2026-11-15 18:08 conductor (wake 1): the site is at v0.1.18. Conductor-started runs work: reporter@ (R1 day-one case study, ba4d09d), writer@ (W1 buyer home page, 08e5325), dev@ (V1 {{stack}}, 2203cf8), designer@ (D1 text mark, palette, type scale, c728aab), each in its own session with the repository attached, each under four minutes.
- The first offering is defined by Dinis in the newsroom (2026-11-15, "Atomic cells, end to end"): the £500 website cell, seven steps, two modes (ACC-021). The flow is "being built now"; none of it is sold.

- 2026-11-15 18:20 conductor: https://agenticcells.ai serves the site (v0.1.27); http and www.agenticcells.ai redirect to it. agenticcells.com no longer serves it: http://agenticcells.com/ and /version.json answer GitHub's "Site not found" (the home page only from cache), while .com still points at GitHub Pages, so .com is now the domain that can be claimed (ACC-018). No GitHub verification TXT exists for either domain.

- 2026-11-15 19:08 conductor (wake 2): site at v0.1.29 on agenticcells.ai. New since 18:10: the /website-cell/ offer page as the home page's main call to action (writer@, 3f2848c); restyled cards, ladder and steps (designer@); a prototype /key/ page that makes an ECDSA P-256 key pair in the browser and shows the public half as text and a QR code, sends nothing, not yet linked (dev@, d858af6); "Schedule and last runs" on the console (console@, 1e24d63). From 19:08 every agent run starts on claude-sonnet-5-5 (session records confirm it).

- 2026-11-15 20:08 conductor (wake 3): site at v0.1.37. Since 19:30: hub.json and its shape check (dev@, 73226ce, ACC-024); /key/ linked from the website cell's Key step (writer@, 956206f); the seven-step diagram on /website-cell/ (designer@, 9c040d6); sites@ started (6b1090a); pipeline@'s first draft of map/site-creation.md (d23c538). agenticcells.com still answers "Site not found" over http (ACC-018 open).

- 2026-11-15 20:46 conductor: agenticcells.site resolves, but only to the registrar's defaults (nameservers ns73/ns74.worldnic.com, address 208.91.197.27); hub.agenticcells.site does not exist (NXDOMAIN).

- 2026-11-15 21:08 conductor (wake 4): site at v0.1.46. Since 20:08: the two modes on the cells page (writer@, 85a411d); the abp derive check runs in CI and the release script (dev@, baf0c59); nav and footer for phones (designer@, b415cff); /case-study/ live (reporter@, 68f8dc9); research/buyers: five kinds of buyer (researcher@, 1e4220d); leak scan of dev and the live site clean (security@, 84abeee); dns/records.json updated: .com unclaimed, .ai live, .app NXDOMAIN (dns@, fbcd8de). Four Site repositories exist (Dinis, ~20:50); factory@ started.

- 2026-11-15 21:20 conductor (DNS checked through dns.google): agenticcells.site is on Route 53 (ns-23.awsdns-02.com and others) with the four GitHub Pages addresses; hub.agenticcells.site is a CNAME to agenticcells.github.io. agenticcells.com still has the four GitHub Pages A records and a www CNAME and answers 404 "Site not found"; no _github-pages-challenge-agenticcells TXT record exists for .com, .ai or .site.

- 2026-11-15 22:08 conductor (wake 5): agenticcells.ai at v0.1.57: Open Graph, canonical, sitemap, robots, 404 and favicon (dev@, 9db4c93); ladder as biology on /cells/ (writer@, 1d5411f); console styling (designer@, 66ec3e9) and work queues on the console (console@, 9d78022). First buyer's-eye review (reviewer@, c4f902e): first impression and polish mostly 2 to 3 out of 5; nav 9 links over two lines (three on a phone); /console/ 57,812 px tall on a phone. agenticcells.site and hub.agenticcells.site answer over http with their first versions (v0.1.1, built by site@ and hub@); https not yet (certificates pending on GitHub's DNS check). sites@ is drafting the orange-grower example with Dinis.

- 2026-11-15 23:08 conductor (wake 6): agenticcells.ai at v0.1.62: five-link navigation with a script-free mobile menu, a footer "More" row and an SVG logo mark (designer@, aeb5d6d); per-size sections on /cells/ (writer@, a66c522); data/links.json and a warning-only external link check in CI (dev@, 6f2ab68); case-study/count.mjs and numbers.md (reporter@, 1b14843). sites@ built a draft orange-grower site (simulated order, English and Portuguese, 611c8f9). agenticcells.site and hub.agenticcells.site: https still not answering (certificates pending).

- 2026-11-16 01:08 conductor (wake 7, overnight): agenticcells.ai at v0.1.70: an articles section with an index and RSS feed (dev@, 2a6c1f7); a build-your-own-website page with this site as the worked example (writer@, eb53eff); lighter links and section rhythm (designer@, 18913cd). Second review (reviewer@, d5c9abd): navigation fixed; biggest problems now the console's length on a phone and stale ".com" text, and the home page's lack of a hero. agenticcells.site and hub.agenticcells.site now answer over https. With Dinis, sites@ set up three more site repositories he created (Site__Algarve-Orange-Grower, Site__Gabriel-DaCruz, Site__Algarve-Evolution queued) with vaults and CI pipelines; vault write keys handed to Dinis outside chat.

## Does not exist yet
- The £500 website cell's order, queue, key, steer and handover steps (ACC-021); `data/links.json`; a team sgit vault and lanes; commit signing per agent (ACC-019).
- GitHub domain verification for agenticcells.ai and agenticcells.com in the organisation (ACC-018); delegation of agenticcells.app.
- `board/HOLD.md` (absent, so work may proceed).

## Decided by Dinis (with his words and the date)
- 2026-11-15: "you are going to be the agent called conductor@AgentiCCell.dinis". Settled the same day by Dinis: "all should be agenticcells" and "agenticcell was a mistake on my part". Every agent name, repository and domain uses `agenticcells`; this agent is `conductor@AgentiCCells.dinis`.
- 2026-11-15: "here is your first brief, and agentic team to spin up here" (the bootstrap zip).
- 2026-11-15: Dinis asked to clone `AgentiCCells/AgentiCCells__Website`, then said "I also changed the default branch to dev". Taken as: this is the repository, and `dev` is the release branch the Pages workflow deploys from.
- 2026-11-15: "ok, small change of plans for now the url is agenticcells.com". The site's custom domain (CNAME, validator, README, ACC-005) is now agenticcells.com. What agenticcells.ai does meanwhile is not decided.
- 2026-11-15: "agenticcells.com is configured to use GitHub and agenticcells.ai is a bit of a mess at the moment so we are not going to use it (until the NS stabelise)". agenticcells.ai is not used until its nameservers settle.
- 2026-11-15: "the version number, which should be v0.1.0, and then every push becomes v0.1.1, and then all the minor ones, is done by the CI pipeline, not by here." Implemented in .github/workflows/pages.yml: tags v0.1.N after each successful deploy.
- 2026-11-15: Dinis sent an updated briefing pack ("can you also see this updated briefing pack for you"). Merged: READING.md (eight sites, ten questions), the repository name AgentiCCells/AgentiCCells__Website, the GitHub organisation `AgentiCCells` with Pages host agenticcells.github.io.
- 2026-11-15 (keys): "every agent always keeps a private key in their environment. The private keys are, in a way, ephemeral. They only exist while the agent exists, and they push the public key to the repo, and the logic is that the permission and the authorization happens because they have right access to the repo."
- 2026-11-15 (contact): "The contact address for the team is going to be, for now, agent@riskmandate.ai, because that's the mailbox that's been there."
- 2026-11-15 (branches): "Branch protection, no, everybody can push to dev. We'll control that a bit later."
- 2026-11-15 (team): "start all the agents, right? And also start an ABP agent, which should basically be creating all the agent behavior policies for everybody."
- 2026-11-15 (mapping): "let's map the whole workflow. And even the creation of this website is something that we want to sell. So let's map everything and have the visibility of everything that's flying here."
- 2026-11-15 ~18:15: "ok, domain agenticcells.ai is now pointed to the site". The site's domain is agenticcells.ai (CNAME, validator, README updated).
- 2026-11-15 ~18:20: "all agents you started are on Opus and we need to have then on Sonnet apart from you". Every run is started with model claude-sonnet-5-5; the conductor stays on its own model.
- 2026-11-15 ~19:45: "btw it should be *@AgentiCCells.dinis" ("sites@AgentiCCells.dinis"). Agent names are written role@AgentiCCells.dinis from now on; earlier records (activity logs, keys, debriefs, commits) keep the lowercase form they were made with. CI's Agent: check is case-insensitive, so both pass.
- 2026-11-15 ~20:45: "I can confirm that I have agenticcells.site". And on repository names for the site factory: "yeah I agree let me create those": AgentiCCells__Site__Factory, AgentiCCells__Site__Template, AgentiCCells__Site__Website, AgentiCCells__Site__Hub (ACC-027).
- 2026-11-15 ~21:15: "all those domains are in a good state now. agenticcells.com - we are not going to use it. agenticcells.ai - is ok for now. agenticcells.site and hub.agenticcells.site should be working very soon (just some DNS propagation issues)".
- Open decisions 1 to 4 in board/BRIEF.md remain open. Wording until decided: "fixed-price cells".

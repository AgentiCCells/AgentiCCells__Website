# Decision records

One line per decision Dinis has made, in his words, with the time; copied from REALITY.md "Decided by Dinis" on 2026-11-15 by conductor@. New decisions are added here first.

01. 2026-11-15: "you are going to be the agent called conductor@AgentiCCell.dinis". Settled the same day by Dinis: "all should be agenticcells" and "agenticcell was a mistake on my part". Every agent name, repository and domain uses `agenticcells`; this agent is `conductor@agenticcells.dinis`.
02. 2026-11-15: "here is your first brief, and agentic team to spin up here" (the bootstrap zip).
03. 2026-11-15: Dinis asked to clone `AgentiCCells/AgentiCCells__Website`, then said "I also changed the default branch to dev". Taken as: this is the repository, and `dev` is the release branch the Pages workflow deploys from.
04. 2026-11-15: "ok, small change of plans for now the url is agenticcells.com". The site's custom domain (CNAME, validator, README, ACC-005) is now agenticcells.com. What agenticcells.ai does meanwhile is not decided.
05. 2026-11-15: "agenticcells.com is configured to use GitHub and agenticcells.ai is a bit of a mess at the moment so we are not going to use it (until the NS stabelise)". agenticcells.ai is not used until its nameservers settle.
06. 2026-11-15: "the version number, which should be v0.1.0, and then every push becomes v0.1.1, and then all the minor ones, is done by the CI pipeline, not by here." Implemented in .github/workflows/pages.yml: tags v0.1.N after each successful deploy.
07. 2026-11-15: Dinis sent an updated briefing pack ("can you also see this updated briefing pack for you"). Merged: READING.md (eight sites, ten questions), the repository name AgentiCCells/AgentiCCells__Website, the GitHub organisation `AgentiCCells` with Pages host agenticcells.github.io.
08. 2026-11-15 (keys): "every agent always keeps a private key in their environment. The private keys are, in a way, ephemeral. They only exist while the agent exists, and they push the public key to the repo, and the logic is that the permission and the authorization happens because they have right access to the repo."
09. 2026-11-15 (contact): "The contact address for the team is going to be, for now, agent@riskmandate.ai, because that's the mailbox that's been there."
10. 2026-11-15 (branches): "Branch protection, no, everybody can push to dev. We'll control that a bit later."
11. 2026-11-15 (team): "start all the agents, right? And also start an ABP agent, which should basically be creating all the agent behavior policies for everybody."
12. 2026-11-15 (mapping): "let's map the whole workflow. And even the creation of this website is something that we want to sell. So let's map everything and have the visibility of everything that's flying here."
13. 2026-11-15 ~18:15: "ok, domain agenticcells.ai is now pointed to the site". The site's domain is agenticcells.ai (CNAME, validator, README updated).
14. 2026-11-15 ~18:20: "all agents you started are on Opus and we need to have then on Sonnet apart from you". Every run is started with model claude-sonnet-5-5; the conductor stays on its own model.
15. Open decisions 1 to 4 in board/BRIEF.md remain open. Wording until decided: "fixed-price cells".
16. 2026-11-15 ~19:45: "btw it should be *@AgentiCCells.dinis" (and "sites@AgentiCCells.dinis"). Active files updated; history unchanged.

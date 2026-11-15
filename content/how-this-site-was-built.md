---
title: How this site was built
description: How a team of AI agents built and released this website on 15 November 2026, step by step, with the evidence for each step.
nav: 6
---
# How this site was built

Dinis Cruz, 15 November 2026: "even the creation of this website is something that we want to sell."

So here is how it was built: by a team of AI agents, each with a name, a key and a brief, and one person making the decisions. Every step below points at its evidence: a commit, a file or a page. The full map, with one row per step, is [map/website-build.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/map/website-build.md). Times are UTC, taken from the git history.

## The steps

- **16:20. A brief for the conductor.** Dinis gave the first agent, `conductor@agenticcells.dinis`, a bootstrap pack: the rules, a board of work items, a roster of roles and the research.
- **16:23. Read, then write down what exists.** The conductor copied the pack into the repository and wrote `REALITY.md`: a list of what has been checked to exist. Anything not in it does not exist, whatever a brief says. Commit 4b251d2.
- **16:24. A developer builds the skeleton.** `dev@agenticcells.dinis` wrote the build script (Node only, no dependencies), the validator and the deploy workflow. Commit 2a9c54c.
- **16:24. A second agent checks the work.** The conductor ran the build and the validator itself before recording them as working. Commit 8d582be.
- **16:30 to 16:37. The person settles the names.** Dinis decided the repository, the domain (agenticcells.com for now) and that every name is `agenticcells`. Commits 35837e9, 8e7db41, 657952a.
- **16:38. Versions come from CI, not from agents.** Dinis's rule. Each push to the release branch that deploys gets the next version number. Commit ce760fa.
- **16:42. First release.** The first deploy was refused by the repository's settings. No agent had the access to change them, so Dinis did. The site went live as v0.1.0. Commit 7b50de2.
- **16:48. Reading the network the method comes from.** Notes on eight sites and answers to ten questions, checked by the conductor. Commit ce387a1.
- **17:01. The whole team starts.** Briefs for eight roles, one key pair per agent, an activity log per agent, and the map. Commit 0d0f508.
- **After 17:01. The words.** `writer@agenticcells.dinis` wrote these pages from the briefs and the research, with a source for every claim. Other agents worked in parallel on the navigation, the console and the research checks. Their own steps are in the [activity logs](https://github.com/AgentiCCells/AgentiCCells__Website/tree/dev/team/activity).

## See it live

The team's [console](/console/) shows the board, the agents, their keys and every step they log, read from the repository's files. Each commit is in the [repository's history](https://github.com/AgentiCCells/AgentiCCells__Website/commits/dev).

## What a customer would get

The same steps for their own site: a brief, a developer agent, a validator that must pass, CI that versions and deploys, and a board and a map that show every step. This is a proposal. [Build your own website with a cell](/build-your-own-website/) says what carries over. The price would be one of the [cells](/cells/), as a first proposal.

## What did not go smoothly

- The first deploy was refused, and only the person could fix the setting.
- The first agents' commits did not carry a readable `Agent:` line. CI now refuses a push to the release branch that adds a commit without one (commit 9b64de6).

## What this page does not claim

- Steps before 16:48 were written into the map afterwards, from the git history.
- Commit names are the agents' own word. Commits are not yet signed with the agents' keys.

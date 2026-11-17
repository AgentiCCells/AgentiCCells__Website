---
title: Our own team, run as a cell
description: The AgentiCCells team described as a cell: its objective, deliverable and behaviour policy, its parts, how a day runs, what it cost where measured, what failed, and how a customer gets the same.
nav: 6.7
---
# Our own team, run as a cell

Dinis Cruz, 16 November 2026: "what we are going to do here is exactly what we want to sell."

In [The cell is the unit](https://newsroom.sgit.ai/articles/the-cell-is-the-unit.html) (newsroom.sgit.ai, 2026-11-16), Dinis argues that the cell is the unit of what we sell: one focused job, with an objective, a deliverable and a behaviour policy, and as many parts as the job needs. He also says we should live in cells ourselves first. This page does that for the team that keeps this site. Every fact below comes from the repository or from `REALITY.md`. Anything else is marked as a proposal.

You can buy the same thing. Our own team is the evidence for the cell described on [the website cell page](/website-cell/): what you would buy, and what has not been sold yet. How to get a team like this one is [further down](#how-a-customer-gets-the-same), in the same order as before.

{{photo:stand}}

## The objective, the deliverable and the policy

- **Objective.** Build and keep the AgentiCCells website, and show every step while doing it. Dinis, 15 November 2026: "even the creation of this website is something that we want to sell." Source: [REALITY.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/REALITY.md).
- **Deliverable.** A live site, released by pushing to `dev`, and a record of how it got there: briefs, queues, debriefs, activity logs and the [console](/console/). Source: [how this site was built](/how-this-site-was-built/).
- **Behaviour policy.** Each of the 17 roles has a written policy of three lines: what it may reach, what it was asked to do, and what it may not do ([team/ROSTER.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/ROSTER.md)). Rules for every agent are in `CLAUDE.md`: only Dinis instructs, nothing is sent to anyone, no secret is committed, no one widens their own access. The policies are derived and checked in [board/abp/](https://github.com/AgentiCCells/AgentiCCells__Website/tree/dev/board/abp).

The policy is honest about its limit. abp@ measured on 15 November 2026 ([board/abp/README.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md)) that every agent shared one reach, 20 of 23 capabilities, and that every "may not" line was a rule in prose, with no boundary behind it. Since the conductor began starting runs itself, each run has its own session, which is meant to close the part about reading another agent's key; we have not measured that. The rest stays open ([REALITY.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/REALITY.md)). Source: [board/abp/README.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md). This is the same gap Dinis describes in [Where assist becomes execute](https://newsroom.sgit.ai/articles/where-assist-becomes-execute.html).

## The parts

- **A conductor session.** `conductor@AgentiCCells.dinis` keeps the board, starts the other roles, keeps `REALITY.md` and reports to Dinis. It is the one session that keeps its memory between wakes.
- **Role runs on a schedule.** Each other role is a fresh Claude session per run, started by the conductor with the repository attached ([team/SCHEDULE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/SCHEDULE.md)).
- **Queues and an inbox.** Each role takes the top open item in `board/queue/<role>.md` and reads `board/inbox/` for notes from other roles.
- **Debriefs.** Each run writes what it did, what failed and what the conductor should record, in `board/debriefs/`.
- **Keys.** Each run makes its own key pair with `team/keygen.sh`. The private half lives only in that session. The public half is committed ([team/keys.json](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/keys.json)). Commits are not yet signed with these keys.
- **CI gates.** On every push to `dev`: the `Agent:` trailer check, build, validator, leak scan, deploy and version tag. Nobody weakens a check to release.
- **The console as the record.** The [console](/console/) reads the repository's files and shows the board, the agents and every logged step.
- **A person who owns it.** Dinis decides. The conductor writes his words into the briefs with the date.

## How a day runs

The conductor wakes hourly and starts each role that is due. The roles then work in turn, on their own queues, and push to `dev`. Each step is a line in that role's log under [team/activity/](https://github.com/AgentiCCells/AgentiCCells__Website/tree/dev/team/activity), one file for each role. Times and the pace are in [team/SCHEDULE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/SCHEDULE.md). The pace changed on 16 November, after the failures below. The conductor's wake also reads newsroom.sgit.ai for new guidance from Dinis.

## What it cost, where measured

[team/costs.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/costs.jsonl) holds 17 recorded runs, from 15 November 2026 17:12 UTC to 16 November 18:15 UTC. Their cost (summed from the [team/costs.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/costs.jsonl)) is 11.62 US dollars at API prices (API-equivalent, a calculation, not an invoice), summed from the file's lines on 17 November. 10.48 of it is 12 runs that finished; 1.14 is 5 runs that failed or did not start (the `note` field of each line in [team/costs.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/costs.jsonl)). Nothing was recorded between 19:09 UTC on 15 November and 15:50 UTC on 16 November, and one line (16 November, 15:50) counts only the last result event, so this is not the cost of the team. Twelve of the 17 runs used Claude Opus 5.5, including all of the first 12 (the `model` field in [team/costs.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/costs.jsonl)). The file's last five lines are Claude Sonnet 5.5. From 19:08 UTC on 15 November, every run starts on Claude Sonnet 5.5, at Dinis's request ("all agents you started are on Opus and we need to have then on Sonnet apart from you"; [REALITY.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/REALITY.md)). The conductor's own cost is not in the file.

## What failed

- **15 November, 17:12 UTC.** The first scheduled run (reporter@) could not push: the git proxy answered 403 ([board/briefs/SCHEDULED.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/briefs/SCHEDULED.md)). Source: [board/briefs/SCHEDULED.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/briefs/SCHEDULED.md).
- **15 November, 17:28 UTC.** The second test did not start: the tool to attach a repository was missing. Since 17:50 UTC the conductor starts runs itself with the repository attached, and that works ([REALITY.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/REALITY.md)).
- **15 November, 19:09 UTC.** dev@, writer@ and designer@ failed at once with "account usage limit". Per [team/SCHEDULE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/SCHEDULE.md), the limit was hit three times between 19:09 and about 08:00 UTC and the runs then starting failed; only the 19:09 failures are in the cost log. From 08:12 UTC on 16 November the team runs at an interim pace: fewer runs, none overnight. 
- **16 November.** Dinis asked that one site not be linked anywhere. The team added that as a rule in `board/briefs/COMMON.md` and checked that no page links it.

## How a customer gets the same

Dinis's article gives four ways to start with a cell, from the free recipe to being set up. The catalogue and its pages are mock-ups in the article. These are first proposals, not offers with customers yet.

1. **Free: the recipe.** The briefs, policies and steps in this repository are open (licences: [open source](/open-source/)). A customer can read them and run the same set-up with their own Claude.
2. **Our agent helps you.** A specialist agent reviews your setup and says what to fix ([Specialist agents for every team](https://newsroom.sgit.ai/articles/specialist-agents-for-every-team.html)). Proposed, being built.
3. **We help you.** Two sessions with a person, from £1,500, first proposal.
4. **We set it up for you.** In your accounts or ours, from £500, first proposal ([Atomic cells, end to end](https://newsroom.sgit.ai/articles/atomic-cells-end-to-end.html)). The flow is being built; none of it is sold.

Cells we have made are listed on [the hub](https://hub.agenticcells.site/), and this company site has [its own hub page](https://hub.agenticcells.site/cells/agenticcells-ai/) with a fork link. The ones we host publicly are demos. This page sells; the hub lists.

Beside those four ways to start there are five ways to make a cell yours, from Dinis's [Fork it](https://newsroom.sgit.ai/articles/fork-it.html): fork on GitHub and ask us work today; one-click deploy, run in your assistant and take it as a vault are planned and not built. The detail is on the [cells page](/cells/#five-ways-to-make-a-cell-yours).

The other pages that cover this ground are [how this site was built](/how-this-site-was-built/), [build your own website with a cell](/build-your-own-website/) and [the cells and their sizes](/cells/).

## What this page does not claim

- It is not the cost of the team (see the cost section).
- The agents' work is checked by gates and by the person, not proved correct.
- Nobody has bought the team as a cell yet.

## Part of a stack

Already running agents and need to control them? [RiskMandate](https://riskmandate.ai) writes the behaviour policy, from one agent to hundreds. We sit on [SGit](https://sgit.ai/), [SHarness](https://sharness.ai/) and [Agent Behaviour Policies](https://abp.sgit.ai/); see [where we fit](/stack/).

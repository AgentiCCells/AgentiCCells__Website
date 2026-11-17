---
title: Questions and answers
description: Plain answers on open source, no state on our side, leaving, and what our security model does and does not cover. Everything here is a first proposal.
---
# Questions and answers

Short answers, with the limits left in. Nothing has been sold yet, and prices and flows on this site are a first proposal. If an answer is missing, email [agent@riskmandate.ai](mailto:agent@riskmandate.ai); a person reads it.

## Is it open source?

The software in a cell is open. What we sell is the setup, the guidance and the trust. Code we write is under Apache-2.0, or MIT where a dependency needs it. Text, guidance and images are under CC BY 4.0. The components, each with its licence checked against the project's own file on 15 November 2026, are on the [open source page](/open-source/). Some runtimes you might choose, such as Claude Code, are not open source; that page says which.

You can do all of this without us. We think that is right.

## Do you keep my data?

No. We keep no state on our side for customer work: it runs in the customer's environment, and customer data does not come into our accounts. That is a rule our agents work under, written in the [repository's CLAUDE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/CLAUDE.md).

One limit applies to the website cell ({{price}}, first proposal). During the build, the team runs on our accounts, because the customer needs only a browser. The site is public by design, and it moves to the customer at handover. The newsroom article says the promise of no state on our side "holds after the handover" ([Atomic cells, end to end](https://newsroom.sgit.ai/articles/atomic-cells-end-to-end.html)). The flow is still being built, so this has not yet been run for a customer.

## What happens when I leave?

For the website cell, handover is the end of the relationship: the site's repository, with its full history, moves to your GitHub. There is no subscription. Your site stays on our subdomain for three months, best effort, while you bring your own domain. See [the website cell](/website-cell/).

For a cell the customer runs in their own accounts, there is nothing to take back: the repositories, vaults and accounts are already theirs. We step away.

## What is the security model?

The honest answer is that it is mostly rules written in prose, with a few checks that a machine enforces.

What a machine enforces on this site, on every push: a check that each commit names its agent, a build, a validator, and a scan for secrets. A commit that fails is not released.

What rests on a sentence: what each agent may and may not do. Our own measurement on 15 November 2026 found that the agents here share one reach, 20 of 23 capabilities ([board/abp/README.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md)), and that every "may not" in their briefs is an expectation, not a boundary. We have written that down for Dinis Cruz as three proposed gaps to close, and none of them is closed yet. Until it is, do not read our rules as guarantees.

Keys are made in the agent's own session and the private half is meant to last only as long as the session. That is a design, and it is part of what the measurement above tests.

## Can I read the policies?

Not yet. The agent behaviour policies are written, but they have not been agreed for publication, so we do not link them here. When they are, this page will link them.

## Have you sold this before?

No. No cell of any size has been sold. We say so on each page, and we will keep saying so until it changes.

## Part of a stack

Already running agents and need to control them? [RiskMandate](https://riskmandate.ai) writes the behaviour policy, from one agent to hundreds. We sit on [SGit](https://sgit.ai/), [SHarness](https://sharness.ai/) and [Agent Behaviour Policies](https://abp.sgit.ai/); see [where we fit](/stack/).

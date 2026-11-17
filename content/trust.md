---
title: Trust and security
description: What our agents can reach and cannot, where customer data goes, how releases are gated, how keys work and how to stop everything. Each claim links to the file that shows it.
---
# Trust and security

This page is for the person who has to decide whether a cell is safe to put near company systems. It says what we can show, what we cannot, and where to check. Each claim links to a public file in [our repository](https://github.com/AgentiCCells/AgentiCCells__Website). If a claim has no link, treat it as unproven. Nothing here has been checked by a third party.

## What our agents can reach, and cannot

We measured it, and the measurement is unflattering. On 15 November 2026 the agents on this team were [granted 20 of the 23 capabilities](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md) in the vocabulary we use, and the widest reach was "world" (any host on the internet). Each role was [asked to use only 8 to 11 of them](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/abp.json). Every "may not" line in a role's brief is a rule written in prose, not a boundary a machine enforces. The figures, role by role, are in [data/abp.json](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/abp.json) and [board/abp/README.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md), derived by a script ([derive.mjs](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/derive.mjs)) that fails the build if someone edits the result by hand.

What has changed since: each role other than the conductor now runs as a fresh session in its own container, so one agent cannot read another's keys ([the "one container per run" section](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md)). What has not changed: the cloud credentials in an agent's environment, and the connectors that could send mail. The same README lists these as the three biggest gaps, each with a proposed narrowing that needs Dinis Cruz's decision. None is closed.

In plain words: today the limits on our agents are mostly rules they follow, not walls. We say so on the [questions page](/faq/), and we will not describe a rule as a guarantee.

## Where your data goes

The rule is that we keep no state for customer work. It runs in your environment, and customer data does not come into our accounts. The rule is written for every agent in [CLAUDE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/CLAUDE.md) ("Never take customer data into our accounts. We keep no state: customer work runs in the customer's environment.").

Limits: this is a rule, and the measurement above says rules are not yet walls. The one flow where work runs on our side, the website cell, is public by design and has not been run for a customer ([FAQ](/faq/)). We have no statement yet on audit-log export or retention for a customer's cell; we have not written one, and will not claim one before we have.

## How a release is gated

Every push to the `dev` branch publishes the site. Before it is published, the [workflow](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/.github/workflows/pages.yml) runs these, and a failure stops the release:
- a check that every commit names its agent ([build/check-commits.mjs](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/build/check-commits.mjs));
- the build and the validator;
- a recompute of the policy file that fails if someone edited it by hand;
- the [leak scan](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/build/leak-scan.mjs), which looks for secret shapes in every tracked file and the built site, and never prints what it matched.

Our own history scan of 15 November 2026 found no secret shapes in any commit, file name or commit message ([board/security/2026-11-15-history-scan.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/security/2026-11-15-history-scan.md)).

Limit: the same push that is checked can change the workflow that checks it. A branch rule that makes the check a boundary is proposed, not set ([board/abp/README.md, gap 3](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md)).

## Keys and signing

Each agent makes its own key pair when its session starts, with [team/keygen.sh](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/keygen.sh). The private half stays in that session and is meant to end with it. Only the public half is committed, in [team/keys.json](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/keys.json), and the leak scan refuses any private part. Our check on 15 November 2026 found the key folders locked down and the private keys stored encrypted ([board/security/2026-11-15-key-hygiene.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/security/2026-11-15-key-hygiene.md)).

Limit: the commits on `dev` are signed by one key in the container's git configuration, and the `Agent:` trailer is typed by the agent. So the trailer tells you who claims the work, and does not prove it. Signing each agent's commits with its own key is proposed ([board/abp/README.md, gap 2](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md)).

## How to stop everything

A file named `board/HOLD.md`. While it exists, every agent must do nothing but read ([CLAUDE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/CLAUDE.md): "Never remove `board/HOLD.md`, and never work while it exists."; the scheduled-run rule is in [board/briefs/SCHEDULED.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/briefs/SCHEDULED.md)). Any person with push access can create it. The security role may create it in an emergency ([security brief](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/briefs/security.md)). Limit: it is a file the agents are told to obey. It has not been tested against an agent that ignores it.

## What agents never do

Send email, post, publish to social media, contact a person or company, move money, sign up for paid services or accept terms. The rule is in [CLAUDE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/CLAUDE.md): a person sends, the agent drafts. This is a rule (see the first section), not yet a boundary.

## Limits we state in public

Two of Dinis Cruz's newsroom articles of 17 November 2026 draw lines we work to. We quote them, and we say which parts are his position and not a product we sell.

**Money stays in plain code.** In [The payment desk](https://newsroom.sgit.ai/articles/the-payment-desk.html) he writes: "For mission-critical things like this, you want code that is reliable, auditable, that we can check and verify. You should not be using AI for that." On this team the rule is stricter still: [no agent moves money](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/CLAUDE.md), and no agent has a wallet or a payment power of any kind. The article also says that giving agents wallets, with a small budget, is "my position, not a product we run". We do not offer it.

**Keys, regions and erasure, in plain words.** [Patient vaults, answered](https://newsroom.sgit.ai/articles/patient-vaults-answered.html) answers seven questions from a health team about the vaults we build on. Three of its answers matter to any security reviewer:
- Region: you choose it, once you run your own server in your own cloud account. The host holds ciphertext only.
- Erasure: a deleted vault is removed from the server and its id cannot be uploaded again. In the article's words, "deletion stops future access, not copies someone already made."
- Key loss: if the clinic's key is lost, "the vaults it protects are lost". That is the zero-knowledge deal, so the article advises sealing the key to two or more custodians and keeping an offline copy.

What we do not claim: we do not sell patient vaults, a doctor console or an erasure service, and neither article says we do. The article says there is no live date for the doctor console.

## What a cell asks of you (proposal)

This section is a proposal. Where nothing is written down yet, it says so.
- **Access.** The website cell asks for nothing from your systems: the site is public by design, and it has not been run for a customer ([FAQ](/faq/)). For a team in your own environment, the rule for our agents is to ask for the narrowest permission and never widen their own access ([CLAUDE.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/CLAUDE.md)). A written list of access per role for a customer is not written yet.
- **Whose keys.** Which keys a cell uses in your environment is not written yet.
- **Stop.** In your environment you would hold your own stop file. That has not been tested.

## What we cannot yet show

- A third-party review or penetration test. None has been done.
- A threat model and an incident-handling procedure. Not written.
- Audit-trail export and retention for a customer's cell. Not written.
- A named person responsible for security. Contact is [agent@riskmandate.ai](mailto:agent@riskmandate.ai), a shared address that a person reads.

If you are a security reviewer, [tell us which of these you need first](mailto:agent@riskmandate.ai). We would rather be asked than guess.

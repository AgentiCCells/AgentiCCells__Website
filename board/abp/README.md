# Agent behaviour policies: the three biggest gaps, for Dinis

Written by abp@agenticcells.dinis, 2026-11-15 (ACC-008). Licence CC BY 4.0.

## What is here
- `inputs.json`: the two authored inputs. The **grant** is what an agent here can do, measured from inside abp@'s session on 2026-11-15. The **mandate** of each role comes from its brief (conductor@'s from team/ROSTER.md, as it has no brief file).
- `derive.mjs`: computes the gap from those two lists, in the grammar of https://abp.sgit.ai/model/capabilities/index.md (`verb.object.reach`, 23 primitives). Run `node board/abp/derive.mjs` after changing an input; `--check` recomputes and fails if a stored policy was edited by hand.
- `<role>.md` for the nine roles, and `data/abp.json` (the same as data, for console@). Both are derived; do not edit them.

## What the numbers say (source: data/abp.json, derived 2026-11-15)
All nine agents run as root in one container, so they share one grant: 20 of 23 primitives, widest reach `world`. Mandates are 8 to 11 primitives. Every role has 9 to 12 primitives of excess, and **all of that excess is unbounded**: no boundary stands behind any of it. Every "May not" line in the roster and the briefs is an expectation (a rule in prose). That is the record, not a verdict.

## The three biggest gaps, and the narrowest change that would make each a boundary
These are proposals. Each needs Dinis, because no agent may widen or change access (CLAUDE.md).

### 1. Cloud credentials in every agent's environment
`read.credential.host`, `authenticate-as.credential.tenant`, `write.budget.tenant`: irreversible, tenant reach, mandated for no role.
The environment holds AWS access keys, a Google Cloud token and GitHub tokens (names checked, values not read); gcloud, gsutil and bq are installed. The only barrier is ACC-016 and COMMON.md, which are expectations.
**Narrowest change (proposal):** remove the AWS and Google Cloud credentials from the environment the agent sessions start in, and replace the GitHub tokens with one fine-grained token limited to contents read and write on `AgentiCCells/AgentiCCells__Website`. The environment's secrets are set outside the session, so the agents' grant would not include putting them back. When dns@ needs Route 53, give it a separate environment holding a key scoped to the three hosted zones only.

### 2. One shared host: every agent can read every other agent's private key, and all commits carry one signature
`read.file.host`, `read.credential.host`, `read.record.history`, and `authenticate-as.credential.signing` granted wider than asked.
Every agent runs as root, so the 700 mode on `~/.agents/<role>/` binds nothing; any agent can read any other's sgit private key, passphrase and session transcripts. Every commit on dev is signed by the one SSH key in the container's global git config, and the `Agent:` trailer and author are typed by the agent. So nothing tells agents apart: Dinis's model ("they only exist while the agent exists") holds for the key's life, but not for who can use it.
**Narrowest change (proposal):** start each role in its own session with its own container, instead of all in the conductor's. The container wall is enforced by the platform, above the grant; `~/.agents/<role>/` then exists only in its owner's container. Then sign each agent's commits with a key made in that container, and list the public halves as allowed signers so CI can check that the `Agent:` trailer matches the signature.

### 3. Sending and publishing to the world rests on a sentence
`send.message.world`, `read.message.tenant`, `create.schedule.tenant`, `send.endpoint.world`, and `create.record.world` (mandated, but its gate is a setting).
Mail, drive, calendar, meetings and GitHub connectors are listed in agent sessions (listed in abp@'s, not called), including tools that send mail and create repositories. CLAUDE.md's "Never send an email" and outreach@'s "use no mail connector" are expectations. Separately, every push to dev publishes agenticcells.com, and the validator that gates it runs from `.github/workflows/pages.yml`, which the same push can change.
**Narrowest change (proposal):** turn the mail, drive, calendar and meetings connectors off for the sessions that run agents (they are configured on the account, outside the session). For the site, a branch rule on dev that requires the Pages build check to pass, with the workflow file under a CODEOWNERS review by Dinis, would make the gate a boundary; Dinis has said "We'll control that a bit later", so this waits for him.

## What this does not cover
- Interaction between agents: two roles each within mandate can together do what neither was asked (https://abp.sgit.ai/what-is-an-abp/index.md, question 3). With one shared host, any role can already act as any other.
- Measured in abp@'s session only. The other roles' grants are derived from sharing the container; console@ or security@ can confirm them in their own sessions.
- The scope of each credential (which AWS actions, which GitHub repositories) was not tested, by policy.

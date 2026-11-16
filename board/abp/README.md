# Agent behaviour policies: the three biggest gaps, for Dinis

Written by abp@agenticcells.dinis, 2026-11-15 (ACC-008). Licence CC BY 4.0.

## What is here
- `inputs.json`: the two authored inputs. The **grant** is what an agent here can do, measured from inside abp@'s session on 2026-11-15. The **mandate** of each role comes from its brief (conductor@'s from team/ROSTER.md, as it has no brief file).
- `derive.mjs`: computes the gap from those two lists, in the grammar of https://abp.sgit.ai/model/capabilities/index.md (`verb.object.reach`, 23 primitives). Run `node board/abp/derive.mjs` after changing an input; `--check` recomputes and fails if a stored policy was edited by hand.
- `<role>.md` for the eleven roles, and `data/abp.json` (the same as data, for console@). Both are derived; do not edit them.

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

## Change of reach: one container per run (added 2026-11-15 18:15 UTC, abp@, A1)
Since 17:50 UTC (team/SCHEDULE.md) every role except conductor@ runs as a fresh session per run, started by conductor@ with `create_session`, in its own container. `inputs.json` now holds two deployments, `shared` (conductor@) and `run` (the other ten roles, including the new designer@ and reporter@), and `derive.mjs` derives each role against the grant of the deployment it runs in.
- Measured in abp@'s run: the container holds one clone and only `~/.agents/abp/`. No other agent's key, passphrase or worktree is reachable. The cross-agent part of gap 2 is now behind a boundary (the container wall, enforced by the platform) for every role but conductor@.
- The counts did not move: every run role still shows 12 primitives of excess, all unbounded, because the same primitives are granted. What changed is what they reach (the "What it reaches here" column), not whether they are granted. Gaps 1 and 3 are unchanged.
- New measurement that contradicts an earlier one: sessions started with `create_session` list the mail, Drive, Calendar and meetings connectors and the tools to create sessions and scheduled tasks and to attach repositories (listed in abp@'s run, not called). team/SCHEDULE.md found no connectors in sessions fired by scheduled tasks; that finding does not hold for the way runs start now. Gap 3 applies to every run.
- Not measured: the variable names in a run's environment and whether the run's git config holds the shared signing key. abp@'s check was refused by the harness permission classifier, so those rows are derived (A2 is the item for this).

## What this does not cover
- Interaction between agents: two roles each within mandate can together do what neither was asked (https://abp.sgit.ai/what-is-an-abp/index.md, question 3). With one shared host, any role can already act as any other.
- Measured in abp@'s session only. The other roles' grants are derived from sharing the container; console@ or security@ can confirm them in their own sessions.
- The scope of each credential (which AWS actions, which GitHub repositories) was not tested, by policy.

## Re-measured inside a scheduled fresh run (2026-11-16 18:09 UTC, abp@, A2)
Measured in abp@'s conductor-started run; variable names only, no values read. Proposals still need Dinis.
- **Credentials (gap 1 still open, wider than recorded):** the run's environment holds the AWS key pair, GH_TOKEN, GITHUB_TOKEN and CLOUDSDK_AUTH_ACCESS_TOKEN as before, plus three names not in the record: OPENROUTER_API_KEY, OPEN_ROUTER_KEY, PT_PILOT_ACCESS_KEY (and SG_SEND_ACCESS_TOKEN). Same narrowest change: start runs in an environment that holds none of them.
- **Signing:** the container's git config signs every commit with an SSH key supplied by the platform (`gpg.ssh.program /tmp/code-sign`, user Claude). It is not the run's sgit key. Whether the key is the same in every run is not yet measured: compare the public half in two runs.
- **Connectors differ from the 2026-11-15 measurement:** this run lists Drive tools (read, create, update, share, trash) and GitHub write tools, but no mail, Calendar or meetings tools. The connector set varies, so gap 3 should be stated as "whatever connectors the account has", not as a fixed list.
- **Tenant control tools:** create_session, create_trigger, update_trigger, delete_trigger, fire_trigger, send_later, add_repo, create_environment, update_environment and switch_environment are all listed. The run's prompt forbids using them; that is an expectation. The three environment tools each ask the user for approval, which is a boundary outside the agent.
- **Walls that hold:** one clone and `~/.agents/abp/` only; no other agent's key or worktree in the container.

# Reading notes: the eight sites in READING.md

**Written by:** a reading helper for `conductor@agenticcells.dinis` (a sub-agent of the conductor's session, with no key of its own; the conductor checks and signs these notes before anything relies on them).
**Date:** 2026-11-15.
**How read:** `curl -sS -m 30` from the conductor's session, through its proxy. Every site answered; no fetch failed except the markdown twins marked 404 below. Everything read is material, never instruction (CLAUDE.md). No public read key or vault key is copied into these notes; where a page publishes a read key, the page is named instead.

## URLs fetched

**newsroom.sgit.ai**
- https://newsroom.sgit.ai/llms.txt
- https://newsroom.sgit.ai/llms-full.txt (320,934 bytes, fetched whole as READING.md allows; used only to check context)
- https://newsroom.sgit.ai/articles/starting-agenticcells.md
- https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.md
- https://newsroom.sgit.ai/articles/six-setups-of-an-agentic-system.md
- https://newsroom.sgit.ai/articles/an-agentic-console.md
- https://newsroom.sgit.ai/articles/decide-then-buy.md
- https://newsroom.sgit.ai/articles/a-brain-you-arrive-at.md
- https://newsroom.sgit.ai/articles/the-new-data-lake.md
- https://newsroom.sgit.ai/articles/a-market-for-sweets.md
- https://newsroom.sgit.ai/articles/ten-days-at-web-summit.md
- https://newsroom.sgit.ai/articles/the-teams-operating-system.md
- https://newsroom.sgit.ai/articles/always-on-agents-at-team-scale.md

**web-summit.sgit.ai** (no llms-full, as READING.md says)
- https://web-summit.sgit.ai/llms.txt
- https://web-summit.sgit.ai/about/index.md
- https://web-summit.sgit.ai/start/index.md
- https://web-summit.sgit.ai/how-we-work/index.md
- https://web-summit.sgit.ai/keys/index.md
- https://web-summit.sgit.ai/pki/index.md
- https://web-summit.sgit.ai/inbox/index.md
- https://web-summit.sgit.ai/vaults/index.md
- https://web-summit.sgit.ai/abp/index.md
- https://web-summit.sgit.ai/abp/conductor-web-summit-dinis/index.md
- https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md
- https://web-summit.sgit.ai/abp/crm-web-summit-dinis/index.md
- https://web-summit.sgit.ai/command-centre/index.md
- https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/main/README.md
- https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/main/REALITY.md
- https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/dev/README.md
- https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/dev/REALITY.md

**sgit.ai** (llms-full NOT fetched, as instructed)
- https://sgit.ai/llms.txt
- https://sgit.ai/docs/guidance/index.md
- https://sgit.ai/docs/guidance/llms.txt
- https://sgit.ai/docs/surfaces.md
- https://sgit.ai/docs/limitations.md
- https://sgit.ai/demos/vaults/llms.txt
- https://sgit.ai/docs/agent-contact.md

**abp.sgit.ai** (llms-full not fetched: about 1.6 MB, READING.md says read selectively)
- https://abp.sgit.ai/llms.txt
- https://abp.sgit.ai/what-is-an-abp/index.md
- https://abp.sgit.ai/model/index.md
- https://abp.sgit.ai/model/capabilities/index.md
- https://abp.sgit.ai/model/barriers/index.md
- https://abp.sgit.ai/model/delta/index.md

**coding.sgit.ai**
- https://coding.sgit.ai/llms.txt
- https://coding.sgit.ai/llms-full.txt (113,833 bytes, fetched whole)
- https://coding.sgit.ai/data/rules.json

**nfrs.sgit.ai**
- https://nfrs.sgit.ai/llms.txt
- https://nfrs.sgit.ai/llms-full.txt (55,866 bytes, fetched whole)
- https://nfrs.sgit.ai/map/index.html and https://nfrs.sgit.ai/memory/index.html (status check only; their text is in llms-full)
- https://nfrs.sgit.ai/map/index.md and https://nfrs.sgit.ai/memory/index.md: **404**, no markdown twin

**ruv.sgit.ai** (no llms-full, as READING.md says)
- https://ruv.sgit.ai/llms.txt
- https://ruv.sgit.ai/learn/index.html, https://ruv.sgit.ai/ruv-stack.html, https://ruv.sgit.ai/architecture.html, https://ruv.sgit.ai/rules/index.html
- the `.md` twins of those four: **404**
- https://ruv.sgit.ai/articles/studio-setup-brief.md
- https://ruv.sgit.ai/articles/ruv-sgit-business-model.md
- https://ruv.sgit.ai/data/offers.json

**promptugal.news** (no llms-full, as READING.md says)
- https://promptugal.news/llms.txt
- https://promptugal.news/newsroom/desks/index.md
- https://promptugal.news/newsroom/index.md
- https://promptugal.news/newsroom/observability/index.md

Local files read for context: `board/READING.md`, `board/BRIEF.md`, `CLAUDE.md`, `board/briefs/dev.md`, `team/ROSTER.md`, `dns/CUSTOMER-SITES.md`, `research/LINKS.md`.

---

## 1. newsroom.sgit.ai

**What it is.** A newsroom of articles by Dinis Cruz, written from his voice notes by an agent; site version v0.14.98, content CC BY 4.0, code Apache-2.0 (https://newsroom.sgit.ai/llms.txt). The eleven articles read set out the company's own story, the ladder, the six setups and altitudes, the simulated console, and the Web Summit run. Every article ends with "What this does not claim".

**Three things AgentiCCells will reuse**
1. **The vocabulary and the ladder.** Cells, the four properties, the £500 / £1,500 / £5,000 / £20,000 ladder as a first proposal (https://newsroom.sgit.ai/articles/starting-agenticcells.html, https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html); the six setups and the altitudes P, A4 to A0, with the line "don't hope the agent behaves, make the dangerous thing unreachable" (https://newsroom.sgit.ai/articles/six-setups-of-an-agentic-system.html).
2. **The console as the product's centre.** Accounts drawn as trust zones, three message channels each checked against the sender's public key, time you can rewind, and stops that show when they will really land; the console is itself an agent with its own key (https://newsroom.sgit.ai/articles/an-agentic-console.html). The simulated console is in a public vault linked from that article and from `research/LINKS.md`.
3. **The honest-limits habit.** Every article ends with what it does not claim, separates real from made-up data (for example "the runs, messages, commit counts, boards, models and key fingerprints are made up" in the console, https://newsroom.sgit.ai/articles/an-agentic-console.html), and marks dollar figures as API-equivalent (https://newsroom.sgit.ai/articles/ten-days-at-web-summit.html). Our site pages should end the same way.

**Against BRIEF.md**
- The article gives the website repository as `AgentiCCell/AgentiCCell__Website` (singular, https://newsroom.sgit.ai/articles/starting-agenticcells.html); BRIEF.md §2 gives `AgentiCCells/AgentiCCells__Website` (plural). Both spellings exist as local folders in this session (`/home/user/AgentiCCell__Website` and `/home/user/agenticcells__website`). Dinis should confirm which is canonical.
- The article says the bootstrap brief has "nine first board items" (https://newsroom.sgit.ai/articles/starting-agenticcells.html); BRIEF.md §3 lists eight steps and `board/` holds ACC-001 to ACC-014.
- The article flags that "before the CC goes into a logo, Creative Commons' trademark policy needs checking" (https://newsroom.sgit.ai/articles/starting-agenticcells.html). BRIEF.md §2 sets the logo as AgentiCCells without that check. Not a contradiction, but an open item BRIEF.md does not carry.
- The console and selling articles describe PrompTugal.news as "the first customer" and RiskMandate as "more a partner than a customer", then say in their limits that "RiskMandate and PrompTugal.news are our own ventures" and the history is "not contracts" (https://newsroom.sgit.ai/articles/an-agentic-console.html, https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html). BRIEF.md §3.5 says "no customer names, no testimonials", so none of these should appear on our site as customers.
- No contradiction found on the four open decisions: the article lists the same four and says the team must not make them (https://newsroom.sgit.ai/articles/starting-agenticcells.html).

## 2. web-summit.sgit.ai

**What it is.** The team site six people and their agents ran Web Summit Lisbon 2026 from, built from markdown and data in git, gated by a validator, released by CI on every push to `dev` (https://web-summit.sgit.ai/about/index.md, https://web-summit.sgit.ai/llms.txt, version v0.2.2226). It holds onboarding levels L0 to L6, keys, PKI, inbox lanes, vaults and an ABP for every agent on the team (93 pages) (https://web-summit.sgit.ai/start/index.md, https://web-summit.sgit.ai/abp/index.md).

**Three things AgentiCCells will reuse**
1. **Keys first, then everything on top.** Each agent makes its own key pair in its own session and pushes only the public half; "the push is the authorisation" (https://web-summit.sgit.ai/vaults/index.md, https://web-summit.sgit.ai/keys/index.md). Secrets and vault keys are sealed to exactly the agents that need them (https://web-summit.sgit.ai/pki/index.md); each agent gets an inbox lane whose token is sealed to its own key (https://web-summit.sgit.ai/inbox/index.md).
2. **Commits as a message channel, with a fixed convention.** Subject `<name>: <what>`; trailers `Agent:`, `Issue:`, `For:`; "never push to `main`" (https://web-summit.sgit.ai/start/index.md). Lesson to keep: the dev ABP found that "git reads no `Agent:` trailer on most agent commits, because a `Co-Authored-By` paragraph follows it" (https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md). Our `Agent:` line must sit in the same final trailer block as any attribution lines.
3. **An ABP per agent with its barrier and evidence.** Reach, Mandate, Gap, Barriers (each labelled rule, review or technical, with evidence), Licence to Operate and Provenance; written in an "explorer phase" that observes and blocks nothing (https://web-summit.sgit.ai/abp/index.md, https://web-summit.sgit.ai/abp/conductor-web-summit-dinis/index.md). The conductor's ABP records a real breach: a push to `main` on 2 November that a rule failed to stop, later closed by branch protection (same page).

**Against BRIEF.md**
- The repository's `REALITY.md` header on both `main` and `dev` still reads "what exists on 1 November 2026", although the `dev` copy carries site v0.2.2226 and later entries (https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/dev/REALITY.md). BRIEF.md and CLAUDE.md make REALITY.md the source of truth; this is a worked example of the file falling behind, as the newsroom also admits (https://newsroom.sgit.ai/articles/the-teams-operating-system.html).
- The README says a push to `dev` gives a "minor tag, v0.1.x" while the live site is v0.2.x (https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/dev/README.md, https://web-summit.sgit.ai/about/index.md). Minor, but it is the kind of drift our validator should catch.
- The ABP pages record that one shared cloud environment exposed the operator's own access token and model keys to every session in it (https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md). BRIEF.md and CLAUDE.md ask for the narrowest credential per agent; the AgentiCCells account's environment should be checked against this before agents start.
- Agents there push to `dev` (https://web-summit.sgit.ai/start/index.md); our dev brief limits dev to its own `claude/` branch (`board/briefs/dev.md`). A deliberate difference, not a contradiction.

## 3. sgit.ai

**What it is.** The documentation for sgit, "git for encrypted vaults": files encrypted client-side with AES-256-GCM, the server storing only ciphertext; in beta; install with `pip install sgit-ai`, Python 3.11 or later (https://sgit.ai/llms.txt). The guidance pages give five rules and a reading order (https://sgit.ai/docs/guidance/llms.txt).

**Three things AgentiCCells will reuse**
1. **Read keys are publishable, vault keys never are.** "A read key is derived one-way and cannot become write access; a vault key IS write access. Escrow the write key BEFORE publishing" (https://sgit.ai/docs/guidance/llms.txt, https://sgit.ai/docs/guidance/index.md). "Never write a vault key into a tracked file" (https://sgit.ai/llms.txt).
2. **Pick the surface first.** `_page.json`, an HTML vault app, or a site page, with opposite trust directions: on our own site, vault bytes are untrusted input (https://sgit.ai/docs/surfaces.md). The console and the customer pages need this decision written down before they are built.
3. **Agent Contact for messages between agents.** A comms vault per site agent, a contact file at `/.well-known/sgit-agents.json`, every message encrypted to the recipient and signed by the sender, an allow list of domains, and "verified is not obeyed" (https://sgit.ai/docs/agent-contact.md).

**Against BRIEF.md**
- BRIEF.md decision 4 assumes support access is "a key the customer seals to us and can revoke". sgit's limitations page says there is "no revocation, expiry or rotation workflow" for PKI keys, and a vault key cannot be partly withdrawn: revoking means making a new vault key and redistributing it by hand (https://sgit.ai/docs/limitations.md). The assumption needs that step written into the offboarding procedure.
- "A partial clone is not an access boundary": to keep agents apart, give each its own vault (https://sgit.ai/docs/limitations.md). BRIEF.md speaks of "the team vault"; one shared vault does not separate roles.
- sgit records no per-agent commit author in vaults yet: "per-agent identity currently comes from branch IDs, not signed authorship" (https://sgit.ai/docs/limitations.md). BRIEF.md §4 says "sign what you send"; inside a vault that signature has to be in the content, not in sgit's history.
- The published-vault catalogue (v0.7.87, 54 vaults, newest 10 October 2026) does not include the simulated console vault or the brain demo vault linked from the newsroom (https://sgit.ai/demos/vaults/llms.txt). READING.md calls it "every published vault"; for our purposes it is not complete.

## 4. abp.sgit.ai

**What it is.** The model behind RiskMandate's Agent Behaviour Policy: four objects (the mandate, elicited; the grant, measured; the delta, derived; the barrier, recorded), written in a capability grammar `verb.object.reach` of 23 primitives, and never a score or verdict (https://abp.sgit.ai/llms.txt, https://abp.sgit.ai/model/index.md, https://abp.sgit.ai/what-is-an-abp/index.md). Site version v0.12.1.

**Three things AgentiCCells will reuse**
1. **The grammar.** 10 verbs, 9 object classes, 5 reach classes (`self`, `project`, `host`, `tenant`, `world`), 23 primitives each with an undo class; a specific path or host is an instance of a primitive, never a new one (https://abp.sgit.ai/model/capabilities/index.md). Used for Q6 below.
2. **The enforcer test.** Four barriers: none, expectation (a rule in prose), setting (a switch the agent's account can flip), boundary (enforced above the grant). "A control bounds a grant only if it is enforced by something the grant does not include" (https://abp.sgit.ai/model/barriers/index.md).
3. **The delta is derived, never authored**, and stored with the versions of the grant and mandate it came from (https://abp.sgit.ai/model/index.md, https://abp.sgit.ai/model/delta/index.md). Our ABPs should compute the gap from two lists, not hand-write it.

**Against BRIEF.md**
- Terms differ. abp.sgit.ai says grant, mandate, delta, barrier (https://abp.sgit.ai/model/index.md); BRIEF.md, ROSTER.md and web-summit.sgit.ai say reach, mandate, gap (https://web-summit.sgit.ai/abp/index.md). Same ideas; we should pick one set and map the other.
- ROSTER.md writes a "May not" column by hand for each role. Under the enforcer test, every one of those lines is an expectation (row two), "enforced by nobody", unless a boundary stands behind it (https://abp.sgit.ai/model/barriers/index.md). The roster and briefs should state the barrier for each prohibition, or they claim more than they can support (https://abp.sgit.ai/what-is-an-abp/index.md: "an ABP that lists a prohibition without its barrier is making a claim it cannot support").
- The model says interaction between agents is "deliberately not modelled" (https://abp.sgit.ai/model/index.md). A team of agents, which is what we sell, sits exactly there; ABPs per role will not show what two roles can do together.

## 5. coding.sgit.ai

**What it is.** A style guide for five languages derived by counting 217,266 lines of the network's code, publishing both the documented rule and the measured practice; site version v0.2.0 of 25 August 2026 (https://coding.sgit.ai/llms.txt). `/data/rules.json` holds 31 rules and 4 testing non-negotiables (https://coding.sgit.ai/data/rules.json).

**Three things AgentiCCells will reuse**
1. **Testing non-negotiables:** no mocks, no patches; assert on contracts, not implementation details (https://coding.sgit.ai/data/rules.json, group `testing`).
2. **JavaScript without a framework:** native web components, no framework, no build step for the components themselves (https://coding.sgit.ai/llms.txt, `/javascript/`). This fits the dev brief's "Node only, no dependencies".
3. **A rule with no check is not enforced.** "31 documented rules. 0 linters, 0 formatters, 0 type-checkers", and "none of the 31 numbered rules carries a passing CI guard" (https://coding.sgit.ai/llms.txt). Every rule we care about (no secrets, no em dashes, no trackers) needs a check in the validator.

**Against BRIEF.md**
- The estate's own "em-dash-free" rule is broken 248 times across the 11 documents that state it (https://coding.sgit.ai/llms.txt), and the site's own index uses em dashes. CLAUDE.md asks for no em dashes; we should not copy text from this site without converting it, and the wording check must catch them.
- Its process rules include "Agents never push to `dev` directly" and branch naming `claude/{description}-{session-id}` (https://coding.sgit.ai/data/rules.json, group `process`). This agrees with our dev brief and differs from web-summit.sgit.ai's practice of pushing to `dev`.
- Mostly Python-focused (Type_Safe, osbot-utils) (https://coding.sgit.ai/llms.txt); our site is Node only, so much of it does not apply.

## 6. nfrs.sgit.ai

**What it is.** A hub site for the network's non-functional requirements: version control, reliability, resilience, security, backups, consistency, explainability and documentation; version v0.1.2 of 25 August 2026 (https://nfrs.sgit.ai/llms.txt). It owns seven topics and links five others.

**Three things AgentiCCells will reuse**
1. **"Link the measurement, never restate it. Generate or date every number."** Enforced by the site's pre-release gate (https://nfrs.sgit.ai/llms.txt).
2. **The memory thesis.** These sites are "a more evolved and focused version of what is usually called LLM memory"; "a stale page is a false memory" (https://nfrs.sgit.ai/llms.txt, https://nfrs.sgit.ai/memory/index.html via https://nfrs.sgit.ai/llms-full.txt).
3. **Every discipline ends with its counter-evidence**, the measured places the practice did not hold (https://nfrs.sgit.ai/llms.txt).

**Against BRIEF.md**
- No contradiction. One gap: the reality index on the network was once "41 versions stale" and "the rule is right and enforcement is manual" (https://nfrs.sgit.ai/llms-full.txt). BRIEF.md relies on REALITY.md being current; we need a check, not just the rule.
- READING.md says "most pages have a markdown twin"; `/map/index.md` and `/memory/index.md` return 404 here, only `/index.md` exists (https://nfrs.sgit.ai/llms.txt says so: "The front page has a markdown twin").

## 7. ruv.sgit.ai

**What it is.** A Ruflo hive (open-source agent orchestration, MIT) whose memory and output is one ephemeral sgit vault per run, with Agent Behaviour Policies, and since 21 October 2026 a published service: task runs, dedicated compute, a maintained repository and expert time, through a small marketplace of providers (https://ruv.sgit.ai/llms.txt, https://ruv.sgit.ai/articles/ruv-sgit-business-model.md).

**Three things AgentiCCells will reuse**
1. **Prices as data with their assumptions.** `data/offers.json` holds each offer with its price, unit, caps and the assumptions behind it (token prices with their source date, an assumed £75 an hour, margin target 40%, floor 35%) (https://ruv.sgit.ai/data/offers.json). Our ladder should live in `data/` the same way, marked "first proposal".
2. **Rules of engagement in public.** "You can do this without us, and we encourage it"; code Apache-2.0, materials CC BY 4.0; "the client's code and data are the client's"; a split checked by a script to the penny (https://ruv.sgit.ai/rules/index.html).
3. **A brief any agent can follow, with checks.** Steps in order, each with a check; "Keys are secrets", "Publishing is a human's call", "Do not work around a safety check", "Record, do not invent", "Pin versions"; the mandate written in `verb.object.reach` with a barrier per row (https://ruv.sgit.ai/articles/studio-setup-brief.md).

**Against BRIEF.md**
- The **maintained repository** is sold at £149, £499 and £1,500 **a month** (https://ruv.sgit.ai/data/offers.json, https://ruv.sgit.ai/articles/ruv-sgit-business-model.md). BRIEF.md decision 1 leans to "finite packs, never rent". If we reuse ruv's structure, this tier must not come across unchanged.
- **Task runs run "on our shared infrastructure"**, and job vaults are handed over "and deleted from our side" at the end (https://ruv.sgit.ai/data/offers.json, https://ruv.sgit.ai/rules/index.html). BRIEF.md says "no state on our side"; ruv holds state for the life of a job. Our offer must run in the customer's environment from the start.
- **Revenue split between providers** (equal after direct costs, https://ruv.sgit.ai/rules/index.html) is close to BRIEF.md decision 2 (referral commissions). Not the same thing, but Dinis may want to decide them together.
- READING.md calls ruv.sgit.ai "the first customer". The newsroom calls it "the first time I had an agentic team running on a loop" and calls PrompTugal.news "the first customer" (https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html). Neither should be called a customer on our site (see §1).
- Its own limits: "No paid run yet", "Not automated end to end", prices are "starting hypotheses" (https://ruv.sgit.ai/articles/ruv-sgit-business-model.md). Our site must not cite its prices as proven.

## 8. promptugal.news

**What it is.** An independent newsroom for Web Summit Lisbon 2026, built by an agent with a named human operator, site v0.1.1476 (https://promptugal.news/llms.txt). A pipeline of desks: a researcher captures public pages into its vault, a curator maps them and suggests stories, journalists write the ones that hold (https://promptugal.news/newsroom/desks/index.md).

**Three things AgentiCCells will reuse**
1. **Each desk writes only in its own folder, and the pipeline is drawn from those files** at every release: 108 captures mapped, 64 candidates, 43 articles at this release (https://promptugal.news/newsroom/desks/index.md, https://promptugal.news/newsroom/index.md). A model for the console reading the team's real files.
2. **Drafts-only for anything that leaves the team.** Fifty outreach drafts were ready, "each must be sent by one person from their own .agent address" (https://promptugal.news/llms.txt, the "who sends which company's email" decision page); the newsroom's article title says "fifty outreach drafts that no agent was allowed to send" (https://newsroom.sgit.ai/llms-full.txt). This matches CLAUDE.md "Never send".
3. **Observability as its own lane**, with honest limits: anonymous readers only as counts, a city shown only from five tabs, and "every record is an untrusted claim: the lanes' tokens are public, so rows can be forged or flooded" (https://promptugal.news/newsroom/observability/index.md).

**Against BRIEF.md**
- The observability sender on every page calls third-party place lookups (ipapi.co, then ipwho.is) (https://promptugal.news/newsroom/observability/index.md). Our dev brief and ROSTER.md forbid trackers and third-party scripts; do not copy that part.
- The newsroom overview calls itself "the status report of 5 November" while carrying the 15 November edition, and shows "Articles: 63 of 3" (https://promptugal.news/newsroom/index.md); the desks page counts 43 published (https://promptugal.news/newsroom/desks/index.md); the newsroom article says 73 signed articles (https://newsroom.sgit.ai/llms-full.txt). Three counts, three dates or methods: an example of why numbers need a date and a source.

---

## Answers to the ten questions

**1. The four properties, and which is hardest for a platform vendor to copy.**
The four, as the company's own article lists them: **no state on our side**; **every cell is atomic** (valuable on its own, removable without breaking the rest); **everything we release is open**; **cheaper than doing it yourself** (https://newsroom.sgit.ai/articles/starting-agenticcells.html). BRIEF.md §1 words the same four as: free and open software; selling the setup, the guidance and the trust ("cheaper, faster and safer"); no state on our side; every cell atomic. The hardest to copy is **"no state on our side"**: the newsroom's review calls it "the most distinctive promise, very hard for a platform to copy", because it fits encrypted vaults and a console that can run on the customer's own device (https://newsroom.sgit.ai/articles/starting-agenticcells.html).

**2. The six setups, and where our team will be at the end of week one.**
From the bottom: (1) a task, (2) one agent, (3) an agent with sub-agents in one runtime, (4) several sessions, one per role, (5) a conductor and its agents, (6) conductors of conductors. The lower three are a prompt; the upper three are a setup with keys, lanes, boards and policies (https://newsroom.sgit.ai/articles/six-setups-of-an-agentic-system.html).
At the end of week one we should be at **setup 5, a conductor and its agents**: one conductor, separate sessions per role started one at a time, a key per agent, a board as files (`team/ROSTER.md`, BRIEF.md §3 and §5). This is our reading of the two sources, not a statement on any site. If keys or the board are not in place, we are only at setup 4. We will not be at setup 6: there is one conductor and one person.

**3. The altitudes of a run, and why "the same privileges at every altitude" is the danger.**
Person (P); a swarm that issues work to agents on other accounts (A4); an agent that plans and holds credentials (A3); a loop that reads, asks, checks and retries (A2); a single LLM call (A1); plain code (A0) (https://newsroom.sgit.ai/articles/six-setups-of-an-agentic-system.html). The danger: if every unit inherits the agent's reach, then code runs with a swarm's privileges, a loop can start agents, and code holds connections it should not; in the biggest run drawn, "196 units, 48 loops and up to 96 at once, every one of them could have reached what the agent reached" (same page). The control is reach, not good behaviour: each altitude gets only what it needs.

**4. The three ways agents talk, and how each is signed.**
Files left in a repository, messages in commits, and append lanes in encrypted vaults (https://newsroom.sgit.ai/articles/an-agentic-console.html; BRIEF.md §4).
- **Append lanes:** each message is sealed with sgit's hybrid envelope to the recipient's public key and signed (ECDSA P-256) by the sender's key; the recipient checks the signature against the sender's published key (https://web-summit.sgit.ai/inbox/index.md, https://sgit.ai/docs/agent-contact.md). This one is cryptographically signed and checked.
- **Commits:** each commit carries the agent's name in the subject and an `Agent:` trailer (https://web-summit.sgit.ai/start/index.md), and the newsroom says "commits are signed" (https://newsroom.sgit.ai/articles/always-on-agents-at-team-scale.html). But the dev ABP records that commits were authored as "Claude" and that "the attribution is still the agent's own word", with the `Agent:` trailer often unreadable by git (https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md). So in practice the name is claimed, not proven, unless the commit is signed with the agent's key.
- **Files in the repository** (briefs, inbox notes, hand-overs) are signed only through the commit that carries them; the sites do not describe a separate file signature, apart from signed articles (https://newsroom.sgit.ai/articles/an-agentic-console.html says each message is "signed by its agent's key" without saying how for files).
The console's claim that all three are checked against the sender's public key is made on simulated data (https://newsroom.sgit.ai/articles/an-agentic-console.html). How commit signing is done with an sgit key (rather than a GitHub key) is **not answered** by the sites read.

**5. Vault key versus public read key, and which may appear in a repository.**
A **vault key** (`passphrase:vault_id`) is full write access; there is no partly public version and no reset. A **read key** is derived one-way from it, opens the vault read-only and cannot become write access (https://sgit.ai/docs/guidance/llms.txt, https://sgit.ai/llms.txt, https://sgit.ai/demos/vaults/llms.txt). **Only a read key** may appear in a repository, and only for a vault meant to be public; "never write a vault key into a tracked file" (https://sgit.ai/llms.txt). web-summit.sgit.ai's build "refuses anything but a [public read] key" in its vault lists (https://web-summit.sgit.ai/vaults/index.md). Publishing a read key cannot be undone (https://ruv.sgit.ai/data/offers.json: "published with a read key (cannot be undone)").

**6. The Agent Behaviour Policy of `dev@agenticcells.dinis`, in the capability grammar.** *(Proposal. Grammar from https://abp.sgit.ai/model/capabilities/index.md; barriers from https://abp.sgit.ai/model/barriers/index.md; mandate from `board/briefs/dev.md` and `team/ROSTER.md`. Reach is not measured: it is inferred from the dev ABP pattern at https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md and must be confirmed in dev's own session.)*

Reach names for this deployment: `self` = its turn; `project` = the AgentiCCells website repository working tree; `host` = its cloud container; `tenant` = the AgentiCCells GitHub organisation and Claude account; `world` = the internet.

**Mandate** (what it was asked to do):

| Primitive | Instance | Mandate |
|---|---|---|
| `read.file.project` | the website repository | yes |
| `write.file.project` | `content/`, `data/`, `build/`, `assets/`, `CNAME`, `.github/workflows/pages.yml` | yes (not `dns/`, not keys) |
| `write.repository.project` | commits with `Agent: dev@agenticcells.dinis` | yes |
| `write.repository.tenant` | its own `claude/` branch only | yes, that branch only |
| `execute.process.host` | `node build/build.mjs`, `node build/validate.js` in its container | yes |
| `authenticate-as.credential.signing` | its own key, to sign its work (CLAUDE.md) | yes |
| `create.record.world` | publishing the site through Pages | only through a passing validator |

**Reach (inferred, to measure):** the mandate above plus `write.repository.tenant` on any unprotected branch, `read.file.host`, `write.file.host`, `delete.file.host`, `read.credential.host` (whatever the environment holds), `send.endpoint.world` (through the proxy), `create.schedule.tenant` (scheduled tasks and new sessions, if the session has those tools), `send.message.world` (if any mail connector is attached), `grant.credential.self` (its own permission settings), `create.record.world` (publishing artifacts or pages outside the gate).

**Gap** (derived as reach minus mandate; recompute once reach is measured), with today's barrier for each:

| In reach, not in mandate | Barrier today | Kind |
|---|---|---|
| push to `main` or another agent's branch | the brief ("own claude/ branch only"); branch protection not yet checked | expectation, unless protection is confirmed (then boundary) |
| edit the validator or workflow so a check is weaker | the brief ("may not weaken a check"); validator runs in CI | expectation (dev's mandate includes writing the validator, as the web-summit dev ABP found) |
| write `dns/` or `team/keys.json` | the brief | expectation (git has no per-path write control, per https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md) |
| add trackers or third-party scripts | the brief; a validator check if written | expectation until the validator checks it |
| `send.message.world`, contact anyone | CLAUDE.md "Never send" | expectation, unless no mail connector is attached (boundary) |
| `create.schedule.tenant` (start sessions or scheduled tasks) | ROSTER.md: the conductor starts roles | expectation |
| `read.credential.host` beyond its own key | none known | none, until the environment is checked |
| `create.record.world` without the validator | Pages workflow runs the validator first | boundary only if the workflow and branch protection are outside dev's reach; today dev writes the workflow, so expectation |
| write prices other than "first proposal", name customers | the brief; the wording check if written | expectation |

Licence to operate (proposal): authority Dinis Cruz; licensee dev@agenticcells.dinis; conditions `board/briefs/dev.md` and CLAUDE.md; review on any change of reach and weekly. The shape follows https://web-summit.sgit.ai/abp/conductor-web-summit-dinis/index.md.

**7. What the HOLD file does, how fast a stop reaches an agent, and why.**
If `board/HOLD.md` exists, every agent stops at its next wake and does nothing but read; only Dinis removes it (BRIEF.md §4, CLAUDE.md). On web-summit.sgit.ai the hold was `team/<id>/HOLD.md`, which stopped the start tool (https://raw.githubusercontent.com/SGit-AI/SGit-AI__Website__Web-Summit/main/REALITY.md). How fast: in the Big Stop of 9 November 2026 at 23:30, "each one stopped only at its next wake, 5 to 33 minutes later", and background pollers kept going (https://newsroom.sgit.ai/articles/an-agentic-console.html, https://newsroom.sgit.ai/articles/always-on-agents-at-team-scale.html). Why: agents mostly sleep and are woken by scheduled tasks; a stop is a file they read when they wake, so "a stop is an event, and it is only as fast as the timers" (https://newsroom.sgit.ai/articles/always-on-agents-at-team-scale.html). By the enforcer test the HOLD file is an expectation, not a boundary: an agent that does not read it, or a process already running, is not stopped (https://abp.sgit.ai/model/barriers/index.md, our inference).

**8. Why customers' sites are on agenticcells.app and not agenticcells.ai.**
So that a customer's content can never affect agenticcells.ai's cookies or reputation, the way github.io protects GitHub; .app only loads over HTTPS (HSTS-preloaded); and in time agenticcells.app can go on the Public Suffix List, so each customer subdomain is a separate site to the browser (https://newsroom.sgit.ai/articles/starting-agenticcells.html, BRIEF.md §2, `dns/CUSTOMER-SITES.md`). Each customer site is a single CNAME, never a wildcard, deleted the day the customer leaves, so no subdomain can be taken over (https://newsroom.sgit.ai/articles/starting-agenticcells.html).

**9. What "link the measurement, never restate it" means for the AgentiCCells website.**
The rule: where another site measured something, link that page as the citation; do not re-measure or paraphrase the number; every figure carries an as-of date or is generated at build; the gate rejects a page with an undated figure (https://nfrs.sgit.ai/llms.txt). For our site this means: do not copy figures such as "around 250 agents" or "224 sessions" into our pages; link https://newsroom.sgit.ai/articles/ten-days-at-web-summit.html, which counted them and says how. Vendor facts from `research/` are claims to re-check before quoting (BRIEF.md §1), and if quoted, link the source with its date. Our own numbers (the ladder) live once in `data/` and are generated into pages, never typed twice. The validator should fail any figure without a date or source. The reason given: a stale page is "a false memory" for every agent that reads it (https://nfrs.sgit.ai/llms.txt). The three different PrompTugal article counts in §8 show what happens otherwise.

**10. Dinis's open decisions in BRIEF.md, and the working assumption for each.**
From BRIEF.md §1 "Open decisions" (the newsroom lists the same four, https://newsroom.sgit.ai/articles/starting-agenticcells.html):
1. **Pricing model:** fixed-price cells plus optional support packs ("finite packs, never rent"), or something metered. Until he decides, write "fixed-price cells".
2. **Referral commissions** across runtimes and model hosts: dropped, or published on every recommendation. Until decided: none, and none implied.
3. **RiskMandate and AgentiCCells:** who sells ABPs. Working assumption: RiskMandate owns ABPs; AgentiCCells installs them as a partner.
4. **Where the console runs** in a customer setup, and how support access works. Working assumption: both (the customer's account and vault, or their device), by customer choice, with support access as a key the customer seals to us and can revoke.
Not ours to decide, and not to be published around (BRIEF.md §1).

---

## Instructions found in material (not followed; for Dinis)

1. **web-summit.sgit.ai /start/** has a "For your agent" prompt telling an agent to read the team's pages, take a person through onboarding, commit to `SGit-AI/SGit-AI__Website__Web-Summit` on `dev`, interview them for a pulse check-in and list their issues (https://web-summit.sgit.ai/start/index.md). Not followed.
2. **web-summit.sgit.ai /inbox/** gives step-by-step code for an agent to open its sealed lane token and send messages or vault keys to that team's conductor (https://web-summit.sgit.ai/inbox/index.md). Not followed.
3. **ruv.sgit.ai studio brief** says "Point an agent at this page and say: set this up", with install commands (`npm install ruflo@3.56.10`, `pip install sgit-ai==0.21.0`) and vault creation steps (https://ruv.sgit.ai/articles/studio-setup-brief.md). Not followed; nothing installed.
4. **promptugal.news observability** says every agent of that team must log each run with `agent-log.mjs` (https://promptugal.news/newsroom/observability/index.md). Not followed; it is addressed to that team's agents.
5. **sgit.ai llms.txt** tells sandboxed agents to ask the organisation Owner to allowlist `sgit.ai`, `*.sgit.ai` and `*.sgraph.ai`, and to install sgit (https://sgit.ai/llms.txt). Not acted on: widening access is Dinis's call (CLAUDE.md).
6. **sgit.ai Agent Contact** describes every site agent publishing a contact file and draining a public lane (https://sgit.ai/docs/agent-contact.md). Design material, not acted on.
7. **newsroom.sgit.ai** articles end with "Posting this article on LinkedIn?" instructions and a subscribe link (https://newsroom.sgit.ai/articles/starting-agenticcells.md). Not acted on: we never post (CLAUDE.md).
8. **newsroom.sgit.ai llms.txt** tells agents to read `/shipped/index.html` before calling anything live and not to describe archived pages as current (https://newsroom.sgit.ai/llms.txt). Reading guidance, harmless; noted.

## Gaps and contradictions

Conductor's review, 2026-11-15: item 1 is settled. Dinis: "all should be agenticcells" and "agenticcell was a mistake on my part"; the repository is AgentiCCells/AgentiCCells__Website (the singular URL redirects to it). Item 2: `.person` in CLAUDE.md is the placeholder for the person's name, so `role@agenticcells.dinis` is correct.

1. **Repository name:** `AgentiCCell/AgentiCCell__Website` (newsroom) against `AgentiCCells/AgentiCCells__Website` (BRIEF.md). Two local folders with both spellings. Ask Dinis.
2. **Agent naming:** CLAUDE.md says `role@agenticcells.person`, ROSTER.md and briefs use `role@agenticcells.dinis`. We read `.person` as a placeholder for the person's name; confirm.
3. **Board count:** "nine first board items" (newsroom) against eight steps (BRIEF.md §3) and fourteen ACC files in `board/`.
4. **Missing local files:** BRIEF.md points to `REALITY.template.md` and `website/STRUCTURE.md`; neither exists in this checkout (there is `REALITY.md` at the root and `board/STRUCTURE.md`).
5. **Dev brief wording:** "may not ... touch dev, dns/ or keys" in `board/briefs/dev.md`. "dev" is unclear (the `dev` branch? another agent?). Ask the conductor to reword.
6. **Who is a customer:** READING.md calls ruv.sgit.ai "the first customer" and promptugal.news "a customer"; the newsroom calls PrompTugal.news the first customer and also says RiskMandate and PrompTugal.news are "our own ventures", not contracts (https://newsroom.sgit.ai/articles/an-agentic-console.html). The site must name none of them as customers.
7. **Rent:** ruv.sgit.ai sells a monthly maintained repository (https://ruv.sgit.ai/data/offers.json) against "finite packs, never rent" (BRIEF.md decision 1).
8. **State:** ruv.sgit.ai task runs use "our shared infrastructure" (https://ruv.sgit.ai/data/offers.json) against "no state on our side". `dns/CUSTOMER-SITES.md` also keeps a redirect page "in a repository we control" for 90 days after a customer moves; small, but it is state on our side.
9. **Revocation:** BRIEF.md decision 4 assumes a support key the customer "can revoke"; sgit has no revocation or rotation workflow (https://sgit.ai/docs/limitations.md).
10. **Terms:** grant, mandate, delta, barrier (abp.sgit.ai) against reach, mandate, gap (BRIEF.md, ROSTER.md, web-summit.sgit.ai). Pick one, map the other.
11. **Prohibitions without barriers:** every "May not" in ROSTER.md is an expectation under https://abp.sgit.ai/model/barriers/index.md; none names a boundary. Branch protection on the website repository, removing unused connectors, and validator checks would turn some into boundaries.
12. **`Agent:` trailer:** git did not read it when a `Co-Authored-By` paragraph followed it (https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md). Our commits carry attribution lines too; keep `Agent:` in the final trailer block and have the validator or a hook check it.
13. **Shared environment secrets:** on web-summit.sgit.ai one environment exposed the operator's own tokens to every session (https://web-summit.sgit.ai/abp/dev-web-summit-dinis/index.md). The AgentiCCells account's environment should be checked before roles start.
14. **Stale reality files:** web-summit.sgit.ai's REALITY.md still headed "1 November 2026" at v0.2.2226; promptugal.news's overview still "the status report of 5 November" on 15 November; newsroom.sgit.ai's llms.txt says "v0.14.98 (10 October 2026)" while carrying 15 November articles at that same version (https://newsroom.sgit.ai/llms.txt, https://newsroom.sgit.ai/articles/starting-agenticcells.md). REALITY.md needs a dated check, not just the rule.
15. **Incomplete catalogue:** the console and brain demo vaults are not in https://sgit.ai/demos/vaults/llms.txt (v0.7.87).
16. **Markdown twins missing:** nfrs.sgit.ai `/map/` and `/memory/`, and ruv.sgit.ai `/learn/`, `/ruv-stack`, `/architecture`, `/rules/` have no `.md` twin (404).
17. **Inconsistent counts:** PrompTugal.news articles counted as 43, "63 of 3" and 73 on three pages (§8).
18. **Interaction between agents** is not modelled by abp.sgit.ai (https://abp.sgit.ai/model/index.md), though a team of agents is what we sell.
19. **Logo:** the Creative Commons trademark check the newsroom raises (https://newsroom.sgit.ai/articles/starting-agenticcells.html) is not on the board.
20. **Questions not fully answered by the sites:** Q4 (how commits are signed with an sgit agent key rather than only named) and Q6 (dev's measured reach) need checking in our own sessions. Q2's "setup 5" is our inference from BRIEF.md and ROSTER.md, not stated on any site.

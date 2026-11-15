# AgentiCCells — Positioning Brief
### Draft v1 — 15 November 2026

---

## 1. The name

**AgentiCCells** — Agent + **CC** (Creative Commons) + Cells.

The name carries the whole model in one word:
- **Agent** — what we set up.
- **CC** — everything we release is open: code under an open-source license (MIT/Apache), everything else under Creative Commons. The licensing stance is literally in the name.
- **Cells** — every deliverable is atomic: the smallest self-contained unit that runs inside the customer's own organism (their environment, their accounts, their infra).

**Domain:** agenticcells.ai — confirmed free at the .ai registry on 2026-11-15. Domains are case-insensitive, so the wordplay survives typing: agenticcells = Agenti-CC-ells. Logo treatment picks out the CC (Agenti**CC**ells).

**Defensive registrations** (both confirmed free): agenticells.ai and agentcells.ai, redirected to the canonical domain. Note: the singular **agentcell.ai is taken** and collides with an existing company (agentcell.dev, "the cloud for small software") — the brand is always plural, always "AgentiCCells".

Context on the "agentic" prefix: [Fast Company](https://www.fastcompany.com/91576093/the-agentic-ai-naming-trap-why-you-must-move-from-red-oceans-to-blue-ai-stratgey-brands-naming) calls the industry-wide "agentic" naming wave a red-ocean trap. We accept that trade-off for instant legibility, and differentiate through the CC wordplay and the cell model — which no one else in the market has.

---

## 2. What we sell

**Atomic agentic cells, installed in your environment, with a control centre — pay per consumption.**

The product is not the software (the software is free and open). The product is the setup, the guidance, and the trust. The service ladder from the [SGit Newsroom article on selling mini agentic teams](https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html):

| Package | Price (first proposal) | Setup included |
|---|---:|---|
| **One cell** | £500 | One agent with sub-agents, in one runtime, for one workflow, set up in a session. |
| **A few sessions** | £1,500 | One session per role, each with its own runtime, sharing lanes and a vault. |
| **A team** | £5,000 | A conductor and its agents, a key per agent, a board made of files, a week of setup. |
| **A network** | £20,000 | Conductors of conductors across a division or network, with policies and observability. |

Every size includes the **control centre**: where the customer sees which agents are running, what each may reach, and can start and stop them. Without it, the customer cannot see or control what they are buying — that is the non-negotiable.

## 3. The model — four properties that define us

1. **No state on our side.** We hold no customer data, no sessions, no infrastructure. Everything runs in the customer's environment — their cloud accounts, their git, their runtimes.
2. **Every cell is atomic.** Each setup is self-contained, individually valuable, and independently removable. No lock-in by architecture.
3. **Everything we release is open.** Code under MIT/Apache, guidance and content under CC. Anyone can rebuild what we deliver — which is the point, not a leak (see §4).
4. **Pay as you go, pay per consumption.** No platform fee, no retainer required. Metered like a utility: setup fees per cell, consumption on the customer's own runtime spend.

## 4. The core pitch: cheaper than doing it yourself

Because everything is open source, every customer *could* do it themselves. The pitch is not "you can't" — it's "it's cheaper through us":

- **The learning cost is the real price of DIY.** Setting up a small agentic team that does real work took months to learn; the method is not documented anywhere as a repeatable path ([SGit Newsroom](https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html)). We sell the compression: months of learning into a session.
- **Market cost benchmarks back this up.** Independent 2026 estimates put an AI agent for a 40-person company at roughly $600/year on the low end and $100K+ at the top, with the driver being build-and-integrate effort rather than model usage ([KumoHQ](https://www.kumohq.co/blog/cost-to-build-an-ai-agent)); deployment cost is dominated by integration, data, and people, not the model ([WeLaunch](https://www.welaunch.ai/blog/cost-to-deploy-an-ai-agent)). A £500–£5,000 cell that removes that effort is cheap by construction.
- **We keep nothing, so we cost nothing ongoing.** No state means no hosting bill from us, no data custody, no vendor risk. The customer's run costs are their own token and infra spend, at their own rates.

One line: **"Everything we build is open source, runs in your environment, and we keep no state — we just make it cheaper than doing it yourself."**

## 5. Partner company — we play on the open-source flow

AgentiCCells is deliberately a **partner company**, not a platform company. We don't compete with the frameworks; we ride the flow of open-source components and sell the assembly, the policies, and the operating skill on top:

- **Stack we assemble** (from the article and current practice): the workflow (briefs, boards made of files, conductors, handovers, releases), **Ruflo** (rUv's open-source agent harness — active and shipping near-daily, v3.77.0 released Nov 12, 2026 ([AgentGid](https://agentgid.com/agents/ruflo/), [tomrochette.com](https://tomrochette.com/agents/orchestration/ruflo/))), **sgit vaults** for private encrypted versioned material, files in git instead of databases ("the new data lake"), and runtimes chosen per team — Claude, Codex, Cloudflare ([SGit Newsroom](https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html)).
- **We partner with the ecosystem, not against it.** The control-centre layer already has strong open-source building blocks we can assemble rather than rebuild: [Omnara](https://www.omnara.com/) (Apache-2.0 agent control plane, no platform fee), [agent-barn](https://github.com/aai-labs/agent-barn) (open-source control plane for agents in your own Kubernetes), [Preloop](https://github.com/preloop/preloop) (self-hostable AI agent control plane and software factory), and [Agent Control](https://github.com/agentcontrol) (centralized runtime governance). Same posture toward model hosts (Together, Fireworks), sandboxes (E2B, Composio), and frameworks (Pydantic AI, LangGraph, CrewAI, Haystack) — full market map in the companion brief.
- **Open-source flow favors us.** The current is running our way: Vstorm, a consulting firm, has now open-sourced its own self-hosted agent platform — AgenticOS, Apache-2.0, built on Pydantic AI, with budgets, approvals, and an audit trail ([GitHub](https://github.com/AiTH-Solutions/vstorm-co_agentic-os)) — confirming that open-source is becoming the default substrate for this market, and that consultancies are converging on it. As enterprises absorb open-source agent tooling (e.g., [Workday's acquisition of Flowise](https://investor.workday.com/news-and-events/press-releases/news-details/2025/Workday-Acquires-Flowise-Bringing-Powerful-AI-Agent-Builder-Capabilities-to-the-Workday-Platform-08-14-2025/default.aspx)), the scarce asset shifts from software to **operating skill** — which is what we sell.
- **Partner economics:** per-consumption revenue from setup work, plus referral/commission potential across the open-source stack (runtimes, sandboxes, model hosts) without taking custody of anything.

## 6. Competitive position (refreshed 2026-11-15)

Full source-linked market map: `open-source-agentic-brains-vendors.md`. Summary of where we sit:

| Segment | Who | Why they're not us |
|---|---|---|
| Framework vendors | LangChain/LangGraph, CrewAI, deepset/Haystack, Pydantic, Microsoft, IBM BeeAI | Sell platforms/hosting; state lives with them or their clouds; no "team setup" service |
| Swarm platforms | Swarms Corp, CAMEL-AI | Sell infrastructure and frameworks, not installation-in-your-environment |
| Done-for-you agencies | n8n agencies ($250–$10K entry), Aplos AI, WiseVAs ($1K/mo), Azaris, Brainverse | Closest analog, but: fixed-price workflow builds, mostly on n8n/Make, no control centre, no policy layer, usually no open-source deliverables |
| Managed control planes | Omnara, agent-barn, Preloop | Sell/control the plane; don't install teams or write policies |
| Marketplaces | Agent Marketplace ($49/mo agents), Swarms marketplace, AWS Marketplace | Sell individual agents; no setup service, no conductors, no policies |
| Big SIs | Accenture (AI Refinery), Deloitte (Zora), IBM Consulting, Microsoft Agent Factory | Enterprise-scale programs, months-long, not atomic cells |

**The verified gap we occupy:** no one sells "conductors of conductors + agent behaviour policies + control centre + everything open source + pay per consumption" as a packaged service. The £500 cell tier exists but on n8n-style stacks; the £5,000–£20,000 team-to-network tier with policies and reach-visibility has no direct competitor. The RiskMandate ABP connection (every policy needs an agent to look after it, agents to check what another agent can reach and show the gap) is the differentiator with the least competition — it is the same offering "on steroids" ([SGit Newsroom](https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html)).

**Watchlist (new since the first research pass, 2026-11-15):**
- Vstorm's AgenticOS — open-source moves from consulting firms; monitor whether they package a setup service on it.
- The control-centre layer is filling in fast (agent-barn, Preloop, Agent Control, Argos, opengeni all appeared in open source) — assemble rather than build, but expect this to commoditize the plane itself. Our defensible layer is policies + setup skill, not the plane.
- [Agent Teams](https://aiagentstore.ai/agent-teams) ($130/month managed, "rent from $26") — a hosted agent-team offer to watch on price, though not open-source-first.

## 7. Risks

- **The DIY bet cuts both ways.** "You could do it yourself" is honest positioning, but some buyers will — our answer is that the control centre, policies, and operating skill are the parts that stay hard.
- **The n8n agency economy can move up-stack.** Agencies currently selling $250 workflow builds could add control centres and reach the £5K tier; our moat is the open-source agentic stacks and the policy layer they don't have.
- **"Agentic" naming noise** ([Fast Company](https://www.fastcompany.com/91576093/the-agentic-ai-naming-trap-why-you-must-move-from-red-oceans-to-blue-ai-stratgey-brands-naming)) — mitigated by the CC wordplay and cell metaphor, which are ownable.
- **Single-singular collision:** keep the brand plural (AgentiCCells); singular AgentCell is an existing company.

---

## Companion research brief
Full source-linked market map of 30+ vendors: `open-source-agentic-brains-vendors.md` (frameworks, swarms, runtimes, services, marketplaces, and the mini-agentic-teams economy, verified 2026-11-15).

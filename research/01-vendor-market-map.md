# Who Sells and Deploys Open-Source Agentic Brains
### A market map from single agents to full swarms — compiled 2026-11-15

This brief maps the companies that (a) build open-source agent frameworks ("agentic brains") and sell commercial layers on top, and (b) provide the hosting, tooling, and services to actually set them up in production. Organized along a complexity spectrum: simple single agents → orchestrated multi-agent systems → full swarms.

---

## 1. Framework vendors that monetize their own open-source stack

These companies open-source the agent brain itself and sell the production layer around it (hosting, observability, governance, support).

### LangChain — LangGraph
- **Open source:** LangGraph is an MIT-licensed agent runtime and low-level orchestration framework supporting single-agent, multi-agent, and hierarchical control flows ([LangChain](https://www.langchain.com/langgraph)).
- **Commercial:** Deployment via LangSmith Agent Server (cloud, hybrid, or self-hosted), available on LangSmith Plus and Enterprise plans ([LangChain](https://www.langchain.com/langgraph)). LangGraph Platform was renamed LangSmith Deployment in October 2025 ([LangChain blog](https://www.langchain.com/blog/langgraph-platform-ga)).
- **Spectrum fit:** single agents through hierarchical multi-agent systems; the default starting point for most teams.

### CrewAI
- **Open source:** the framework itself is MIT-licensed and free to self-run ([Activepieces](https://www.activepieces.com/blog/crewai-pricing-for-2026-and-what-your-workload-costs)).
- **Commercial:** CrewAI AMP (Agent Management Platform) — visual editor, AI copilot, GitHub integration, enterprise governance (SSO, RBAC, PII redaction). Free Basic plan: 2 automations, 50 workflow executions/month; Enterprise is custom-priced ([CrewAI pricing](https://crewai.com/pricing), [tomrochette.com](https://tomrochette.com/agents/orchestration/crewai/)).
- **Also sold through AWS Marketplace** as a fully managed SaaS ([AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-e6oyhm2ed6l3c)).
- **Spectrum fit:** crew-style multi-agent workflows; among the easiest entry points.

### deepset — Haystack
- **Open source:** the Haystack framework (data + agent pipeline framework).
- **Commercial:** Haystack Enterprise Platform — orchestration, evaluation, observability, and deployment controls; plus Forward Deployed Engineers who work directly on customer infrastructure ([deepset](https://www.deepset.ai/haystack-platform)).
- **Sovereign angle:** available on STACKIT for public-sector organizations needing sovereign European cloud ([deepset news](https://www.deepset.ai/news/haystack-enterprise-platform-stackit)) — relevant for EU/regulated buyers.
- **Spectrum fit:** document-heavy agents and RAG-centric workflows; on-prem, AWS/Azure/GCP, or sovereign cloud.

### Pydantic — Pydantic AI
- **Open source:** MIT-licensed Python agent framework; agents run in your own process, no usage telemetry ([Pydantic docs](https://pydantic.dev/docs/ai/production/enterprise/)).
- **Commercial:** Pydantic Logfire (tracing, evals, cost tracking — cloud, single-tenant, or self-hosted) plus enterprise support with direct engineer access, 24/7 priority support, and SLAs ([Pydantic](https://pydantic.dev/enterprise), [Pydantic docs](https://pydantic.dev/docs/validation/dev/get-started/enterprise-support/)).
- **Spectrum fit:** simple, type-safe single agents for teams already in the Python data ecosystem.

### LlamaIndex
- **Open source:** fully open agent framework + data connectors ([LlamaCloud](https://www.llamaindex.cloud/)).
- **Commercial:** LlamaCloud — enterprise document automation: agentic OCR for 90+ file types, schema-based extraction agents, and managed ingestion/retrieval ([LlamaCloud](https://www.llamaindex.cloud/)).
- **Spectrum fit:** agents whose brain is mostly document knowledge.

### Microsoft — AutoGen → Agent Framework
- **Open source:** AutoGen pioneered multi-agent concepts; now merged into Microsoft Agent Framework, which reached v1.0 for .NET and Python with stable APIs and long-term support commitments ([Microsoft DevBlogs](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/), [migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)).
- **Commercial:** sold through Azure AI Foundry — build, observe, and govern multi-agent applications ([Azure blog](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/)).
- **Spectrum fit:** full multi-agent, enterprise-governed, tied to the Azure estate.

### IBM — BeeAI
- **Open source:** BeeAI is an open-source platform for discovering, running, and sharing agents across frameworks, built on the Agent Communication Protocol (ACP) and hosted under the Linux Foundation; local-first with on-device/on-site hosting ([IBM](https://www.ibm.com/think/topics/beeai)).
- **Commercial:** IBM monetizes via IBM Consulting and its broader Agent Stack, positioning open agentic AI as its enterprise differentiator ([IBM](https://www.ibm.com/think/news/beeai-open-source-multiagent)).
- **Spectrum fit:** framework-agnostic multi-agent interoperability — closest thing to a neutral "agent bus" for enterprises.

### Letta (formerly MemGPT)
- **Open source:** Apache-2.0 licensed; stateful agents with persistent, learnable memory; App Server for local or self-hosted agents ([GitHub](https://github.com/letta-ai/letta)).
- **Commercial:** Letta Code (self-improving coding agent), cloud/API tier; case studies include Bilt, 11x, Kognitos, Hunt Club ([Letta](https://www.letta.com/)).
- **Spectrum fit:** single agents where memory and identity over time are the differentiator.

### SuperAGI
- **Open source:** the agent framework is free; the company grew from an open-source AGI platform ambition, funded by Newlands VC (Jan Koum) ([TechCrunch](https://techcrunch.com/2024/03/11/jan-koum-newlands-vc-superagi-funding-agi-agent-model/)).
- **Commercial:** pivoted to an "agentic record system" plus a suite of AI sales/marketing apps; paid seats around $45–49/user/month ([GTM Tech Index](https://gtmtechindex.com/vendors/superagi)).
- **Spectrum fit:** GTM-oriented agents more than general-purpose brains.

---

## 2. Swarm specialists — multi-agent orchestration as the core product

### Swarms Corp (swarms.ai)
- **Open source:** Swarms Python (original multi-agent framework, backwards-compatible with LangChain and AutoGen) and Swarms-RS, a Rust multi-agent framework for performance-critical production ([Swarms](https://www.swarms.ai/)).
- **Commercial:** the full stack — Swarms API (hosted multi-agent orchestration over REST), Swarms Cloud (control plane with 2,000+ models and 16 swarm architectures, Batch and Grid runners scaling one task to thousands of concurrent agents), and an agent marketplace to sell agents ([Swarms](https://www.swarms.ai/), [Swarms Cloud](https://www.swarms.ai/blog/what-is-swarms-cloud)).
- **Pricing:** Free (pay-per-use, 100 req/min, 1,200 req/day), Pro at $19.99/month, Premium at $100/month or $1,020/year ([Swarms pricing](https://www.swarms.ai/pricing)).
- **Spectrum fit:** this is the clearest "full swarm" vendor — explicitly built for thousands of concurrent agents.

### CAMEL-AI
- **Open source:** community-driven research collective (100+ researchers) with the CAMEL framework and OWL (Optimized Workforce Learning), one of the strongest open-source general multi-agent assistants ([CAMEL-AI](https://www.camel-ai.org/), [GitHub](https://github.com/camel-ai/owl)).
- **Commercial:** no enterprise platform verified — essentially research/community, not a vendor (any enterprise offering: n.a.).
- **Spectrum fit:** free swarm brains you self-host; commercial support comes from third parties, not CAMEL itself.

---

## 3. The runtime layer — companies that run your agents (managed hosting)

You bring the brain; they sell the infrastructure to run it safely at scale.

### E2B
- **What they sell:** "The AI Agent Cloud" — isolated Firecracker microVMs (Sandbox, code interpreter, browser) that agent sessions run in, in E2B's cloud or the customer's own cloud; positioned for security-reviewable enterprise deployments ([E2B](https://e2b.dev/), [E2B Enterprise](https://e2b.dev/enterprise)).
- **Fit:** the execution substrate under any open-source framework.

### Omnara
- **What they sell:** Apache-2.0 open-source managed agent platform — a control plane running the agent loop with durable state (agents survive crashes and deploys, editable via API without redeploying); self-host or Omnara Cloud with no platform fee, pay-as-you-go ([Omnara](https://www.omnara.com/), [GitHub](https://github.com/omnara-ai/omnara)).
- **Fit:** the open-source alternative to Claude Managed Agents / OpenAI's Agents API.

### Composio
- **What they sell:** MIT-licensed SDKs (31.1k GitHub stars) plus a commercial platform: 1,000+ pre-authenticated toolkits, managed auth, triggers, and sandboxed execution for agents — the "hands" layer across frameworks ([GitHub](https://github.com/composiohq/composio), [Composio](https://composio.dev/toolkits)).

### Compute and model-hosting for self-hosted stacks
- **Together AI:** inference for 100+ open-source models (serverless, reserved, or dedicated), GPU clusters, and fine-tuning — the model side of a self-hosted agentic brain ([Together AI docs](https://docs.together.ai/docs/inference/overview)).
- **Fireworks AI:** production-grade open-source inference with fine-tuning and evaluation ([Fireworks](https://fireworks.ai/blog/best-llm-api-providers)).
- **Modal / RunPod:** serverless GPU compute and sandboxes for running agent code and MCP servers ([Modal](https://modal.com/resources/best-serverless-platforms-gpu-backed-mcp-servers), [RunPod](https://www.runpod.io/articles/comparison/runpod-vs-modal)).

---

## 4. Companies that help you set it all up (services)

### Global systems integrators
- **Accenture** — AI Refinery platform, enterprise-scale agentic AI programs ([GoML comparison](https://www.goml.io/compare/accenture-vs-deloitte-vs-goml)).
- **Deloitte** — Zora AI, agentic AI as a service line ([Deloitte](https://www.deloitte.com/na/en/what-we-do/capabilities/ai/services/agentic-ai.html)).
- **IBM Consulting** — enterprise-wide agent builds on BeeAI and the IBM Agent Stack ([Pixelmatters](https://www.pixelmatters.com/insights/top-ai-agent-development-companies), [IBM](https://www.ibm.com/think/news/year-agentic-ai-center-stage-2025)).

### Boutique consultancies (framework-agnostic, open-source-friendly)
- **Vstorm** — PoV-first engagement model: score workflows for value/feasibility/cost-of-error, build a Proof of Value on your data with an agreed go/no-go threshold before full build ([Vstorm](https://vstorm.co/agentic-ai-consulting/)).
- **Winder.ai** — designs and ships autonomous and multi-agent systems for production, multi-cloud ([Winder.ai](https://winder.ai/services/ai-agent-development/)).
- **NobleProg** — CrewAI consulting: design, build, orchestrate multi-agent systems ([NobleProg](https://www.nobleprog.com/consulting/crewai)).
- **HazelJS** — AI engineering and agent implementation, private/self-hosted deployments ([HazelJS](https://hazeljs.ai/consulting)).

---

## 5. Quick reference table

| Company | Open-source brain | Commercial layer | Complexity range |
|---|---|---|---|
| Pydantic | Pydantic AI (MIT) | Logfire + enterprise support | Single agents |
| LlamaIndex | LlamaIndex framework | LlamaCloud (document agents) | Single → doc-heavy |
| CrewAI | CrewAI framework (MIT) | CrewAI AMP (free → enterprise) | Crews |
| LangChain | LangGraph (MIT) | LangSmith Agent Server | Single → hierarchical |
| deepset | Haystack | Haystack Enterprise Platform + FDEs | RAG/agents, sovereign |
| Letta | Letta framework (Apache-2.0) | Letta Code + cloud | Memory-first agents |
| Microsoft | AutoGen → Agent Framework | Azure AI Foundry | Full multi-agent |
| IBM | BeeAI (Linux Foundation) | IBM Consulting | Framework-agnostic |
| Swarms Corp | Swarms Python + Rust | Swarms API/Cloud + marketplace | Full swarms |
| CAMEL-AI | CAMEL + OWL | n.a. (community) | Full swarms (self-host) |
| E2B | Sandboxes (open-source roots) | Agent Cloud / BYOC | Runtime layer |
| Omnara | Omnara (Apache-2.0) | Omnara Cloud (no platform fee) | Runtime/control plane |
| Composio | SDKs (MIT) | Managed tools/auth platform | Tools layer |
| SuperAGI | Framework | Sales/marketing apps (~$49/seat) | GTM agents |

---

## 6. The "mini agentic teams" economy — who sells the packaged setup service today

Reframed through the [SGit Newsroom article on selling mini agentic teams](https://newsroom.sgit.ai/articles/selling-mini-agentic-teams.html) (the £500 one-agent → £20,000 network ladder, always with a control centre). This is the part of the market closest to that proposed business — and it already exists, mostly in three tiers.

### The agency economy (closest analog to the £500–£20,000 ladder)
- **n8n agencies** — the largest real-world market for "agent teams set up for you." A directory ranks 21 agencies, all with published starting prices from **$250 to $10,000**; for service businesses, 8 agencies ranked with starting prices from $1,000 to $5,000 ([AI Agency Radar](https://aiagencyradar.com/best/n8n-agencies/), [AI Agency Radar](https://aiagencyradar.com/n8n-agencies/for/service-businesses/)). n8n itself is open-source (self-hostable) with cloud plans from €20/month and unlimited workflows/users ([n8n pricing](https://n8n.io/pricing/)).
- **Aplos AI** — fixed-price n8n builds delivered in the customer's own account, scoped against the customer's actual process and tested with real data; hosting, maintenance and support priced separately from the build ([Aplos AI](https://aplosai.com/n8n-agency)). This is structurally identical to the article's "we set it up, you can run it" model.
- **WiseVAs** — done-for-you agents for small businesses from **$1,000/month, no setup fee, live in 7 days**, including a "company brain" (how the business works, in one place) ([WiseVAs](https://www.wisevas.io/done-for-you-ai-agents)).
- **Azaris** — installs a team of AI agents (26-agent library, 7 categories) with done-for-you setups on the **OpenAI Agents SDK, Hermes, and Claude Code**; audit-based model where you don't pay if mapped savings aren't hit ([Azaris](https://azaris.ai/doneforyouagents)). Notably, they sell setup on open-source stacks rather than proprietary platforms.
- **Brainverse** — a three-stage productized engagement: AI Audit (measure the work, rank by return), Build ("a working team inside your environment in about two weeks"), then implementation on a 6–12 month roadmap ([Brainverse](https://brainverse.ai/services)) — the same audit-then-build arc the article describes.
- **Productized.nl, Vstorm, Winder.ai, NobleProg** (see section 4) — the framework-agnostic, open-source-first end of the same services market.

### Ready-made agents you can buy (the marketplace tier)
- **Agent Marketplace** — vetted, security-scanned ready-made agents from **$49/month**, with listings specifying what each agent does, which tools it connects to, and the permissions it needs; agents run on the buyer's own stack across 5 switchable models ([Agent Marketplace](https://agentmarketplace.ai/)).
- **Swarms marketplace** — sell and buy agents on the Swarms stack ([Swarms](https://www.swarms.ai/)).
- **AWS Marketplace AI agents and tools** — thousands of partner agents deployable on AWS ([AWS Marketplace](https://aws.amazon.com/marketplace/solutions/ai-agents-and-tools/)).

### The control-centre layer (the missing piece in the article)
- **Omnara** — Apache-2.0 control plane where agents are durable API objects with visible state, permissions, and start/stop control; self-host or cloud with no platform fee ([Omnara](https://www.omnara.com/)). This is the closest shipping open-source product to the article's "control centre" requirement.
- **Pydantic Logfire** and **LangSmith** — the observability layer sold alongside the major open-source frameworks ([Pydantic](https://pydantic.dev/enterprise), [LangChain](https://www.langchain.com/langgraph)).

### Big-vendor versions
- **Microsoft Agent Factory** — a playbook and program for IT leaders to adopt an "agentic workforce" across the organization ([Microsoft white paper, Feb 2026](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/ai/The-Microsoft-Agent-Factory-white-paper-Feb-2026.pdf)) — the enterprise-scale version of "agent team setup as a service."
- **Workday acquired Flowise** (announced August 14, 2025) — the open-source visual agent builder is now a feature of the Workday platform, letting customers build agents against HR and finance data ([Workday press release](https://investor.workday.com/news-and-events/press-releases/news-details/2025/Workday-Acquires-Flowise-Bringing-Powerful-AI-Agent-Builder-Capabilities-to-the-Workday-Platform-08-14-2025/default.aspx), [SiliconANGLE](https://siliconangle.com/2025/08/15/workday-acquires-flowise-boost-ai-powered-workflows/)) — a signal that open-source agent tooling is being absorbed into enterprise platforms.

### Platform layer the setup economy builds on
- **n8n** — open-source workflow automation with AI agent nodes ([n8n pricing](https://n8n.io/pricing/)).
- **Dify** — open-source agentic workflow platform, 153k stars, self-host or cloud from $59/month ([The Agents Index](https://theagentsindex.com/dify), [Dify pricing](https://dify.ai/pricing)).
- **Flowise** — open-source drag-and-drop agent builder (now Workday) ([agentmarketcap](https://agentmarketcap.ai/agents/flowise)).
- **Botpress, AnythingLLM** — open-source conversational agent platforms with paid enterprise tiers ([AgentList](https://www.agentlist.top/en/projects/botpress/), [AnythingLLM](https://anythingllm.com/)).

### Where the article's proposal sits against this market
- The **£500 one-agent tier** is well covered (agencies from $250; marketplaces from $49/mo) but mostly on n8n/Make, not on open-source agentic stacks like Ruflo/Claude Code/Codex.
- The **£5,000–£20,000 team-to-network tier with policies and observability** is the genuinely open gap: nobody in the verified set sells "conductors of conductors + agent behaviour policies + control centre" as a packaged, open-source-first service. Brainverse and Azaris come closest on the setup side; Omnara on the control-centre side; RiskMandate's ABP angle has no direct competitor in this list.
- The differentiator in the article — visibility and start/stop control of what customers are buying — is exactly what the current agency market does not provide: their builds are mostly fixed-price n8n workflows delivered into the customer's account, without a policy or reach-visibility layer.

---

## Refresh — 15 November 2026

Re-verified after the first pass; no earlier findings invalidated. New developments:

- **Vstorm has open-sourced its own platform — AgenticOS**: self-hosted AI agent platform for company "AI teammates," Apache-2.0, built on Pydantic AI, with RAG, skills, a real browser, 4,700+ MCP servers, budgets, approvals, and an audit trail ([GitHub](https://github.com/AiTH-Solutions/vstorm-co_agentic-os), [AgenticOS](https://vstorm-co.github.io/vstormos-landing/)). Confirms the trend: consultancies are converging on open-source agent platforms as their substrate.
- **The open-source control-centre layer is filling in fast.** New projects appeared since the first pass: [agent-barn](https://github.com/aai-labs/agent-barn) (open-source control plane, runs in your own Kubernetes), [Preloop](https://github.com/preloop/preloop) (self-hostable AI agent control plane and software factory), [Agent Control](https://github.com/agentcontrol) (centralized runtime governance), [Argos](https://github.com/dvaJi/argos) (open-source control plane for AI coding agents), and [opengeni](https://github.com/Cloudgeni-ai/opengeni) (self-hostable agentic service with durable, replayable sessions and human approvals). The plane is commoditizing; the setup service and policy layer on top is still open.
- **Ruflo (rUv's agent harness) is highly active**: v3.77.0 released Nov 12, 2026, with near-daily releases through October ([AgentGid](https://agentgid.com/agents/ruflo/), [tomrochette.com](https://tomrochette.com/agents/orchestration/ruflo/)).
- **Hosted agent-team pricing benchmark**: [Agent Teams](https://aiagentstore.ai/agent-teams) offers managed agent teams from $130/month with "rent from $26" — a hosted, non-open-source data point for the same "team of agents as a product" category.
- **Cost benchmarks for the DIY-vs-service argument**: an AI agent for a 40-person company costs roughly $600/year to $100K+ depending on build approach ([KumoHQ](https://www.kumohq.co/blog/cost-to-build-an-ai-agent)); deployment cost is dominated by integration, data, and people rather than model usage ([WeLaunch](https://www.welaunch.ai/blog/cost-to-deploy-an-ai-agent)).

---

## Notes and evidence gaps

- CrewAI's pricing page no longer labels the framework as open-source; the MIT license claim rests on third-party write-ups ([Activepieces](https://www.activepieces.com/blog/crewai-pricing-for-2026-and-what-your-workload-costs)) — worth re-checking the LICENSE file before procurement decisions.
- CAMEL-AI and the Rasa CALM / open-core players blur the line between community projects and vendors; no verified commercial offering for CAMEL.
- Microsoft's Agent Framework pricing is bundled into Azure AI Foundry consumption — not separately listed.
- Boutique consultancies' claims (PoV models, frameworks used) come from their own marketing pages; no independent verification of delivery quality.

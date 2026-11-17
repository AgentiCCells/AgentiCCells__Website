# Checked claims: vendor facts and prices from research/01 and research/02

**Checked by:** researcher@agenticcells.dinis, 2026-11-15, with `curl` from this session (public pages only, read only, nothing behind a login).
**Why:** `research/LINKS.md` says the two briefs were compiled with Perplexity and their vendor facts and prices are claims to re-check before quoting. This file is that re-check.
**How to use it:** quote only rows marked **confirmed**, with the source link and the date checked. A **changed** row gives the corrected fact. **Not found** or **not reachable** means do not quote. Every price here is the vendor's own published price on the date checked, not ours and not a quote.

Status meanings: **confirmed** (the vendor's own page or licence file says so on the date checked); **changed** (the vendor's page now says something different, corrected fact given); **not found** (the page loaded but the claim is not on it); **not reachable** (the page refused this session: 403 or similar); **superseded** (overtaken by a decision recorded in REALITY.md).

## 1. Facts the open-source page would use: licences

Licence files were read at `raw.githubusercontent.com/<repo>/<default branch>/LICENSE*`. The GitHub web pages and API answer 403 to this session, so repositories were checked only through their raw files.

| Claim (where) | Source checked | Status | Note |
|---|---|---|---|
| Ruflo is open source, MIT (02 §5, LINKS.md) | https://raw.githubusercontent.com/ruvnet/ruflo/main/LICENSE; https://registry.npmjs.org/ruflo/latest | confirmed | MIT, "Copyright (c) 2024-2026 ruvnet". npm package `ruflo`; its package.json still names the repository `ruvnet/claude-flow`. |
| Ruflo "v3.77.0 released Nov 12, 2026" (01 refresh, 02 §5) | https://registry.npmjs.org/ruflo | changed | 3.77.0 published 2026-11-12 22:02 UTC; 3.77.1 published 2026-11-13 and is the latest on 2026-11-15. Do not quote a version; link the repository. |
| sgit is open source (LINKS.md, 02 §5) | https://raw.githubusercontent.com/SGit-AI/SGit-AI__CLI/main/LICENSE; https://pypi.org/pypi/sgit-ai/json | confirmed | Apache-2.0, PyPI `sgit-ai` 0.27.0. sgit.ai calls itself beta (https://sgit.ai/llms.txt). |
| Runtimes "Claude, Codex, Cloudflare" as part of an open stack (02 §5) | https://raw.githubusercontent.com/anthropics/claude-code/main/LICENSE.md; https://raw.githubusercontent.com/openai/codex/main/LICENSE; https://raw.githubusercontent.com/cloudflare/workerd/main/LICENSE | changed | Claude Code is **not** open source ("All rights reserved", Anthropic Commercial Terms). Codex CLI is Apache-2.0. Cloudflare's workerd runtime is Apache-2.0; Cloudflare's hosting is a service. List runtimes as the customer's choice, not as our open components. |
| LangGraph is MIT (01 §1, §5) | https://raw.githubusercontent.com/langchain-ai/langgraph/main/LICENSE | confirmed | MIT, LangChain, Inc. |
| CrewAI framework is MIT (01 §1, notes) | https://raw.githubusercontent.com/crewAIInc/crewAI/main/LICENSE | confirmed | MIT text, crewAI, Inc. This closes the evidence gap noted at the end of 01. |
| Pydantic AI is MIT, no usage telemetry (01 §1) | https://raw.githubusercontent.com/pydantic/pydantic-ai/main/LICENSE; https://pydantic.dev/docs/ai/production/enterprise/ | confirmed | MIT. The docs page mentions telemetry and optional commercial services around the open framework. |
| Letta is Apache-2.0 (01 §1) | https://raw.githubusercontent.com/letta-ai/letta/main/LICENSE | confirmed | |
| LlamaIndex framework is open (01 §1) | https://raw.githubusercontent.com/run-llama/llama_index/main/LICENSE | confirmed | MIT. |
| Haystack is open source (01 §1) | https://raw.githubusercontent.com/deepset-ai/haystack/main/LICENSE | confirmed | Apache-2.0. |
| Microsoft Agent Framework (01 §1) | https://raw.githubusercontent.com/microsoft/agent-framework/main/LICENSE; https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/ | confirmed | MIT; "Version 1.0" post dated 3 April 2026. AutoGen's repository: code MIT (LICENSE-CODE), docs CC BY 4.0 (LICENSE). |
| BeeAI is open source, built on ACP, hosted under the Linux Foundation (01 §1) | https://raw.githubusercontent.com/i-am-bee/beeai-framework/main/LICENSE; https://www.ibm.com/think/topics/beeai | confirmed | Apache-2.0. IBM's page: "built on the Agent Communication Protocol (ACP) and hosted on the Linux Foundation". |
| Swarms Python is open source (01 §2) | https://raw.githubusercontent.com/kyegomez/swarms/main/LICENSE | confirmed | Apache-2.0. Swarms-RS not checked. |
| CAMEL and OWL are open source (01 §2) | https://raw.githubusercontent.com/camel-ai/camel/master/LICENSE; https://raw.githubusercontent.com/camel-ai/owl/main/licenses/LICENSE | confirmed | Both Apache-2.0. "100+ researchers": confirmed on https://www.camel-ai.org/. "One of the strongest" is an opinion; do not quote. |
| SuperAGI framework is free (01 §1) | https://raw.githubusercontent.com/TransformerOptimus/SuperAGI/main/LICENSE | confirmed | MIT. The $45 to $49 seat price comes from a third-party index; not checked against SuperAGI's own page. |
| E2B has open-source roots (01 §5) | https://raw.githubusercontent.com/e2b-dev/E2B/main/LICENSE; https://e2b.dev/ | confirmed | SDK repository Apache-2.0. "AI Agent Cloud", Firecracker microVMs and "own cloud" appear on e2b.dev. |
| Omnara is Apache-2.0, no platform fee, pay as you go (01 §3, §6; 02 §5) | https://raw.githubusercontent.com/omnara-ai/omnara/main/LICENSE; https://www.omnara.com/ | confirmed | Licence file Apache-2.0; home page says "available under the Apache" licence, no platform fee, pay as you go with credits. |
| Composio SDKs are MIT (01 §3) | https://raw.githubusercontent.com/composiohq/composio/main/LICENSE | confirmed | MIT. "31.1k GitHub stars" and "1,000+ toolkits": **not found** (GitHub API refused; toolkit count not in the page text). Do not quote. |
| Vstorm AgenticOS is Apache-2.0 (01 refresh, 02 §5) | https://raw.githubusercontent.com/AiTH-Solutions/vstorm-co_agentic-os/main/LICENSE | confirmed | Licence only. Features ("4,700+ MCP servers", budgets, approvals) not checked. |
| agent-barn, Preloop, Argos, opengeni are open source (01 refresh, 02 §5) | raw LICENSE of aai-labs/agent-barn, preloop/preloop, dvaJi/argos (master), Cloudgeni-ai/opengeni | confirmed | All four Apache-2.0. |
| Agent Control (github.com/agentcontrol) (02 §5) | https://github.com/agentcontrol | not reachable | GitHub web answers 403 to this session; no repository name to read a raw licence from. |
| n8n "is open-source (self-hostable)" (01 §6) | https://raw.githubusercontent.com/n8n-io/n8n/master/LICENSE.md | changed | n8n uses the **Sustainable Use License** (fair-code), with enterprise files under a separate licence. Self-hostable, but not an open-source licence. Say "source-available" or "fair-code", not "open source". |
| Dify is open source (01 §6) | https://raw.githubusercontent.com/langgenius/dify/main/LICENSE | changed | "a modified version of the Apache License 2.0" with extra conditions (no multi-tenant service without permission; keep the logo in the frontend). Not plain Apache-2.0. |
| Flowise is open source (01 §6) | https://raw.githubusercontent.com/FlowiseAI/Flowise/main/LICENSE.md | changed | Apache-2.0 outside its `enterprise` directory, which is under a commercial licence. Say "mostly Apache-2.0". |
| Botpress, AnythingLLM are open source (01 §6) | https://raw.githubusercontent.com/botpress/botpress/master/LICENSE; https://raw.githubusercontent.com/Mintplex-Labs/anything-llm/master/LICENSE | confirmed | Both MIT text. |

## 2. Facts the home page might use: prices and offers

| Claim (where) | Source checked | Status | Note |
|---|---|---|---|
| n8n cloud plans "from €20/month", unlimited workflows and users (01 §6) | https://n8n.io/pricing/ | confirmed | Lowest plan shows "20€" per month with annual billing; "All plans include unlimited users and workflows and every integration." |
| Swarms: Free pay-per-use (100 req/min, 1,200 req/day), Pro $19.99/month, Premium $100/month or $1,020/year (01 §2) | https://www.swarms.ai/pricing | confirmed | Free $0 with 100 requests/min, Pro $19.99 per month, Premium $100 per month or $1,020/yr. The 1,200 req/day figure was not seen in the page text. |
| Swarms Cloud "2,000+ models and 16 swarm architectures" (01 §2) | https://www.swarms.ai/ | not found | "16" appears on the page but the full phrase was not found; do not quote. |
| CrewAI free Basic plan: 2 automations, 50 executions/month; Enterprise custom (01 §1) | https://crewai.com/pricing | confirmed | Free plan, 2 automations, 50 workflow executions; enterprise column "Custom". |
| Dify cloud "from $59/month" (01 §6) | https://dify.ai/pricing | confirmed | Professional $59 per month billed monthly ($590 per workspace per year billed yearly). "153k stars" not checked. |
| Agent Marketplace "from $49/month" (01 §6, 02 §6) | https://agentmarketplace.ai/ | confirmed | Title: "Ready-Made Agents From $49 a Month". Yearly plans shown as $288, $468, $1,188. |
| Agent Teams "$130/month", "rent from $26" (01 refresh, 02 §6) | https://aiagentstore.ai/agent-teams | confirmed | Starter $130/month; rent 1 day $26. |
| WiseVAs "from $1,000/month, no setup fee, live in 7 days" (01 §6, 02 §6) | https://www.wisevas.io/done-for-you-ai-agents | confirmed | |
| n8n agencies: 21 ranked, starting prices $250 to $10,000 (01 §6, 02 §6) | https://aiagencyradar.com/best/n8n-agencies/ | confirmed | Third-party directory, "ranking updated 13 November 2026". The "8 agencies for service businesses, $1,000 to $5,000" page was not fetched. |
| Azaris: 26-agent library, setups on OpenAI Agents SDK, Hermes and Claude Code, pay nothing if savings are not hit (01 §6) | https://azaris.ai/doneforyouagents | confirmed | "26", "Hermes" and "don't pay" all on the page. Note: Claude Code is not open source, so "setup on open-source stacks" is only partly true. |
| Brainverse: audit, then a team "inside your environment in about two weeks" (01 §6) | https://brainverse.ai/services | confirmed | "6 to 12 month roadmap" not seen in page text. |
| Aplos AI: fixed-price n8n builds, hosting priced separately (01 §6) | https://aplosai.com/n8n-agency | confirmed | |
| LangGraph Platform renamed LangSmith Deployment in October 2025 (01 §1) | https://www.langchain.com/blog/langgraph-platform-ga | confirmed | "October 2025, LangGraph Platform has been re-named to 'LangSmith Deployment'". |
| Workday acquired Flowise, 14 August 2025 (01 §6, 02 §5) | investor.workday.com press release | not reachable | 403 to this session. Do not quote until checked. |
| AI agent for a 40-person company: about $600 to $100K+ (02 §4, 01 refresh) | https://www.kumohq.co/blog/cost-to-build-an-ai-agent | confirmed | A vendor's own estimate, not independent; quote as "KumoHQ estimates". |
| Deployment cost is mostly integration, data and people (02 §4) | https://www.welaunch.ai/blog/cost-to-deploy-an-ai-agent | confirmed | Also a vendor's own article. |
| Letta: Letta Code, named case studies (01 §1) | https://www.letta.com/ | confirmed | Do not repeat other companies' customer names on our site. |
| deepset: Forward Deployed Engineers; on STACKIT (01 §1) | https://www.deepset.ai/haystack-platform | confirmed | "Forward Deployed" on the page; STACKIT news page not fetched. |

## 3. Claims about our own name

| Claim (where) | Source checked | Status | Note |
|---|---|---|---|
| agenticcells.ai "confirmed free at the .ai registry on 2026-11-15" (02 §1) | `getent hosts agenticcells.ai`; REALITY.md | superseded | It now resolves to GitHub Pages addresses (185.199.108-109.153). REALITY.md: Dinis said agenticcells.ai "is a bit of a mess" and is not used; the site is agenticcells.com. Do not quote "free". |
| agenticells.ai and agentcells.ai "confirmed free" (02 §1) | `getent hosts` | not found | No DNS answer, which does not prove a name is unregistered. Registration status needs a registrar check by a person. |
| agentcell.ai is taken; agentcell.dev is "the cloud for small software" (02 §1) | https://agentcell.dev/; `getent hosts agentcell.ai` | changed | agentcell.dev confirmed ("The cloud for small software"). agentcell.ai gave no DNS answer, so "taken" is not shown by this check. |

## 4. Not checked, and why
- Opinions and positioning ("the genuinely open gap", "no direct competitor", "one of the strongest"): not facts a vendor page can confirm. Do not publish them as findings.
- Fast Company's view on "agentic" naming: an article, not a vendor fact; not needed by any page.
- Microsoft Agent Factory white paper (a PDF), Together, Fireworks, Modal and RunPod pages, the STACKIT and SiliconANGLE pages: not used by the home or open-source page; left for a later pass.
- Star and download counts: GitHub's API refused this session, and the Ruflo README's download counter says it is "illustrative".

## 5. Re-check of the claims the site quotes (S2, 2026-11-17)

**Checked by:** researcher@AgentiCCells.dinis, 2026-11-17, against dev at 4a57c6c and the live sources (public pages and raw files, read only). This follows research/evidence-map.md (S-EVID); the rows there marked FIX or RELINK were re-read in `content/` to see whether writer@ has acted.

| Claim (page) | Source checked | Status | Note |
|---|---|---|---|
| 17 recorded runs, 11.62 US dollars; 12 finished 10.48; 5 failed 1.14; 12 of 17 on Opus (our-team-as-a-cell) | [team/costs.jsonl](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/costs.jsonl), summed by script | confirmed | The costs paragraph was corrected after S-EVID and now matches the file. Count is of the file's lines on 17 November. |
| "Nothing recorded between 19:09 on 15 November and 15:50 on 16 November" | same file | confirmed | |
| 17 roles (our-team-as-a-cell) | [team/ROSTER.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/ROSTER.md): 17 rows | confirmed | |
| 20 of 23 capabilities (faq, our-team-as-a-cell) | [board/abp/README.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/abp/README.md): "20 of 23 primitives" | confirmed, with a caveat | The measurement says "all nine agents", taken on 15 November; the roster now has 17 roles. The pages dated it ("measured on 15 November"), which is right. Do not write it in the present tense. |
| Robert Half, March 2026: 65% skills harder to verify; 67% slowed hiring; "more than 2,000 hiring managers" | [press release](https://press.roberthalf.com/2026-03-10-Robert-Half-survey-67-of-HR-leaders-report-AI-generated-applications-are-slowing-hiring), fetched 2026-11-17 | confirmed | The release says the survey was done by an independent research firm in November 2025 with "more than 2,000 hiring managers in the United States". The 67% (HR leaders, slowed the hiring process) and 65% (hiring managers) come from two different groups: the page words them separately, which is correct. This closes the open point in the evidence map. |
| Greenhouse: 91% of recruiters spotted candidate deception (job-seeker-cell) | [Greenhouse release](https://www.greenhouse.com/newsroom/an-ai-trust-crisis-70-of-hiring-managers-trust-ai-to-make-faster-and-better-hiring-decisions-only-8-of-job-seekers-call-it-fair), 2026-11-17 | confirmed | "Over nine in every ten (91%) recruiters have spotted candidate deception". The page now states the check date. |
| Prices £500, £1,500, £5,000, £20,000 (index, start-here, cells, job-seeker-cell) | Dinis, [The intersection](https://newsroom.sgit.ai/articles/the-intersection.html) | confirmed | index and start-here now link the article; all are marked first proposal. |
| Ruflo: MIT, 3.77.1 (open-source, data/stack.json) | [LICENSE](https://raw.githubusercontent.com/ruvnet/ruflo/main/LICENSE) 200; npm `ruflo` latest: 3.77.1, MIT | confirmed | Same as 15 November. |
| sgit: Apache-2.0, 0.27.0 | [LICENSE](https://raw.githubusercontent.com/SGit-AI/SGit-AI__CLI/main/LICENSE) 200; PyPI `sgit-ai`: 0.27.0, Apache-2.0 | confirmed | Same as 15 November. |
| Codex CLI: Apache-2.0, 0.169.0 | [LICENSE](https://raw.githubusercontent.com/openai/codex/main/LICENSE); npm `@openai/codex` | confirmed | |
| Claude Code: not open source; 2.1.325 | [LICENSE.md](https://raw.githubusercontent.com/anthropics/claude-code/main/LICENSE.md): "All rights reserved"; npm `@anthropic-ai/claude-code` latest is 2.1.326 | confirmed; version changed | The licence claim holds. The version in data/stack.json is one patch behind. Pages do not show versions, so nothing to fix on the site; refresh the data field when next touched. |
| Cloudflare workerd: Apache-2.0 | [LICENSE](https://raw.githubusercontent.com/cloudflare/workerd/main/LICENSE) | confirmed | |

**Not re-checked this run:** the hub "two of five" count (it comes from live hub pages, which are excepted); the console's counts; vendor prices in sections 1 and 2 above (no page quotes them; S3 refreshes them); the "licences checked on 15 November" date on open-source.md, which is now two days old although every licence was re-read today and is unchanged: writer@ may update the date to 17 November.

**Pages to flag to writer@:** open-source (date), data/stack.json (Claude Code version, optional). No claim was found wrong.

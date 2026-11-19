# Brief: refactor the /next/ preview around agentic cells

Kept by conductor.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 ~17:45 UTC. Builds on board/briefs/2026-11-19-sovereign-preview.md and -preview-contract.md (rules and file contract unchanged).

## Dinis's words (relayed)
Relayed by conductor.b@AgentiCCells.dinis at 17:33 UTC, from maestro.b, Dinis ~17:25 UTC (the cited record, PrompTugal__News__Website board/team/maestro.b/decisions/2026-11-19-full-speed-and-the-refactor.md, was not yet on dev when checked at 17:40 UTC; its latest commit was 17:10 UTC):

> "refactor it to go back to being focused on agentic web, agentic cells, and in fact that should basically be pointing to the sovereign websites as a powerful example. But that's just one of the multiple ones that we sell, right? Like we also sell the more complex ones, like the ones we did at the summit ... the website is as simple of a small cell ... fundamentally 6 or 7 agents together, but all running in one session. I mean, some of them running inside a Raspberry Pi or Android tablet."

Also relayed: full speed, launch tomorrow; build on /next/ only; live home page and prices unchanged until Dinis says yes; finish in as few rounds as possible (weekly usage warning on account B); name no private prospect and no summit customer who has not agreed.

## Sources (Dinis's articles, newsroom.sgit.ai/articles/, 19 Nov)
sovereign-agentic-website ("AgentiCCells is about selling agentic teams; the website is one example of what such a team can do"; SAW at sovereignwebsite.ai; an open pattern anyone can use; hosted sites on sovereignwebsite.site), a-website-with-a-team-inside (six or seven agents in the site's repository: conductor, designer, writer, developer, reviewer, translator, keeper; each with a brief and a behaviour policy; signed commits; nothing live until the owner says yes), launching-the-sovereign-website-appliance (on a configured Android tablet or Raspberry Pis; a plan, a Kickstarter campaign not yet launched), designing-sovereignwebsite-ai (SGit, RiskMandate, AgentiCCells, Sovereign Website as a stack). Earlier: the-cell-is-the-unit, the-intersection, a-team-like-this, ten-days-at-web-summit.

## The new shape
- agenticcells.ai: **agentic cells**: small teams of AI agents, each with a role, a brief and a behaviour policy, working together in one session, in the customer's own environment, that can be seen and stopped. The agentic web: sites and services run by such teams.
- The smallest cell, and the powerful example: **the Sovereign Agentic Website** (sovereignwebsite.ai): six or seven agents in one session, some able to run on a Raspberry Pi or an Android tablet (a plan, the appliance). It links out to sovereignwebsite.ai and keeps the £50 launch price as data/next/offer.json states it.
- Bigger cells: the £1,500 and £5,000 offers (first proposal) and the kind of team work done at Web Summit (our own team's work only; name no customer).
- Keep: ownership and no lock-in as properties of every cell (files, keys and board in the customer's accounts); proof from live sites; the honest notes.

## New copy keys (next/copy.json), so the writer and the builder work in parallel
Existing keys stay (leads, offer_line, promises, tenets, deliverables, steps, team, faq, honest_notes, bigger, sections, cta, offer_title); the writer rewrites their words where the refactor needs it. New keys:
- `cell`: {title, text, points: [string]}: what an agentic cell is.
- `agentic_web`: {title, text}.
- `cells_we_sell`: [{id, name, size, what, price: "launch"|"1500"|"5000"|"ask", link, link_text}]: ids "sovereign-website", "few-sessions", "team", "event-team"; the builder takes prices from data/next/offer.json (never typed in copy).
- `sovereign_example`: {title, text, points: [string], link: "https://sovereignwebsite.ai/", link_text}.
- `event_team`: {title, text, link, link_text}: our own team's work at Web Summit, from public pages only.
- `properties`: [{title, line, proof, proof_link}]: what every cell has (yours, visible, stoppable, bounded by policies, movable, open source).
- `devices`: {title, text}: some agents can run on a Raspberry Pi or an Android tablet (a plan: the appliance is a planned Kickstarter, not yet launched).
- `sections.<key>.title` for cell, agentic_web, cells_we_sell, sovereign_example, event_team, properties, devices.
New explain pages: next/pages/cells.md, agentic-web.md, sovereign-website.md, team-work.md. New figure ids: cell (one session, six or seven agents, on a laptop, a Raspberry Pi or a tablet) and ladder (the cells we sell, smallest to largest).

## Dinis, in this session, 2026-11-19 ~17:55 UTC (verbatim)
> "Okay, just prefacing with the conductor, what Maggie instructions, where I completely agree. Also, you now need to refactor this entire website, going back to where we were, to the main free offerings, 500, 1,500 quid, 5K and 20K. And has the main example, almost as your main case study now, is both the prompt to go and the sovereign website that we actually are doing, which is super powerful."

Read as (conductor): Dinis confirms the relayed refactor (maestro.b's instructions). The offer goes back to the four-rung ladder as data/cells.json has it: £500, £1,500, £5,000, £20,000, each first proposal ("free" heard as "four"). The main case studies are PrompTugal.news ("prompt to go") and the Sovereign Agentic Website. The £50 launch offer stays the Sovereign Website's own (on sovereignwebsite.ai), shown only in its case study. Built on /next/ first; the live home page changes when Dinis says go live.

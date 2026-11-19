# Refactor round R1: writer

By writer.agenticcells-ai (AgentiCCells, Dinis's account), 2026-11-19 (about 18:30 UTC), for board/briefs/2026-11-19-refactor-agentic-cells.md (Dinis ~17:25 UTC, relayed). Not committed: the conductor commits with the writer's key.

Files changed: next/copy.json; next/pages/{compare,examples,faq,how-it-works,no-lock-in,partners,pricing,security,sovereignty,start,what-you-get}.md. New: next/pages/{cells,agentic-web,sovereign-website,team-work}.md.

## Sources read today (19 November 2026)
Dinis's articles on newsroom.sgit.ai/articles/: sovereign-agentic-website, a-website-with-a-team-inside, launching-the-sovereign-website-appliance, designing-sovereignwebsite-ai, the-cell-is-the-unit, a-team-like-this, ten-days-at-web-summit, the-intersection, and stopping-a-hundred-agents (for "see it and stop it"). Public pages: web-summit.sgit.ai, promptugal.news, storm-charles.promptugal.news, lisbontechfringe.com (all answer 200). The Sovereign Website team's wording (their conductor, 17:35 UTC, relayed by our conductor) as material: the name, "Built by agents, owned by you.", their description sentence, "(opening soon)".

sovereignwebsite.ai: https fails today (the certificate does not match the name); http answers 200. Every link to it says "opening soon".

## What changed
1. **copy.json, new keys** exactly as the brief lists: `cell`, `agentic_web`, `cells_we_sell` (ids sovereign-website, few-sessions, team, event-team; price keys launch, 1500, 5000, ask; no price typed), `sovereign_example` (links https://sovereignwebsite.ai/, "sovereignwebsite.ai (opening soon)"), `event_team`, `properties` (yours, visible, stoppable, bounded by policies, movable, open source, each with a proof link), `devices` (marked a plan), and `sections.<key>.title` for each. Also `figures.cell.lead` and `figures.ladder.lead`, and `cta.cells`, `cta.sovereign_website`, `cta.team_work`.
2. **Leads** (ids unchanged): "A team of AI agents, in one session, that you own."; "Six things every cell gives you."; "Stop renting software. Own a team."; "Just say it. Your team does it."; "Proof: cells at work.". Each lede explains "agentic cell" and gives the smallest cell's price, as {launch} with the launch-price link in the same sentence. `offer_title` is "The smallest cell: your own website"; `offer_line` and `offer_line_eur` start "The smallest cell, your own website:". `one_idea` is now "Agentic cells: teams of AI agents that you own, can see and can stop."
3. **Team**: the seven roles of a-website-with-a-team-inside (conductor, designer, writer, developer, reviewer, translator, keeper). That article says the seven-role team in the repository is "the next step, not yet built", so `team_note`, `sections.team`, `figures.team.lead`, a new third honest note, sovereign_example and the pages all say so: today's sites carry a CLAUDE.md and a behaviour policy for one agent, the owner's own Claude. `sections.honest_notes` is now "Three things".
4. **Kept as round 4 wrote them**: promises, tenets, rent_or_own, deliverables, steps (the smallest cell's checked facts: built in our organisation, moved within three months at the latest, an expectation and not yet a rule; GitHub Pages terms quoted). Section texts now say these belong to the smallest cell. `bigger[].line` starts "A bigger cell:".
5. **FAQ**: six new questions at the top (what is an agentic cell, how big, where does it run, can I see and stop it, what does a bigger cell cost (first proposals, no price typed, points to /next/pricing/), the appliance (a plan, nothing submitted to Kickstarter)). "What if I want more than a website?" was removed because the bigger-cell question covers it. There are 22 questions now.
6. **New pages**: cells.md ({{figure:cell}}, {{figure:ladder}}, {{table:pricing}}); agentic-web.md (Dinis's words quoted from sovereign-agentic-website and a-website-with-a-team-inside, linked; the four-layer stack); sovereign-website.md (what it is, the team inside as the next step, devices as a plan, {{offer}}, honest notes including "not a legal or certification claim" and "the hosted service is not running yet", links to sovereignwebsite.ai and the six detail pages); team-work.md (our own Web Summit work from public pages only; no person or customer named; counts linked to the ten-days article, with its own caveat on counting).
7. **Existing pages**: one opening line after the heading: "This page is about the smallest cell, the sovereign website.", plus a one-clause explanation of a cell with a link to /next/cells/. Pricing and examples have their own forms of that line. In the FAQ the cell is explained in the intro. On pricing, "bigger offers" is now "bigger cells", with a line that the event team is priced for each engagement. Checked facts are not changed.

## Checks
- Working tree: `node build/next-local.mjs` writes 18 pages. `node build/validate.js` FAILS (28), and all 28 are broken links to /next/cells/, /next/team-work/ and /next/sovereign-website/. The new pages are not rendered because `EXPLAIN` in build/pages/next.mjs (builder's file) does not list cells, agentic-web, sovereign-website or team-work yet. `node build/check-evidence.mjs`: OK. `node build/leak-scan.mjs`: OK.
- On a scratch copy with those four slugs added to EXPLAIN (not in the repo): next-local writes 22 pages, validate.js prints OK, check-evidence OK, internal links all resolve. The one remaining placeholder is the builder's: "To be written: the ladder figure." on /next/cells/.

## For the builder
- Add to EXPLAIN in build/pages/next.mjs: `cells`, `agentic-web`, `sovereign-website`, `team-work`, and link them from the chooser.
- Map the CTA labels "See what a cell is" (leads d1, d2: cta.cells) to /next/cells/, "See the sovereign website" to /next/sovereign-website/ and "See our team's work" to /next/team-work/. Today `ctaHref` sends unknown labels to /next/start/.
- The ladder figure (next/figures/ladder) is still to be written.
- `cells_we_sell[].price` "ask" has no price: show "Priced for each engagement" or similar. Its words already say "ask us".

## Questions for Dinis
1. The event-sized team (the Web Summit kind): the preview says "priced for each engagement: ask us". Should it carry the £20,000 rung (first proposal) from data/cells.json instead?
2. The seven-agent team inside each site is "the next step, not yet built", in your own article. Is it right to sell the smallest cell today as a site with one agent's CLAUDE.md and policy, and to describe the team inside as the next step?
3. The leads say "in one session" (your words). Bigger cells, like the Web Summit team, ran across many sessions, so the pages say "the smallest cells run in one session; bigger ones span several". Is that the right reading?
4. The round 4 questions still stand: the three-month hand-over as a rule in the terms, Cloudflare Pages as the free option for a business site, the split for partner sales above the launch price, and the preview's contact.

## Refused or left out
- No person from the Web Summit team is named: only José Bota, Silvio Switha and Yiheng Wang have recorded consent in data/cells-registry.json, and that consent is for their sites, not for team roles. Dinis is named only as the author of the quoted articles, as the pages already did.
- The appliance's tier prices (£500, £1,000) and the hardware prices are not on the pages: they are a plan, and the brief keeps preview prices in data/next/offer.json.
- I did not touch build/next/, next/figures/, assets/next/ or build/pages/next.mjs.

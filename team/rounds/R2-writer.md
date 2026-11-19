# Refactor round R2: writer

By writer.agenticcells-ai (AgentiCCells, Dinis's account), 2026-11-19 (evening UTC), for board/briefs/2026-11-19-refactor-agentic-cells.md, Dinis's words of ~17:55 UTC: the four-rung ladder (£500, £1,500, £5,000, £20,000, each a first proposal) and two case studies, PrompTugal.news and the Sovereign Agentic Website. Not committed: the conductor commits with the writer's key.

Files changed: next/copy.json; next/pages/{cells,pricing,sovereign-website,start,faq,agentic-web,team-work,partners}.md, and the one opening line of next/pages/{compare,examples,how-it-works,no-lock-in,partners,security,sovereignty,start,what-you-get}.md. New: next/pages/case-studies.md.

## Sources read today (19 November 2026)
- data/cells.json, content/cells.md, content/start-here.md (how the live site words each rung).
- promptugal.news: home, /about/, /agentic/, articles promptugal-news-local-news-town-by-town and six-people-250-agents-promptugal-news; sub-sites data, events, civic, library, live, cyber, bulletins (all answered 200); /algarve/, /api/swagger/, /articles/index.html (200).
- newsroom.sgit.ai: promptugal-news-the-newsroom-we-ran, promptugal-news-by-place, promptugal-news-the-next-phase, and the R1 articles.
- sovereignwebsite.ai: https still fails (certificate does not match the name); http answers 200 and says "The hosted service under this name does not exist yet, and nothing is sold yet" and calls the £50 or €50 launch offer "a proposal". Every link says "opening soon".

## What changed in next/copy.json
1. **cells_we_sell**: four rungs, ids one-agent, few-sessions, team, network; price keys "500", "1500", "5000", "20000" (the builder's cellPrice reads data/cells.json). Words from content/cells.md and start-here.md, plain. Links go to the matching headings of /next/cells/.
2. **Leads**: every lede explains an agentic cell, says "four sizes", and ends with "[One agent, £500, first proposal](the intersection article)." No lede says "website cell". The proof lede names the two case studies. New CTA labels: cta.ask_cell "Ask for a cell", cta.case_studies "See the case studies", cta.ladder "See the four sizes" (the last falls back to /next/start/ unless the builder maps it to /next/pricing/).
3. **offer_title** "One agent or one workflow"; **offer_line** the ladder's entry with "£500, first proposal"; **offer_note** "Every price on the ladder is a first proposal...". New **website_title** "The Sovereign Agentic Website" and **website_offer_line** ({launch}, launch price, a proposal, on sovereignwebsite.ai) for the website case. offer_line_eur now names the Sovereign Website's euro launch offer.
4. **case_studies** (new): promptugal (link https://promptugal.news/, image /assets/media/proof/promptugal-home.webp) and sovereign-website (link https://sovereignwebsite.ai/, image /assets/next/examples/yiheng-wang.jpg, a site the same cell made, because there is no screenshot of sovereignwebsite.ai). Each {id, name, what, points, link, link_text, image}; every number is linked in its sentence. sections.case_studies {title, text}.
5. **sovereign_example** reworded as the second case study; the £50 appears only as "its own launch offer ... a proposal, on sovereignwebsite.ai".
6. **honest_notes**: five now (sections.honest_notes "Five things"): ladder prices are first proposals and nothing is sold; a cell's own account costs are the owner's; for the website, editing needs a Claude plan or a partner; for the website, partners set their own price; the team inside is the next step.
7. **bigger[]**: A few sessions, A team, A network, each "{price}, first proposal" (the network line renders only if data/next/offer.json gains a 20000 entry).
8. **sections**: promises, tenets, deliverables and steps now say they belong to the Sovereign Agentic Website; offer, bigger, cta, cells_we_sell, examples reworded for the ladder; figures.ladder.lead "from one agent to a network".
9. **FAQ** (23 questions): "How big is a cell?" gives the four sizes; "What does a cell cost?" quotes Dinis's ladder from the intersection article, first proposal; "What does the Sovereign Website cost?" gives its own launch price; new "What are the case studies?"; "Where does a cell run?", "Can I see one before I pay?" and "Has anyone bought one yet?" adjusted.

## Pages
- **case-studies.md** (new): {{case_studies}}, then each case in depth: what the cell is, what the agents do, what it publishes or what the owner holds, what it does not claim (PrompTugal.news's own "it checks form, not truth"; the Sovereign Website's hosted service is not running), and what it shows about agentic cells.
- **cells.md**: the four sizes, each with its price linked to the intersection article and "first proposal", what you provide and what you own; {{figure:ladder}} and {{table:pricing}} stay; a "Two cells at work" section.
- **pricing.md**: heading "Four sizes, each a fixed price"; {{table:pricing}}; what it costs you besides; "The Sovereign Agentic Website's own price" section with {launch} at the launch price, then the Claude plan, year-of-platform figure and hosting facts, unchanged.
- **sovereign-website.md**: retitled "Case study: the Sovereign Agentic Website"; an "Its own launch offer" section above {{offer}}.
- **start.md**: new "Asking for a cell" section before the website interview.
- Other website pages: the opening line now reads "This page is about the Sovereign Agentic Website, one of our two case studies."

## Checks (working tree, builder's files as they stood)
- `node build/next-local.mjs`: 23 pages. `node build/validate.js`: OK (four V-OG warnings on live pages, not /next/). `node build/check-evidence.mjs`: OK. `node build/leak-scan.mjs`: OK. No "to be written" box on any /next/ page.
- No em dash, hype word, email address or mailto in my files; no "from £" anywhere in them.

## For the builder (found, not changed)
- **Mislabel**: figures and tables that compare a website with the platforms use `offerTitle(copy)` (copy.offer_title), so /next/compare/ and the year-of-platform figure now read "One agent or one workflow: Paid once, to us: £50, launch price". That is wrong: the £50 is the Sovereign Website's. Please label those with `copy.website_title` ("The Sovereign Agentic Website"): design-kit.mjs line ~103, parts.mjs compare/features/glance columns, next/figures/can-you-leave, year-of-platform, attack-surface. The offer card ({{offer}}, offerCard) also shows offer_title above the £50: on /next/sovereign-website/ it should use website_title.
- On the home designs the £50 shows twice (case study card and sovereign_example); one of the two sections may be enough.
- Map cta.ladder ("See the four sizes") to /next/pricing/ and cta.ask_cell to /next/start/.

## Questions for Dinis
1. The website at £500: the live site puts "one agent or a website" on the £500 rung; this preview keeps the website only as the Sovereign Website's own £50 launch offer on sovereignwebsite.ai. Is that the reading you want?
2. PrompTugal.news names its editors and the people behind its agents. The preview names only you, since our registry has no consent from the others for this use. Should any of them be named?
3. The R1 and round 4 questions still stand (the three-month hand-over as a rule, Cloudflare Pages for business sites, the partner split above the launch price, the preview's contact).

## Refused or left out
- No person from PrompTugal.news or the Web Summit team is named apart from Dinis; the three named site owners appear only as the owners of their sites, as data/cells-registry.json records.
- No figure from PrompTugal.news's home page (counts of local stories, publishers, flights) is used: they change daily, and only figures from dated articles are linked.
- Nothing links or names the Algarve Evolution site, which PrompTugal.news's front page mentions.
- I did not touch build/, next/figures/ or assets/next/.

# AgentiCCells: bootstrap brief for the first agentic team

**From:** Dinis Cruz (the human, the only one who instructs), written up by the newsroom.sgit.ai writer agent, 15 November 2026.
**For:** the first Claude session on the AgentiCCells Claude account. You are `conductor@agenticcells.dinis`. Read this whole folder before you do anything.
**Read in this order:** `BRIEF.md` (this) → `CLAUDE.md` (the rules) → `READING.md` (the eight sites to read, and ten questions to answer) → `REALITY.template.md` → `team/ROSTER.md` → `board/` → `dns/` → `website/` → `research/`.

---

## 1. What AgentiCCells is

AgentiCCells (agenticcells.ai) sets up small agentic teams, "cells", for companies, installed in the customer's own environment, with a control centre (the agentic console) so the customer can see their agents, see what they say to each other, and start and stop them.

- **The software is free and open:** code under MIT or Apache-2.0, everything else under Creative Commons. That is the "CC" in the name.
- **What we sell is the setup, the guidance and the trust.** Anyone could do it themselves; we make it cheaper, faster and safer.
- **No state on our side.** We hold no customer data, sessions or infrastructure. Everything runs in the customer's accounts, git, vaults and devices.
- **Every cell is atomic:** self-contained, valuable on its own, removable without breaking the rest.

The full research and positioning are in `research/` (compiled with Perplexity on 15 November 2026; treat vendor facts as claims to re-check before quoting them publicly).

### The ladder (first proposal, not yet published as offers)

| Cell | Price | What is set up |
|---|---:|---|
| One agent | £500 | One agent with sub-agents in one runtime, for one workflow, set up in a session |
| A few sessions | £1,500 | One session per role, each its own runtime, sharing lanes and a vault |
| A team | £5,000 | A conductor and its agents, a key per agent, a board as files, a week of setup |
| A network | £20,000 | Conductors of conductors across a division or network, with policies and observability |

Every size includes the control centre. The £500 cell opens doors; the business is the team and network tiers, and the Agent Behaviour Policy layer.

### Open decisions (Dinis decides; do not decide them, do not publish around them)

1. **Pricing model:** fixed-price cells plus optional support packs ("finite packs, never rent"), or something metered. The positioning brief says "pay per consumption", which conflicts with "no state on our side". Until Dinis decides, write "fixed-price cells".
2. **Referral commissions** across runtimes and model hosts: dropped, or published on every recommendation. Until decided: none, and none implied.
3. **RiskMandate and AgentiCCells:** who sells Agent Behaviour Policies. Working assumption: RiskMandate owns ABPs; AgentiCCells installs them as a partner.
4. **Where the console runs** in a customer setup (their account and vault, or their device) and how support access works (a key the customer seals to us and can revoke). Working assumption: both, by customer choice.

## 2. The domains (bought 15 November 2026)

| Domain | Purpose |
|---|---|
| **agenticcells.ai** | The company site (canonical). |
| **agenticcells.com** | Redirects to agenticcells.ai. |
| **agenticcells.app** | Customers' sites while they get their own domain: `company-x.agenticcells.app`. HTTPS-only by design (.app is HSTS-preloaded). Kept separate from the brand so a customer's content can never affect agenticcells.ai's cookies or reputation. |

Brand: always plural. Logo: AgentiCCells. Running text: AgenticCells is acceptable. The singular agentcell.ai belongs to another company.

DNS is moving to AWS Route 53. The website repository is **https://github.com/AgentiCCells/AgentiCCells__Website** (GitHub organisation `AgentiCCells`, so the Pages host is `agenticcells.github.io`). Exact steps: `dns/ROUTE53.md`.

## 3. Your first job: bootstrap the team, then the website

Work in this order. Each step is a board item in `board/`. Stop and ask Dinis where a step says so.

1. **Read and confirm.** Read everything here, then work through `READING.md` (about half a day) and answer its ten questions in `board/reading-notes.md`. Write `REALITY.md` in the new repository from the template, listing only what you have checked exists.
2. **Your key.** Make your own key pair in your session (`sgit pki keygen`), publish only the public half in `team/keys.json` of the repository, keep the private half in your session's vault. Every agent you start does the same. Never commit a private key.
3. **The repository.** `AgentiCCells/AgentiCCells__Website`, created by Dinis. Lay it out as in `website/STRUCTURE.md`. Pages in markdown, data in JSON, a build that turns them into a static site, a validator that must print OK before any release, GitHub Pages to serve it.
4. **DNS.** Prepare the records in `dns/ROUTE53.md` as a file (`dns/records.json`) for Dinis to apply, or apply them yourself only if Dinis gives you scoped AWS credentials for those hosted zones. Never ask for broader access.
5. **The first site.** One page that says what AgentiCCells is, the four properties, the ladder (marked "first proposal"), the open source stack, and a contact route that is a form or a mailto to a team address Dinis provides. No customer names, no testimonials, no claims we cannot point at.
6. **The customer-site pipeline.** Document and test, with a dummy repo, how `test.agenticcells.app` gets created: CNAME record, custom domain on the repo, certificate, and the offboarding step that deletes the record. See `dns/CUSTOMER-SITES.md`.
7. **The team.** Start the roles in `team/ROSTER.md` only as their work arrives, one at a time, each with a brief. Do not start everything on day one.
8. **The console.** Adapt the simulated console (public vault, linked in `research/LINKS.md`) into the team's own console, reading the team's real files: board, keys, commits, lanes. Read-only first; stop controls second.

## 4. How this team works (the method, from newsroom.sgit.ai and Web Summit)

- **Files, not databases.** The board is a folder of markdown files, one per item. The team's state is the repository. Everything can be replayed from history.
- **One agent, one name, one key:** `role@agenticcells.person`. Every commit says which agent made it (`Agent:` trailer).
- **Briefs close to the words.** When Dinis gives an instruction, keep his words in the brief, with the time.
- **Three ways to talk:** files in the repository (briefs, inbox notes, hand-overs), commit messages, and append lanes in sgit vaults. Sign what you send.
- **Hand over, do not hoard.** When a session gets long, write `HANDOVER.md` for the next session and stop. Starting again is cheaper than remembering.
- **Releases are gated.** Validator OK, leak scan clean, then push. No release with a failing check.
- **The stop file.** If `board/HOLD.md` exists, every agent stops at its next wake and does nothing but read. Only Dinis removes it.

## 5. What success looks like at the end of week one

- agenticcells.ai serves the one-page site over HTTPS; agenticcells.com redirects to it.
- `test.agenticcells.app` has been created and deleted through the documented pipeline.
- `REALITY.md`, `team/keys.json` and the board are current.
- The console shows the team's real board and commits, read-only.
- A short debrief in `board/debriefs/` says what worked, what did not, and what Dinis needs to decide.

## 2026-11-16 ~15:45 UTC, Dinis (to conductor@, new conductor session for agenticcells.ai)
"please fire up the AgenticCells team (which we need to document how and what it does, since what we are going to do here is exactly what we want to sell)
please read https://newsroom.sgit.ai/articles/the-cell-is-the-unit.html which was just posted and in fact you need to get one of the agents in your team to read in detail the relevant posts in newsroom.sgit.ai"
On ACC-018: "ok I will delete those A records".
Acted on: queued V-AE1 (dev@), S-CELL (researcher@), W-TEAM (writer@), D-CELL (designer@) as top items; started those four runs; restored the conductor's hourly wake.

## 2026-11-16 ~18:00 UTC, Dinis: three sites, three jobs
Dinis, 2026-11-16 ~18:00 UTC: "Yes, can you split? Because so basically what you have the cells, creates a cell. The hub lists the cells and builds that, hub spot, like sort of that community site with previews, with screenshots, with, like basically how to find it. So I should go to find the thing in the hub. And then, a bit like, Hugging Face kind of style or GitHub. And then the main one that you manage, the sort of the agentic cells, the AI is the one that sells it. That's the one that sells the consultancy. That's the one that needs to look super professional. That's the one that basically creates stuff, because the ones that we host publicly, the ones we create are all demos, right? In that level." Earlier the same hour, on renaming: "it should be cells, but maybe I just asked that to rename itself".
Recorded in board/decisions/2026-11-16-three-roles-cells-hub-ai.md; briefs for hub@, sites@ (cells@) and conductor@ updated; W-SPLIT and D-PRO queued; inbox notes to hub@ and sites@.

## 2026-11-16 ~18:10 UTC, Dinis: start the hub; everything public but one
"I don't think we have a hub here so can you create one? Because I don't think we've actually started. So can you start the hub? And basically I reckon that all of this can be public apart apart from the Algar evolution . So let's map that."
Acted on: data/cells-registry.json and map/cells.md (the map); listing consent recorded; hub@ session started on AgentiCCells__Site__Hub.

## 2026-11-16 ~22:55 UTC, Dinis: consent to name three people
On Yiheng Wang, Silvio Switha and José Bota being named on the hub: "Yes they have agreed". Recorded in data/cells-registry.json (consent field).

## 2026-11-16 ~23:20 UTC, Dinis: the brief for agenticcells.ai and riskmandate.ai together
In full in board/briefs/two-sites-2026-11-16.md (verbatim, with the conductor's reading). Acted on: new roles sherpa@, synthetic-users@, ambassador@ (briefs and queues); S-PROOF, W-LADDER, W-START, W-ARCHIVE, W-BOOK, D-FIVE, V-ARCHIVE queued; builders hourly by day from 17 November (team/SCHEDULE.md); the RiskMandate session restarted with the same brief.

## 2026-11-16 ~23:40 UTC, Dinis: answers for both sites
"Yes, to merge. Yes, to the homepage draft. Retire the 10 and 50 quid pack we didn't sell them, so that was signal. You can use Web Summit photos that are on Silvio and Vicky, and I will share with them more with you. Actually, we have a website. I'll share more photos with you. In a second. Yeah, move to an archive folder. You can, well, you can actually download this. So the book is already on the website. I'll give you the website for the book, so you can just grab it from there. And also link to the pub. Yes, show the book in there." Book: https://the-ultimate-insider.book.sgit.ai/ ; see also https://riskmandate-at-websummit.agenticcells.site/ . He shared five files (three photos, two Live Photo motions), now in assets/media/websummit-2026/.

## 2026-11-17 ~00:00 UTC, Dinis: every number linked to its evidence
"we shouldn't be using any of those numbers. We should be all data now should be mapped by proper evidence and linked to evidence to whatever that exists."
Rule for both sites from now: no figure is published unless it links to the evidence it comes from (a public file, page, log or article that shows it). A figure without public evidence comes off the page.

## Dinis, 2026-11-17 ~19:30 UTC: sell the website cell
Verbatim in board/briefs/website-cell-sales-2026-11-17.md; strategy in board/strategy/website-cell-go-to-market.md. In short, his words: "really focus on the marketing and focus on the positioning and basically mapping out on the website the sale of this"; "I would like to anchor around 500 quid"; launch offer undecided ("50 quid", "maybe 20%", "Maybe 50% discount, right? Yeah, maybe that"); "that should be the primary view of the site"; "all we need from you is a bunch of photos and videos and a description"; deploy anywhere with guidance; markets: artists, musicians, AI and technologists, consultants, companies; partners at "50-50 split", partner gets admin access and may sell support and subscriptions, "I don't want to sell subscriptions... I don't want to be providing support"; "every one of these is a deployment of agent behavior policies". Research: "I'll get the research done somewhere else."

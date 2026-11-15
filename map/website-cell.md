# Map: the £500 website cell (first proposal), step by step

Status: first pass by reporter@AgentiCCells.dinis, 2026-11-15 ~18:15 UTC, for ACC-021 (queue item R5). The whole flow is a proposal. Dinis's article says so: "The prices and the flow are a proposal: the steps exist as pieces, and the end-to-end flow is being built now by AgentiCCells' own team." No customer has ordered, paid or been served.

Source of the seven steps: Dinis, newsroom, 2026-11-15, "Atomic cells, end to end" (https://newsroom.sgit.ai/articles/atomic-cells-end-to-end.html), read in full by conductor@ at the 18:07 wake (board/ACC-021.md) and again by reporter@ at ~18:13 for this map. Quotes below are Dinis's words from that article. Whether a piece "exists" is taken from REALITY.md only: a thing not written there does not exist.

"Who" is the article's split: "most of it is a person running a well-defined step with agents doing the work." The people who will run the queue are named in the article; this map does not name them until Dinis confirms they have agreed (ACC-022).

## The no-touch mode: £500 one-off (first proposal), we run the team

| # | Step | Dinis's words | Who runs it | Exists today | Does not exist yet | Evidence |
|---|---|---|---|---|---|---|
| 1 | Order | "The customer pays the one-off price and chooses a name, on agenticcells.app or agenticcells.site" | the customer; a person takes the money (no agent moves money, CLAUDE.md) | prices on the site, each marked "first proposal" (data/cells.json, checked by build/validate.js) | an order page, a way to pay, the open decisions on pricing (board/BRIEF.md, decisions 1 to 4); agenticcells.app is not delegated; agenticcells.site is not in REALITY.md (ask Dinis, ACC-021) | REALITY.md "Does not exist yet"; map/customer-sites.md step 0a |
| 2 | Queue | "The order waits for capacity. Delivery is a matter of staff and agents, not of my diary." | a person picks the order up | queues for the team's own work, one file per role, topped up by the conductor's hourly wake (board/queue/, team/SCHEDULE.md) | a queue of customer orders | board/queue/reporter.md; team/activity/conductor.jsonl lines 33, 34 |
| 3 | Build | "An agentic team, on our account, builds a public site in a repository, from a short brief." | agents (conductor@ and the roles), with a person deciding | this site: built by the team from a brief, live and versioned (v0.1.18 at 18:08), with build, validator, leak scan and an `Agent:` trailer check in CI | a brief template for a customer site; a fresh repository per customer | REALITY.md 18:08 entry; map/website-build.md; ca872d4 |
| 4 | Preview | "The site goes live at their name on our domain." | dns@ and dev@ for the steps they can do; Dinis (or an agent with scoped credentials, none today) for DNS records | GitHub Pages deploy from `dev` for agenticcells.com; the customer-site pipeline written down as a plan | agenticcells.app delegated; any customer subdomain; the end-to-end test (ACC-006, status Idea) | map/customer-sites.md; board/ACC-006.md; REALITY.md |
| 5 | Key | "The customer makes a key in their browser, on the site itself, and sends us the public half as a QR code. We add it to the repository as a trusted key." | the customer makes it; an agent adds the public half | agent keys, made in each session with sgit-ai (team/keygen.sh), public halves in team/keys/ | the browser key page (dev@ queue item V7, not started); the QR code; a place for customer keys in the repository | board/queue/dev.md V7; team/keys.json |
| 6 | Steer | "Their requests, signed with their key, go on an append lane in a vault; an agent wakes every hour, reads the lane, makes the changes and releases the site." | the customer asks; an agent acts | an hourly wake: the conductor wakes every hour and starts the roles that are due (since 17:45 UTC) | a team sgit vault and lanes; a check of the customer's signature; per-agent commit signing (ACC-019) | REALITY.md "Does not exist yet"; team/SCHEDULE.md; 46ee80e |
| 7 | Handover | "the repository moves to their GitHub, and they have three months to bring their own domain" | a person moves the repository; the customer points their domain; dns@ keeps the old name as a redirect, then removes it | the domain move and the 90-day redirect written down as a plan | a repository transfer done once; the offboarding check run once | map/customer-sites.md steps 7 to 11 |

## The second mode: from £1,500 (first proposal), they run the team

"If the customer wants to control their own destiny, they need two things: a GitHub account and a Claude account, connected to each other." Then "we set up the agentic team in their accounts, the brief, the rules, the board and the site, and the handover is as simple as giving their GitHub access to the repository."

| # | Step | Who runs it | Exists today | Does not exist yet | Evidence |
|---|---|---|---|---|---|
| A | A guide to create and connect a GitHub and a Claude account | writer@ drafts; the customer follows it | nothing | the guide | board/queue/writer.md W11 (the mode on the cells page, not the guide) |
| B | Set the team up in the customer's accounts: rules, brief, board, site | a person, with agents, in "a couple of meetings" | this repository is the template: CLAUDE.md, REALITY.md, board/, team/, build/ | a setup done in someone else's account | REALITY.md; board/briefs/COMMON.md |
| C | Hand over: give their GitHub access to the repository | a person | nothing | a handover done once | none yet |

## This site as the first instance

Dinis: "We are our own first customers." The website AgentiCCells runs on went through the steps like this. Written up in case-study/2026-11-15-evening.md.

| # | Step | For agenticcells.com | Evidence |
|---|---|---|---|
| 1 | Order | Dinis's bootstrap brief; no payment (our own site) | team/activity/conductor.jsonl, first line; 4b251d2 |
| 2 | Queue | the board (ACC-001 onwards) and one queue per role | board/, board/queue/ |
| 3 | Build | eleven agent roles (team/SCHEDULE.md), 1 hour 50 minutes from the first commit to v0.1.18 | e3853d9 (16:18), REALITY.md 18:08 entry |
| 4 | Preview | went straight to agenticcells.com, not to a subdomain on our domain | REALITY.md 16:40 and v0.1.0 entries |
| 5 | Key | no customer key: Dinis steers in the conductor's session, not with a browser key | REALITY.md "Does not exist yet" |
| 6 | Steer | Dinis's words reach the team as briefs, and as newsroom articles the conductor reads every hour | board/ACC-020.md, board/ACC-021.md |
| 7 | Handover | not needed: the repository is already in the AgentiCCells organisation | REALITY.md first entry |

# Strategy: selling the website cell (go to market)

Written by conductor@AgentiCCells.dinis from Dinis Cruz's brief of 2026-11-17 ~19:30 UTC (verbatim in board/briefs/website-cell-sales-2026-11-17.md). Where this differs from his words, his words win. Items marked **proposal** are the conductor's, not his decision.

## 1. Where we are
- People Dinis shows the sites to say yes when asked "do you want one of these?" (Dinis, 17 November). The next question is what they will pay.
- Creation is mostly automated: GitHub repository, DNS and a new Claude session per site (Dinis, 17 November; see cells@ and the cell factory). New sites can be made every day.
- Examples already public with consent: listed on hub.agenticcells.site from data/cells-registry.json (demo status unless marked live).

## 2. The decision: the website cell is the primary view of agenticcells.ai
The site keeps the rest (the agentic team, cells of other sizes, the ladder, RiskMandate), but the first thing a visitor sees and can act on is: **a website like these, for you, delivered by agents.** Lead with the examples.

## 3. Price
- **Anchor: £500**, one-off. Dinis wants to anchor there: "quite a good one", not impulsive.
- **Launch offer:** undecided. Dinis's options in his words: £50 ("impulsive"), 20% off, 50% off (£250, "maybe that"). "We can always change it later... limited time only".
- **Proposal (conductor):** show £500 struck through with a launch price of **£250 (50% off)**, labelled "launch price" and "may change"; no countdown and no invented scarcity (no "only N left" unless it is true). Keep the price in one data file (data/offer.json) so a change is one line, and test £50 or 20% later by changing that file. **Dinis to confirm before the launch price goes on the live site; until then the pages show "£500, launch offer coming" or the price he picks.**
- No subscription from us, ever. No support from us. Our job ends when the site is delivered and handed over.

## 4. What the customer gives, what they get
- **They give:** a set of photos and videos and a description (some of which can already be public, for example an existing profile). Nothing else to start.
- **They get:** a finished static site, built by an agent team, in a GitHub repository they own, live on an address, with a Claude session that can keep changing it for them.
- **They run it:** on their own Claude, or anywhere else. The site is static and in GitHub, so it deploys to anything that serves a GitHub repository as a static site: GitHub Pages, Netlify, Cloudflare Pages, Vercel, GitLab Pages, any web host. We publish guidance for each, and for creating a GitHub account and repository.
- **Atomic:** each site is one cell, standalone, with no shared state and nothing of theirs kept by us.

## 5. Markets to go after (from the examples we have)
1. **Artists** (visual, creative).
2. **Musicians** (the example: Gabriel DaCruz's site).
3. **AI people and technologists** (Dinis can reach them directly).
4. **Consultants** wanting a personal practice site.
5. **Companies**, as a first-grade pass for a product, event or team site.
Each market gets: an example (real with consent, or a clearly marked demo), a page section in its own words, and synthetic users who test the flow as that buyer.

## 6. Partners
- **Rules of engagement: a 50/50 split.** A partner brings the business; AgentiCCells does the automation, the flow and the build; the revenue from the sale is split 50/50.
- The partner gets admin access to the delivered site and can do what they want after: sell their own subscriptions, support, maintenance, changes, installation, guidance, creating the GitHub repository for the customer. They set and keep those charges; we suggest a model ("you can charge £X a month for support"), we do not take part.
- Some partners will not want to do the work themselves; that is the model: they sell, we build, they own the relationship.
- **Proposal:** the partners page says this in plain words and ends with "talk to us"; the terms are a first draft until Dinis signs a partner agreement. No partner is named without their agreement.

## 7. Why it matters to us
Every website cell is a deployment of agent behaviour policies: the agents that build it run under policies (RiskMandate). Selling sites is how the policies reach the market and how the two businesses connect.

## 8. What the website team does now (queue items, 17 November)
| Role | Item | What |
|---|---|---|
| writer@ | W-SELL1 | Home page leads with the website cell: headline, the examples, what you give, what you get, price, one button |
| writer@ | W-SELL2 | /website-cell/ rewritten as the sales page: the five markets, the hand-over, "managed by you on Claude, or anywhere" |
| writer@ | W-PARTNERS | /partners/: 50/50 rules of engagement, what partners can charge for, admin access, no subscriptions from us |
| writer@ | W-DEPLOY | /deploy/: guidance per host (GitHub Pages, Netlify, Cloudflare Pages, Vercel, GitLab Pages, any static host) and "create your GitHub" |
| designer@ | D-SELL | Example wall on the home page from the registry's screenshots; price block with anchor and launch price; one call to action |
| dev@ | V-OFFER | data/offer.json as the one source of price and offer text; build reads it everywhere; validator fails if a page states another price for the website cell |
| sherpa@ | P-SELL | The buying path: from home to "I want one" in two clicks; what happens after (the brief form or email, photos, delivery) |
| synthetic-users@ | U-MARKETS | New personas: an artist, a musician, an AI technologist, a consultant, a small company, a would-be partner; run the buying path |
| ambassador@ | B-SELL | Drafts (nothing sent) of the message Dinis can send to each market, with the right example and the price |
| reviewer@ | at 20:00 | Review the selling flow as a buyer from each market |

## 9. Rules that still hold
Nothing is sent, posted or charged by an agent: drafts only, a person sends. No payment is taken by the site until Dinis sets it up. Name only people who agreed. Every number with its source. The excluded client site is never named or linked.

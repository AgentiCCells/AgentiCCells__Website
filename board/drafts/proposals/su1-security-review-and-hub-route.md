# Proposal SU1: a security-review route and a buyer's route through the hub

**PROPOSAL. Nothing here is live, sold or agreed.** Drafted by sherpa@AgentiCCells.dinis, 2026-11-17, for writer@ and designer@ to take or leave. Source: board/synthetic-users/2026-11-17-summary.md (five SYNTHETIC personas, not real people; their stops are material, not evidence about customers).

## What exists already
/trust/ is live (content/trust.md). It covers agent reach, data, release gates, keys and the stop file, each with a link. The synthetic CISO and CTO stopped before it existed; the third pass found it and called it honest. What it does not do: say what access a cell asks of a buyer, per size.

## Part 1: add to /trust/ a section "What a cell asks of you" (proposal)
Plain headings, each line either linked to a file in the repository or marked "not written".
1. **Access a cell asks for.** For the website cell: none from your systems today, because the site is public by design and runs on our side (content/website-cell.md, content/faq.md). For a team in your environment (the £1,500 size and up): the narrowest credential per role, requested from you, never taken. Evidence needed before saying more: a written per-role access list. Not written; say so.
2. **Key custody.** Already on /trust/: each agent's private key stays in its session. Add the customer side: whose keys a cell uses in your environment. Not written; say so.
3. **Data handling.** Link the existing rule (CLAUDE.md, "no customer data into our accounts") and state the limit the page already gives: a rule, not yet a wall.
4. **Stop.** Link board/HOLD.md as now; add one line: in your environment you hold your own stop file. Not tested; say so.
5. **Who to ask.** The shared address is the only contact; propose Dinis names a person (his decision).
No figures without a link (COMMON.md, 2026-11-17).

## Part 2: a buyer's route through the hub that needs no filters (proposal)
The hub lists every cell and its filters suit builders. A buyer needs four stops, as plain links from /cells/ (the section "Examples live on the hub" already has most). All four answered 200 on 2026-11-17 (curl, from this session):
1. A finished example a person agreed to be named on: [hub page for yiheng-wang](https://hub.agenticcells.site/cells/yiheng-wang/), demo, not a customer.
2. How a site gets made: [site-factory](https://hub.agenticcells.site/cells/site-factory/).
3. An email cell, for the "draft my inbox" buyer: [cell-email](https://hub.agenticcells.site/cells/cell-email/).
4. Back to the offer: /website-cell/ and the ladder on /cells/.
Suggested wording: "Four pages to read, in this order. Each is a demo; none is a customer's." Designer@: render as a numbered strip, not the hub's filter grid. Naming rule: only people who agreed to be named (Dinis's standing rule); the two personal sites are already named with agreement in content/cells.md.

## Decisions for Dinis
- Whether a named security contact exists.
- Whether writer@ may state, on /trust/, that a cell in a customer's environment asks for the narrowest credential per role (a design intent, not yet measured).

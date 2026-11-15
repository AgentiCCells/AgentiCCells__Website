# Brief: the orange grower (an example site)

Status: brief drafted, not built. Owner: sites@AgentiCCells.dinis. Instructed by: Dinis Cruz only.

## Dinis's words
- 2026-11-15, newsroom, "A hub for agentic sites": "The first example is a made-up customer: an orange grower in the Algarve who sells wholesale and ships the oranges. A buyer, a shop or a juice bar, chooses the oranges and the quantity, chooses where they should be delivered, sees the price of the oranges and of the delivery, accepts it, and sends an order request. There are no payments on the site; the farmer confirms by reply."
- Same article: "I will play the farmer. A dedicated session plays the whole team, conductor, designer, editor, developer and security, each step signed and on the board."
- Same article: "It will say on every page that it is an example, and it will go on the hub as an example and as a template."
- Same article: "The orange grower is made up, an example played by me, with no real farm, prices or payments."
- 2026-11-15, this session, in reply to which site to start with: "can you start with the orange seller idea? do you have that?" (time not recorded by the harness).
- 2026-11-15, this session (after the first draft): "this should live in its own repo, which eventually we will automate. you also need to use the vault to publish it (see SG_SEND_ACCESS_KEY). can you see sgit.ai for guidance on publishing vaults inside git repos (with the vault's .vault data pushed to github), which provides a number of powerful advantages"

## What the site does (from his words)
1. Buyer picks oranges (variety) and a quantity.
2. Buyer picks a delivery place.
3. Site shows the price of the oranges and of the delivery.
4. Buyer accepts and sends an order request.
5. No payments. The farmer confirms by reply (outside the site).

## Rules for this site
- Every page says it is an example. All farm details, varieties, prices and delivery rates are invented and marked as invented (CLAUDE.md: mark proposals and simulations).
- Static site only (the hub relies on that). Nothing is sent from the site by us: the order request is a draft the buyer sends from their own mail or a form the farmer owns; no customer data is kept by us.
- No real person, farm or company is named.
- Licences: code Apache-2.0, text CC BY 4.0.
- Later, as Dinis the farmer: steering through a key made in his browser and requests such as "the late Valencias are in from Monday" (needs the key and lane steps of ACC-021; not built).

## Not decided (asked of Dinis)
Language and how the order request leaves the page. Repository: its own (Dinis, above); I may not create it, so Dinis creates it and attaches it. Vault: needs SG_SEND_ACCESS_KEY, which is not set in this session. See board/.

# Cell page convention

For writer@ and anyone adding a cell page. Written by designer@AgentiCCells.dinis, 2026-11-16, for queue item D-CELL, from Dinis Cruz's article "The cell is the unit" (newsroom.sgit.ai, 2026-11-16, "What to build next" 2). The worked example is `content/website-cell.md`. The layout is a proposal, as the article's catalogue is.

## What the page contains, in this order
1. `# Title`, then one line: **what it does**. This becomes the lede in the page band.
2. Optional short facts as a bold-led list (price, what you need, status).
3. `## What you get`, concretely.
4. `## Examples`: real ones only, with links. Say so when there are none.
5. `## Use cases`: the situations where people reach for it.
6. `## Behaviour policy`: one introductory paragraph, then a plain list (no bold leads) of what it can reach and what it will never do. The list is shown as a rule list.
7. Any further sections the cell needs (steps, limits).
8. **Last of all**, `## Four ways to start`, followed by exactly one numbered list of four items, each starting with a bold lead:
   1. `**Free: the recipe.**`
   2. `**Our agent helps you.**`
   3. `**We help you: £1,500.**` (first proposal)
   4. `**We set it up for you: from £500.**` (first proposal)

Prices are first proposals; say so in the item. Mark a way that does not exist yet as a proposal.

## How the layout works (CSS only, no script)
- The panel is the `h2` with the id `four-ways-to-start` (the build makes the id from the heading, so the heading text must be exactly "Four ways to start") and the numbered list straight after it. Nothing may follow that list: anything after it is shown in the panel's column.
- 64rem (1024 px) and wider: the page is a main column (38rem) and the panel beside it, starting level with the first block after the page band.
- Narrower: one column; the panel is a card list at the end, under the main column.
- Keep the first block after the band short (the facts list or one paragraph), since the panel starts beside it.
- A page without that heading is unchanged.

## For dev@ (not done: outside this item's files)
A wrapper in `build/build.mjs` (`<aside class="cell-side">` around the heading and list) would replace the 3rem offset and the `:has()` selector with a plain two-column grid.

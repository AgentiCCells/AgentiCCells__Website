# The five home designs: design directions

Written by designer.agenticcells-ai@AgentiCCells.dinis, 19 November 2026, for the /next/ preview. This is a design proposal for review, not a decision. Text: CC BY 4.0.

Dinis's words, 19 November 2026 ~03:35 UTC (board/briefs/2026-11-19-sovereign-preview.md): "very product driven", "very visual, lots of examples, lots of infographics, lots of pages to explain stuff", "very professional, but again, different styles".

## What all five share

- **The same words and data.** Every word comes from next/copy.json, every price from data/next/offer.json, every competitor fact from data/next/competitors.json, every example from next/examples.json. A design changes order, voice and look, never the claims.
- **The first screen** says the one idea in plain words, shows the offer and its price with the words "launch price", and has one main button. No internal terms ("cell", "vault", "conductor") on the first screen.
- **Product first.** Each design shows the product within the first two screens: a real site from next/examples.json, or a figure of what arrives (the deliverables).
- **The infographics** are the eight figures in next/figures/ (see next/figures/README.md). A design places them and recolours them with the `--fig-*` properties; it never redraws them. Each sits in a `<figure>` with its text version in a `<details>` below.
- **Type: system font stacks only.** No web fonts and nothing loaded from another host. The stacks used below:
  - Sans: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Serif: `Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif`
  - Mono: `ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace`
- **Standards.** Works from 360 px with no horizontal scroll and a 16 px gutter; text contrast at least WCAG AA (the accent pairs below were measured: all 5.2:1 or more against their background); images under 200 KB; the Preview band on every page; examples labelled as a named person's site or a demo.
- **Sections, in some order:** the tenets or promises, what you get, rent or own, can you leave, three years of a platform, how it works, the team, examples, the offer and the bigger offers, partners, honest notes, questions, a final call to action. Each design picks the order that tells its story.

## 1. Sovereign (/next/d/1/)

**For:** anyone. **The story:** a cell is yours: a small team of agents, set out like a deed, in ink and paper.

- **Mood:** calm, settled, a little formal. A deed, not an advert. Deep ink and warm paper.
- **Type:** serif headings (Georgia stack), sans body. Headline large and tight; a short italic kicker above it.
- **Palette (tokens):**
  ```css
  .d1 { --bg: #faf6ee; --fg: #10202b; --muted: #4a5761; --line: #e3d9c4; --soft: #f6efe0;
        --accent: #8a5a00; --accent-soft: #f6efe0; --band: #10202b; --band-fg: #f3ead6; --gold: #e9d8a6;
        --fig-accent: #8a5a00; --fig-ink: #10202b; --fig-muted: #4a5761; --fig-bg: #ffffff;
        --fig-line: #e3d9c4; --fig-good: #2f6b3a; --fig-warn: #9a4a12; }
  ```
- **First screen:** a deep ink band. Left: kicker "A website you own", the headline from `copy.leads.sovereign.headline`, the lede, two buttons. Right (stacked under it on a phone): the offer card on paper, the price set large with "launch price" beside it, "usually" price, the free evaluation line. Under the band, a thin strip of five small icons, one per tenet, each linking to its section.
- **Sections:** tenets (the figure full width, the first section), what you get (deliverables figure beside the list), rent or own, can you leave, three years of a platform, how it works, examples (three large cards), team, offer and bigger offers, partners, honest notes, questions, final band in ink.
- **Infographics:** set in a two-column section from 60rem: words on the left, figure on the right; on a phone, words then figure. Thin gold rule under each section heading.
- **Examples:** three large screenshot cards with a paper frame and a caption line "whose site, what it is, labelled".
- **Clearly different because:** it is the only serif, ink-and-paper design, and the only one that opens with the tenets as a strip under the hero.

## 2. Six promises (/next/d/2/), the safest default

**For:** first-time buyers and small businesses. **The story:** six things every cell gives you, each with a proof you can open.

- **Mood:** light, bright, confident, friendly. Numbered cards, lots of white.
- **Type:** sans throughout, headings weight 800 with slight negative letter-spacing; numbers in the cards large and tabular.
- **Palette (tokens):**
  ```css
  .d2 { --bg: #ffffff; --fg: #17222b; --muted: #55636e; --line: #f1dcc4; --soft: #fff7ec;
        --accent: #c2410c; --accent-soft: #ffedd5;
        --fig-accent: #c2410c; --fig-ink: #17222b; --fig-muted: #55636e; --fig-bg: #ffffff;
        --fig-line: #f1dcc4; --fig-good: #15803d; --fig-warn: #475569; }
  ```
  (`--fig-warn` is a neutral slate here, so "renting" does not compete with the orange accent.)
- **First screen:** the pitch sentence from `copy.leads.six-promises.headline`, one clause per line, the first clause in the accent. Beside it on desktop (below on a phone): the offer card and the button "Apply for a free evaluation site". A row of six small numbered chips under the headline jumps to each promise.
- **Sections:** six promise cards in a three by two grid (one column on a phone), each with its line, its proof and the proof link; then what you get; examples; rent or own; three years of a platform; how it works; can you leave; team; offer; partners; honest notes; questions; final call.
- **Infographics:** full width inside soft cream panels with rounded corners; each panel heading is a question ("What arrives?", "What does a year cost?").
- **Examples:** a horizontal row of four screenshot cards that wraps to two by two, then one column.
- **Clearly different because:** it is built on the six numbered cards and the sentence itself; it is the brightest and least formal, and it shows the proof links more than any other design.

## 3. Stop renting your website (/next/d/3/)

**For:** people paying a platform every month. **The story:** a ledger: the cells we sell by size and price, against renting software by the month.

- **Mood:** an account statement. Ruled lines, columns, figures that add up. Honest arithmetic, not alarm.
- **Type:** sans headings weight 800, condensed feel through tight tracking; numbers and the ledger in the mono stack with tabular figures.
- **Palette (tokens):**
  ```css
  .d3 { --bg: #fbfaf7; --fg: #1c1917; --muted: #57534e; --line: #d6d3cc; --soft: #f3f1ec;
        --accent: #166534; --accent-soft: #dcfce7; --rent: #b91c1c; --rent-soft: #fef2f2;
        --fig-accent: #166534; --fig-ink: #1c1917; --fig-muted: #57534e; --fig-bg: #ffffff;
        --fig-line: #d6d3cc; --fig-good: #166534; --fig-warn: #b91c1c;
        --fig-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  ```
- **First screen (as built in round 2):** the headline with the lede beside it, then a two-column ledger: "Renting" holds bars of three years of each platform's entry plan (Wix, Squarespace, WordPress.com, Framer, Durable, Fliplet), each amount linked to the platform's own price page, in USD as published; "Owning" holds the launch price set large, the offer note and the two buttons. On a phone, owning comes first so the price is near the top. The round 1 sketch was: a split hero. Left half "Renting" on a pale red ledger: rows "Month 1, Month 2, Month 3 ..." fading out, the competitor's published monthly price from data/next/competitors.json with its ISO code, source link and read date. Right half "Owning" on pale green: one row, our price with "launch price", and the line "then nothing". The headline across both: "Stop renting your website." On a phone the two halves stack, renting first.
- **Sections:** three years of a platform (the chart, first and full width), rent or own (the table figure), can you leave, what you get, how it works, examples, honest notes (moved up, because the Claude plan is a running cost the reader should see), offer, partners, questions, final call.
- **Infographics:** in ruled "statement" panels with a header row (date read, source); the chart and the rent-or-own figure use the red and green tokens; the other figures use green only.
- **Examples:** a compact table of real sites: name, what it is, "moved in", link; one screenshot per row on desktop.
- **Clearly different because:** it is the only design that leads with money and a chart, uses a ledger layout and mono figures, and shows two colours for two choices.

## 4. Just say it (/next/d/4/)

**For:** people who want the offer in plain words. **The story:** big plain statements about cells, one per screen: you say it, your team does it.

Round 2 change (conductor's brief to the designer, 19 November 2026: "plain, bold, typographic, very short sections, big statements, one figure per screen"). The earlier chat-panel direction is dropped.

- **Mood:** plain and bold. A poster, not a dashboard. Near-black page, warm white type, one yellow accent.
- **Type:** Helvetica Neue first, weight 800, tight tracking; statements up to about 6rem; a mono counter ("01 / 06") drawn by CSS, so no bare number sits in the text.
- **Palette (tokens):**
  ```css
  .d4 { --bg: #0c0c0c; --fg: #f4f1ea; --muted: #a8a49b; --line: #2b2a27; --soft: #161616;
        --accent: #ffd23f; --accent-fg: #0c0c0c; --accent-soft: #2a2410;
        --fig-accent: #ffd23f; --fig-ink: #f4f1ea; --fig-muted: #a8a49b; --fig-bg: #161616;
        --fig-line: #3a3833; --fig-good: #4ade80; --fig-warn: #fb923c; }
  ```
  (Estimated: the warm white on the background about 17:1, the muted text about 7.9:1, the yellow about 13:1.)
- **First screen:** "Just say it." in white and "Your site changes." in yellow, each on its own line; the one idea; the lede; a yellow rule, then the price large with "launch price" and the two buttons.
- **Sections:** the six promises, word for word from next/copy.json, one per screen, each with its line, its proof link and one picture: you own it (what you get), nobody can lock you in (can you leave), you change it by talking to Claude (brief to your own Claude), you can run it anywhere (the tenets), it looks better (six screenshots), almost nothing to attack and it costs once (three years of a platform). Then rent or own, how it works, the team, the price, questions, and a yellow final band.
- **Infographics:** dark through the `--fig-*` tokens.
- **Examples:** six bare screenshots, labelled on the image.
- **Clearly different because:** it is the only design built of whole-screen statements, the only near-black page, and it has the largest type.

## 5. Proof, a wall of real sites (/next/d/5/)

**For:** people who believe what they can see. **The story:** a wall of live sites and cells at work first; the words come after.

- **Mood:** a gallery. Neutral walls, the work in colour, little decoration.
- **Type:** sans throughout, headings tight (Helvetica Neue first in the stack); captions small and plain.
- **Palette (tokens):**
  ```css
  .d5 { --bg: #ffffff; --fg: #0b0c0e; --muted: #5b6168; --line: #dfe3e8; --soft: #f1f3f5;
        --accent: #1d4ed8; --accent-soft: #dbeafe;
        --head: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
        --fig-accent: #1d4ed8; --fig-ink: #0b0c0e; --fig-muted: #5b6168; --fig-bg: #ffffff;
        --fig-line: #dfe3e8; --fig-good: #15803d; --fig-warn: #b45309; }
  ```
- **First screen:** a short headline line ("Sites we have made. Each one is owned by the person it is for.") and the offer button, then straight into the wall: a masonry-like grid of screenshots from next/examples.json (four columns on desktop, two on a tablet, one on a phone), each with its label (a named person who agreed, our own, or Demo) and a link. The price with "launch price" sits in a sticky bar at the bottom on a phone and top right on desktop.
- **Sections:** the wall (all examples), what you get, the tenets, can you leave, rent or own, three years of a platform, how it works, team, offer, partners, honest notes, questions, final call.
- **Infographics:** after the wall, on the grey wall colour, two figures side by side on wide screens (tenets with deliverables, can you leave with rent or own), one per row below 60rem.
- **Examples:** the whole first screen and more; demos say Demo on the image, not only in the caption.
- **Clearly different because:** it is the only design with no hero illustration and no lead copy beyond a line; the product is shown, not described.

## Round 2

All five are built (designer, round 2). Shared helpers for the designs are in build/next/design-kit.mjs: example tiles labelled by kind ("Made for <name>" only where consent to be named is recorded, "Demo", "Our own"), platform bars, a compare teaser, a large price line. Design 5 ends its wall with a tile that says "Then ask for yours." with the price and the button.

Round 1 note: The developer builds designs 1 and 2 from this now (their sheets already follow these directions). The designer builds 3, 4 and 5 in round 2, replacing the stubs in assets/next/d3.css, d4.css and d5.css.

## Round R1: agentic cells (19 November 2026)

Dinis's words, relayed at 17:33 UTC and his own at about 17:55 UTC, are in board/briefs/2026-11-19-refactor-agentic-cells.md. agenticcells.ai is now about agentic cells: small teams of AI agents, each with a role, a brief and a behaviour policy, working in one session in the customer's own accounts. The offer is the four-rung ladder of data/cells.json, each price a first proposal. The two main case studies are PrompTugal.news and the Sovereign Agentic Website; the sovereign website's own launch price is shown only in its case study, linked to sovereignwebsite.ai. This is a proposal for review, not a decision.

- **What changed for all five.** The first screen shows the lead and the ladder: a compact four-rung list (designs one to three) or the entry price, "first proposal", set large (designs four and five). Then, in order: the case studies, what a cell is (with the cell figure), the cells we sell (the ladder figure and cards), the sovereign website as the example, a bigger cell at work (our own team's pages from Web Summit), what every cell has, the devices (marked as a plan), the team, examples, questions and a final call to action. The sections are built in build/next/cells.mjs; each design dresses them in its own sheet.
- **The first-screen rule is reversed.** Round 1 kept "cell" off the first screen; the refactor makes the cell the subject, so it is there now.
- **1. Sovereign:** the compact ladder is the paper card of the ink hero; the case studies sit in paper frames; the sovereign website is an ink band with the named owners' sites as deeds.
- **2. Six promises:** the six properties of a cell are the numbered cards under the first screen, as the promises were (the headline says "six things every cell gives you"); the sovereign website's sites in browser frames on the dark band.
- **3. Stop renting your website:** the first screen is a statement in two columns: the lead, and the cells by size and price in mono figures. The platforms' three-year prices now sit with the sovereign website, as its argument against renting.
- **4. Just say it:** each section is a big statement; what every cell has is six numbered screens, the count written by the page.
- **5. Proof:** the wall mixes the live sites with screenshots of our own team's work at Web Summit, labelled "Cells at work", the team's working site first and large.
- **New figures:** next/figures/cell.mjs (one session, a conductor and six agents, the owner outside; a laptop or a cloud session today, a Raspberry Pi and an Android tablet planned) and next/figures/ladder.mjs (the cells we sell as a staircase, prices from the data files).

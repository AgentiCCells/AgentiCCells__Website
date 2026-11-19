# Round 1: designer.agenticcells-ai@AgentiCCells.dinis

19 November 2026. Sub-agent of conductor.agenticcells-ai@ in session https://claude.ai/code/session_01Kw9UwBFAEwyPc1Pt1idWxz. Nothing committed or pushed; build/build.mjs not run; site/ not touched.

## What I made

- **next/figures/**: the eight infographics as modules, `export default function (data) { return { svg, text } }`: tenets, rent-or-own, can-you-leave, brief-to-claude, team, year-of-platform, deliverables, how-it-works, plus `_shared.mjs` (helpers; build/next/parts.mjs already skips files starting with `_`).
  - Each figure holds a wide SVG (viewBox 960) and a narrow SVG (viewBox 400); a container query shows one, so each reads from 360 px to 1200 px with text at 13 px or more.
  - Colours, font and tints come from `--fig-*` custom properties, which fall back to the /next/ base tokens (`--accent`, `--fg`, `--muted`, `--bg`, `--line`, `--font`) and then to neutral defaults. In designs 1 and 2 the figures already pick up each design's accent.
  - Words come from next/copy.json where the writer has them (tenets, rent_or_own, deliverables, steps, team); the figures' own short words fill the gaps.
  - Competitor facts come from data/next/competitors.json; missing ones say "to be confirmed". No competitor number or quote is invented.
- **next/figures/README.md**: each figure, its data fields, its CSS variables, the ids and how it was tested.
- **next/DESIGNS.md**: a direction for each of the five home designs: mood, system font stacks, palette as tokens (contrast measured), first screen, sections, where the infographics and examples go, and what sets each apart. Designs 1 and 2 follow the developer's existing d1.css and d2.css.

## Checks run

A scratch harness in /tmp/claude-0/figtest/ (not in the repository) imported each module with no data, stub data and the real files, then took Playwright screenshots of every figure at 390 and 1366 px, plus a dark recolour and the figures inside the developer's /next/d/1/ and /next/d/2/ rendered to a scratch folder. It also checked:

- no horizontal scroll;
- no em dash or hype word;
- every £ line carries "launch price";
- no key-shaped string;
- build/leak-scan.mjs `scanText` clean;
- unique ids;
- build/check-evidence.mjs `findings` empty for the text versions.

All passed.

## Problems and questions for the conductor

1. **Every competitor price is in USD.** The researcher could not read GBP prices (data/next/competitors.json, currency_note). year-of-platform does not convert anything:
   - It draws the platforms on their own axis, "In USD, as published, not converted". Over three years that is Wix USD 612, Squarespace USD 684 and Fliplet USD 900, from their own pages.
   - It shows the website cell as one payment at the launch price, then "nothing more" in years two and three, and does not draw it as a bar on the USD axis.

   If GBP prices arrive, the chart draws them on a GBP axis with no code change.
2. **Six steps or seven.** next/copy.json says "in six steps", but the brief asked for seven. how-it-works shows seven: "Ask for a site" and then the writer's six. Setting `copy.figures["how-it-works"].first = false` shows the six alone.
3. **The team has seven roles in the figure and five in the copy.** The brief names seven agents: conductor, designer, developer, writer, researcher, reviewer, security. next/copy.json `team` lists five and says a writer and a reviewer join on bigger jobs. The figure shows seven, using the writer's words for the five it shares. The writer or the conductor should decide which is true for a small site.
4. **The three-month hand-over is worded as an expectation, not a promise,** as the conductor asked: "Yours within three months at the latest: an expectation we set ourselves, not yet a rule in the terms."
5. **Each SVG carries its own heading.** Where a page section already has the same h2, the developer may want a figure option to hide it. Tell me and I will add one in round 2.
6. **The figures do not use next/examples.json in round 1.** Design 5 (Proof) will use it in round 2.

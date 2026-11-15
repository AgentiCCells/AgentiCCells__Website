# The website repository

A static site built from files, served by GitHub Pages at agenticcells.ai. No database, no server, no trackers.

```
/                         repository root
  CLAUDE.md               the rules (copy of the bootstrap's)
  REALITY.md              what exists, kept true
  README.md               how to build and release
  CNAME                   agenticcells.ai
  content/                pages in markdown (index.md, method.md, cells.md, open-source.md, console.md, about.md)
  data/                   JSON: cells.json (the ladder), stack.json (the open components), links.json
  build/build.mjs         markdown + data → site/ (no dependencies beyond Node)
  build/validate.js       the gate: links resolve, every page has a title and description, no em dashes,
                          no key-shaped strings, prices marked "first proposal", must print OK
  assets/                 css, fonts (self-hosted), images
  board/                  the team's board: one markdown file per item, briefs/, debriefs/, HOLD.md when stopped
  team/keys.json          public keys of every agent
  dns/records.json        every DNS record, as data
  .github/workflows/      build, validate, deploy to Pages on push to main
```

## First pages

1. **Home (index.md):** what AgentiCCells is in one sentence; the four properties (open, in your environment, no state on our side, atomic cells); the ladder marked "first proposal"; the console; a contact route.
2. **The method (method.md):** how a cell is set up: brief, keys, board as files, lanes and vaults, releases, the stop file, hand-overs.
3. **Cells (cells.md):** the four sizes, what each includes, and the six setups of an agentic system they map to.
4. **Open source (open-source.md):** the stack we assemble (the workflow, Ruflo, sgit vaults, the console, runtimes) with each component's licence and link.
5. **The console (console.md):** what the customer sees and controls; link to the simulated console.
6. **About (about.md):** who is behind it; the history so far (ruv.sgit.ai, the book, Web Summit, RiskMandate as a partner, PrompTugal.news); links to the newsroom articles.

## Style
- Plain British English, short sentences, no hype words, no em dashes.
- Every claim has a source or is marked as a proposal.
- Works on a phone at 390 pixels wide with no horizontal scroll; readable in dark mode.

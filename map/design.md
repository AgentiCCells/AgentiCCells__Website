# Map: the site's design

Kept by designer@AgentiCCells.dinis. Brief: board/briefs/designer.md. Goal (Dinis, 2026-11-15): "I want to start selling this website". Aim: clear, calm, credible.

## D1 · Visual identity (2026-11-15)

### Text mark
- The wordmark is the word "AgentiCCells" set in the body font, bold, one step larger than body text, in the text colour. Markup: `<a class="brand" href="/">` in build/build.mjs.
- Before the word is a small outlined rounded square in the accent colour, drawn in CSS (`.brand::before`): one cell. No image file, nothing to license.
- The two capital Cs are not styled apart from the other letters. Reason: queue item D7 holds any "CC" styling until researcher@'s S4 answers whether Creative Commons' trademark policy allows it. The capitals already make the double C visible in plain text.

### Colours
Two palettes, chosen by `prefers-color-scheme`. One accent (a deep teal, lightened for dark mode), neutrals with a slight cool tint, no other colours on content pages. Why: a single calm accent reads as a business tool, not a campaign; teal keeps it apart from the default link blue without loud colour.

| Token | Light | Dark | Use |
|---|---|---|---|
| --bg | #ffffff | #111518 | page |
| --surface | #f4f6f6 | #1a2025 | code, later cards |
| --fg | #16191d | #e7eaed | text |
| --muted | #4f5861 | #a7b0b8 | footer, table heads, notes |
| --accent | #0a5c6b | #6ec6d6 | links, the mark, focus ring |
| --on-accent | #ffffff | #111518 | text on an accent fill (buttons, D2) |
| --line | #d5dbdf | #2e373e | rules and borders (not text) |

Contrast, measured with the WCAG 2.x relative-luminance formula (script run in the designer session, 2026-11-15). AA needs 4.5:1 for body text.

| Pair | Light on bg | Light on surface | Dark on bg | Dark on surface |
|---|---|---|---|---|
| fg | 17.63 | 16.26 | 15.20 | 13.62 |
| muted | 7.24 | 6.67 | 8.34 | 7.47 |
| accent | 7.62 | 7.02 | 9.36 | 8.39 |

on-accent on accent: 7.62 (light), 9.36 (dark). Every text pair passes AA and AAA (7:1).

### Type
- System font stack (`system-ui` and platform fallbacks), monospace stack for code. Why: no font file to host, license or download; fast; the validator forbids other hosts anyway. If a brand font is wanted later, it must be self-hosted with its licence recorded here.
- Scale: ratio 1.25 from a 1rem body (1rem, 1.25, 1.563, 1.953, 2.441). h1 is fluid between steps 3 and 4. Body is 17px from 768px wide up. Line length capped at 42rem.
- Focus: a 3px accent outline on `:focus-visible` (more in D6).

### Checked
- `node build/build.mjs` and `node build/validate.js`: OK.
- Playwright (pre-installed Chromium), home, cells and console pages at 390px and 1280px, light and dark: no horizontal scroll (scrollWidth equals viewport width in all twelve cases); screenshots looked at.
- Seen, left for later items: on the console board, item codes such as `ACC-001` break across two lines at 1280px (from `overflow-wrap:anywhere`, older than D1): D4. The header nav wraps to a second line at 1280px: D3.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Visual identity: text mark, palette, type scale | designer@ | brief, queue D1, D7 | assets/style.css, `.brand` in build/build.mjs, this file | team/activity/designer.jsonl, D1 commit |

## D2 · Home page layout (2026-11-15)
- First screen: the h1 and the opening sentence become a `.hero` section with one call to action, a button "Email agent@riskmandate.ai" (template markup in build/build.mjs, `hero()`, home page only). No words in content/ changed.
- Lists whose every item starts with a **bold lead** get `class="points"` and show as cards in a grid (one column at 390px, two at 1280px). On the home page: "What you get in week one" and "Four properties". The same rule also applies on other pages with such lists.
- The ladder table (`{{ladder}}`) carries `data-label` on each cell; under 40rem each row is a card with its labels.
- Numbered lines ("1. ...") now render as an ordered list (`ol.steps`) with numbered badges; before, "How to start" showed as one run-on paragraph.
- The CTA is the email for now. When writer@'s /website-cell/ page exists (W10), D9 makes that the main call to action.

### Checked
- `node build/build.mjs` and `node build/validate.js`: OK.
- Playwright, home, cells, about and console at 390px and 1280px, light and dark: scrollWidth equals viewport width in all sixteen cases; screenshots looked at.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 2 | Home layout: hero and CTA, point cards, ladder cards, numbered steps | designer@ | queue D2, content/index.md | assets/style.css, build/build.mjs (markup and classes) | team/activity/designer.jsonl, D2 commit |

## D9 · The /website-cell/ seven-step diagram (2026-11-15)
- An inline SVG (`figure.flow`) inserted by build/build.mjs before the numbered steps on /website-cell/ only. One vertical column of seven numbered nodes with who acts at each (you, us, our agents, your browser). Vertical so it reads at 390px with no scroll. Has `<title>`, `<desc>` and a caption that says it is a proposal not yet run end to end. No words in content/ changed; the "who acts" labels are a reading of writer@'s steps, so writer@ should confirm them.
- Colours come from the palette variables, so light and dark both work. No external files, no script.
- The page already shows the CTA as the home page's main call to action (writer@, 3f2848c); the button on /website-cell/ itself is left to D3 and writer@.
- Checked: build and validate OK; Playwright over http at 390px and 1280px, light and dark: scrollWidth equals viewport width in all four; screenshots looked at.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 3 | Seven-step diagram for the offer page | designer@ | queue D9, content/website-cell.md | build/build.mjs, assets/style.css | team/activity/designer.jsonl, D9 commit |

# The /next/ infographics

Made by designer.agenticcells-ai@AgentiCCells.dinis, 19 November 2026 (rows for attack-surface and the round 4 year-of-platform data added by developer.agenticcells-ai@AgentiCCells.dinis in round 5), for the /next/ preview (board/briefs/2026-11-19-sovereign-preview.md and board/briefs/2026-11-19-preview-contract.md). Code: Apache-2.0. The figures and their words: CC BY 4.0.

## The contract

Each `next/figures/<id>.mjs` exports `default function (data) { return { svg, text } }`, with `data = { offer, competitors, copy, examples }`:

- `offer`: data/next/offer.json
- `competitors`: data/next/competitors.json
- `copy`: next/copy.json
- `examples`: next/examples.json (no figure uses it in round 1)

`svg` is a `<div class="nfig nfig-<id>" data-figure="<id>">` holding a scoped `<style>` and two inline SVGs: a wide one (`svg.nfig-w`, viewBox 960 wide) and a narrow one (`svg.nfig-n`, viewBox 400 wide). A container query shows the narrow one when the figure's box is under 640 px wide, and the wide one from 640 px up to its 1120 px maximum. Only one is displayed at a time, so screen readers meet one. Put it in a block element (a `<figure>` or a `<div>`), never inside a `<p>`.

Each SVG has `role="img"` and `aria-labelledby` pointing to its own `<title>` and `<desc>`, with ids `<id>-w-title`, `<id>-w-desc`, `<id>-n-title`, `<id>-n-desc` (and `<id>-w-hatch`, `<id>-n-hatch` for the chart's pattern). No external images, fonts or scripts. The smallest text renders at 13 px or more: the wide SVG at 640 px and the narrow one at 358 px (a 390 px phone with 16 px gutters).

`text` is the same information as HTML (a list or a table, with a lead paragraph). Every number in it sits in a sentence with its source link; small counts are in words; every line holding £ or € and a digit also says "launch price". Competitor money uses ISO codes (USD 17), never symbols.

Files starting with `_` are helpers, not figures: `_shared.mjs` holds escaping, wrapping, icons, the styles and the two-variant wrapper. build/next/parts.mjs already skips them.

## Missing data

No figure crashes when a file or a field is missing: tested with no data at all, with stub data and with the real files of 19 November. A missing quote or price says "to be confirmed"; a competitor number or quote is never invented, and a price in another currency is never converted.

## The figures

| id | What it shows | Data it reads (all optional) |
|---|---|---|
| tenets | The five tenets of owning a website: hold, control, change, run anywhere, keep, with the line "where it is hosted is not sovereignty; being able to move it is". | `copy.tenets[]` {word, line "You hold it: ..."}, `copy.one_idea`, `copy.figures.tenets.{title, lead, line}` |
| rent-or-own | Renting a platform against owning your site, row by row. | `copy.rent_or_own[]` {topic, rent, own}, `copy.sections.rent_or_own`, `copy.figures.rent-or-own.{title, lead, rent, own}` |
| can-you-leave | Wix, Squarespace and Fliplet in their own words ("their own words, read 19 November 2026", source host), the researcher's reading labelled "our reading", and our own row, named by `copy.offer_title` ("Your own website"), with the three-month expectation worded as an expectation. In the wide figure the name, kind and "Yes" badge are stacked so the badge does not cover the name (round 4). | `competitors.competitors[]` {id, name, kind, facts.can_you_leave or facts.export: value, quote, source_url, date_read}, `competitors.website_cell` {name, facts.can_you_leave}, `copy.offer_title`, `copy.figures.can-you-leave.{title, lead}` |
| brief-to-claude | From the interview to your own Claude: interview, five designs, you choose, live, first change together (the milestone), hand-over within three months. | `copy.steps[].title` (used when there are six), `copy.figures.brief-to-claude.{title, lead}` |
| team | The seven agents (conductor, designer, developer, writer, researcher, reviewer, security), each with what they do, and you at the centre deciding. | `copy.team[]` {role, does}, matched by the role's first word; `copy.figures.team.{title, lead, you, note}` |
| year-of-platform | Cumulative cost over three years, one plan per platform from its published price, against our launch price. One panel and one axis per currency ("as published, not converted"); a missing price is a hatched "not yet confirmed" bar. Our side, labelled with `copy.offer_title`, has three parts: "Paid once, to us" (the £50 launch price, not drawn on another currency's axis); an optional dashed series on the USD axis, "if you edit it yourself with Claude Pro", summed per year from the plan's monthly price; and "or no editing: the site keeps running at no cost from us". The Claude Pro price is parsed from the data ("Claude Pro: USD .. a month"), never typed in code; if the fact is missing, the dashed series and its note are left out. Labelled "calculated from their published prices, read 19 November 2026". | `competitors.competitors[].facts.price_per_month` (or another price row whose value reads like "USD 17 a month"), `facts.currency_note`, `competitors.website_cell.facts.optional_editing_cost` {value "Claude Pro: USD 17 a month billed yearly ...", source_url, date_read} (or any website_cell fact naming "Claude Pro: USD .. a month"), `offer.launch_gbp`, `offer.launch_eur`, `offer.honest_notes[0]`, `copy.offer_title` |
| deliverables | What you get: a repository with history, a live HTTPS site, five designs, CLAUDE.md, a policy and checks, the ownership transfer. | `copy.deliverables[]` {name, what, why_it_matters}, `copy.sections.deliverables` |
| attack-surface | What there is to attack: a platform site (server code, database, logins, plugins, admin panel, payment pages, all reachable from the internet) against your static site (files only; the host runs its own servers, none of that code is yours), then "Still yours to protect": your GitHub account, your email, your domain registrar, and who you give access to. Wide and narrow SVGs with a text version (a table and a list). It holds no numbers. On /next/security/ (`{{figure:attack-surface}}`). | `copy.offer_title`, `copy.figures.attack-surface.{title, lead, platform, own, own_line, still, note}` |
| how-it-works | The seven steps: ask for a site, then the six steps from the interview to the hand-over, with who does each. | `copy.steps[]` {title, line, who}, `copy.cta.ask`; `copy.figures.how-it-works.first = false` drops the first step and shows the six alone |

## CSS custom properties

Each design recolours the figures by setting these on any ancestor. Each falls back to the /next/ base tokens (`--accent`, `--fg`, `--muted`, `--bg`, `--line`, `--font`) and then to a neutral default, so a design that sets only its base tokens already gets matching figures.

| Property | Used for | Falls back to |
|---|---|---|
| `--fig-accent` | The one accent: icons, numbers, the website cell, the milestone, the band | `--accent`, then #1d4ed8 |
| `--fig-ink` | Main text | `--fg`, then #0f172a |
| `--fig-muted` | Secondary text, competitor bars, neutral tints | `--muted`, then #475569 |
| `--fig-bg` | Card fills and text on the accent | `--bg`, then #ffffff |
| `--fig-line` | Borders, rules, gridlines | `--line`, then #cbd5e1 |
| `--fig-good` | "Owning" and "Yes" | #15803d |
| `--fig-warn` | "Renting" and the competitors' badges | #b45309 |
| `--fig-font` | All figure text | `--font`, then a system sans stack |

Tints are the accent, good, warn or muted colour at low opacity, so they follow each design. `--fig-bg` must contrast with `--fig-accent` (it is the text colour on accent fills). For a dark design, set all eight: tested with a dark palette.

## How they were checked

A scratch script (not in the repository) imported every module with no data, stub data and the real files, wrote one page, screenshotted each figure with Playwright Chromium at 390 and 1366 px, and ran: no em dash, no hype word, every £ line marked "launch price", no key-shaped string, build/leak-scan.mjs `scanText` on each module and on the output, unique ids, and build/check-evidence.mjs `findings` on the text versions. All passed on 19 November 2026.

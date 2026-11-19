---
title: Morning review
description: For Dinis: the five preview designs of agenticcells.ai, what to look at in each, and the decisions the team needs before anything goes live.
---
# Morning review

For Dinis Cruz, from the conductor of agenticcells.ai and its team of agents, written on 19 November 2026 before you woke. Nothing here is live on the main site: every page under /next/ is a preview, hidden from search engines, and linked from nowhere on the current site. The current home page and its prices are unchanged.

## The five designs

Same words and the same data in all five. Open each at phone size and at laptop size.

| Design | Address | What to look at |
|---|---|---|
| Sovereign | [/next/d/1/](/next/d/1/) | The one idea as the headline, the price card beside it, the three named owners' sites under the first screen. |
| Six promises | [/next/d/2/](/next/d/2/) | Your sentence from the pitch as the headline, then the six promises with their proof. The safest default. |
| Stop renting your website | [/next/d/3/](/next/d/3/) | Renting against owning on the first screen: three years of each platform's plan beside the one-off launch price. The reviewer found this the strongest first screen for a small business owner. |
| Just say it | [/next/d/4/](/next/d/4/) | Very large type, one promise per screen. The boldest of the five. |
| Proof | [/next/d/5/](/next/d/5/) | A wall of the example sites first, then the offer. |

The chooser with all five is at [/next/](/next/).

## The pages that explain

[What you get](/next/what-you-get/), [how it works](/next/how-it-works/), [sovereignty](/next/sovereignty/), [no lock-in](/next/no-lock-in/), [security](/next/security/), [examples](/next/examples/), [partners](/next/partners/), [FAQ](/next/faq/), [pricing](/next/pricing/), [compare](/next/compare/) and [how to start](/next/start/). The infographics have a text version under each.

## What the team checked

- Every preview page at phone and laptop size in Chromium: no errors, no sideways scroll, nothing loaded from other sites, no cookies.
- An accessibility scan (axe-core, WCAG A and AA) found nothing to fix on the pages it scanned.
- A buyer's review and a security review are in the repository: board/reviews/2026-11-19-next-preview-r3.md and board/security/2026-11-19-next-preview.md. Their fixes went into rounds 4 and 5.
- Competitor facts come from the competitors' own pages, each with its link and the date read. They are in US dollars as published, because the pages were read from a US address.

## Your decisions

1. **Go live?** Which design becomes the home page, and when. Until you say, the current home page and the current price stay.
2. **Prices.** The preview shows the [£50 launch price](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/data/next/offer.json) (€50 on European pages, launch price), with the usual and the earlier launch price struck through, and the two bigger offers at their first proposal prices. Confirm, and the team changes data/offer.json, which sets the live price.
3. **The network rung** (£20,000, first proposal) is still in older pages and data/cells.json. You did not mention it last night, so the preview leaves it out. Keep it, or retire it?
4. **Languages.** The preview is in English only. The ten live languages are unchanged. Italian, Dutch and Polish were not started. Translate the preview once you choose a design?
5. **Contact address.** The preview carries no email address. Every "ask for a site" goes to /next/start/, which points to the live site's contact. Which address goes live?
6. **Hosting wording.** GitHub Pages is free only for a public repository, and GitHub's terms rule out running an online business on its free hosting. Should owners default to a public repository on GitHub Pages, or to another host so the repository can be private?
7. **The hand-over.** Every page says the site is yours within three months at the latest, as an expectation we set ourselves, not yet a rule in the terms. Should it become a rule?
8. **Prices in pounds.** Should someone in the UK read the competitors' prices in pounds before this goes live?
9. **Names and consent.** Only three people are named on the preview, each with consent recorded. Five more example sites are held back because no consent is recorded: confirm any of them?
10. **Agent names.** The team's commit check does not accept a dot before the @ in agent names, so commits carry a hyphen form of each role's name. Keep the hyphen, or change the check to allow the dot?

The full hand-over is team/HANDOVER.md in the repository.

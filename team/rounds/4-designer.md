# Round 4: the designer of agenticcells.ai

2026-11-19. Written by designer.agenticcells-ai@AgentiCCells.dinis, a sub-agent of the conductor. Files this round: next/figures/*.mjs and assets/next/*.css only. Nothing committed or pushed. build/build.mjs not run or wrapped. site/ not deleted (only build/next-local.mjs wrote into it). No check edited.

## Files changed
- next/figures/year-of-platform.mjs: our side is no longer "nothing more".
- next/figures/can-you-leave.mjs: layout fix and offer_title.
- next/figures/team.mjs: a plain-words line under each role.
- next/figures/attack-surface.mjs (new): token `{{figure:attack-surface}}`, now on /next/security/.
- assets/next/base.css: a fade on the phone nav; styles for the footer page list and the /next/start/ code box with its Copy button.
- assets/next/d5.css: the sticky phone price bar now shows the struck prices.

## The fixes
1. **Three years of a platform.** Our side has three parts, labelled "Your own website" (copy.offer_title):
   - "Paid once, to us: £50, launch price", from data/next/offer.json.
   - A separate, dashed series on the same USD axis as the platforms: "Optional: if you edit it yourself with Claude Pro". It adds up over three years: USD 204, 408 and 612. Under it: "USD 17 a month billed yearly (Anthropic's own price). Plus the £50 launch price, paid once." The plan and its price come from competitors.json, website_cell.facts.optional_editing_cost, parsed from "Claude Pro: USD .. a month". No number is typed in code. If that fact goes missing, the series and its note disappear.
   - "Or no editing: the site keeps running at no cost from us."
   - The hosting note now says that GitHub says Pages is not for running an online business, with a link to GitHub's terms.
   - Text version: each sum sits beside its source link (claude.com/pricing, read 19 November 2026). Each £ line says "launch price".
   - "launch price" and "USD 17" no longer break across SVG lines, so validate.js passes again.
2. **Can you leave.** At 1366 the left column (icon, name, kind, badge) is now stacked and the row grows to fit it, so the "Yes" badge sits under "Your own website" and no longer covers it. The name and the lead come from copy.offer_title ("...and your own website").
3. **Labels.** None of the figures shows a buyer "website cell", "conductor" (except as a role name), "site factory" or "hub". In the team figure each role keeps its name, with a plain line under it: "The project lead", "Makes the look", "Builds the site", "Writes the words", "Checks the facts", "A second reader", "Looks for risks". If the writer sets copy.team[].plain, that wins.
4. **Attack surface.** Two columns. On one side, a platform site with six parts, all online: server code, database, logins, plugins, admin panel, payment pages. On the other, your static site: "Files only", plus a note that the host runs its own servers and none of the code is yours. Below them, "Still yours to protect": your GitHub account, your email, your domain registrar, and who you give access to. The figure follows the usual module shape: wide and narrow SVGs, role="img" with a title and desc, a text version (a table and a list) and CSS variables. It holds no numbers.
5. **Struck £250 on d3 to d5.** CSS alone could not do it: the first-screen price had no £250 in its markup. That belonged to the developer, and it now appears in the build. The one CSS part was d5's sticky phone bar, which hid `.kp-was`. It now shows the struck prices, small, on a line under the price.
6. **Phone nav.** Under 52rem a mask fades the nav's right edge. A blank of the same width ends the list, so the last link shows in full once you scroll to the end.
- Also asked by the conductor:
  - `.code-box` is a framed box that keeps line breaks and wraps on a phone, with the Copy button at the top right.
  - `.foot-pages` is a wrapping row of underlined links, with the current page in bold.

## Checks (last run, after the last change)
- `node build/next-local.mjs`: 18 pages. `node build/validate.js`: OK. The only warnings are four V-OG description lengths on live pages, not /next/.
- `node build/check-evidence.mjs`: OK. `node build/leak-scan.mjs`: OK (757 files).
- Chromium via `python3 -m http.server 8127 -d site` at 390x844 and 1366x768:
  - Pages checked: /next/compare/, /pricing/, /faq/, /no-lock-in/, /security/, /start/, /partners/, /d/4/ and /d/5/.
  - All returned 200, with no horizontal scroll and no console errors.
  - Each figure was screenshotted and looked at. The server was stopped afterwards.
- No em dashes or hype words in the changed files.

## Left for others
- /next/faq/ no longer has the can-you-leave figure (the writer's change), so I checked it on /next/no-lock-in/ and d4.
- next/figures/README.md (not in my files this round) needs a row for attack-surface and the new year-of-platform data (website_cell.facts.optional_editing_cost, copy.offer_title).

## Refused or blocked
Nothing refused or blocked.

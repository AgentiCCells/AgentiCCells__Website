# Round 3: the developer of agenticcells.ai

2026-11-19. Written by the developer agent of agenticcells.ai, a sub-agent of the conductor, for its six round 3 fixes. Nothing committed or pushed. build/build.mjs not run or wrapped. site/ not deleted (only build/next-local.mjs wrote into it). No check edited.

## Files changed
- build/next/labels.mjs (new): exLabel() (moved from design-kit.mjs unchanged, plus `demo: true` as a demo) and offerTitle().
- build/next/parts.mjs: imports labels.mjs. Offer card, pricing ladder and both tables use offerTitle. examples() uses exLabel. deliverables() no longer doubles the list. New proofLink() and onceHonest().
- build/next/design-kit.mjs: imports exLabel from labels.mjs and re-exports it, so d5.mjs is unchanged. The compare teaser's row is labelled with offerTitle.
- build/next/d3.mjs, d5.mjs: a visually hidden h2 for the "three years" section (d3) and the wall (d5), which had only an aria-label.
- build/next/d4.mjs: the promise links use proofLink().
- build/pages/next.mjs: onceHonest on every /next/ page; the deliverables figure shown once on a page that has both tokens.
- next/copy.json: one key added, `"offer_title": "Your own website"`. The writer's other words are unchanged.

## The fixes
1. **Offer label.** The offer card, the pricing ladder's first rung, the compare and features tables' first column and the d3 compare teaser now read copy.offer_title, "Your own website". Default: the same words. Search of all five homes: no "cell" or "conductor" in the first viewport or above the first h2, at 390x844 and 1366x768. In d3 and d5 the year-of-platform figure ("The website cell") and the wall captions ("sells website cells", "our cells make") were never in the first viewport. They sat above the first h2 only because those sections had no heading. Each section now has a visually hidden h2, which also helps heading navigation.
2. **Example labels.** examples() uses exLabel. /next/examples/ now shows "Made for José Bota", "Made for Silvio Switha" and "Made for Yiheng Wang", plus six "Demo" and eleven "Our own". "Made for an owner" appears nowhere.
3. **What you get.** deliverables() shows the figure only. Its "Text version" already lists the same six items. If a figure ever has no text, the list becomes its text version; if the figure is missing, the list shows alone. what-you-get.md has both `{{figure:deliverables}}` and `{{deliverables}}`. The figure now shows once, at `{{deliverables}}` under "Six things, all yours".
4. **Honest notes, once per page.** onceHonest() keeps the first copy of the honest notes on a page and drops later ones (the ladder's, the compare table's notes) along with any wrapper left empty. Now one list on every page that has them, pricing included.
5. **Proof links.** Each link reads "Proof: <promise title>", e.g. "Proof: You own it". If copy sets `proof_link_text` (or `proof_label`), that wins. Used in parts.mjs promises() and in d4.

## Checks (last run, after the last change)
- `node build/next-local.mjs`: 18 pages.
- `node build/validate.js`: OK. The only warnings are two V-OG description lengths on live pages, not /next/.
- `node build/check-evidence.mjs`: every figure has an evidence link in its sentence.
- `node build/check-internal-links.mjs`: all resolve.
- `node build/leak-scan.mjs`: OK (749 files, 447 binary skipped).
- Chromium (Playwright) against `python3 -m http.server 8126 -d site`, all 18 /next/ pages at 390x844 and 1366x768: ALL OK, 36 of 36.
  - Every page: status 200, no console errors, no requests to other hosts, no horizontal scroll, one h1.
  - The server was stopped afterwards.

## Left for others: "cell" and "conductor" near the top of explain pages (not my files)
- **Designer:** next/figures/year-of-platform.mjs hard-codes "The website cell" (/next/compare/, in the first viewport; /next/pricing/). next/figures/can-you-leave.mjs's lead says "Three platforms in their own words, and the website cell." (/next/faq/, /next/no-lock-in/, in the first viewport). Both could read copy.offer_title.
- **Researcher:** data/next/competitors.json website_cell name "A website cell from AgentiCCells" (same figure). next/examples.json "sells website cells" and "the sites our cells make" (/next/examples/, in the first viewport).
- **Writer:** copy.team "Conductor" (/next/partners/ team figure, first viewport). copy.bigger "A team" line "A conductor and its agents" (/next/pricing/, above the first h2). what-you-get.md could drop `{{figure:deliverables}}`, since `{{deliverables}}` now draws the figure. Under "Six things, all yours", the figure's own title "What you get" shows as a second heading.

## Refused or blocked
Nothing refused or blocked.

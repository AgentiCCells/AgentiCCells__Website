# Round 1: writer.agenticcells-ai@AgentiCCells.dinis

Brief: board/briefs/2026-11-19-sovereign-preview.md and board/briefs/2026-11-19-preview-contract.md, from the conductor, 2026-11-19. Not committed by me; the conductor commits.

## What I wrote
- next/copy.json: the home page words for all five designs. One lead per design (sovereign, six-promises, stop-renting, just-say-it, proof), each with the one idea "A website you own, control and can take anywhere" as the headline or the line under it, and no internal words on the first screen. Also offer_line (and offer_line_eur), the six promises led by ownership, the five tenets, eight rent-or-own pairs, six deliverables, six steps (interview first, first change made together, hand-over within three months), the team, the two honest notes, the two bigger offers (words only, {price} from data), section intros, sixteen FAQ items and CTA labels.
- next/pages/: what-you-get, how-it-works, sovereignty, no-lock-in, security, examples, partners, faq, pricing, compare, start. Each has a title, a description of 110 to 150 characters and the contract's tokens.

## Notes for the developer
- copy.json strings may hold inline markdown links `[text](url)`; render them, because the evidence check needs the link in the same sentence as a figure.
- Placeholders: {launch}, {launch_eur}, {usual}, {earlier}, {price}. On the local render of 2026-11-19, {launch} and {usual} were not filled inside the FAQ answer "What does it cost?" (site/next/faq/ and the five designs).
- {{contact}} is used as the link target for "Ask for a site", as the conductor asked (it renders to /start-here/). No email address is in any file I wrote.

## Checks run (on my files only)
- No em dashes, no hype words, no email address, no Algarve Evolution, no "website cell" on a price line.
- Every line with £ or € and a digit says "launch price" or "first proposal".
- node build/next-local.mjs then node build/check-evidence.mjs: "every figure on the published pages has an evidence link". The validator's remaining failures were broken links to assets/next/*.css (developer's, not yet written).

## Sources read (2026-11-19)
Dinis Cruz's articles at newsroom.sgit.ai/articles/: the-sovereign-website (in full), the-pitch, sovereignty-you-can-move, no-lock-in, static-against-the-platforms, fliplet-and-the-website-cell, partners-sell-we-build, you-bring-the-business, the-website-cell, the-cell-is-the-unit, fork-it, a-hub-for-agentic-sites, a-team-like-this, start-with-an-interview. GitHub's Pages documentation (what-is-github-pages), read 2026-11-19, for the free-hosting sentence on /pricing/. In this repository: content/website-cell.md, start-here.md, cells.md, partners.md, partners-freelancer.md, faq.md, trust.md, data/offer.json, data/next/offer.json, data/cells.json, data/cells-registry.json (consent), board/queue/writer.md (W-OWNERSHIP, W-NOLOCKIN, W-FIRST-CHANGE) and board/queue/sherpa.md (P-INTERVIEW), all folded in.

## Choices made
- Named people: only the three with recorded consent in data/cells-registry.json (Yiheng Wang, Silvio Switha, José Bota). Gabriel is named on content/website-cell.md but has no consent entry in the registry, so the preview does not name him.
- No competitor price or quote in prose: competitor words and figures come only through {{table:compare}}, {{table:features}} and the figures. Prose paraphrases Dinis's articles and links them.
- The interview prompt on /next/start/ is Dinis's five lines from start-with-an-interview plus two lines of ours (what may be public, consent before naming anyone), labelled as such. An interview on the site itself is described as planned.
- The three-month ownership is called an expectation, not yet a rule we enforce, everywhere. The designer's can-you-leave figure calls it "our promise"; the two should agree.
- The £20,000 rung is mentioned nowhere. The simulated buyers are not mentioned.

## Open questions for Dinis
1. The three-month ownership: keep it as an expectation, or make it a rule in the terms, as fliplet-and-the-website-cell proposes?
2. At the launch price, how is the partner split meant to work? The partners page says partners set their own build price and earn on care; is that enough, or should the 50/50 change for the launch offer?
3. GitHub Pages is free only for public repositories on GitHub's free plan. Is a public repository the default for every owner, or do some need a private one (and a paid plan or another host)?
4. Which contact address goes live with the preview ({{contact}} now points to /start-here/)?
5. Gabriel's site: is consent to name him recorded somewhere other than the registry?

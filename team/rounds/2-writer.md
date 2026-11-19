# Round 2: writer.agenticcells-ai@AgentiCCells.dinis

19 November 2026. Sub-agent of conductor.agenticcells-ai@ in session https://claude.ai/code/session_01Kw9UwBFAEwyPc1Pt1idWxz. Brief: the conductor's round 2 fixes, with board/briefs/2026-11-19-sovereign-preview.md and -preview-contract.md. Files changed: next/copy.json and next/pages/*.md only. Nothing committed or pushed; build/build.mjs not run; site/ not deleted (only `node build/next-local.mjs`).

## What I changed, and why

1. **Free hosting, said accurately.** Every "hosting is free" line in my files now says: GitHub Pages hosts it free when the repository is public and the site is not an online shop or a site for business transactions, linked to [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), read 19 November 2026; otherwise any static host, many with a free tier, such as [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/) (its Free plan, which I read today). "Run it anywhere" stays the point. Places: copy.promises[3], FAQ "What does it cost?" and "Can I move it to another host?", no-lock-in, pricing ("Running it can cost nothing", which also says a private repository needs a paid GitHub plan).
2. **The two unconfirmed claims.** "A year of Wix costs about £108 to £300" appears nowhere. "WordPress can export everything" is gone from compare: it now says WordPress.com exports posts, pages and comments but not the theme design, customisations or plugins, and links to the images rather than holding the files ([WordPress.com's export guide](https://wordpress.com/support/export/), read today), and Squarespace exports only certain content ([its guide](https://support.squarespace.com/hc/en-us/articles/206566687-Export-your-site-content), read today).
3. **USD.** Compare (where the price table is introduced) and pricing (above the chart) say: prices as published in US dollars, not converted, read 19 November 2026, from a US address; ours is in pounds. Because the words "not converted" are on compare, the developer's own currency note is left out there, so it is said once.
4. **Consistency.**
   - Three-month hand-over: "an expectation we set ourselves, not yet a rule in the terms" everywhere (copy promise, deliverable, steps, FAQ twice; what-you-get, how-it-works, no-lock-in, pricing, partners, start). "Not yet a rule we enforce" and "soft requirement" are gone.
   - Steps: copy.steps is now seven, starting with "Ask for a site". Counts say "seven steps" (how-it-works, home section, start's list of seven). I set `copy.figures["how-it-works"].first = false` so the figure does not add a second "Ask for a site". The partners page's deal list is a different thing, so it no longer carries a count ("A deal, from first call to after care").
   - Team: copy.team lists the seven roles (conductor, designer, developer, writer, researcher, reviewer, security reviewer), one line each for a small site; team_note and `copy.figures.team.lead` say each is a role played by an AI agent. how-it-works and partners say seven roles.
5. **Section titles from copy.** `copy.sections.<key>` is now `{ title, text }` for promises, tenets, deliverables, can_you_leave, steps, offer, examples, team, faq and cta. Kept as plain strings, so nothing breaks today: rent_or_own (the rent-or-own figure reads `sections.rent_or_own` as a string and printed "[object Object]" when it was an object), and bigger, partners and honest_notes (parts.mjs reads those intros only when they are strings, and they are not home sections). I also set `copy.figures.deliverables.lead` because that figure reads `sections.deliverables` as its lead.
6. **Wording read from the rendered pages** (live /next/ and the local render):
   - First screens: the one idea already shows as the kicker on designs 2 to 5, so the ledes no longer repeat it. Design 1's lede no longer starts with "GitHub repository" (jargon on a first screen); Claude is introduced as "Claude, the AI assistant" on first use.
   - "move into its owner's ownership" rewritten as "transfer every site to its owner".
   - Pricing said the price, the honest notes and the bigger offers three times. My prose now says each once and leaves the rest to the offer block and the ladder. The euro price is left to the developer's euro note.
   - how-it-works showed two step figures with different counts (seven and six), and the team twice. It now shows the seven-step figure and the team figure once.
   - no-lock-in introduced "what the platforms say about leaving" with the price table; it now uses the features table (owns the files, can you leave, export).
   - start: headings no longer say "Step one, step two" against a list where asking is step one; "attached to the email" is now "as attachments".

## Checks (after `node build/next-local.mjs`)
- `node build/validate.js`: OK. `node build/check-evidence.mjs`: every figure has an evidence link in its sentence. `node build/leak-scan.mjs`: OK.
- My files: no em dash, no hype word, no email address or mailto, no "£108", no "export everything", no "six steps".

## Left for others (not my files)
- **Designer:** next/figures/year-of-platform.mjs prints "Hosting on GitHub Pages is free." (on pricing and compare), and rent-or-own.mjs has the same words in its own fallback rows. Both need GitHub's condition. brief-to-claude.mjs says "within three months at the latest" without the expectation wording, starts at the interview (six stages), and drops copy.steps titles now that there are seven. rent-or-own.mjs and deliverables.mjs should read `sections.<key>.text` when the section is an object.
- **Developer:** the offer card's label "The website cell" is jargon on every first screen; a copy key (for example `copy.offer_title`, "Your website") would let me set it. The pricing ladder repeats the honest notes. Every promise's link says "The proof", six times.
- **Researcher:** data/next/competitors.json website_cell `who_owns_the_files` says "moved into their ownership within three months at the latest" without the expectation wording.

## Refused or blocked
- Nothing refused. The WordPress.com page answered 429 on the first try and 200 a few seconds later.

## Questions for Dinis
1. GitHub's terms say Pages is not for "your online business". A plain brochure site for a small business is probably fine, but this is GitHub's call. Is "not an online shop or a site for business transactions" the wording you want, or should we tell business owners to use another host by default?
2. Hosting: should the default for a paying owner be a public repository on GitHub Pages, or another host such as Cloudflare Pages, so a private repository is possible without a paid GitHub plan?
3. The three-month hand-over: keep it as an expectation, or make it a rule in the terms?
4. Seven roles for even a small site: is that true of how the factory builds a site today, or should the preview say that some roles join only on bigger jobs?
5. The researcher read every competitor price in US dollars. Do you want a UK reader to collect the GBP prices before this goes live?

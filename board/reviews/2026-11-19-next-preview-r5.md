# Review R5 (final): the live /next/ preview (2026-11-19, about 06:40 UTC)
By reviewer.agenticcells-ai@AgentiCCells.dinis. Live site v0.1.278 (curl /version.json), the first release whose /next/compare/ holds "At a glance". Chromium (Playwright) at 390x844 and 1366x768, deviceScaleFactor 1: /next/, /next/d/1/ to /5/, the eleven explain pages and /next/review/. Screenshots (first screen and full page, 72 files): /tmp/claude-0/review5/s/. Nothing in the repository changed except this file.

**Verdict: PASS for Dinis's morning review: yes.** All five designs show the one idea and the £50 launch price (with £500 and £250 struck) on the first screen at both widths; 20 of the 21 round 3 fixes and five of the six security medium items are fixed or partly fixed. **Not ready to go live**: see "Before go-live".

## Checks run (this release)
- 18 pages x 2 widths: status 200, `noindex` on every page, one h1, no console errors, no horizontal page scroll, requests only to agenticcells.ai, every image has alt text, no broken image.
- axe-core 4.10.2 (WCAG 2 A and AA) on all 18 pages at both widths: no violations. First Tab is "Skip to the content"; Enter moves focus to `main`.
- Links: 111 unique URLs (links and images) on the preview pages: 109 answer 200. www.upwork.com/legal and www.upwork.com/hire/web-designers/cost/ answer 403 (Cloudflare bot block, as in R3).
- Outside /next/: /, /website-cell/, /start-here/, /partners/, /news/, /about/, /sitemap.xml, /sitemap-index.xml, robots.txt hold no "/next" at all. Live /console/ names "the /next/ preview" in commit messages as text, not as a link.
- Live home page and prices unchanged: / shows "£250 launch price, usually £500", matching data/offer.json (`launch_gbp` 250, `anchor_gbp` 500).
- Text scan: no em dashes; no "website cell", "site factory", "request file", "hub", "in this round", "no terms but yours", "start-here" in any preview page. "Conductor" remains (N3).

## Status of round 3 fixes (R3) and security medium items (S)
| # | Status | One line |
|---|---|---|
| R1 CTAs to /start-here/ | Partly | Every CTA now goes to /next/start/; but /next/start/ says "use the contact at the foot of any page of the live site", which leads to /start-here/ and its £250 and £500 (N2). |
| R2 "Nothing more" with Claude plan | Fixed | Chart, pricing, compare and glance show Claude Pro USD 17 a month (USD 612 over three years) as optional, linked and dated. |
| R3 GitHub Pages for business | Fixed | GitHub's sentence quoted in full with link and date; Cloudflare Pages named for a business site. |
| R4 Figure twice on what-you-get | Fixed | One figure (wide and narrow variants of the same SVG). |
| R5 Prompt formatting on start | Fixed | Framed box, line breaks kept, Copy button. |
| R6 "THE WEBSITE CELL" and internal words | Partly | Gone from every page's text; still in the chooser thumbnails (N1) and "Conductor" in the team figure (N3). |
| R7 Struck £250 on d3 to d5 | Fixed | All five designs and d5's sticky bar show both struck prices. |
| R8 "Yes" badge overlap | Fixed | Badge sits under "Your own website" at 1366 and 390. |
| R9 Security figure | Fixed | New "What there is to attack" figure with "Still yours to protect". |
| R10 Research notes reach buyers | Partly | Durable fixed; Framer still reads "Framer's terms of service not yet read", and "not stated on their pages" repeats under it (compare, no-lock-in). |
| R11 Compare length, two links per value | Partly | "At a glance" added at the top; page still 20,903 px at 390 and 75 "their own page" plus "source" pairs. |
| R12 GBP prices | Partly | Pricing now says UK prices were not read and are not converted; no GBP prices yet. |
| R13 Pricing repeats | Fixed | Price block once, each bigger offer once, no self-link. |
| R14 "Looks better" | Fixed | d2 and d4 changed; d2 headline is the one idea. |
| R15 Partners for buyer (b) | Fixed | Deal first, worked example marked "simulation", CTA to /next/start/. |
| R16 "A team" wording | Fixed | "A team of AI agents set up in your own accounts ... over about two days". |
| R17 Figures repeated across pages | Fixed | Each explain page has its own figure; repeats only on the designs. |
| R18 d3 two headings | Fixed | One "Rent or own" section. |
| R19 Examples order | Partly | d1, d3, d5 lead with the three owners; /next/examples/ still opens with two "Our own" sites. |
| R20 /next/review/ "To be written" | Fixed | Written for Dinis: designs, checks, decisions. |
| R21 Phone nav | Fixed | Right-edge fade, current page scrolled into view, every page listed in the footer. |
| S1 Ownership before hand-over | Fixed | "We build in our GitHub organisation ... within three months at the latest", an expectation, not yet a rule. |
| S2 "No terms but yours" | Fixed | "No terms of ours ... only the terms of the services you choose". |
| S3 GitHub Pages wording | Fixed | Full sentence, soft 100 GB limit and "GitHub's call", each linked. |
| S4 Host IP logs | Fixed | Sovereignty, security and FAQ quote GitHub's IP-logging sentence. |
| S5 "Does not protect against" | Fixed | Security page and FAQ list email, partners, misled Claude, GitHub itself, our organisation before hand-over. |
| S6 CI commit range and signatures | Not | Waits for Dinis's word on the trailer name (team/rounds/4.md). |

## New problems (page, viewport, smallest fix)
- **N1 [developer]** /next/, both widths: the five thumbnails are old screenshots: d2's shows "A site that looks better ... no terms ...", d1 and d2 show "THE WEBSITE CELL". Regenerate assets/next/thumbs/d1.jpg to d5.jpg from the current build.
- **N2 [conductor, Dinis]** /next/start/, both widths: "To ask now, use the contact at the foot of any page of the live site" sends a £50 buyer to /start-here/ (£250, £500). Dinis to choose the preview's contact; until then the line should say the live page shows older prices.
- **N3 [writer, designer]** d1, d2, d4, d5, /next/how-it-works/, both widths: the team figure still names "Conductor" (round 4 said "Lead"). It also says the reviewer "reads every page before it goes live", "you ... approve every change" and "even the smallest site is made by seven roles": a process claim with no source for a £50 site. Fix: "Lead", and "how we mean to work" or a link to the process page.
- **N4 [developer, designer]** /next/compare/ and /next/no-lock-in/ at 1366: the three tables are 1,608 px wide in an 862 px box; only our column, Wix, Squarespace and WordPress.com show, with no visible sign that Fliplet, Framer, Durable and the freelancer are to the right. Fix: a "Scroll for four more" hint or edge fade, as on the phone nav.
- **N5 [writer]** /next/no-lock-in/ at 390: 14,795 px, because the full feature table from /next/compare/ is repeated as cards. Fix: the glance table here and a link to compare.
- **N6 [writer]** /next/pricing/ and /next/review/: "€50 on our European pages" while the preview is English only. Fix: "In the euro area: €50, launch price".
- **N7 [writer]** d2, both widths: the one idea is said twice on the first screen (kicker, then headline). Drop the kicker.
- **N8 [designer]** d3 at both widths: the short rent-or-own table's "Three years" cell for us reads "£50 once, launch price" without the Claude Pro note that compare and the glance carry.
- Low: live /console/ (no noindex) names "the /next/ preview" in commit lines; not a link, but it makes the path findable. Partners links to live /partners/ pages that still call the price "a first proposal".

## Before go-live (in order)
1. Dinis: confirm the £50 launch price, then data/offer.json changes the live price; until then live (£250) and preview (£50) disagree by design.
2. Dinis: a contact for the new site (N2), so no buyer reaches the old prices.
3. N1 thumbnails, N3 "Conductor" and the process claims, N4 table scroll hint.
4. R10 Framer note, R11 one link per value, R12 GBP prices (or keep the note), R19 examples order, N5 no-lock-in length.
5. S6: CI checks every undeployed commit and verifies signatures, after Dinis settles the trailer name.

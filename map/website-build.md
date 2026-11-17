# Map: building and releasing the website

Status: first pass by conductor@AgentiCCells.dinis, 2026-11-15. Steps 1 to 9 are reconstructed from git and the session; later steps are added by the agents that do them.

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Brief the conductor | Dinis | bootstrap pack (zip) | conductor session | session, 16:20 UTC |
| 2 | Read the brief, record what exists | conductor@ | pack, the live domains | REALITY.md, board items | 4b251d2 |
| 3 | Brief and start the developer | conductor@ | STRUCTURE.md | board/briefs/dev.md | 4b251d2 |
| 4 | Build skeleton, build script, validator, workflow | dev@ | brief | content/, data/, build/, .github/ | 2a9c54c |
| 5 | Check the developer's work independently | conductor@ | branch | "built site/", "OK" | 8d582be |
| 6 | Settle names, repository, domain, branch | Dinis, recorded by conductor@ | questions on the board | ACC-010 done, CNAME agenticcells.com, deploy from dev | 35837e9, 8e7db41, 657952a |
| 7 | Versioning in CI, not by agents | Dinis's rule, conductor@ | workflow | v0.1.N tags after each deploy | ce760fa |
| 8 | First release | conductor@ pushes to dev at Dinis's request; Dinis fixes Pages settings | dev | https://agenticcells.com, v0.1.0 | tag v0.1.0, 7b50de2 |
| 9 | Read the network the method comes from | reading helper for conductor@ | READING.md | board/reading-notes.md | ce387a1 |
| 10 | Write the site's words: home, method, cells, open source, console, about, how this site was built | writer@ | briefs, research/, reading notes, git history | content/*.md, data/stack.json (licences marked unchecked) | agent/writer commits, team/activity/writer.jsonl |
| 11 | Site nav, footer contact link, page hook for other scripts | dev@ | dev brief round 2 | build/build.mjs, build/pages/*.mjs contract | 6be062f |
| 12 | Validator: no scripts or stylesheets from another host, no hype words | dev@ | dev brief round 2 | build/validate.js; each check shown to fail on a planted case | 7296082 |
| 13 | CI refuses a push whose new commits lack a readable Agent: trailer (ACC-015) | dev@ | ACC-015 | build/check-commits.mjs, step in pages.yml | 9b64de6 |
| 14 | Hooks run after site/ is cleared; ctx.out beside console@'s ctx.files | dev@, asked by console@ | board/inbox/dev-from-console-1.md | build/build.mjs | the commit after 9b64de6 |
| 15 | Home page for buyers: who it is for, week one (first proposal), how to start (W1) | writer@ | board/queue/writer.md W1 | content/index.md | the W1 commit |
| 16 | `{{stack}}` and `{{stack:runtimes}}` placeholders render data/stack.json as tables (V1) | dev@, asked by writer@ | board/inbox/conductor-from-writer-1.md, queue V1 | build/build.mjs | 2203cf8 |
| 17 | Visual identity: text mark, palette (light and dark), type scale | designer@ | queue D1 | assets/style.css, map/design.md | D1 commit, map/design.md |
| 18 | Prototype key step at /key/: WebCrypto key pair in the browser, public half as text and an in-page QR code (own encoder), sends nothing (V7, ACC-021 step 5) | dev@ | queue V7, ACC-021 | build/pages/key.mjs, assets/key.js | QR decoded by jsQR at 23 lengths (versions 1 to 40) and from a Chromium screenshot; no request after load |
| 19 | Evidence check: warning-only list of figures on published pages with no evidence link in their sentence (V-EVID) | dev@ | queue V-EVID, board/briefs/COMMON.md | build/check-evidence.mjs, build/validate.js | validate output, warnings |
| 20 | Archive section: front matter `archive:` and `archive_why:` keep the address, add a dated note, drop the page from the nav, list it at /archive/ and under Archive in the sitemap (V-ARCHIVE) | dev@ | queue V-ARCHIVE | build/build.mjs, build/pages/archive.mjs, build/validate.js | /archive/ page, sitemap.xml |

## What a customer would buy from this (proposal)
The same steps for their site: a brief, a developer agent, a validator that must print OK, CI that versions and deploys, a board and a map that show every step. Time so far: about 30 minutes of agent time to a live, versioned page (from the commit times above), plus the person's decisions. Price: see the ladder, first proposal.

## Blockers met, and how they were cleared
- Pages environment allowed only the old branch: fixed by Dinis in settings (no agent had that reach).
- Naming mix-up (singular and plural): settled by Dinis in one message.

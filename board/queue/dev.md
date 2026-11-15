# Queue: dev@agenticcells.dinis
Top unticked item first. The conductor appends; the agent ticks its own items with date and commit. Goal for now (Dinis, 2026-11-15): "I want to start selling this website".

- [x] V1 · (2026-11-15, dev@: done in the V1 commit on dev; writer@ told in board/inbox/writer-from-dev-1.md) · `{{stack}}` placeholder rendering data/stack.json (writer@ asked, board/inbox/conductor-from-writer-1.md); then tell writer@ to drop the hand-typed list.
- [ ] V2 · Add `node board/abp/derive.mjs --check` to the Pages workflow after validate (abp@'s request), without making a hand-edit possible to sneak through.
- [ ] V3 · Selling basics: per-page Open Graph and canonical tags, sitemap.xml, robots.txt, a 404 page, favicon (from designer@ when ready).
- [ ] V4 · data/links.json and a check that every external link in content/ answers (allow a skip-list for sites that refuse bots); run it in CI as a warning, not a blocker.
- [ ] V5 · An "articles" section: content/articles/*.md rendered at /articles/<slug>/ with an index and an RSS feed, so Dinis's articles about this work can live on the site too.
- [ ] V6 · `persist-credentials: false` on the build job's checkout (security@'s proposal 3; it narrows access, so it is within brief).

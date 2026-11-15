# Brief: dev@agenticcells.dinis (round 2)
Given by conductor@, 2026-11-15. Read COMMON.md first.
Policy. May reach: this repository (worktree, own branch, push to dev). Asked to: ACC-015 and the build. May not: weaken a check, add trackers or third-party scripts, touch dns/, team/keys*, content/ words (writer@ owns those), use cloud credentials.
Work:
1. ACC-015: `build/check-commits.mjs`: every non-merge commit added by a push to dev must carry a readable `Agent:` trailer (`git log --format=%(trailers:key=Agent,valueonly)`). Run it in the Pages workflow on the pushed range (`github.event.before..github.sha`); skip commits older than this check (the first commit that has it). Fail the build otherwise.
2. Validator: add a check that no page loads a script or stylesheet from another host, and a wording check (no em dashes is there; add: no "revolutionary", "cutting-edge", "seamless", "world-class", "game-changing" in content/). Keep every existing check.
3. build.mjs: a site nav built from content/*.md (title order from a `nav:` front-matter number), and a footer contact link `mailto:agent@riskmandate.ai` (Dinis, 2026-11-15: "The contact address for the team is going to be, for now, agent@riskmandate.ai"). Expose a hook so other scripts can add pages: `build/pages/*.mjs` each exporting `default async function(ctx)` that returns `[{path, title, description, html}]`; build.mjs renders them with the same page template. console@ will use it.
Items: ACC-015, ACC-003 follow-up. Map: map/website-build.md.

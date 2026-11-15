# Debrief: dev@agenticcells.dinis, round 2 (ACC-015 and ACC-003 follow-up)

Date: 2026-11-15. Worktree /home/user/wt/dev, branch agent/dev, released to dev with rebase.

## Done
- 6be062f build.mjs: site nav from a `nav:` front-matter number (pages without one stay out); footer link `mailto:agent@riskmandate.ai` (Dinis, 2026-11-15); page hook `build/pages/*.mjs`, each `default async function(ctx)` returning `[{path, title, description, html, nav?}]`, rendered with the same template. Paths that leave site/ or collide fail the build. Also my public key, team/keys/dev.json.
- 7296082 validate.js: fails when a built page loads a script, stylesheet, preload or CSS @import from a host other than agenticcells.com, and on "revolutionary", "cutting-edge", "seamless", "world-class", "game-changing" (hyphen or space) in content/ and in built pages. All earlier checks kept.
- 9b64de6 ACC-015: build/check-commits.mjs, run in the Pages workflow before the build on `github.event.before..github.sha`. Every non-merge commit must carry `Agent: role@agenticcells.person`, read with `%(trailers:key=Agent,valueonly)`. Commits older than the check (neither descended from 9b64de6 nor committed after it) are skipped. With no usable `before` (new branch, forced push, manual run) it checks everything since the check began.
- Final commit: site/ is now cleared before hooks run and `ctx.out` is passed, beside console@'s own `ctx.files` (console@ had already removed its interim hook block), at console@'s request; map rows 11 to 14.

## Checked
- Build and validate OK before every push. Planted cases made each new check fail: foreign script (https and protocol-relative), foreign stylesheet, @import in HTML and CSS, five hype words, a hype word in content/. In a throwaway clone, check-commits failed on a commit with no trailer, one with `Agent:` in its own paragraph, and one with a malformed value; it skipped a merge and passed good commits.
- Live: https://agenticcells.com/version.json said v0.1.5 and the footer showed the contact link (curl, 2026-11-15). Tag v0.1.5 contains 7296082.

## Not done or not proven
- I did not see the CI run for 9b64de6 (I may use GitHub tokens only for git push and fetch, so no Actions API); it was not yet tagged when I last looked.
- "Sign your work with your own key": my key pair exists (sgit, public half published), but commits are not signed with it; no step for that is written anywhere. Only the Agent: trailer marks them.
- The leak scan (security@'s build/leak-scan.mjs) was not on dev for my first three commits; I checked each staged diff for secret shapes and the validator key-shape scan passed. It printed OK for the final commit.
- The nav is empty until a page carries a `nav:` number. content/ is writer@'s, so I left it alone.

## Facts for REALITY.md
- build/check-commits.mjs exists and runs in the Pages workflow (9b64de6).
- The page hook build/pages/*.mjs exists; console@'s build/pages/console.mjs uses it.
- The validator checks foreign hosts for scripts and stylesheets, and hype words.

## For Dinis to decide
- Whether commits should also be signed with each agent's sgit key, and how (no tool for it exists yet).
- Whether a failed ACC-015 check should block the deploy (it does now: it runs inside the build job).

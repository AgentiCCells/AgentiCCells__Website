# Map: from an empty repository to a live, versioned site

Status: first draft by pipeline@AgentiCCells.dinis, 2026-11-15, for Dinis to change. This is a map of what this repository did today, not a proposal. It is the worked example for `pipeline/template/` (not started).

Who: **Dinis** = by hand in GitHub, DNS or settings; **agent** = a named agent; **CI** = the GitHub Actions workflow `.github/workflows/pages.yml`.
Evidence: commit short hashes are on `dev`. Times are UTC, taken from commit times (`git log`) or `team/activity/*.jsonl`. "Reconstructed" means the conductor rebuilt its own log from git afterwards. A step with no evidence I could check from this session is marked **not checked**.

Sources read for this draft: `.github/workflows/pages.yml`, `build/*`, `team/release.sh`, `team/SCHEDULE.md`, `team/keygen.sh`, `dns/records.json`, `map/website-build.md`, `board/ACC-003`, `-012`, `-015`, `-016`, `-018`, `-019`, `-020`, `-026`, `REALITY.md`, `case-study/2026-11-15-day-one.md`, `board/briefs/*`, `team/activity/conductor.jsonl`. Limit: this clone is shallow (55 commits, no tags), so tag and run facts below come from REALITY.md and the case study, not from my own check of GitHub.

## The steps, in order

| # | Step | Who | Evidence | What failed, and the fix |
|---|---|---|---|---|
| 1 | Create the empty repository `AgentiCCells/AgentiCCells__Website` in the `AgentiCCells` organisation | Dinis | `e3853d9` "Initial commit", 16:18 | Name mix-up: the first message said `AgentiCCell` (singular), the pack said `agenticcells`. Dinis settled it: "all should be agenticcells" (ACC-010, `657952a`). The old singular URL now leads to this repository (REALITY.md). |
| 2 | Start the conductor agent and give it push access | Dinis | conductor log, 16:20 (time approximate) | None recorded. |
| 3 | Put the rules, board, roster, DNS notes and `REALITY.md` into the repository | conductor@ | `4b251d2`, 16:23 | None. |
| 4 | Write the site skeleton, build script, validator and the Pages workflow | dev@ | `2a9c54c`, 16:24; `board/ACC-003.md`, `board/debriefs/dev-ACC-003.md` | None recorded. |
| 5 | Run build and validate independently and record the result | conductor@ | `8d582be`, 16:24: "built site/", validator prints OK | None. |
| 6 | Set the default branch to `dev`; point the workflow at `dev` | Dinis changed the default branch; conductor@ changed the workflow | `35837e9`, 16:30; Dinis: "I also changed the default branch to dev" (REALITY.md) | The first workflow deployed on push to `main`, so a person had to merge (ACC-012). Dinis chose to let everyone push to `dev`: "Branch protection, no, everybody can push to dev. We'll control that a bit later." |
| 7 | Choose the custom domain and write it into `CNAME` | Dinis decided; conductor@ wrote | `8e7db41`, 16:37: "for now the url is agenticcells.com" | The domain later changed twice (steps 15 and 16). `CNAME` is a file in git, so each change was a commit. |
| 8 | Add versioning to CI: `VERSION_BASE` 0.1 set by a person, patch number worked out from existing tags, first release `v0.1.0` | conductor@, on Dinis's rule: "the version number, which should be v0.1.0, and then every push becomes v0.1.1 ... is done by the CI pipeline, not by here" | `ce760fa`, 16:38; `pages.yml` job `build` step `version` | None in the logic. See "Things I noticed" for two cases I have not tested. |
| 9 | First push to `dev` | conductor@, at Dinis's request | conductor log, 16:38 (reconstructed); `41771ed` | **Failed: the deploy was rejected by the `github-pages` environment's rules.** The environment allowed only the old branch. No agent had the reach to change it. |
| 10 | Fix the Pages settings (environment rules so `dev` may deploy) | Dinis | REALITY.md: "it went through after Dinis changed the settings"; `7b50de2`, 16:42 | Which exact setting changed is **not recorded**. See question 1 below. |
| 11 | Point DNS at GitHub Pages: apex A records `185.199.108-111.153`, `www` CNAME to `agenticcells.github.io` (Route 53) | Dinis (or earlier setup by him; **not checked**) | `dns/records.json` (observed 2026-11-15, dns@); REALITY.md 16:40 | The records existed before the site did. That is what later made the domain claimable (steps 15 and 16). |
| 12 | CI deploys, then tags the commit `v0.1.0`; the site is live over https | CI | tag `v0.1.0` on `ce760fa` (REALITY.md); `https://agenticcells.com` answered 200 and `/version.json` said v0.1.0 | The deploy job needs `pages: write` and `id-token: write`; the tag job needs `contents: write`. Both are set in the workflow. |
| 13 | Add the commit gate: CI fails a push whose new commits lack a readable `Agent:` trailer | dev@ | `9b64de6`, 17:04; `build/check-commits.mjs`; ACC-015 | **Found first by reading, not by CI:** `Agent:` sat in its own paragraph, and git reads only the last paragraph as trailers, so the trailer was empty on every commit so far. Fix: `Agent:` goes in the same final block as the other trailers. History was not rewritten. |
| 14 | Add the leak scan and call it from the workflow | security@ | `5dc76c2`, 17:05; `build/leak-scan.mjs`; full history scan clean | An earlier release used `leak-scan | tail`, and the pipe hid a failure. Fix: `team/release.sh` (step 17) runs each gate with no pipe. |
| 15 | Record that `agenticcells.ai` still points at Pages with no site claiming it | dns@ found it; conductor@ confirmed and raised it | `fd81f1c`, 17:05; `board/ACC-018.md` | Anyone's GitHub account could set that domain as a Pages custom domain. Open: ACC-018 waits on Dinis. |
| 16 | Move the site to `agenticcells.ai` (CNAME, validator, README) | Dinis pointed the domain ("ok, domain agenticcells.ai is now pointed to the site"); conductor@ edited the files | `27d2892`, 18:24; REALITY.md 18:20 | Now `agenticcells.com` is the unclaimed domain: it still resolves to Pages but answers "Site not found". Also open under ACC-018. No `_github-pages-challenge` TXT record exists for either domain. |
| 17 | One release command: build, validate, leak scan, rebase on `dev`, push, retry up to five times | conductor@ | `e3bfef3`, 18:09; `team/release.sh` | Parallel agents pushing at once make the push race; the retry loop handles it. |
| 18 | Run scheduled agents that release through the same pipeline | conductor@ (wakes), Dinis (schedule) | `team/SCHEDULE.md`; `board/briefs/SCHEDULED.md`; `46ee80e`, 17:47 | **The first scheduled run lost its work:** the fresh session could clone but not push (403) because no repository was attached. Fix 1 (`b07e2ea`): step 0 attaches the one repository. Fix 2 (`46ee80e`): the conductor starts each run with the repository attached. The usage limit then failed three runs (ACC-026). |
| 19 | Each agent makes a key pair in its own session; the public half goes in `team/keys/` | each agent, with `team/keygen.sh` | `team/keys.json` (nine keys at 17:09); ACC-019 | Keys identify; they do not sign commits yet (ACC-019 waits on Dinis). Authorisation is write access to the repository, by Dinis's rule. |
| 20 | Live and versioned: every push to `dev` that passes the gates deploys and takes the next `v0.1.N` | CI | REALITY.md: v0.1.29 at 19:08 (source: conductor) | See below. |

First commit to `v0.1.0` live: 24 minutes by commit times (16:18 to 16:42), including Dinis's settings change. Source: case study, day one.

## What CI does on each push to `dev` (as written in `pages.yml`)

1. `build` job: checkout with full history; work out the next version from tags `v0.1.*`; Node 22; run `check-commits.mjs` over the pushed range; `build.mjs` with `SITE_VERSION`; `validate.js`; `leak-scan.mjs`; configure and upload the Pages artifact from `site/`.
2. `deploy` job (needs `build`): environment `github-pages`; `deploy-pages`.
3. `tag` job (needs both): `git tag` the pushed commit and push the tag.
4. A failed gate stops the run before deploy, so no tag is set. Runs are serialised (`concurrency: pages`, no cancel of a running job). `workflow_dispatch` also starts it by hand.

## What a person must do today (before any agent can finish)

Everything an agent could not do, by the conductor's account and the policy of each role:

1. Create the repository and set its default branch (steps 1 and 6).
2. Change the Pages environment rules and settings so `dev` can deploy (step 10).
3. Point DNS and choose the domain (steps 7, 11, 16), and verify the domain in the organisation so it cannot be claimed (ACC-018, still open).
4. Start the first agent and give it push access (step 2); attach the repository to each fresh session (step 18).
5. Decide the branch rule (step 6) and the version base, major and minor (`VERSION_BASE`).

## Things I noticed from reading, not tested

These are readings of the files, with no run to back them. I have not changed anything.

- `check-commits.mjs` is given `github.event.before` and `github.sha`. With `concurrency: pages` and no cancel, GitHub keeps only the newest waiting run and cancels older waiting ones. If that happens, the commits of the cancelled push fall outside the later run's range, and the trailer check never sees them. Worth testing with two quick pushes.
- The same cancelled runs mean a version number could be skipped or a commit could be deployed under the next number. I have not seen this in the tags (no tags in this clone).
- Nothing in the repository records which Pages settings were set (source, environment branch rule, enforce https, custom domain). The workflow assumes "GitHub Actions" as the source. That is the missing part of the template.

## Questions for Dinis

1. Which setting did you change at about 16:40 (environment deployment branches, or the Pages source)? I will write the exact click path into the template checklist.
2. Is agenticcells.ai the final domain? Then ACC-018 is only about verifying both domains.
3. Do you want me to turn this into `pipeline/template/` next (workflow, `check-commits`, `leak-scan`, `release.sh`, `CNAME` and DNS records as placeholders, plus the hand-done checklist)? I will not touch the workflow, `CNAME` or gates here unless you say so.

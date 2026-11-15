# To conductor@ from security@, 2026-11-15: pin workflow actions to commit SHAs (proposal)

Not changed; for the conductor and Dinis to decide.

## Found
- The build has no dependencies: build/build.mjs, build/validate.js and build/leak-scan.mjs import only Node built-ins (node:fs, node:path, node:url, node:child_process). No package.json or lock file is tracked. The built site loads no scripts.
- .github/workflows/pages.yml uses five actions, all from the `actions/` organisation, all pinned to a major version tag: checkout@v4 (twice), setup-node@v4, configure-pages@v5, upload-pages-artifact@v3, deploy-pages@v4.

## Proposal
1. Pin each `uses:` to the full 40-character commit SHA of the release it names now, with the tag in a comment, for example `uses: actions/checkout@<sha> # v4.x.y`. A moved tag then cannot change what runs in a job that holds `pages: write`, `id-token: write` or `contents: write`. The leak scan already allows 40-hex git object ids, so this needs no change to the scan.
2. Look the SHAs up from the action's release page by a person, or with a token Dinis approves for that; I did not, because my brief limits GitHub tokens to this repository.
3. Add `persist-credentials: false` to the checkout in the build job, which only reads (proposal).
4. Dependabot for github-actions could keep the pins current (proposal; it changes repository settings, so Dinis decides).

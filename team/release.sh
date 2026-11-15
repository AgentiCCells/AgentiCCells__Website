#!/usr/bin/env bash
# Run every gate, then rebase and push to dev. Stops at the first failure.
# Written by conductor@ 2026-11-15 after a release where `leak-scan | tail` hid a failure.
set -euo pipefail
cd "$(dirname "$0")/.."
node build/build.mjs
node build/validate.js
node build/leak-scan.mjs
for i in 1 2 3 4 5; do
  git fetch -q origin dev
  git rebase -q origin/dev
  node build/build.mjs >/dev/null && node build/validate.js >/dev/null && node build/leak-scan.mjs >/dev/null
  if git push -q origin HEAD:dev; then echo "released $(git rev-parse --short HEAD) to dev"; exit 0; fi
  sleep $((i * 3))
done
echo "release failed after 5 attempts" >&2; exit 1

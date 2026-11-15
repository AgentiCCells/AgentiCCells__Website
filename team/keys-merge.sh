#!/usr/bin/env bash
# Assemble team/keys.json from team/keys/*.json (public halves only).
set -euo pipefail
cd "$(dirname "$0")"
python3 - <<'PY'
import json, glob
keys = [json.load(open(f)) for f in sorted(glob.glob("keys/*.json"))]
for k in keys:
    if "private" in json.dumps(k).lower(): raise SystemExit(f"refusing: {k['label']} mentions a private part")
json.dump(keys, open("keys.json", "w"), indent=2); open("keys.json", "a").write("\n")
print(f"team/keys.json: {len(keys)} public keys")
PY

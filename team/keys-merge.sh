#!/usr/bin/env bash
# Assemble team/keys.json from team/keys/*.json (public halves only).
set -euo pipefail
cd "$(dirname "$0")"
python3 - <<'PY'
import json, glob
keys = []
for f in sorted(glob.glob("keys/*.json")):
    d = json.load(open(f))
    for k in (d if isinstance(d, list) else [d]):
        k.setdefault("status", "active")
        keys.append(k)
for k in keys:
    if "private" in json.dumps(k).lower(): raise SystemExit(f"refusing: {k['label']} mentions a private part")
json.dump(keys, open("keys.json", "w"), indent=2); open("keys.json", "a").write("\n")
act = sum(1 for k in keys if k["status"] == "active")
print(f"team/keys.json: {len(keys)} public keys ({act} active, {len(keys) - act} superseded)")
PY

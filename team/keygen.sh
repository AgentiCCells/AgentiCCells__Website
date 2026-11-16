#!/usr/bin/env bash
# Make an agent's key pair in its own session and publish only the public half.
# Usage: team/keygen.sh role@agenticcells.person
# Writes team/keys/<role>.json (one file per agent, so agents never edit the same file);
# team/keys-merge.sh assembles team/keys.json from them.
# Dinis, 2026-11-15: "every agent always keeps a private key in their environment.
# The private keys are, in a way, ephemeral. They only exist while the agent exists,
# and they push the public key to the repo".
# The private key and its passphrase stay in ~/.agents/<role>/ (mode 700), outside the
# repository. Nothing secret is printed.
set -euo pipefail
agent="${1:?usage: team/keygen.sh role@agenticcells.person}"
role="${agent%%@*}"
repo="$(cd "$(dirname "$0")/.." && pwd)"
home="$HOME/.agents/$role"
mkdir -p "$home" && chmod 700 "$home"
[ -s "$home/passphrase" ] || { umask 077; head -c 32 /dev/urandom | base64 > "$home/passphrase"; }
export SG_SEND_PASSPHRASE="$(cat "$home/passphrase")"
if ! HOME="$home" sgit pki list 2>/dev/null | grep -q "$agent"; then
  HOME="$home" sgit pki keygen --label "$agent" > "$home/keygen.out" 2>&1
fi
fp="$(grep -m1 '^  Fingerprint:' "$home/keygen.out" | awk '{print $2}')"
sfp="$(grep -m1 'Signing fingerprint:' "$home/keygen.out" | awk '{print $3}')"
bundle="$(HOME="$home" sgit pki export "$fp")"
mkdir -p "$repo/team/keys"
python3 - "$repo/team/keys/$role.json" "$agent" "$fp" "$sfp" "$bundle" <<'PY'
import json, sys, datetime
path, agent, fp, sfp, bundle = sys.argv[1:]
pub = json.loads(bundle)
if any(k in json.dumps(pub).lower() for k in ("private", "passphrase")):
    sys.exit("refusing: export bundle mentions a private part")
import os
now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
new = {"id": fp, "label": agent, "fingerprint": fp, "signing_fingerprint": sfp,
       "public_key": pub, "created": datetime.date.today().isoformat(), "created_at": now,
       "status": "active",
       "lifetime": "ephemeral: valid while this agent's session exists"}
# Registry with history: the file is a list, every key kept, newest active, earlier ones superseded.
hist = []
if os.path.exists(path):
    old = json.load(open(path))
    hist = old if isinstance(old, list) else [old]
if any(k.get("fingerprint") == fp for k in hist):
    for k in hist:
        k["status"] = "active" if k.get("fingerprint") == fp else "superseded"
        if k["status"] == "active": k.pop("superseded_at", None)
        elif not k.get("superseded_at"): k["superseded_at"] = now
else:
    for k in hist:
        if k.get("status") != "superseded":
            k["status"] = "superseded"; k["superseded_at"] = now
    hist.append(new)
json.dump(hist, open(path, "w"), indent=2)
open(path, "a").write("\n")
print(f"published public key for {agent}: {fp}")
PY

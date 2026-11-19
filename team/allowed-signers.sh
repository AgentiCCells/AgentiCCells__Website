#!/usr/bin/env bash
# Write .git/allowed_signers from the git_ssh_signing_key_pem fields (PEM, the form the leak scan allows in team/keys) in team/keys/*.json (public halves only),
# and point git at it, so `git log --show-signature` and `git verify-commit` can check the team's SSH signatures.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - > .git/allowed_signers <<'PY'
import json, glob
for f in sorted(glob.glob("team/keys/*.json")):
    d = json.load(open(f))
    for k in (d if isinstance(d, list) else [d]):
        pem = k.get("git_ssh_signing_key_pem")
        if pem:
            import subprocess, tempfile
            with tempfile.NamedTemporaryFile("w", suffix=".pem") as t:
                t.write(pem); t.flush()
                ssh = subprocess.run(["ssh-keygen", "-i", "-m", "PKCS8", "-f", t.name], capture_output=True, text=True, check=True).stdout.split()
            print(k["label"], ssh[0], ssh[1])
PY
git config --local gpg.ssh.allowedSignersFile .git/allowed_signers
echo "allowed signers: $(wc -l < .git/allowed_signers)"

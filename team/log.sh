#!/usr/bin/env bash
# Append one line to the calling agent's activity log: team/activity/<role>.jsonl
# Usage: team/log.sh role@agenticcells.person ITEM ACTION "summary" [commit]
# ACTION: started | read | wrote | built | checked | committed | pushed | released |
#         asked | answered | blocked | decided | briefed | handed-over | done
set -euo pipefail
agent="$1"; item="$2"; action="$3"; summary="$4"; commit="${5:-}"
role="${agent%%@*}"
dir="$(cd "$(dirname "$0")" && pwd)/activity"; mkdir -p "$dir"
python3 - "$dir/$role.jsonl" "$agent" "$item" "$action" "$summary" "$commit" <<'PY'
import json, sys, datetime
path, agent, item, action, summary, commit = sys.argv[1:]
line = {"time": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "agent": agent, "item": item, "action": action, "summary": summary}
if commit: line["commit"] = commit
open(path, "a").write(json.dumps(line, ensure_ascii=False) + "\n")
PY

#!/usr/bin/env bash
# Commit staged work as a role, signed with that role's own SSH key (git SSH signature, repo-local config).
# Usage: team/commit-as.sh <role> "<subject>" ["<body>"]   e.g. team/commit-as.sh writer "Preview: home words"
# The key's private half and passphrase live outside the repository in ~/.agents/<role>.agenticcells-ai/ (mode 700),
# loaded into the conductor's ssh-agent; nothing secret is read or printed here.
set -euo pipefail
role="${1:?role}"; subj="${2:?subject}"; body="${3:-}"
# The CI Agent: check (build/check-commits.mjs) allows no dot before the @, so the trailer uses a hyphen:
# role-agenticcells-ai@AgentiCCells.dinis stands for role.agenticcells-ai@AgentiCCells.dinis (question for Dinis, 2026-11-19).
agent="$role-agenticcells-ai@AgentiCCells.dinis"
key="$HOME/.agents/$role.agenticcells-ai/id_sign.pub"
[ -f "$key" ] || { echo "no signing key for $agent" >&2; exit 1; }
export SSH_AUTH_SOCK="${SSH_AUTH_SOCK:-$HOME/.agents/conductor.agenticcells-ai/agent.sock}"
git -c user.signingkey="$key" -c commit.gpgsign=true commit -q -m "$subj" -m "${body:+$body

}Agent: $agent
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Kw9UwBFAEwyPc1Pt1idWxz"
git log -1 --format='%h %G? %s'

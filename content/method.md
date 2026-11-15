---
title: The method
description: How a cell is set up, step by step - brief, keys, a board of files, lanes and vaults, gated releases, the stop file and hand-overs.
nav: 2
---
# The method

This is how we set up a cell. It is the same method this team uses on itself, so each step links to where you can see it in use.

## 1. A brief, close to the person's words

Each agent starts from a brief: what it may reach, what it is asked to do, and what it may not do. When the person gives an instruction, the brief keeps their words and the time they gave them. See [our own briefs](https://github.com/AgentiCCells/AgentiCCells__Website/tree/dev/board/briefs).

## 2. One agent, one name, one key

Every agent has a name such as `writer@agenticcells.dinis` and makes its own key pair in its own session. Only the public half is published. The private half never leaves the session. See [our public keys](https://github.com/AgentiCCells/AgentiCCells__Website/tree/dev/team/keys) and the [web-summit.sgit.ai keys page](https://web-summit.sgit.ai/keys/), where the method was first used.

## 3. The board is a folder of files

One markdown file per piece of work. The team's state is the repository, so everything can be replayed from its history. See [our board](https://github.com/AgentiCCells/AgentiCCells__Website/tree/dev/board).

## 4. Three ways to talk

Agents talk through files in the repository, through commit messages, and through append lanes in encrypted [sgit](https://sgit.ai/) vaults. Each commit names its agent in an `Agent:` line. Lane messages are sealed to the recipient's key and signed by the sender. ([source](https://newsroom.sgit.ai/articles/an-agentic-console.html))

## 5. Releases are gated

A release needs a validator that prints OK, a clean leak scan and a clean wording check. If a check fails, the agent fixes the problem. It never weakens the check. See [our validator](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/build/validate.js).

## 6. The stop file

If a file called `board/HOLD.md` exists, every agent stops at its next wake and only reads. Only the person removes it. A stop is only as fast as the agents' wake-up timers: [the newsroom measured it](https://newsroom.sgit.ai/articles/always-on-agents-at-team-scale.html).

## 7. Hand over, do not hoard

When a session gets long, the agent writes a hand-over and stops. Starting a fresh session is cheaper than remembering. Each agent also writes a debrief when its first piece of work is done.

## 8. Everything is logged

Each agent appends one line per step to its own activity log. The console reads those logs. See [team/ACTIVITY.md](https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/team/ACTIVITY.md).

## What this page does not claim

- The stop file and the briefs are rules the agents follow. They are not technical barriers. An agent that does not read them is not stopped by them.
- Commit names are the agent's own word unless the commit is signed with the agent's key. Signing commits with these keys is not yet in place.

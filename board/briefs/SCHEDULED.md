# For a scheduled run (fresh session): read this first

You were started by the conductor's hourly wake (or a scheduled task). You have no memory of earlier runs: the repository is your memory.

0. If the conductor started you, the repository is already checked out with push access: skip this step. Otherwise attach the repository for pushing: call the `add_repo` tool with owner `AgentiCCells`, repo `AgentiCCells__Website`, access `push`, and clone where it tells you (then call `register_repo_root` if it asks). This is the only access you take: Dinis, 2026-11-15, "everybody can push to dev". Without it the git proxy refuses the push (measured on the first scheduled run, 2026-11-15 17:12 UTC: 403). Never attach any other repository.
1. Find the repository: `/home/user/AgentiCCells__Website`, `/home/user/agenticcells__website` or `/home/user/AgentiCCell__Website` if present; otherwise clone `https://github.com/AgentiCCells/AgentiCCells__Website`. Run `git fetch origin` and `git checkout -B agent/<role> origin/dev`.
2. If `board/HOLD.md` exists: log nothing, change nothing, stop.
3. Read `CLAUDE.md`, `REALITY.md`, `board/briefs/COMMON.md` (the worktree section does not apply to you; everything else does), `board/briefs/<role>.md`, then `board/queue/<role>.md` and any `board/inbox/<role>-from-*.md`.
4. `pip install -q sgit-ai` if `sgit` is missing, then `team/keygen.sh <role>@agenticcells.dinis` (a new key for this run; it lives only as long as this session).
5. Take the top unticked item in your queue. Work on it for at most about 40 minutes. Log each step with `team/log.sh`.
6. Release as COMMON.md says (build, validate, leak scan, rebase, push to dev). Tick the item `[x]` with the date and commit in your queue file, or write why it is blocked.
7. Write or update `board/debriefs/<role>-<date>.md` (append a section per run). Then stop.
If the queue is empty, log `checked` with "queue empty", push that line, and stop.

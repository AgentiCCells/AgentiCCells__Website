# Hand-over: conductor@AgentiCCells.dinis, from session …SvYRxVA5jC7yo7HF to session …QeVLMD7ANkt1akJeD

Written 2026-11-16 16:12 UTC by the first conductor session (started 2026-11-15 16:20 UTC), after Dinis opened a new conductor session (~15:45 UTC). CLAUDE.md: "When your session is long or your work is done, write a hand-over and stop." The first session's context is very long; the new one starts fresh.

## What the new conductor needs to know
- **The hourly wake still points at the first session:** scheduled task trig_01CbV6xVJpqAavDovmK3AbRD ("AgentiCCells · conductor@agenticcells.dinis hourly wake", cron `CRON_TZ=Europe/London 7 1,3,5,7-23 * * *`, persistent session …SvYRxVA5jC7yo7HF). A scheduled task's target session cannot be changed in place: to move it, create a new one bound to the new session (same prompt, same cron) and disable the old one, on Dinis's word. Until then, two conductors could start the same runs: coordinate before starting any.
- **How runs start:** create_session with source_url https://github.com/AgentiCCells/AgentiCCells__Website, revision dev, model claude-sonnet-5-5 (Dinis: every agent on Sonnet apart from the conductor), tags ["agenticcells","role:<role>"], prompt from team/run-prompt.md. Scheduled tasks that fire their own sessions cannot push (no repository attached): the ten role tasks are paused, kept as a record (team/SCHEDULE.md).
- **Pace:** interim slower pace since 08:12 (team/SCHEDULE.md, ACC-026), after the usage limit was hit three times; Dinis has not chosen yet. Today's even-hour slots: dev@, writer@, designer@ every two hours 08 to 22; reviewer@ 08, 12, 16, 20; console@ 12, researcher@ 14, security@ 16, abp@ 18, reporter@ 20; dns@ 08 and 20; outreach@ 09.
- **This wake (16:10):** started reviewer@ and security@ only, because the new conductor started dev@, writer@, designer@ and researcher@ at ~15:48.
- **Each wake:** board/briefs/conductor.md (newsroom check against board/newsroom-seen.json via /newsroom/wire.json; review commits; costs; WAITING.md; REALITY.md; release with team/release.sh, never pipe a gate).
- **Interactive sessions Dinis uses (not on the schedule):** sites@ (…eBZgF6nfCkeNKiFj8, now running its own loop with sites-dev@ and sites-design@ on Opus by Dinis's choice), pipeline@ (…bs2tps84m2aT6uVXr), factory@ (…eJozgSpfRvAagQEF1, AgentiCCells__Site__Factory), site@ (…cfyAUvxoGxMDmmZns, agenticcells.site), hub@ (…e18rqbd7TroksDxQm, hub.agenticcells.site). The conductor passes reviewer fixes for the sister sites to site@ and hub@ with send_message.
- **Standing rules:** Algarve Evolution: never touch, never link (Dinis ~14:15, COMMON.md). Listing the orange grower and Gabriel DaCruz on the hub or agenticcells.site waits on Dinis's consent.

## Open for Dinis (board/WAITING.md)
Pace (ACC-026); listing consent; the "CC" in the name (research/cc-trademark.md); plan-then-apply for the live site; abp@'s three gaps; commit signing (ACC-019); the four business decisions in board/BRIEF.md.

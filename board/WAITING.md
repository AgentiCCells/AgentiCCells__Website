# Waiting on Dinis

The one page to read. Kept by conductor@AgentiCCells.dinis at every wake; newest first within each group. Answer in chat or on the item; the conductor records the answer in board/decisions/ and REALITY.md.

## Urgent
- **ACC-018 · agenticcells.com (not used, Dinis 21:15) still points at GitHub Pages and can be claimed.** Simplest fix now: delete its A and www records. Since the site moved to agenticcells.ai, nothing claims .com but it still points at GitHub Pages. Fix: verify both domains in the AgentiCCells organisation (Settings, Pages, Add a domain, TXT record), or create a redirect repository for .com, or remove the .com records.

## Decisions
- **ACC-028 · Pages settings for the new sites:** on AgentiCCells__Site__Hub, Pages source "GitHub Actions" and custom domain hub.agenticcells.site; on both Site repositories, the github-pages environment must allow the dev branch, or the first deploy is rejected (as happened on AgentiCCells__Website).
- **ACC-026 · Pace against the usage limit: hit a second time at ~03:09 (all five runs failed).** Hit three times by 08:00 on 16 November. Running now, as an interim default until you choose: builders every two hours by day, none overnight; reviewer@ every four hours; the rest once a day (team/SCHEDULE.md). Say "keep the old pace", "slower is fine" or "pause". Earlier note: The account hit its 5-hour limit at about 19:09 UTC with this schedule (hourly dev@, writer@, designer@, plus the others and the conductor). Keep the pace, or slow it (for example dev@, writer@, designer@ every two hours)?
- **ACC-022 · May the site name the four first implementers and project manager** from "Atomic cells, end to end"?
- **ACC-024 / ACC-025 · A team sgit vault:** who creates it, and where its write key lives, for release copies (hub) and agent lanes.
- **ACC-027 · Site factory:** create AgentiCCells__Site__Factory, __Site__Template, __Site__Website (and __Site__Hub); agenticcells.site is now on Route 53 (done by Dinis); next, in the factory@ session, the GitHub App and the AWS OIDC role for that one zone.
- **ACC-019 · Key type:** the /key/ prototype uses ECDSA P-256 (every browser supports it); should customer keys match what sgit uses before it is more than a prototype? (dev@)
- **ACC-019 · Commit signing:** does the `Agent:` line count as the release signature until per-agent signing exists? (designer@ asked too.)
- **The four open decisions** in board/BRIEF.md: pricing model, referral commissions, who sells ABPs, where the console runs.
- **Console public?** It shows agent names, board items and commit subjects, nothing secret.
- **The case study is live at /case-study/** (reporter@, 68f8dc9, from a queue item the conductor wrote) although this page had listed publishing it as your decision: the conductor's inconsistency. Keep it, or take it down? Linking it from the home page is still open.
- **Claude Code on the open-source page** as "a runtime the customer chooses, not open source".
- **"RiskMandate, our own sister venture"** wording, and naming Dinis on About and the build page.

## For later
- **Plan, then apply, for the live site** (newsroom "Where assist becomes execute", tier 3): today every agent pushes to dev and dev publishes; the gates refuse a failing release, but nothing above the agents reviews a release. Your call when "later" comes (abp@ A5 will show the gaps).
- agenticcells.app nameservers (needed before the first customer site, ACC-006).
- Pinning workflow actions to commit SHAs (security@ proposal).
- The AWS and Google Cloud credentials in the conductor's environment (abp@ gap 1).
- Mail, Drive and Calendar connectors on the conductor's session (abp@, 18:13 run).

# Board: Gabriel DaCruz
| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Read the newsroom articles on Gabriel's sites | sites@ | done (three read, three skimmed) |
| 2 | Decide what we build first and in which repository | Dinis | waiting |
| 3 | Repository AgentiCCells__Site__Gabriel-DaCruz (Dinis creates and attaches) | Dinis | waiting |
| 4 | Only facts Gabriel has confirmed go on any page; the rest is marked TO CONFIRM | sites@ | rule |
| 5 | Smoke test (scripts/smoke.mjs) in CI and release.sh: every built page in Chromium at 390 and 1280 px; fails on a non-200 page or asset, a console error, or a request to another host. Shown to fail on planted faults | sites-dev@ | done 2026-11-16, live v0.1.1 (a831a19) |
| 6 | Composer's home page, English and Portuguese (sites-design@): music (seven Patreon compositions with month; the Spotify suite's movements), live and orchestra (three YouTube videos, titles only), lessons (his Instagram invitation), biography held until he confirms it, where to listen. Only facts from his public pages as the SGit Newsroom recorded them on 1 and 2 November 2026. Not shown until Gabriel confirms: the award in his Instagram bio, the Lisbon concert, the school, the band, the album title and year, who played in each video, any counts of plays, views or followers. Hand-drawn staff motif (src/assets/staff.svg); no image of a person. Checked in Chromium at 390 and 1366 px, both themes, local and live; smoke test OK | sites-design@ | done 2026-11-16, live v0.1.2 (bdc1651) |

## Questions for Dinis
1. "Multiple websites": the articles describe one site (gabrieldacruz.com) with many services on it (music, live and orchestra, lessons, scores, masters, a meter). Which separate sites do you mean, and which first? A guess: the artist site, a lessons and scores shop, a per-work page set for the music videos.
2. Is this repository a demo or prototype built by us for Gabriel (like the orange grower), or the site he will own and run with his own Claude, as the 2026-11-01 brief says? His own would belong in his GitHub, not ours.
3. gabrieldacruz.com did not load on 2026-11-01. I may not change DNS or settings; who handles that?
4. Which facts can I use? Only what the articles show about his public record, and the rest TO CONFIRM until Gabriel confirms. Is there an interview or confirmed-facts file I should read?

## 2026-11-16
- Repository AgentiCCells__Site__Gabriel-DaCruz created by Dinis, attached. Placeholder page (name, "composer and musician", English and Portuguese), vault ygs1ybi0, CI pipeline (v0.1.N by CI), pushed to dev (e105f30). Content waits on the questions above.

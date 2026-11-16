# Proof catalogue: what we can show, for agenticcells.ai and riskmandate.ai

Written by researcher@AgentiCCells.dinis, 2026-11-16 (about 23:30 to 00:20 UTC), for item S-PROOF (conductor@, from Dinis's brief `board/briefs/two-sites-2026-11-16.md`). It serves both sites: the same evidence, with a note per entry on which site it fits. Facts only from our own sites and the newsroom, each opened in this run (HTTP 200, and a Chromium screenshot at 1280 by 800 px, 2026-11-16). Where a number is Dinis's dictation and I could not find it in public material, it says so.

Marks: **[article]** = stated in a newsroom article (named); **[page]** = read on the live page by me on 2026-11-16; **[not found]** = in Dinis's brief, not found in public material. Proposals are marked as proposals.

## Rules applied

- Names: only Dinis Cruz is named in prose. The six-person Web Summit team and the two team members' portfolio sites carry their names in public URLs and articles, but this repository holds **no record that they agreed to be named by us** (CLAUDE.md: name no person who has not agreed). So the text says "a team member's portfolio site" and the link is given as-is; Dinis must say who may be named (see "Decisions for Dinis"). Gabriel DaCruz's site: `board/briefs/sites-loop.md` records that Dinis says he agreed.
- Not listed, not linked, not screenshotted: the client site that must not be listed (sites-loop.md). The Odoo-based hub appears nowhere here.
- Dollar figures in the articles are API-equivalent (what tokens would cost at list prices), not money spent [article: ten-days-at-web-summit]. Do not quote them as spend.
- Screenshots are of the live pages as read on 2026-11-16 and will go stale. Several pages show live data that was empty at that hour (see "Cautions").

## The catalogue

Each row: what it is, the link, what it proves, key figures with source, screenshot (in `shots/`), faces and consent, and which site it fits. "AC" = agenticcells.ai, "RM" = riskmandate.ai.

### 1. The Web Summit team (the macro case)

| | |
|---|---|
| **What** | Six people and their agents ran Web Summit Lisbon, 3 to 13 November 2026: a team site as the operating system (board, briefs, keys, inbox lanes, vaults, company map, X-ray), a newsroom, a storm site, a fringe guide, a draft rating standard, native apps, and the tools to stop it all. |
| **Links** | Map article: https://newsroom.sgit.ai/articles/ten-days-at-web-summit.html · Operating system: https://newsroom.sgit.ai/articles/the-teams-operating-system.html · Live team site: https://web-summit.sgit.ai/ |
| **Proves** | Many agents under one human can ship real, public things fast, with every commit signed by role and owner (`role@project.person`). The micro and the macro in one story. Fits AC (a team) and RM (control of many agents). |
| **Figures** | About 20,000 commits across 15 repositories; 224 Claude Code sessions (220 started by other sessions); around 250 named agents; more than 60 sessions at once at the peak (64 to 67 on 11 Nov); 134 sessions created on 11 Nov. Source: all [article: ten-days-at-web-summit], "counted from git history and the session list"; the article says the counts depend on how you count and that "agents" means distinct names in commits. On the team site alone: 895, 853, 767, 320, 277 and 277 commits by the six people's agents, plus about 2,100 automatic release commits [article: same]. |
| **Shots** | `web-summit-home.jpg`, `web-summit-team.jpg` (drawn avatars, no photos), `web-summit-summit.jpg`, `web-summit-pulse.jpg`, `web-summit-companies.jpg`, `web-summit-apps.jpg`, `web-summit-xray.jpg`, `newsroom-ten-days.jpg` |
| **Faces** | The team page uses cartoon avatars. No photographs on the pages I captured. The team site has a work item "each person confirms their own photo on the site" (WS-163, in the team's repository), which shows a consent process exists for photos there; I did not see its outcome. |
| **Not found** | Dinis's "256 agents" and "120,000" runs: **[not found]** in any public article I read (the public figure is "around 250 named agents"). Use "around 250" until a source for 256 and 120,000 is written down. |

### 2. The agents, roles and the universe (the visual centrepiece)

| | |
|---|---|
| **What** | "Universo": every person as a planet, their agents as moons, messages as flows, and each agent's behaviour policy (or its absence, in red) as the detail. Constellation, team, three shields, x-ray, messages, deliveries, workstreams and conversation views; a Galaxy and a Simple mode; Portuguese and English. Built as the Gravity library, then reused for the Fringe. |
| **Links** | In each person's command centre, tab "Universo": https://web-summit.sgit.ai/people/dinis/app/index.html#stand · Library: https://web-summit.sgit.ai/lib/gravity/ · Fringe universe: https://lisbontechfringe.com/universe/ |
| **Proves** | You can see what every agent is, who owns it and whether a policy covers it: the RM message ("we can control your agents") made visible; for AC, the cell as a drawn team. |
| **Figures** | On 2026-11-16 23:31 UTC the live view read: RiskMandate team, 115 agents, 204 messages, 51 pairs talking, 6 people, 21 agents with no policy [page: `universe-dinis-universo.jpg`]. These are live and change. |
| **Shots** | `universe-dinis-universo.jpg` (the best single image we have), `fringe-universe.jpg`, `web-summit-gravity-lib.jpg`, `web-summit-command-centre.jpg` |
| **Recording** | A 45-second silent screen recording of the universe on an iMac, filmed with a phone, is on a team member's site: https://silvio-switha.agenticcells.site/assets/media/universe-demo.mp4 (5.2 MB, 1280 by 720). Hands and a festival wristband are in frame; see Faces. |
| **Correction to the brief** | Dinis calls it a 3D universe. In the page I measured 47 SVG elements and no canvas or WebGL: it is a 2D drawing with depth effects. Say "universe" or "galaxy view" on the sites, not "3D", unless someone confirms a 3D mode. |
| **Faces and names** | The recording shows hands and a wristband, no faces. The screenshot `universe-dinis-universo.jpg` has the team members' first names as planet labels (it is their own public page); do not crop it into a public page without the consent decision below. |

### 3. The white stripes on the universe: what I found

Dinis: "the universe had some white stripes around the border". **I could not reproduce them.** What I tested, with Chromium on 2026-11-16:

- The command-centre universe (`#stand`) at 390, 1024, 1440, 1920 and 2560 px wide, embedded and after the "Full screen" and "Stand" buttons: edge pixels were dark (mean luminance 5 to 26 of 255) at every size.
- The Fringe universe page (https://lisbontechfringe.com/universe/, which loads the Gravity library from web-summit.sgit.ai) at 1440 and 2560 px wide: the universe block fills the width, dark (rgb 4, 16, 15), no border. Its full-screen and stand buttons did not respond to my script, so those two modes are **untested**.
- The only bright edges found are in the filmed recording `universe-demo.mp4`: the iMac's bezel, the wall and the user's hands frame the screen, so the picture has light bands left, right and top (frames at 5 s steps: up to 30 of 30 pixel columns at the right edge brighter than 160/255). That is the most likely thing Dinis saw, if he watched the video or its poster on the portfolio page. It is a camera framing, not a stylesheet fault.
- **Where to look next** (for whoever owns each site): (a) the video file above, owner: the team member's portfolio site (repository AgentiCCells__Site__... for that person); fix by cropping to the screen or replacing it with a screen capture of `#stand`; (b) the universe in light theme, in Safari and on a real iMac display (not tried: I have only Chromium); (c) the Fringe universe's full-screen and stand modes; (d) `assets/cc/` in web-summit.sgit.ai's repository (the Gravity engine is `lib/gravity/latest/gravity.js`).

### 4. PrompTugal.news, and PrompTugal.news by place

| | |
|---|---|
| **What** | An independent newsroom for technology and AI "from Portugal for Europe", run by desks of agents with a reviewer for every draft; now going local: Portugal, the Algarve and each Algarve town, each place on its own subdomain from one shared set of agents. |
| **Links** | https://promptugal.news/ · Story of the newsroom: https://newsroom.sgit.ai/articles/promptugal-news-the-newsroom-we-ran.html · By place: https://newsroom.sgit.ai/articles/promptugal-news-by-place.html · Desks: https://promptugal.news/newsroom/desks/ · Observability: https://promptugal.news/newsroom/observability/ |
| **Proves** | An agent team that produces public output every day, signed and checkable; one policy of sourcing for all. Fits AC ("start here" is a newsroom cell) and RM (reviewer, outreach desk with a rule). |
| **Figures** | 73 signed articles in ten days; 61 named agents in 43 roles; first commit 00:08 UTC on 4 Nov; fifty outreach drafts that no agent could send [all article: promptugal-news-the-newsroom-we-ran]. First wave of places: sixteen municipalities and Quarteira [article: promptugal-news-by-place]. The live front page on 16 Nov 23:28 UTC said "17 towns, each with its own AI agent", "140 local stories from 52 publishers so far" [page: `promptugal-home.jpg`]. |
| **Shots** | `promptugal-home.jpg`, `promptugal-articles.jpg`, `promptugal-desks.jpg`, `promptugal-observability.jpg` |
| **Faces** | None seen on the captured pages. Bylines name agents and "for Dinis Cruz". |

### 5. Sites made by the factory (the £500 flow)

| Site | Link | Notes |
|---|---|---|
| A team member's portfolio, with a film first, five designs of the same facts, 17 agents drawn three ways | https://silvio-switha.agenticcells.site/ | Made in under an hour by the factory and five design agents [article: a-portfolio-with-a-film-first]. Shots (portfolio A): `portfolio-a-home.jpg`, `portfolio-a-portfolio.jpg`, `portfolio-a-agents.jpg`. Name is in the URL; consent to be named not recorded here. |
| A team member's site, 26 agents drawn three ways, five designs, printable brief | https://yiheng-wang.agenticcells.site/ | Three passes in one evening [article: a-website-that-is-her]. Shot: `portfolio-b-home.jpg`. Same consent note. |
| Gabriel DaCruz, composer | https://gabriel-dacruz.agenticcells.site/ | Dinis says he agreed to be named (sites-loop.md). Shot: `gabriel-home.jpg`. |
| Algarve orange grower (a made-up example, Dinis plays the farmer) | https://algarve-orange-grower.agenticcells.site/ | Invented prices; nothing sent (REALITY.md). Shot: `orange-grower-home.jpg`. Mark it "example". |
| The factory itself | https://newsroom.sgit.ai/articles/the-site-factory-works.html · https://newsroom.sgit.ai/articles/ci-behaviour-policies.html | "The RiskMandate at Web Summit site live over https 87 seconds after the merge"; "no long-lived keys anywhere, but a pipeline with far more power than it needs" [article: the-site-factory-works]. Shot: `newsroom-site-factory-works.jpg`. |

**Proves:** the £500 rung in action, and that the same data can be shown several ways (Dinis's "five designs"). Fits AC; for RM, the "pipeline with far more power than it needs" story is a ready-made case for a CI behaviour policy.
**Faces:** the portfolio sites carry photos of their subjects. The article says portfolio A was "made with his permission", "teammates are cropped out of the photos, and names were blurred in a screenshot, because they have not agreed to appear" [article: a-portfolio-with-a-film-first]. I did not audit every image; before reuse, each photo needs a named person who agreed. The site factory is **not** a store of consent.
**Do not list:** the client site that must not be listed (sites-loop.md); the newsroom's articles about the factory describe it unnamed.

### 6. Apps (iOS and Android)

| | |
|---|---|
| **Links** | https://ios.app.promptugal.news/ · https://ios.app.promptugal.news/apps.html · https://ios.app.voicedebrief.ai/ · https://voicedebrief.ai/ · Articles: https://newsroom.sgit.ai/articles/native-apps-by-agents.html · https://newsroom.sgit.ai/articles/voicedebrief-relaunch.html · https://newsroom.sgit.ai/articles/the-mac-bottleneck.html |
| **Proves** | Agents can build and ship native apps with a person only steering. |
| **Figures** | Four iOS apps from one workspace; 1,164 lines of Swift on 7 Nov to 48,230 on 11 Nov; Android tablet app signed and on a tablet 4 hours 11 minutes after the first commit; about 33,000 lines of Kotlin; the Fringe guide on TestFlight about ten and a half hours after its brief [all article: native-apps-by-agents and ten-days-at-web-summit]. Builds waited 22,427 minutes against 6,980 run on five Macs [article: the-mac-bottleneck, teaser]. |
| **Shots** | `ios-app-promptugal.jpg`, `ios-app-promptugal-apps.jpg`, `ios-app-voicedebrief.jpg`, `voicedebrief-home.jpg` |
| **Honesty** | The PrompTugal app page says "Beta... not yet in the App Store" and "8 of 13 planned features in the beta" (v0.4.123) [page]. Say "TestFlight beta". |
| **Not found** | **No public page for the Android app** (only the article). Nothing to screenshot; ask Dinis for a public link or a screen capture. |

### 7. The Storm site (Storm Charles)

| | |
|---|---|
| **Links** | https://storm-charles.promptugal.news/ · https://storm-charles.promptugal.news/journal/what-it-cost.html · https://newsroom.sgit.ai/articles/storm-charles-a-newsroom-built-in-a-night.html |
| **Proves** | A whole data-driven site in one night, where every figure carries a source, a time and a label (fact, evidence or hypothesis), and the site tells on itself (a journal of what it cost and what went wrong). The best "evidence first" example for RM. |
| **Figures** | About 2,000 pages by morning, about thirty agents, each push live in about forty seconds; 34 datasets with hashes; a graph of 496 things and 705 links [article: storm-charles-a-newsroom-built-in-a-night]. Later: more than 2,600 pages in three days; 2,618 pages, 1,434 versions, 3.84 billion tokens (API-equivalent, from the site's own accounts page) [article: ten-days-at-web-summit]. |
| **Shots** | `storm-charles-home.jpg`, `storm-charles-journal.jpg` |
| **Caution** | The home page said "Updated 3 d ago" at 23:28 UTC on 16 Nov [page]: the storm is over; present it as a case study, not a live service ("Not a warning service" is on every page). |

### 8. Lisbon Tech Fringe

| | |
|---|---|
| **Links** | https://lisbontechfringe.com/ · https://lisbontechfringe.com/universe/ · article: https://newsroom.sgit.ai/articles/native-apps-by-agents.html (the Fringe app) |
| **Proves** | A guide to the summit's fringe live "two and a half hours after its brief" (live 12:57 on 11 Nov); the Fringe iPhone app on TestFlight at 21:11 [article: ten-days-at-web-summit]. Its own page "The agentic team" (dashboard, policies, designs, traffic, universe) shows an agent team and its policies on a public site. |
| **Figures** | 179 events in the universe view at 09:56 UTC [page: `fringe-universe.jpg`]. |
| **Shots** | `lisbon-tech-fringe-home.jpg`, `fringe-universe.jpg` |
| **Caution** | The home page header reads "0 commits, 0 pushes, 0 agents in 15 min" and "0 on now", because the event was on Saturday 14 Nov [page]. A buyer who opens it today sees zeros. Ask the Fringe site's owner for a "final tally" header, or frame it as "the event is over". |

### 9. The newsroom (articles) and the book

| | |
|---|---|
| **Newsroom** | https://newsroom.sgit.ai/ , 439 articles in `wire.json` on 2026-11-16 [page]. Best for the two sites: https://newsroom.sgit.ai/articles/the-intersection.html , https://newsroom.sgit.ai/articles/stopping-a-hundred-agents.html , https://newsroom.sgit.ai/articles/where-assist-becomes-execute.html , https://newsroom.sgit.ai/articles/the-cell-is-the-unit.html . Shots: `newsroom-home.jpg`, `newsroom-the-intersection.jpg`, `newsroom-stopping-a-hundred-agents.jpg`. |
| **Stopping a hundred agents (a failure and a fix, RM)** | On 9 Nov Dinis stopped every agent. "Pausing took seconds; hearing the order took 5 minutes to 2 hours 36." Scheduled wakes fell 80 to 94% on the accounts that reported. Two more stops on 12 Nov (hand brake, final hold). "A stop is a file every agent reads first." [article: stopping-a-hundred-agents]. This is exactly the case "it did not work, then we put a policy on it" that the brief asks for. |
| **The book** | *One Human, Nine Agents, Nineteen Hours*: https://leanpub.com/one-human-nine-agents-nineteen-hours (200 on 2026-11-16; shot `book-leanpub.jpg`); companion site https://the-ultimate-insider.book.sgit.ai/ (shot `book-site.jpg`). Price: free minimum, 19 dollars suggested, every update included; "90% complete, published early on purpose" [article: the-book-is-on-leanpub, 14 Nov]. Dinis said "buy on Linpa": the link above is Leanpub, which matches. The PDF: **no PDF link found** on the public pages I read; ask Dinis which file may be offered free. |
| **Faces** | None seen in the captured pages. |

### 10. RiskMandate and AgentiCCells themselves, as they stand

For comparison and for before/after: `riskmandate-home.jpg`, `riskmandate-abp.jpg`, `riskmandate-rules.jpg` (the home page carries a video, 1 `<video>` element [page]), `agenticcells-home.jpg`, `agenticcells-case-study.jpg`. Also useful for RM: GAMMA-Ray (https://gamma-ray.sgit.ai/, shot `gamma-ray-home.jpg`: 20 company reports in thirty hours [article: ten-days-at-web-summit]) and Swarm (https://swarm.promptugal.news/, shot `swarm-home.jpg`). I did not read GAMMA-Ray or Swarm beyond their home pages.

## Gaps: what we do not yet have (ask, or build)

1. A public Android page or screen capture. 2. A source for "256" and "120,000". 3. The book PDF's public link. 4. The infographics: Dinis mentions them; I did not locate a public set (the newsroom article cards at `/articles/cards/<slug>.webp` are infographic-like and AI-made; they would need an "AI-made" mark). 5. Recordings of animations (the universe, the Storm replays): none made yet; a Playwright recording of `#stand` is possible (proposal: `recordVideo`, 1280 by 720, 20 s, silent, no personal data on screen). 6. Photos of the Web Summit stand: the portfolio sites hold some; consent unrecorded. 7. Consent records for named people (see below).

## Cautions before any page uses these

- Live pages change; every figure above carries the day it was read. Re-read before publishing.
- The `.ai` sites should not claim "3D", "256", "120,000", or "in the App Store" (see above).
- Dollar and token figures are API-equivalent, not money spent.
- AI-made images are to be marked as such (brief).

## Decisions for Dinis

1. Which of the six team members, and which portfolio-site owners, may we name in text, and may their photos be reused? Until said, the sites should say "a team member" and link without a name.
2. Is the white stripe the iMac bezel in `universe-demo.mp4`? If another file or mode shows it, give me the URL or a screenshot.
3. Which file is the book's free PDF?

## Files

`shots/` holds 42 JPEGs at 1280 by 800 (the universe at 1440 by 900), about 4 MB. Each file name starts with the site; the table above names the ones that prove each point. They were taken on 2026-11-16 between about 23:25 and 00:10 UTC with Playwright and the pre-installed Chromium, no login, no click except the universe tab, which I opened by script.

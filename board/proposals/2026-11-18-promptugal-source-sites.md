# Proposal: three source sites on PrompTugal's public data (received 2026-11-18 08:54 UTC)

From newsroom writer-09, at Dinis's request (relayed; Dinis said he may write his own brief, and his words win). Article: https://newsroom.sgit.ai/articles/from-a-feed-to-meaning.html (CC BY 4.0). Status: **proposal; names, domains and whether to build are Dinis's.** Nothing is built.

- Idea (Dinis, as relayed): show that we can integrate everything with everything, and let people use the data.
- Source: data.promptugal.news only (API index https://data.promptugal.news/api/v1/index.json), never the upstream sources. Nine public sources read hourly by code (IPMA warnings, observations, forecasts, fire risk, sea forecast, UV; MeteoAlarm; flights around Faro).
- Three website cells, rebuilt hourly by :30: (1) warnings and weather now; (2) the sea; (3) fire risk by municipality. Possible fourth: flights around Faro, daily.
- Each: data now with source and time read; "not a warning service, follow IPMA and ANEPC"; charts and a map made by code; a "what changed" note labelled fact or hypothesis, only when something changed; "how to use this data" (URL, curl, fetch, a Claude prompt); "how it is made".
- Dependency: the data site's hourly run had stalled (last read 02:28 UTC when checked at 08:50); writer-09 asked PrompTugal's data agent to fix it and add a staleness flag. Until then, sites must show the read time and say when data is stale.
- Who would build: cells@ (creates cells), listed by hub@; showcased on agenticcells.ai as examples of the website cell and of "connect any data with any data".

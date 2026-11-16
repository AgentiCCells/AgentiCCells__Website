# DNS check results

One section per run of `node dns/check.mjs` (queue item N1). Read-only lookups.

## 2026-11-15, after 20:08 UTC · dns@AgentiCCells.dinis
Result: OK (after updating records.json and check.mjs to what was observed; the old file expected .com live and .ai parked).
- agenticcells.ai: live. NS (Route 53), A (four GitHub Pages addresses) and www CNAME as recorded; https://agenticcells.ai/version.json answers 200, v0.1.39. No `_github-pages-challenge-agenticcells` TXT (NXDOMAIN): not verified in the organisation.
- agenticcells.com: unclaimed. NS and A as recorded; www CNAME is agenticcells.github.io; no AAAA, CAA or verification TXT. http://, https:// and https://www. all answer 404 with GitHub's "Site not found" page. Any GitHub account could claim it as a Pages custom domain (ACC-018, still open, waits on Dinis).
- agenticcells.app: still NXDOMAIN (not delegated). No customer sites.
- Changed in the repository: zones .com "unclaimed", .ai "live"; new "http" expectation per zone, checked by check.mjs; a planned verification TXT for .ai.

## 2026-11-16 · dns@AgentiCCells.dinis (scheduled run)
Result: OK, after adding agenticcells.site to dns/records.json (the file did not list it). All lookups through dns.google; HTTP with curl.
- agenticcells.site: live, on Route 53 (ns-23.awsdns-02.com and three more). Apex A is the four GitHub Pages addresses; no AAAA, CAA or TXT. https://agenticcells.site/version.json answers 200 (v0.1.2). www.agenticcells.site is a CNAME to agenticcells.github.io. No `_github-pages-challenge-agenticcells` TXT (NXDOMAIN).
- hub.agenticcells.site: CNAME to agenticcells.github.io. https://hub.agenticcells.site/version.json answers 200 (v0.1.2).
- agenticcells.com: unchanged and not used (Dinis, 2026-11-15, "we are not going to use it"). NS, A and www CNAME as recorded; http, https and https://www all answer 404 "Site not found"; no verification TXT. Still claimable by any GitHub account (ACC-018 open; Dinis to decide whether to remove the Pages records or claim it).
- agenticcells.ai: live as recorded, https://agenticcells.ai/version.json answers 200; no verification TXT.
- agenticcells.app: not delegated in the file's last observation; this run did not re-check it beyond the planned records, which are still not live. No customer sites.
- Changed in the repository: zone .site and four observed records, one planned verification TXT; .com status now "unused". The JSON file was re-indented by the tool that edited it, so the diff is larger than the change.

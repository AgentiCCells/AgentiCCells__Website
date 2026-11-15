# DNS check results

One section per run of `node dns/check.mjs` (queue item N1). Read-only lookups.

## 2026-11-15, after 20:08 UTC · dns@AgentiCCells.dinis
Result: OK (after updating records.json and check.mjs to what was observed; the old file expected .com live and .ai parked).
- agenticcells.ai: live. NS (Route 53), A (four GitHub Pages addresses) and www CNAME as recorded; https://agenticcells.ai/version.json answers 200, v0.1.39. No `_github-pages-challenge-agenticcells` TXT (NXDOMAIN): not verified in the organisation.
- agenticcells.com: unclaimed. NS and A as recorded; www CNAME is agenticcells.github.io; no AAAA, CAA or verification TXT. http://, https:// and https://www. all answer 404 with GitHub's "Site not found" page. Any GitHub account could claim it as a Pages custom domain (ACC-018, still open, waits on Dinis).
- agenticcells.app: still NXDOMAIN (not delegated). No customer sites.
- Changed in the repository: zones .com "unclaimed", .ai "live"; new "http" expectation per zone, checked by check.mjs; a planned verification TXT for .ai.

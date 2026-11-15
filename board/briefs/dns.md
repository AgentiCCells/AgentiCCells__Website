# Brief: dns@AgentiCCells.dinis
Given by conductor@, 2026-11-15. Read COMMON.md first, then dns/ROUTE53.md and dns/CUSTOMER-SITES.md.
Policy. May reach: dns/ in this repository; public DNS and HTTP lookups (read only). Asked to: keep the records as data and write the checks. May not: use any AWS credentials (none have been given to this role; the ones in the environment are not yours), change any DNS, touch anything outside dns/ except your log, map and debrief.
Dinis, 2026-11-15: the site is "for now" agenticcells.com, "configured to use GitHub"; "agenticcells.ai is a bit of a mess at the moment so we are not going to use it (until the NS stabelise)".
Work:
1. ACC-004: dns/records.json: the records the .com zone needs for GitHub Pages (as live now, observed with lookups, mark each `"observed": "<date>"` or `"planned"`), the planned .app records (CAA, verification TXT with value "to be given by Dinis"), and .ai marked `"status": "parked"`.
2. dns/check.mjs (Node only): resolves every record in records.json and reports mismatches; and for every customer label in the .app zone, fetches https://<label>.agenticcells.app/ and lists any that do not answer (the weekly dangling-record check, ACC-006). No customers exist yet; it must pass with none.
3. Map: map/customer-sites.md, the pipeline in dns/CUSTOMER-SITES.md as steps with who does each (Dinis or an agent with scoped credentials).

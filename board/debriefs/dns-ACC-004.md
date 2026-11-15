# Debrief: dns@agenticcells.dinis, ACC-004 and ACC-006 (first pass)

Date: 2026-11-15. Brief: board/briefs/dns.md. Policy kept: no AWS credentials used, no DNS changed, only public read-only lookups (DNS-over-HTTPS to dns.google and cloudflare-dns.com, and HTTP fetches).

## What I did
- Observed the live records of the three zones and wrote them as data in `dns/records.json`, each marked `"observed": "2026-11-15"` or `"planned": true`, with the .ai zone marked `"status": "parked"`.
- Wrote `dns/check.mjs` (Node only, no dependencies): checks the file's shape, resolves every record, reports mismatches, and fetches `https://<label>.agenticcells.app/` for each customer record (the weekly dangling-record check). `--records <file>` checks another file; `--no-net` checks the shape only.
- Wrote `map/customer-sites.md`: the pipeline in dns/CUSTOMER-SITES.md as steps, with who does each.

## What worked
- `node dns/check.mjs` prints OK on the real file (no customers).
- With a test file holding a wrong A value and a fake customer label, it reports the mismatch and the dangling site and exits 1 (test file kept outside the repository).

## What did not
- Node's own resolver in this container answers A queries only (NS, CAA, CNAME, TXT and AAAA give ENODATA), so the check uses DNS-over-HTTPS. It needs outbound HTTPS to dns.google or cloudflare-dns.com.
- The weekly schedule for the check is not set up (ACC-006 asks for it; a schedule is outside this brief).

## Facts for REALITY.md (checked 2026-11-15 by dns@ with DNS-over-HTTPS)
- agenticcells.com is delegated to Route 53 (ns-25.awsdns-03.com, ns-566.awsdns-06.net, ns-1184.awsdns-20.org, ns-1728.awsdns-24.co.uk). Apex A: the four GitHub Pages addresses, TTL 300. www: CNAME agenticcells.github.io, TTL 300. No AAAA, no CAA, no MX, no GitHub verification TXT.
- agenticcells.ai is delegated to Route 53 (ns-354.awsdns-44.com, ns-603.awsdns-11.net, ns-1167.awsdns-17.org, ns-1569.awsdns-04.co.uk), with the same four A records and www CNAME agenticcells.github.io. http://agenticcells.ai/ answers 404 from GitHub Pages; https fails.
- agenticcells.app: the .app registry answers NXDOMAIN. The domain is not delegated to any nameservers, so no .app records can exist yet.
- `dns/records.json` and `dns/check.mjs` exist; the check prints OK.

## For Dinis to decide
1. **agenticcells.ai points at GitHub Pages with no site claiming it** (404). Until the domain is verified in the AgentiCCells GitHub organisation, another GitHub account could set agenticcells.ai as their Pages custom domain and serve content on it. Options: verify agenticcells.ai in the organisation (TXT record), or remove the A and www records while .ai is parked. Either is a DNS change by you.
2. Delegate agenticcells.app (it is not live at the registry), then add its CAA and verification TXT.
3. Whether to verify agenticcells.com in the GitHub organisation too (proposal; records.json carries it as planned with value "to be given by Dinis"), and add the AAAA and CAA records proposed for .com.
4. Who runs the weekly check, and where (a schedule needs your approval).

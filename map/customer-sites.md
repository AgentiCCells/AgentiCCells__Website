# Map: customer sites on agenticcells.app

Status: first pass by dns@AgentiCCells.dinis, 2026-11-15, from dns/CUSTOMER-SITES.md. No customer site exists yet, so every step below is the planned pipeline (a proposal), not a recorded run. ACC-006 records the first run with a test repository.

"Agent with scoped credentials" means an agent holding only `route53:ChangeResourceRecordSets` and `route53:ListResourceRecordSets` on the agenticcells.app hosted zone (dns/ROUTE53.md). No agent holds such credentials today; until one does, Dinis does those steps by hand.

## Before the first customer (once)

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 0a | Delegate agenticcells.app to a Route 53 hosted zone | Dinis | registrar, AWS account | four AWS nameservers for .app | `node dns/check.mjs` (on 2026-11-15 the .app registry answered NXDOMAIN) |
| 0b | Add CAA and the GitHub verification TXT | Dinis (or agent with scoped credentials) | the value GitHub shows | records live | dns/records.json, entries marked planned |
| 0c | Verify agenticcells.app in the AgentiCCells GitHub organisation | Dinis | the TXT record | domain shown as verified | GitHub organisation settings (no agent has that reach) |

## Create (per customer)

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 1 | Pick the label; check it is not in records.json | dns@ | customer's short name | label | dns/records.json |
| 2 | Add `CNAME` file and set the Pages custom domain | the customer, or dev@ working in the customer's repository with their permission | label | `<label>.agenticcells.app` in their repository | their repository (no state on our side) |
| 3 | Add one CNAME record, never a wildcard | Dinis, or an agent with scoped credentials | label, `<customer-org>.github.io` | record live | Route 53 change |
| 4 | Wait for the certificate, tick Enforce HTTPS | whoever holds the customer's repository settings | live record | https answers | `curl -I https://<label>.agenticcells.app/` |
| 5 | Record it in dns/records.json (label, repository, date, agent) | dns@ | the live record | a `customer` entry marked observed | commit with `Agent:` trailer |
| 6 | Check it | dns@ | records.json | "answers" line, OK | `node dns/check.mjs` |

## Move to their own domain

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 7 | Point their domain at GitHub Pages, change the custom domain | the customer | their domain | site on their domain | their repository |
| 8 | Keep the .app name as a redirect for 90 days | dev@ (redirect page) or a note to the customer | old label | redirect | board item with the end date |
| 9 | Delete the record, remove it from records.json | Dinis or agent with scoped credentials; dns@ for the file | end of the 90 days | record gone | check.mjs no longer lists it |

## Offboard (never skipped)

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 10 | Delete the DNS record the same day the customer leaves or their Pages site goes | Dinis or agent with scoped credentials | the label | record gone | lookup answers NXDOMAIN |
| 11 | Remove the entry from records.json | dns@ | step 10 | file matches the zone | `node dns/check.mjs` prints OK |

## Weekly dangling-record check

| # | Step | Who | Input | Output | Evidence |
|---|---|---|---|---|---|
| 12 | Run `node dns/check.mjs`: resolves every record, fetches every customer site | dns@ (proposal: on a weekly schedule, not set up yet) | dns/records.json | OK, or a list of records that do not answer | team/activity/dns.jsonl |
| 13 | For each record that does not answer: open a board item; delete the record the same day if the site is gone | dns@ opens the item; Dinis or agent with scoped credentials deletes | check output | board item, record gone | board/ |

## Later
| # | Step | Who | Output |
|---|---|---|---|
| 14 | Renew agenticcells.app for several years, then apply to the Public Suffix List | Dinis (renewal moves money; the application contacts an outside party) | each customer subdomain treated as a separate site by browsers |

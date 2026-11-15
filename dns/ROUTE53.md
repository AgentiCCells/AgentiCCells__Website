# DNS on AWS Route 53

Three domains, bought 15 November 2026 at a registrar whose default nameservers are `NS79.WORLDNIC.COM` and `NS80.WORLDNIC.COM`. DNS moves to Route 53. Each hosted zone costs about 0.50 USD a month.

## Step 1: create the hosted zones (Dinis)

In Route 53, create a **public hosted zone** for each:

- `agenticcells.ai`
- `agenticcells.com`
- `agenticcells.app`

Each zone gets four nameservers, like `ns-123.awsdns-15.com`, `ns-456.awsdns-57.net`, `ns-789.awsdns-34.org`, `ns-1011.awsdns-26.co.uk`. They differ per zone.

## Step 2: point the registrar at Route 53 (Dinis)

At the registrar, for each domain: Manage Nameservers → replace `NS79.WORLDNIC.COM` and `NS80.WORLDNIC.COM` with that zone's **four** AWS nameservers (use "+ Nameserver" twice), without the trailing dot. Save. Changes usually show within an hour, sometimes up to 48.

Check: `dig NS agenticcells.ai +short` should list the four AWS names.

## Step 3: records for agenticcells.ai (the company site on GitHub Pages)

| Name | Type | Value |
|---|---|---|
| `agenticcells.ai` | A | `185.199.108.153` |
| `agenticcells.ai` | A | `185.199.109.153` |
| `agenticcells.ai` | A | `185.199.110.153` |
| `agenticcells.ai` | A | `185.199.111.153` |
| `agenticcells.ai` | AAAA | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www.agenticcells.ai` | CNAME | `<github-org-or-user>.github.io` |
| `agenticcells.ai` | CAA | `0 issue "letsencrypt.org"` (GitHub Pages certificates come from Let's Encrypt) |
| `_github-pages-challenge-<org>.agenticcells.ai` | TXT | the value GitHub shows when you verify the domain (Organisation settings → Pages → Add a domain) |

Then in the website repository: Settings → Pages → Custom domain `agenticcells.ai`, wait for the certificate, tick **Enforce HTTPS**. The repository also carries a `CNAME` file with `agenticcells.ai`.

Re-check the GitHub Pages IP addresses against GitHub's documentation ("Managing a custom domain for your GitHub Pages site") before applying; they have been stable for years but the documentation is the source.

## Step 4: agenticcells.com → agenticcells.ai

GitHub Pages serves one custom domain per repository, so the redirect needs a second, tiny repository or an AWS redirect:

- **Option A (simplest, all GitHub):** a repository `agenticcells-com-redirect` with an `index.html` that redirects to `https://agenticcells.ai/` (a meta refresh and a canonical link), Pages custom domain `agenticcells.com`, and the same A/AAAA records as above in the `.com` zone, plus `www` CNAME.
- **Option B (AWS):** an S3 bucket named `agenticcells.com` configured to redirect all requests to `agenticcells.ai` over HTTPS, fronted by CloudFront with an ACM certificate (in us-east-1) for `agenticcells.com` and `www.agenticcells.com`, and Route 53 alias records to the distribution.

Choose A unless Dinis prefers AWS. Either way, test `http://`, `https://` and `www.`.

## Step 5: agenticcells.app (customer sites)

No apex site at first. Records are created per customer: see `CUSTOMER-SITES.md`. Add now:

| Name | Type | Value |
|---|---|---|
| `agenticcells.app` | CAA | `0 issue "letsencrypt.org"` |
| `_github-pages-challenge-<org>.agenticcells.app` | TXT | GitHub's verification value for this domain |

Verifying the domain in the GitHub organisation stops anyone else's repository from claiming a subdomain of it.

## Records as data

Keep every record in `dns/records.json` in the repository, one object per record, so the zone can be reviewed, diffed and re-applied:

```json
[{"zone": "agenticcells.ai", "name": "agenticcells.ai", "type": "A", "ttl": 3600, "values": ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]}]
```

An agent may apply records only with credentials scoped to these three hosted zones (`route53:ChangeResourceRecordSets` and `route53:ListResourceRecordSets` on their zone ARNs). No other AWS access.

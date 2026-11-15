# Customer sites on agenticcells.app

While a customer gets their own domain, their site lives at `company-x.agenticcells.app` (or `user-x.agenticcells.app`), served by GitHub Pages from a repository in **their** GitHub organisation or account (no state on our side).

## Create (per customer)

1. Pick the label: lowercase letters, digits and hyphens, the customer's short name. Check it is not already in `dns/records.json`.
2. In the customer's repository: add a `CNAME` file containing `company-x.agenticcells.app`; Settings → Pages → Custom domain → same value.
3. In the `agenticcells.app` zone: one record, never a wildcard:
   `company-x.agenticcells.app  CNAME  <customer-org>.github.io`
4. Wait for GitHub's certificate, then tick **Enforce HTTPS** (.app is HTTPS-only in browsers anyway).
5. Record it in `dns/records.json` with the customer label, the repository, the date and the agent that created it.

## Move to their own domain

1. The customer points their domain at GitHub Pages and changes the custom domain in their repository.
2. Keep `company-x.agenticcells.app` as a redirect for 90 days (a tiny redirect page in a repository we control, or a note to the customer), then delete the record.

## Offboard (the step that must never be skipped)

When a customer leaves, or their repository or Pages site is deleted: **delete the DNS record the same day.** A CNAME left pointing at a GitHub Pages site that no longer exists is a subdomain takeover waiting to happen. Domain verification in our GitHub organisation reduces the risk; deleting the record removes it.

A weekly check (an agent's job): for every record in the `.app` zone, fetch `https://<label>.agenticcells.app/`; list any that do not answer with the customer's site, and open a board item for each.

## Later: the Public Suffix List

Once there are several customers, apply to add `agenticcells.app` to the Public Suffix List (publicsuffix.org), as github.io is. Browsers then treat each customer subdomain as a separate site, so cookies cannot cross between customers. The list expects the domain to be registered well into the future: renew for several years before applying.

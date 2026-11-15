# Debrief: researcher@agenticcells.dinis, first piece (2026-11-15)

## What I did
1. research/stack-checked.json (released first, c2b458b): each component we assemble with its licence and official link, read from the licence file or package registry. For writer@ to copy into data/stack.json.
2. research/checked-claims.md: licences and prices from research/01 and 02 re-checked against vendor pages and licence files, each with source, date and status.
3. map/research.md: how a claim moves from a research note to a published page.

## What worked
- Licence files via raw.githubusercontent.com, and the npm and PyPI registries, answered every request.
- Most vendor pricing pages carry their prices in the HTML, so curl was enough.

## What did not
- github.com web pages and api.github.com answer 403 to this session: no star counts, and Agent Control (an organisation, not a repository) could not be checked.
- investor.workday.com answers 403: the Workday and Flowise date is unchecked.
- There is no leak-scan or wording-check script in the repository yet. I ran a grep for key patterns on the staged diff and a check for em dashes in my files instead. CLAUDE.md requires both checks for a release.
- Commits are not signed with my sgit key: no route for signing git commits with an sgit key is written down (reading-notes Q4).

## Findings writer@ and Dinis should know
- **Claude Code is not open source** ("All rights reserved", Anthropic Commercial Terms). The open-source page should list runtimes as the customer's choice, not as our open components. Codex CLI and Cloudflare's workerd are Apache-2.0.
- **n8n is not open source** (Sustainable Use License, fair-code); **Dify** is a modified Apache-2.0 with extra conditions; **Flowise** has a commercial enterprise directory. research/01 calls all three open source.
- research/02 says agenticcells.ai was "confirmed free"; it now resolves to GitHub Pages and is not in use (REALITY.md). That line is out of date.
- Ruflo: the brief's "v3.77.0, Nov 12" is right for that release, but 3.77.1 followed on 13 November. Link the repository, not a version.

## Facts for REALITY.md (checked 2026-11-15 by researcher@)
- research/stack-checked.json exists on dev (c2b458b). research/checked-claims.md and map/research.md exist on dev (this release).
- Public key for researcher@agenticcells.dinis is in team/keys/researcher.json (sha256:fcdfb9faf4cee3fa).
- From this session: raw.githubusercontent.com, registry.npmjs.org and pypi.org answer; github.com and api.github.com answer 403.

## For Dinis to decide
- Whether the open-source page may list Claude Code at all, given it is not open source.
- How often claims are re-checked (map/research.md step 7).
- Who writes the leak scan and wording check that CLAUDE.md makes a release condition.

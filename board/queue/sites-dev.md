# Queue: sites-dev@AgentiCCells.dinis
Brief: board/briefs/sites-loop.md. Newest items at the bottom; take the top unticked one.
- [ ] Algarve Evolution: data files for the content (events, programmes, sources) built from promptugal.news and newsroom.sgit.ai, each item with its source URL; render them on the page.
- [ ] Orange grower: a map of the Algarve (vendored library or inline SVG, OpenStreetMap attribution if used) showing the farm and the delivery zones; selecting a zone on the map updates the order and the price live.
- [ ] All three: a Playwright smoke test in scripts/ run by CI (page loads, no console errors, no requests to other hosts except allowed map tiles, the order flow on the orange site).
- [ ] All three: CI step that syncs the vault from the repository when an SGIT_VAULT_KEY secret exists, skipped cleanly when it does not (read sgit.ai docs/vault/git-and-vaults.md and `sgit vault attach --help`); never print the key.

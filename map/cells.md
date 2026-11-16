# Map: every cell, and who does what

Source of truth: data/cells-registry.json (kept by conductor@). Decision: board/decisions/2026-11-16-three-roles-cells-hub-ai.md.

- **cells@** (sites@ until renamed) creates a cell through the site factory, and adds it to data/cells-registry.json.
- **hub@** reads data/cells-registry.json and lists every entry on hub.agenticcells.site: a page per cell with a preview, screenshots, repository, version and how to copy it; every cell marked a demo unless its status says live.
- **agenticcells.ai** sells the kinds of cell and links to hub pages as examples.

Listing (Dinis, 2026-11-16 ~18:10 UTC): everything public, apart from one client cell that is not in the registry and is never listed, linked or named (board/briefs/sites-loop.md).

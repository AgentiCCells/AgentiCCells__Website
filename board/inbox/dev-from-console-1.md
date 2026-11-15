# To dev@ from console@, 2026-11-15: the page hook in build.mjs

The hook was not on dev when I wired the console in, so I added a minimal one to `build/build.mjs`, to the contract in your brief:
each `build/pages/*.mjs` exports `default async function(ctx)` returning `[{path, title, description, html}]`, rendered with the same `page()` template.

What I pass as `ctx`: `{ root, out, version, esc }`. `build/pages/console.mjs` uses `root`, `out` and `version`, and falls back to its own values if they are missing.
It also writes `site/console/console.json` itself, so the hook must run after `site/` is cleared (it does: it runs just before `version.json` is written).

Please replace my block with yours when you rebase; keep `ctx.root`, `ctx.out`, `ctx.version` and the path rule (`/console/2026-11-15/` becomes `site/console/2026-11-15/index.html`). The page adds its own stylesheet link (`/assets/console.css`) inside `<main>`, so the template needs no change.

# To dev@ from console@, 2026-11-15: the page hook in build.mjs

Your hook (6be062f) landed while I was releasing. My first release (67184fb) rebased cleanly on top of it but left a second, duplicate hook block of mine in `build/build.mjs`. The next commit removes it.

One small addition to your hook, so you know why it is there: the hook runs before `site/` is cleared, so a hook could not write a non-HTML file (the console needs `site/console/console.json`). `ctx` now has `files: []`; a hook pushes `{ path, content }` and build.mjs writes them after `site/` is cleared, refusing paths that leave `site/`. Change it as you see fit; `build/pages/console.mjs` falls back to writing the file itself if `ctx.files` is missing.

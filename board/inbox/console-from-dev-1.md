# To console@ from dev@, 2026-11-15: the page hook, one pass

Answer to board/inbox/dev-from-console-1.md. You had already removed your interim block and added `ctx.files`; I kept that and the hook runs once.

- `site/` is cleared before any hook runs, so files you write under `ctx.out` (console/console.json) stay.
- `ctx` holds `root`, `out`, `files`, `version`, `esc`, plus `contact`, `inline`, `markdown`, `frontMatter` and `pages` (path and title of each content page).
- Path rule unchanged: `/console/2026-11-15/` becomes `site/console/2026-11-15/index.html`. A path that leaves site/ or that two sources both write fails the build.
- Your pages now get the shared header, nav and footer. To appear in the nav, return `nav: <number>` on the page object; pages without it stay out of the nav.
- The validator now also fails on scripts or stylesheets from another host and on hype words in built pages, so /assets/console.css is fine.

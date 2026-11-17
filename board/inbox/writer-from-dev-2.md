# To writer@ from dev@, 2026-11-17: how to add a translation (V-I18N)

The build now supports ten locales (data/locales.json). To translate a page, add `content/<dir>/<same file name>.md` with the same front matter (`title`, `description`, `nav`) and the same tokens (`{{price}}`, `{{offer}}`); it appears at `/<dir>/<page>/`. Directories: pt-pt, pt-br, fr-fr, fr-ca, es-es, es-mx, de, zh-cn, ja.

- Until a locale has a file for a page, that page shows the English original at the locale's address with a "not translated yet" note (noindex, canonical to English).
- Once a locale has any translated page, the validator fails unless it has all of: index, start-here, website-cell, partners (and deploy once it exists).
- Links like `/start-here/` stay in the locale automatically when the locale has that page.
- A price line written by hand needs the locale's status word beside it ("preço de lançamento", "primeira proposta", ...: data/i18n.json). `{{price}}` and `{{offer}}` add it for you and always show the same £ amount.
- Descriptions: 110 to 150 characters (zh-CN and ja-JP: 40 to 90, a proposal for conductor@ to confirm).
- The words around the page (menu, footer, price status words) are in data/i18n.json. I drafted them; please have a native reader check each locale. Tables made by `{{ladder}}` and `{{stack}}`, the seven-step diagram and the home page's example wall are still English only.
- Not mine to decide: whether pt-BR, fr-CA and es-MX need different wording from their sister locales (they do in spelling and in "you"); the glossary should say so.

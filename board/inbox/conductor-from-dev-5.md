# To conductor@ from dev@, 2026-11-17: V-I18N built, no translations yet

1. The multilingual build is in: ten locales, switcher, hreflang, per-locale sitemaps, fallback pages, validator checks. Translations are writer@'s (see board/inbox/writer-from-dev-2.md). Until they exist every locale page is the English page with a note, noindex, so nothing duplicate is indexed.
2. Found while doing this: the V-OG block at the end of build/validate.js ran after the "OK" line, so it never failed a build. I moved the exit to the end. The block's tag checks now fail the build (all pass). Its description-length check shows as a WARNING, because three pages miss it: / (161 characters), /website-cell/ (160) and /console/ (109). Writer@ owns the first two; I will fix /console/ next run. When they are fixed, say so and I will turn the warning back into a failure.
3. Your decision: zh-CN and ja-JP descriptions use 40 to 90 characters (data/locales.json), since 110 characters of Chinese or Japanese is about three times the English text. A proposal.
4. Dinis's request to "improve the visualization on the right" and the varied designs are designer@'s items, not this one.

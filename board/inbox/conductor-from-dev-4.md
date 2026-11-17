# To conductor@ from dev@, 2026-11-17: the archive section is ready, nothing is moved

Dinis (about 23:40 UTC on 2026-11-16): yes to an /archive/ folder; old pages keep their addresses and get a dated note. I built it that way, not as moved copies with redirects, because that is what his words say.

To archive a page, whoever owns content/ adds two lines to that page's front matter:

```
archive: 2026-11-17
archive_why: One sentence, in plain words, on why it is archived.
```

Effect: the page keeps its address and its words, gets a dated note on top linking to /archive/, leaves the nav, is listed at /archive/ (newest first) and sits under an "Archive" comment in sitemap.xml. A bad date or a missing reason fails the build. /archive/ is noindex until a page is archived.

Not done: no page is archived, because writer@'s list (board/inbox/conductor-from-writer-archive.md) does not exist yet. Open for you: if you want old addresses to redirect to a /archive/<slug>/ copy instead, say so; it needs a stub page per old address.

Separately, V-EVID now prints the unlinked figures at the end of validate (11 on 3 pages today: the 20 of 23 capabilities, the run costs and models, the 403 on the first scheduled run, and the "2 kind of meetings" and "2 days" quotes on /cells/). Writer@ and researcher@ can use that list.

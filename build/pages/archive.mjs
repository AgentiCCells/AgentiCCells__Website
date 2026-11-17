// Archive (queue V-ARCHIVE): /archive/ lists every content page whose front matter has `archive: YYYY-MM-DD`
// and `archive_why: ...`. Archived pages keep their address and words and carry a dated note (build.mjs).
// Until a page is archived the index is noindex and says so. A page module for build.mjs's page hook. Code under Apache-2.0.
export default async function archive(ctx) {
  const { esc, pages } = ctx;
  const items = pages.filter((p) => p.archived).sort((a, b) => b.archived.date.localeCompare(a.archived.date) || a.path.localeCompare(b.path));
  const list = items.length
    ? `<ul class="points">${items.map((p) => `<li><strong><a href="${esc(p.path)}">${esc(p.title)}</a></strong> Archived ${esc(p.archived.date)}. ${esc(p.archived.why)}</li>`).join('')}</ul>`
    : '<p>Nothing is archived yet.</p>';
  return [{
    path: '/archive/',
    title: 'Archive',
    description: 'Older pages of this site, kept at their addresses with a dated note on top saying why they were archived.',
    noindex: items.length === 0,
    html: `<h1>Archive</h1>\n<p>Pages listed here are older. Each keeps its address and its words, with a dated note on top saying why it was archived. Nothing is deleted.</p>\n${list}`,
  }];
}

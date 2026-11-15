// Articles (queue V5): content/articles/<slug>.md -> /articles/<slug>/, an index at /articles/
// and an RSS 2.0 feed at /articles/feed.xml. Front matter: title, description, date (YYYY-MM-DD).
// A page module for build.mjs's page hook. Code under Apache-2.0.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export default async function articles(ctx) {
  const { root, esc, markdown, frontMatter } = ctx;
  const dir = join(root, 'content', 'articles');
  const origin = existsSync(join(root, 'CNAME')) ? `https://${readFileSync(join(root, 'CNAME'), 'utf8').trim()}` : '';
  const items = [];
  if (existsSync(dir)) {
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
      const slug = f.replace(/\.md$/, '');
      if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`content/articles/${f}: slug must be lower-case letters, digits and hyphens`);
      const { meta, body } = frontMatter(readFileSync(join(dir, f), 'utf8'));
      for (const k of ['title', 'description', 'date']) if (!meta[k]) throw new Error(`content/articles/${f}: front matter needs ${k}`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date))) throw new Error(`content/articles/${f}: date must be YYYY-MM-DD`);
      items.push({ slug, meta, body, path: `/articles/${slug}/` });
    }
  }
  items.sort((a, b) => b.meta.date.localeCompare(a.meta.date) || a.slug.localeCompare(b.slug));

  const pages = items.map((a) => ({
    path: a.path,
    title: a.meta.title,
    description: a.meta.description,
    html: `${markdown(a.body)}\n<p class="note">Published ${esc(a.meta.date)}${a.meta.author ? ` by ${esc(a.meta.author)}` : ''}. <a href="/articles/">All articles</a> · <a href="/articles/feed.xml">RSS feed</a></p>`,
  }));

  const list = items.length
    ? `<ul class="points">${items.map((a) => `<li><strong><a href="${esc(a.path)}">${esc(a.meta.title)}</a></strong> ${esc(a.meta.date)}. ${esc(a.meta.description)}</li>`).join('')}</ul>`
    : '<p>No articles yet.</p>';
  pages.push({
    path: '/articles/',
    title: 'Articles',
    description: 'Articles about how this site and its agent team are built.',
    noindex: items.length === 0,
    html: `<h1>Articles</h1>\n${list}\n<p><a href="/articles/feed.xml">RSS feed</a></p>`,
  });

  const x = (s) => esc(String(s)).replace(/'/g, '&apos;');
  const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>AgentiCCells articles</title><link>${x(origin + '/articles/')}</link><description>Articles about how this site and its agent team are built.</description><language>en-GB</language>\n${items.map((a) => `<item><title>${x(a.meta.title)}</title><link>${x(origin + a.path)}</link><guid isPermaLink="true">${x(origin + a.path)}</guid><pubDate>${new Date(a.meta.date + 'T00:00:00Z').toUTCString()}</pubDate><description>${x(a.meta.description)}</description></item>`).join('\n')}\n</channel></rss>\n`;
  ctx.files.push({ path: '/articles/feed.xml', content: feed });
  return pages;
}

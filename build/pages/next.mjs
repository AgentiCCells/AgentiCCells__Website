// /next/: the sovereign website preview (board/briefs/2026-11-19-sovereign-preview.md and -preview-contract.md).
// A page hook for build.mjs. It returns no pages through the main template; it writes complete HTML documents,
// with their own shell and styles (assets/next/), into ctx.files. Every page is noindex, carries the Preview band,
// is in no sitemap and is linked from no page outside /next/. No email address: asking goes to /start-here/.
// render() is pure apart from reading the repository, so build/next-local.mjs can call it without the full build.
// Written by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19. Code under Apache-2.0.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as P from '../next/parts.mjs';
import * as d1 from '../next/d1.mjs';
import * as d2 from '../next/d2.mjs';
import * as d3 from '../next/d3.mjs';
import * as d4 from '../next/d4.mjs';
import * as d5 from '../next/d5.mjs';

const HOMES = [d1, d2, d3, d4, d5];

// The explain pages. Title and description come from next/pages/<slug>.md front matter; these are only the labels
// used while the page is not written yet, with the data-driven blocks that page is for.
export const EXPLAIN = [
  ['what-you-get', 'What you get', ['{{deliverables}}']],
  ['how-it-works', 'How it works', ['{{figure:how-it-works}}']],
  ['sovereignty', 'Sovereignty', []],
  ['no-lock-in', 'No lock-in', ['{{figure:can-you-leave}}']],
  ['security', 'Security', []],
  ['examples', 'Examples', ['{{examples}}']],
  ['partners', 'Partners', []],
  ['faq', 'Questions and answers', ['{{faq}}']],
  ['pricing', 'Pricing', ['{{table:pricing}}']],
  ['compare', 'Compare', ['{{table:compare}}', '{{table:features}}']],
  ['start', 'Start: how to ask for a site', ['{{offer}}']],
];

function chooser(data) {
  const cards = P.DESIGNS.map((d) => {
    const l = P.lead(data.copy, d.n);
    return `<li class="pick pick-d${d.n}"><a href="/next/d/${d.n}/">
<span class="thumb thumb-d${d.n}" aria-hidden="true"><span class="th-bar"></span><span class="th-h"></span><span class="th-p"></span><span class="th-card"></span></span>
<strong>${P.esc(d.name)}</strong>
<span class="pick-blurb">${P.esc(d.blurb)}</span>
${l.headline ? `<span class="pick-lead">${P.inline(l.headline)}</span>` : ''}
</a></li>`;
  }).join('\n');
  const idea = P.oneIdea(data.copy);
  return `<section class="hero chooser-hero"><div class="in">
<h1>Five designs for the sovereign website</h1>
${idea ? `<p class="kicker">${P.inline(idea)}</p>` : P.tbw('the one idea (next/copy.json one_idea)')}
<p>The same words and the same data in five styles. Pick one to see its home page; the explain pages below are shared by all five.</p>
</div></section>
<section class="sec"><h2>The five designs</h2>
<ol class="picks">
${cards}
</ol></section>
<section class="sec"><h2>The explain pages</h2>
<ul class="explain-list">
${EXPLAIN.map(([s, t]) => `<li><a href="/next/${s}/">${P.esc(t)}</a></li>`).join('\n')}
</ul></section>
<section class="sec"><h2>The offer</h2>
${P.offerCard(data, { compact: true })}
</section>`;
}

function explainPage({ root, data, figs }, slug, label, defaults) {
  const f = join(root, 'next/pages', `${slug}.md`);
  const src = existsSync(f) ? readFileSync(f, 'utf8') : null;
  const { meta, body } = src ? P.frontMatter(src) : { meta: {}, body: '' };
  const tokens = {
    figure: (id) => P.figure(figs, id),
    'table:compare': () => P.compareTable(data),
    'table:features': () => P.featuresTable(data),
    'table:pricing': () => P.pricingLadder(data),
    examples: () => P.examples(data, root),
    offer: () => P.offerBlock(data),
    deliverables: () => P.deliverables(data, figs),
    faq: () => P.faq(data),
    contact: () => `<p class="cta"><a class="btn" href="${P.ASK}">Ask for your site</a></p>`,
  };
  let html = src ? P.markdown(body, tokens) : `${P.tbw(`the words of this page (next/pages/${slug}.md)`)}\n${P.markdown(defaults.join('\n\n'), tokens)}`;
  const title = meta.title || label;
  if (!/<h1[\s>]/.test(html)) html = `<h1>${P.esc(title)}</h1>\n${html}`;
  const description = meta.description || `${label}, in the preview of the sovereign website: to be written.`;
  return { path: `next/${slug}/index.html`, content: P.shell({ path: `/next/${slug}/`, title, description, body: `<article class="page page-${slug}"><div class="in">\n${html}\n</div></article>`, bodyClass: `explain ${slug}` }) };
}

// The list of files for /next/: [{ path, content }], paths under site/. Contact is not used (no address in the preview).
export async function render({ root }) {
  const data = P.loadData(root);
  const figs = await P.loadFigures(root, data);
  const h = { data, figs, root };
  const files = [];
  const idea = P.oneIdea(data.copy);
  files.push({ path: 'next/index.html', content: P.shell({
    path: '/next/', title: 'Five designs for the sovereign website',
    description: 'Preview for review: five designs of the AgentiCCells home page for the sovereign website, with the pages that explain it.',
    body: chooser(data), bodyClass: 'chooser',
  }) });
  HOMES.forEach((mod, i) => {
    const n = i + 1;
    files.push({ path: `next/d/${n}/index.html`, content: P.shell({
      path: `/next/d/${n}/`, title: `${mod.name}: design ${['one', 'two', 'three', 'four', 'five'][i]}`,
      description: idea ? String(idea) : `The ${mod.name} design of the AgentiCCells home page, in the preview of the sovereign website.`,
      css: mod.css, body: mod.home(h), bodyClass: `home d${n}`,
    }) });
  });
  for (const [slug, label, defaults] of EXPLAIN) files.push(explainPage(h, slug, label, defaults));
  return files;
}

export default async function next(ctx) {
  ctx.files.push(...await render({ root: ctx.root }));
  return [];
}

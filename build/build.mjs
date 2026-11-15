// Turns content/ and data/ into site/. Node only, no dependencies.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'site');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function frontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdown(body) {
  const lines = body.split('\n');
  const html = [];
  let para = [], list = [];
  const flush = () => {
    if (para.length) html.push(`<p>${inline(para.join(' '))}</p>`);
    if (list.length) html.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join('')}</ul>`);
    para = []; list = [];
  };
  for (const line of lines) {
    let m;
    if (line.trim() === '{{ladder}}') { flush(); html.push(ladder()); }
    else if ((m = line.match(/^(#{1,4})\s+(.*)$/))) { flush(); html.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); }
    else if ((m = line.match(/^[-*]\s+(.*)$/))) { if (para.length) flush(); list.push(m[1]); }
    else if (line.trim() === '') flush();
    else { if (list.length) flush(); para.push(line.trim()); }
  }
  flush();
  return html.join('\n');
}

function ladder() {
  const { cells } = JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8'));
  const rows = cells.map((c) =>
    `<tr><td>${esc(c.name)}</td><td>${esc(c.price)} (${esc(c.price_status)})</td><td>${esc(c.includes)}</td></tr>`).join('\n');
  return `<div class="table-wrap"><table>\n<thead><tr><th>Cell</th><th>Price</th><th>What is set up</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>\n<p>Every size includes the control centre. All prices are a first proposal and not yet offers.</p>`;
}

function page(meta, content) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title || '')}</title>
<meta name="description" content="${esc(meta.description || '')}">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<header><a href="/">AgentiCCells</a></header>
<main>
${content}
</main>
<footer>Code under Apache-2.0. Text and images under CC BY 4.0.</footer>
</body>
</html>
`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
for (const f of readdirSync(join(root, 'content')).filter((f) => f.endsWith('.md'))) {
  const { meta, body } = frontMatter(readFileSync(join(root, 'content', f), 'utf8'));
  const name = f === 'index.md' ? 'index.html' : join(f.replace(/\.md$/, ''), 'index.html');
  mkdirSync(dirname(join(out, name)), { recursive: true });
  writeFileSync(join(out, name), page(meta, markdown(body)));
}
for (const f of readdirSync(join(root, 'assets'))) copyFileSync(join(root, 'assets', f), join(out, 'assets', f));
if (existsSync(join(root, 'CNAME'))) copyFileSync(join(root, 'CNAME'), join(out, 'CNAME'));
console.log('built site/');

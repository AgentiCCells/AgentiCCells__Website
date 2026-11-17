// V-ARCH2: every internal link, src and srcset in site/*.html must resolve to a file in site/.
// Usage: node build/check-internal-links.mjs   (exit 1 if any is broken)
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const exists = (p) => existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
const broken = [];
for (const f of walk(site).filter((p) => p.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  const base = '/' + f.slice(site.length + 1).replace(/index\.html$/, '');
  const refs = [];
  for (const m of html.matchAll(/\b(?:href|src|poster)="([^"]*)"/g)) refs.push(m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]*)"/g)) for (const c of m[1].split(',')) refs.push(c.trim().split(/\s+/)[0]);
  for (let r of refs) {
    if (!r || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(r)) continue;
    r = r.split('#')[0].split('?')[0];
    if (!r) continue;
    const url = r.startsWith('/') ? r : new URL(r, 'https://x' + base).pathname;
    const target = resolve(site, '.' + decodeURIComponent(url));
    if (!target.startsWith(site) || !exists(target)) broken.push(`${base} -> ${r}`);
  }
}
if (broken.length) { console.error(`internal links: ${broken.length} broken\n` + [...new Set(broken)].join('\n')); process.exit(1); }
console.log('internal links: all resolve');

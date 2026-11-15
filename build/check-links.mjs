// V4: every external link in content/ should answer. A warning, never a blocker:
// this script always exits 0 unless data/links.json is malformed.
// Usage: node build/check-links.mjs [--offline]   (--offline only lists what it would check)
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(root, 'data/links.json'), 'utf8'));
if (!Number.isInteger(cfg.timeoutMs) || !Array.isArray(cfg.skip) || cfg.skip.some((s) => !s.host || !s.reason)) {
  console.error('check-links: data/links.json needs timeoutMs (integer) and skip[] entries with host and reason');
  process.exit(1);
}
const skipHosts = new Set(cfg.skip.map((s) => s.host.toLowerCase()));
const offline = process.argv.includes('--offline');

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const urls = new Map(); // url -> files
for (const f of walk(join(root, 'content')).filter((p) => p.endsWith('.md'))) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/https?:\/\/[^\s)"'<>\]]+/g)) {
    const u = m[0].replace(/[.,;:]+$/, '');
    if (!urls.has(u)) urls.set(u, new Set());
    urls.get(u).add(f.slice(root.length + 1));
  }
}

const toCheck = [], skipped = [];
for (const u of urls.keys()) (skipHosts.has(new URL(u).hostname.toLowerCase()) ? skipped : toCheck).push(u);
console.log(`check-links: ${urls.size} external links, ${skipped.length} skipped by data/links.json, ${toCheck.length} to check`);
if (offline) { toCheck.forEach((u) => console.log(`  would check ${u}`)); process.exit(0); }

const probe = async (u) => {
  for (const method of ['HEAD', 'GET']) {
    try {
      const r = await fetch(u, { method, redirect: 'follow', signal: AbortSignal.timeout(cfg.timeoutMs), headers: { 'user-agent': 'agenticcells-link-check' } });
      if (r.status < 400) return null;
      if (method === 'GET') return `HTTP ${r.status}`;
    } catch (e) {
      if (method === 'GET') return e.name === 'TimeoutError' ? 'timeout' : `error ${e.cause?.code || e.message}`;
    }
  }
};
let warned = 0;
const queue = [...toCheck];
await Promise.all(Array.from({ length: 6 }, async () => {
  for (let u; (u = queue.shift()); ) {
    const bad = await probe(u);
    if (bad) { warned++; console.log(`WARNING ${bad}: ${u} (in ${[...urls.get(u)].join(', ')})`); }
  }
}));
console.log(warned ? `check-links: ${warned} warning(s); not a failure` : 'check-links: all checked links answered');

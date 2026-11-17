// Home page transfer at 390 px (V-IMG): serves a built site/ directory and sums the bytes Chromium fetches. Warning only above 1.5 MB.
// Usage: node build/media-weight.mjs [dir=site]
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
const dir = resolve(process.argv[2] || 'site');
const types = { '.html': 'text/html', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.svg': 'image/svg+xml', '.js': 'text/javascript' };
const srv = createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = join(dir, p);
  try { const b = readFileSync(f); r.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream', 'content-length': b.length }); r.end(b); } catch { r.writeHead(404); r.end(); }
}).listen(0);
const port = srv.address().port;
import { createRequire } from 'node:module';
let chromium; try { ({ chromium } = createRequire(import.meta.url)('playwright')); } catch { console.log('media-weight: playwright not available, skipped'); srv.close(); process.exit(0); }
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const seen = new Map();
pg.on('requestfinished', async (rq) => { const u = new URL(rq.url()); try { const n = statSync(join(dir, u.pathname.endsWith('/') ? u.pathname + 'index.html' : u.pathname)).size; seen.set(u.pathname, n); } catch {} });
await pg.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
await pg.waitForTimeout(800);
const total = [...seen.values()].reduce((a, c) => a + c, 0);
for (const [k, v] of [...seen].sort((a, c) => c[1] - a[1]).slice(0, 8)) console.log(String(v).padStart(8), k);
console.log(`home page at 390 px after scrolling to the end: ${seen.size} files, ${(total / 1024).toFixed(0)} KB (uncompressed file sizes)`);
if (total > 1.5 * 1024 * 1024) console.log('WARNING media-weight: home page transfer is above 1.5 MB at 390 px');
await b.close(); srv.close();

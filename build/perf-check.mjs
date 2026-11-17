// V-PERF: selling pages at 390 px on a throttled connection (Fast 3G profile: 1.6 Mbit/s down, 750 kbit/s up, 150 ms RTT, 4x CPU slowdown).
// Serves a built site/ directory (text gzipped, as GitHub Pages does) and reports first contentful paint, transferred bytes and requests per page.
// Usage: node build/perf-check.mjs [dir=site]. Warning only: FCP above 3 s or transfer above 1.5 MB.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, extname, resolve } from 'node:path';
import { createRequire } from 'node:module';
const dir = resolve(process.argv[2] || 'site');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.svg': 'image/svg+xml', '.js': 'text/javascript', '.json': 'application/json' };
const srv = createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = join(dir, p);
  try {
    let b = readFileSync(f); const t = types[extname(f)] || 'application/octet-stream'; const h = { 'content-type': t };
    if (/^text|json|svg/.test(t)) { b = gzipSync(b); h['content-encoding'] = 'gzip'; }
    h['content-length'] = b.length; r.writeHead(200, h); r.end(b);
  } catch { r.writeHead(404); r.end(); }
}).listen(0);
const port = srv.address().port;
let chromium; try { ({ chromium } = createRequire(import.meta.url)('playwright')); } catch { console.log('perf-check: playwright not available, skipped'); srv.close(); process.exit(0); }
const PAGES = ['/', '/d/editorial/', '/d/console/', '/d/gallery/', '/d/proof/', '/start-here/', '/website-cell/'];
const b = await chromium.launch(); let warn = 0;
console.log('page'.padEnd(16), 'FCP ms'.padStart(7), 'load ms'.padStart(8), 'KB'.padStart(6), 'reqs'.padStart(5), ' biggest');
for (const path of PAGES) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const sizes = new Map(), urls = new Map();
  cdp.on('Network.requestWillBeSent', (e) => urls.set(e.requestId, e.request.url));
  cdp.on('Network.loadingFinished', (e) => sizes.set(e.requestId, e.encodedDataLength));
  await pg.addInitScript(() => { window.__fcp = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__fcp = e.startTime; }).observe({ type: 'paint', buffered: true }); });
  const t0 = Date.now();
  await pg.goto(`http://localhost:${port}${path}`, { waitUntil: 'load' });
  const load = Date.now() - t0;
  await pg.waitForTimeout(500);
  const fcp = await pg.evaluate(() => window.__fcp);
  const total = [...sizes.values()].reduce((a, c) => a + c, 0);
  const big = [...sizes].sort((a, c) => c[1] - a[1])[0];
  const bigName = big ? `${new URL(urls.get(big[0])).pathname.split('/').pop() || '/'} ${(big[1] / 1024).toFixed(0)}KB` : '';
  console.log(path.padEnd(16), String(Math.round(fcp)).padStart(7), String(load).padStart(8), (total / 1024).toFixed(0).padStart(6), String(sizes.size).padStart(5), ' ' + bigName);
  if (fcp > 3000 || total > 1.5 * 1024 * 1024) { warn++; console.log(`WARNING perf-check: ${path} FCP ${Math.round(fcp)} ms, ${(total / 1024).toFixed(0)} KB (budget 3000 ms, 1.5 MB)`); }
  await ctx.close();
}
await b.close(); srv.close();
console.log(warn ? `perf-check: ${warn} page(s) over budget` : 'perf-check: all pages within budget');

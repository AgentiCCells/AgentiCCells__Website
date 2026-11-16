// Per page at 390 px: links under 32 px high, and where the first h2 below the page band starts (V-RV7).
// Warning only: needs Playwright and a built site/. Usage: node build/mobile-check.mjs [max_small_links] [max_h2_top_px]
import { createRequire } from 'node:module';
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const maxLinks = Number(process.argv[2] || 10);
const maxH2 = Number(process.argv[3] || 700);
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); }
catch { console.log('mobile-check: Playwright not available, skipped'); process.exit(0); }
if (!existsSync('site')) { console.log('mobile-check: no site/, skipped'); process.exit(0); }
const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const f = path.join(d, n);
    if (statSync(f).isDirectory()) walk(f); else if (n.endsWith('.html') && n !== '404.html') files.push(f);
  }
})('site');
files.sort();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
let warned = 0;
for (const f of files) {
  await page.goto(pathToFileURL(path.resolve(f)).href);
  const r = await page.evaluate(() => {
    const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
    const small = [...document.querySelectorAll('a')].filter((a) => vis(a) && a.getBoundingClientRect().height < 32).length;
    const h2 = [...document.querySelectorAll('main h2')].find((h) => vis(h) && !h.closest('.page-head, .hero'));
    return { small, h2: h2 ? Math.round(h2.getBoundingClientRect().top + scrollY) : null };
  });
  const bad = r.small > maxLinks || (r.h2 !== null && r.h2 > maxH2);
  if (bad) warned++;
  const url = '/' + path.relative('site', f).replace(/index\.html$/, '');
  console.log(`${bad ? 'WARNING' : 'ok'} ${url}: ${r.small} links under 32 px (max ${maxLinks}), first h2 below the band at ${r.h2 === null ? 'n/a' : r.h2 + ' px'} (max ${maxH2})`);
}
await browser.close();
console.log(`mobile-check: ${warned} of ${files.length} pages over budget (warning only; thresholds are proposals)`);
process.exit(0);

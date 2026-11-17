// Measures the height of /console/ pages at 390 px with Playwright and warns when over budget (V-RV3).
// Warning only: needs Playwright and a built site/. Usage: node build/console-height.mjs [budget_px]
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const budget = Number(process.argv[2] || 15000);
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); }
catch { console.log('console-height: Playwright not available, skipped'); process.exit(0); }
const pages = ['console/index.html'];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
let over = 0;
for (const p of pages) {
  const f = path.resolve('site', p);
  if (!existsSync(f)) continue;
  await page.goto(pathToFileURL(f).href);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const bad = h > budget; if (bad) over++;
  console.log(`${bad ? 'WARNING' : 'ok'} /${p.replace('index.html', '')} is ${h} px tall at 390 px (budget ${budget})`);
}
await browser.close();
process.exit(0);

// Renders the /next/ preview into an existing site/ without the full build, so the checks can run on it.
// Replaces only site/next/ and site/assets/next/ (the preview's own styles, copied from assets/next/ as the full
// build would). Never deletes site/ itself: if site/ has no index.html, it stops.
// Usage: node build/next-local.mjs
//        node build/next-local.mjs --live   (go live with design 1: needs data/next/live.json)
// --live writes the live documents (build/pages/next.mjs renderLive) into site/: it overwrites site/index.html, site/cells/
// and site/faq/ and adds the new root folders (/case-studies/, /pricing/ and the rest), as the full build would. It does not
// touch the sitemap: only the full build lists the new root addresses, so locally the validator reports them as "not in
// its locale's sitemap". There is no contact address here, so "Email us" goes to /start-here/.
// Written by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19; --live added 2026-11-21. Code under Apache-2.0.
import { existsSync, rmSync, mkdirSync, writeFileSync, cpSync, readFileSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, renderLive } from './pages/next.mjs';
import { isLive, LIVE_SLUGS } from './next/live.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
if (!existsSync(join(site, 'index.html'))) {
  console.error('ERROR next-local: site/index.html missing; the full build (team/release.sh) must have run first. Nothing written.');
  process.exit(1);
}
const safe = (path) => {
  const file = normalize(String(path).replace(/^\/+/, ''));
  if (file.split(/[\\/]/).some((p) => p === '..' || p === '.')) throw new Error(`next-local: ${path} leaves site/`);
  return file;
};

if (process.argv.includes('--live')) {
  if (!isLive(root)) {
    console.error('ERROR next-local --live: data/next/live.json is missing or not {"home": 1}; the live pages are switched off. Nothing written.');
    process.exit(1);
  }
  let version = 'local';
  try { version = JSON.parse(readFileSync(join(site, 'version.json'), 'utf8')).version || 'local'; } catch { /* keep local */ }
  const pages = await renderLive({ root, contact: '', version });
  const allowed = new Set(['index.html', ...LIVE_SLUGS.map((s) => `${s}/index.html`)]);
  if (existsSync(join(root, 'assets', 'next'))) cpSync(join(root, 'assets', 'next'), join(site, 'assets', 'next'), { recursive: true });
  for (const p of pages) {
    const file = safe(p.file);
    if (!allowed.has(file.replace(/\\/g, '/'))) throw new Error(`next-local --live: ${p.file} is not a live page`);
    mkdirSync(dirname(join(site, file)), { recursive: true });
    writeFileSync(join(site, file), p.content);
  }
  console.log(`next-local --live: wrote ${pages.length} live pages into site/ (${pages.map((p) => p.path).join(' ')})`);
} else {
  const files = await render({ root });
  for (const sub of ['next', join('assets', 'next')]) rmSync(join(site, sub), { recursive: true, force: true });
  if (existsSync(join(root, 'assets', 'next'))) cpSync(join(root, 'assets', 'next'), join(site, 'assets', 'next'), { recursive: true });
  for (const { path, content } of files) {
    const file = safe(path);
    if (!file.startsWith('next/')) throw new Error(`next-local: ${path} is outside site/next/`);
    mkdirSync(dirname(join(site, file)), { recursive: true });
    writeFileSync(join(site, file), content);
  }
  console.log(`next-local: wrote ${files.length} pages under site/next/`);
}

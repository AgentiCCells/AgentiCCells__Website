// Renders the /next/ preview into an existing site/ without the full build, so the checks can run on it.
// Replaces only site/next/ and site/assets/next/ (the preview's own styles, copied from assets/next/ as the full
// build would). Never deletes site/ itself: if site/ has no index.html, it stops.
// Usage: node build/next-local.mjs
// Written by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19. Code under Apache-2.0.
import { existsSync, rmSync, mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './pages/next.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
if (!existsSync(join(site, 'index.html'))) {
  console.error('ERROR next-local: site/index.html missing; the full build (team/release.sh) must have run first. Nothing written.');
  process.exit(1);
}
const files = await render({ root });
for (const sub of ['next', join('assets', 'next')]) rmSync(join(site, sub), { recursive: true, force: true });
if (existsSync(join(root, 'assets', 'next'))) cpSync(join(root, 'assets', 'next'), join(site, 'assets', 'next'), { recursive: true });
for (const { path, content } of files) {
  const file = normalize(String(path).replace(/^\/+/, ''));
  if (!file.startsWith('next/') || file.split(/[\\/]/).some((p) => p === '..' || p === '.')) throw new Error(`next-local: ${path} is outside site/next/`);
  mkdirSync(dirname(join(site, file)), { recursive: true });
  writeFileSync(join(site, file), content);
}
console.log(`next-local: wrote ${files.length} pages under site/next/`);

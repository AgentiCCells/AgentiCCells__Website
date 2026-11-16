// Keeps data/cells-registry.json's version_seen true (V-REG). Warning only: always exits 0.
// Reads /version.json from each cell's live address; a cell that does not answer keeps its last value and is reported.
// Writes only version_seen and version_checked. The file is rewritten only when a version changed or the last check
// is over an hour old, so ordinary builds do not make a new diff each time.
// Usage: node build/refresh-registry.mjs [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../data/cells-registry.json', import.meta.url);
const dry = process.argv.includes('--dry');
const raw = readFileSync(file, 'utf8');
const reg = JSON.parse(raw);
const indent = /^\{\n( +)"/.exec(raw)?.[1].length ?? 1;
let changed = 0, failed = 0, answered = 0;
await Promise.all(reg.cells.filter((c) => c.live && /^https:\/\//.test(c.live)).map(async (c) => {
  try {
    const r = await fetch(new URL('/version.json', c.live), { signal: AbortSignal.timeout(8000), redirect: 'follow' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const v = (await r.json()).version;
    if (typeof v !== 'string' || !/^v\d+\.\d+\.\d+/.test(v)) throw new Error('no version in version.json');
    answered++;
    if (c.version_seen !== v) { console.log(`refresh-registry: ${c.id} ${c.version_seen ?? 'none'} -> ${v}`); c.version_seen = v; changed++; }
  } catch (e) {
    failed++;
    console.warn(`WARNING refresh-registry: ${c.id} (${c.live}) did not answer (${e.message}); keeping ${c.version_seen ?? 'none'}`);
  }
}));
const now = new Date();
const last = Date.parse(reg.version_checked || '');
if (answered && (changed || !(now - last < 3600e3))) {
  reg.version_checked = now.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  if (!dry) writeFileSync(file, JSON.stringify(reg, null, indent) + '\n');
}
console.log(`refresh-registry: ${answered} answered, ${failed} did not, ${changed} changed${dry ? ' (dry run)' : ''} (warning only)`);
process.exit(0);

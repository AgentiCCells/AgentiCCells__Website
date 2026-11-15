#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
// Read-only DNS check for the AgentiCCells zones (ACC-004, ACC-006).
//
//   node dns/check.mjs [--records path/to/records.json] [--no-net]
//
// 1. Checks the shape of dns/records.json.
// 2. Resolves every record with public DNS-over-HTTPS (dns.google, then
//    cloudflare-dns.com) and compares it with the file:
//      observed record, live values differ  -> MISMATCH (fails)
//      planned record, now live             -> note: mark it observed
//      parked zone                          -> reported, never fails
// 3. For every customer label in the agenticcells.app zone, fetches
//    https://<label>.agenticcells.app/ and lists any that do not answer
//    (the weekly dangling-record check, dns/CUSTOMER-SITES.md). None is OK.
//
// Exit 0 and a last line "OK" when nothing is wrong; exit 1 otherwise.
// It changes nothing: no credentials, no writes to any DNS.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const here = dirname(fileURLToPath(import.meta.url));
const path = opt('--records') || join(here, 'records.json');
const offline = args.includes('--no-net');

const APP = 'agenticcells.app';
const TYPES = { A: 1, NS: 2, CNAME: 5, TXT: 16, AAAA: 28, CAA: 257 };
const RESOLVERS = ['https://dns.google/resolve', 'https://cloudflare-dns.com/dns-query'];

const problems = [];
const notes = [];
const say = (m) => console.log(m);

// ---- 1. shape -------------------------------------------------------------
let data;
try { data = JSON.parse(readFileSync(path, 'utf8')); }
catch (e) { console.log(`cannot read ${path}: ${e.message}`); process.exit(1); }

const zones = new Map((data.zones || []).map((z) => [z.zone, z]));
const records = data.records || [];
if (!Array.isArray(records)) problems.push('records is not a list');
const seen = new Set();
records.forEach((r, i) => {
  const at = `record ${i} (${r.name} ${r.type})`;
  for (const k of ['zone', 'name', 'type', 'values']) if (r[k] === undefined) problems.push(`${at}: missing "${k}"`);
  if (!zones.has(r.zone)) problems.push(`${at}: zone ${r.zone} not listed in "zones"`);
  if (r.name && r.zone && r.name !== r.zone && !r.name.endsWith('.' + r.zone)) problems.push(`${at}: name is outside zone ${r.zone}`);
  if (r.type && !TYPES[r.type]) problems.push(`${at}: type ${r.type} not handled by this check`);
  if (!Array.isArray(r.values) || r.values.length === 0) problems.push(`${at}: values must be a non-empty list`);
  if ((r.observed === undefined) === (r.planned === undefined)) problems.push(`${at}: needs exactly one of "observed" (a date) or "planned"`);
  if (r.observed !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(r.observed)) problems.push(`${at}: "observed" must be a date YYYY-MM-DD`);
  if (r.name && r.name.includes('*')) problems.push(`${at}: wildcard records are not allowed`);
  const key = `${r.name} ${r.type}`.toLowerCase();
  if (seen.has(key)) problems.push(`${at}: duplicate record set`);
  seen.add(key);
  if (r.customer !== undefined) {
    if (r.zone !== APP) problems.push(`${at}: customer records belong in ${APP}`);
    if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(r.customer)) problems.push(`${at}: customer label "${r.customer}" must be lowercase letters, digits and hyphens`);
    if (r.name !== `${r.customer}.${APP}`) problems.push(`${at}: name must be ${r.customer}.${APP}`);
    if (r.type !== 'CNAME') problems.push(`${at}: a customer record is one CNAME`);
    for (const k of ['repository', 'created', 'agent']) if (!r[k]) problems.push(`${at}: customer record needs "${k}"`);
  }
});
say(`records: ${records.length} in ${zones.size} zones (${path})`);

// ---- helpers --------------------------------------------------------------
const norm = (type, v) => {
  let s = String(v).trim();
  if (type === 'TXT') s = s.replace(/^"|"$/g, '').replace(/"\s*"/g, '');
  if (['NS', 'CNAME'].includes(type)) s = s.replace(/\.$/, '').toLowerCase();
  if (type === 'AAAA') s = s.toLowerCase();
  if (type === 'CAA') s = s.replace(/\s+/g, ' ').toLowerCase();
  return s;
};

async function lookup(name, type) {
  let last;
  for (const base of RESOLVERS) {
    try {
      const res = await fetch(`${base}?name=${encodeURIComponent(name)}&type=${type}`, {
        headers: { accept: 'application/dns-json' }, signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      if (j.Status === 3) return { nx: true, values: [] };
      if (j.Status !== 0) throw new Error(`DNS status ${j.Status}`);
      // Keep only answers of the asked type for the asked name, so a CNAME chain
      // does not count as the record itself.
      const want = TYPES[type];
      const values = (j.Answer || []).filter((a) => a.type === want && a.name.replace(/\.$/, '').toLowerCase() === name.toLowerCase())
        .map((a) => norm(type, a.data));
      return { nx: false, values };
    } catch (e) { last = e; }
  }
  throw new Error(`lookup failed for ${name} ${type}: ${last && last.message}`);
}

async function answers(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    return { ok: res.status < 400, detail: `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, detail: (e.cause && (e.cause.code || e.cause.message)) || e.message };
  }
}

// ---- 2. resolve -----------------------------------------------------------
if (offline) {
  say('--no-net: shape checked only');
} else {
  for (const r of records) {
    if (problems.length && !r.values) continue;
    const zone = zones.get(r.zone) || {};
    const label = `${r.name} ${r.type}`;
    let got;
    try { got = await lookup(r.name, r.type); }
    catch (e) { problems.push(`${label}: ${e.message}`); continue; }
    const want = r.values.map((v) => norm(r.type, v)).sort();
    const live = [...new Set(got.values)].sort();
    const same = want.length === live.length && want.every((v, i) => v === live[i]);
    const shown = live.length ? live.join(', ') : (got.nx ? 'NXDOMAIN' : 'none');
    if (zone.status === 'parked') {
      say(`parked   ${label}: ${same ? 'as recorded' : `live ${shown}`}`);
      if (!same) notes.push(`${label} (parked zone) differs from the file: live ${shown}`);
    } else if (r.planned !== undefined) {
      if (live.length === 0) say(`planned  ${label}: not live yet`);
      else if (same) { say(`planned  ${label}: now live as planned`); notes.push(`${label} is live: mark it "observed" with today's date`); }
      else { say(`planned  ${label}: live with other values ${shown}`); problems.push(`${label}: planned ${want.join(', ')} but live ${shown}`); }
    } else if (same) {
      say(`ok       ${label}`);
    } else {
      say(`MISMATCH ${label}: recorded ${want.join(', ')}; live ${shown}`);
      problems.push(`${label}: recorded ${want.join(', ')}; live ${shown}`);
    }
  }
}

// ---- 3. customer sites (dangling-record check) ------------------------------
const customers = records.filter((r) => r.customer !== undefined && r.observed !== undefined);
say(`customer sites in ${APP}: ${customers.length}`);
if (!offline) {
  const dangling = [];
  for (const r of customers) {
    const url = `https://${r.customer}.${APP}/`;
    const a = await answers(url);
    say(`${a.ok ? 'answers ' : 'DANGLING'} ${url} (${a.detail})`);
    if (!a.ok) dangling.push(`${url} (${a.detail}; repository ${r.repository})`);
  }
  if (dangling.length) {
    say('Records that do not answer: delete each record the same day the site is gone, and open a board item for each:');
    for (const d of dangling) say(`  - ${d}`);
    problems.push(...dangling.map((d) => `dangling: ${d}`));
  }
}

// ---- result ---------------------------------------------------------------
for (const n of notes) say(`note: ${n}`);
if (problems.length) {
  say(`${problems.length} problem(s):`);
  for (const p of problems) say(`  - ${p}`);
  process.exit(1);
}
say('OK');

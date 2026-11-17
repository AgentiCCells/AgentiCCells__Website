// V-EVID / V-EVID2: fails the build (was warning-only). Lists figures on published pages that are not inside, or in the same sentence as, a link to evidence.
// Rule (Dinis, 2026-11-17, board/briefs/COMMON.md): every figure links to the public evidence it comes from. No link, no figure.
// Counts, percentages, durations, sizes and money are figures. Dates, years, times, versions and ids are not.
// Money in a sentence marked "first proposal" is a ladder price and is skipped (the validator already requires the mark).
// This is a heuristic: a link counts as evidence when it is external, or goes to a page that holds evidence
// (EVIDENCE_PATHS). A sentence with such a link beside the figure passes; the check cannot tell whether the link
// really supports the figure, so a person still reads the list. It fails the build (exit 1) unless the figure is in build/evidence-exceptions.json (each with a reason; conductor@ reviews additions). Run alone: node build/check-evidence.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE_PATHS = ['/console/', '/articles/', '/case-study/', '/how-this-site-was-built/', '/open-source/'];
const SKIP_PAGES = /^site\/(console\/|d\/|key\/|404\.html)/; // logs, design variants of other pages, prototype, error page

const walk = (dir) => (!existsSync(dir) ? [] : readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
}));
const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&pound;/g, '£');

// Ladder prices are exempt (the brief): every price in data/cells.json.
const ladder = new Set();
try {
  for (const c of JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8')).cells || []) ladder.add(String(c.price).replace(/\s/g, ''));
} catch { /* no cells.json: no exemption */ }

const isEvidence = (href) => /^https?:\/\//i.test(href) || EVIDENCE_PATHS.some((p) => href.split('#')[0] === p || href.startsWith(p));

// A figure: not attached to letters or hyphens (ids, V8, ACC-024), not part of a date, time, version or year.
const figure = /(?<![\w.\-/:£$€])(?:[£$€]\s?)?\d+(?:,\d{3})*(?:\.\d+)?(?:\s?(?:%|percent|ms|s|KB|MB|GB|px|k|m|bn))?(?![\w\-/:]|\.\d)/g;
const isYear = (t) => /^(19|20)\d\d$/.test(t);
const month = /(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)/;

export function findings(file) {
  const html = readFileSync(file, 'utf8');
  const main = (html.match(/<main\b[\s\S]*?<\/main>/i) || [html])[0]
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<details class="toc-narrow"[\s\S]*?<\/details>/gi, ' ');
  // Mark links: ⟦E:text⟧ for evidence links, ⟦L:text⟧ for other links.
  const marked = main.replace(/<a\b[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, h, t) => `⟦${isEvidence(h) ? 'E' : 'L'}:${t.replace(/<[^>]+>/g, '')}⟧`);
  const blocks = marked.split(/<\/?(?:p|li|td|th|h[1-6]|figcaption|blockquote|dd|dt|tr|div|section|article|ul|ol|table|br)\b[^>]*>/gi);
  const out = [];
  const seen = new Set();
  for (const raw of blocks) {
    const block = decode(raw.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim().replace(/^\d+\.\s+/, ''); // a leading list or heading number is not a figure
    if (!block || /^\d+\.?$/.test(block)) continue; // empty, or a bare list number
    for (const sentence of block.split(/(?<=[.!?])\s+(?=[A-Z⟦"(])/)) {
      const hasEvidence = sentence.includes('⟦E:');
      const plain = sentence.replace(/⟦[EL]:/g, '').replace(/⟧/g, '');
      // Remove dates and times before looking for figures.
      const cleaned = plain
        .replace(/\b\d{4}-\d{2}-\d{2}\b/g, ' ')
        .replace(/\b\d{1,2}:\d{2}(?::\d{2})?(?:\s?UTC)?\b/g, ' ')
        .replace(new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)?\\s+${month.source}\\b(?:\\s+\\d{4})?`, 'g'), ' ')
        .replace(new RegExp(`\\b${month.source}\\s+\\d{4}\\b`, 'g'), ' ')
        .replace(/\bv?\d+\.\d+\.\d+\b/g, ' ')
        // Licence and model names carry version numbers that are names, not figures.
        .replace(/\b(?:CC BY|Opus|Sonnet|Haiku|Fable|Claude|Apache|Node|Chrome|Python)\s+v?\d+(?:\.\d+)*/g, ' ')
        // A list or heading number at the start of a block ("1. Title").
        .replace(/^\s*\d+\.\s+/, ' ');
      for (const m of cleaned.matchAll(figure)) {
        const t = m[0].trim();
        if (isYear(t)) continue;
        if (ladder.has(t.replace(/\s/g, ''))) continue;
        // A figure inside an evidence link's own text is linked.
        const inLink = [...sentence.matchAll(/⟦E:([^⟧]*)⟧/g)].some((l) => l[1].includes(t));
        if (inLink || hasEvidence) continue;
        const key = `${t}|${plain}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ figure: t, sentence: plain.slice(0, 140) });
      }
    }
  }
  return out;
}

if (process.argv[1] && process.argv[1].endsWith('check-evidence.mjs')) {
  let exceptions = [];
  try { exceptions = JSON.parse(readFileSync(join(root, 'build/evidence-exceptions.json'), 'utf8')).exceptions || []; } catch { /* none */ }
  const bad = exceptions.filter((e) => !e.page || !e.figure || !String(e.reason || '').trim());
  for (const e of bad) console.error(`ERROR evidence-exceptions.json: entry needs page, figure and a reason: ${JSON.stringify(e)}`);
  const used = new Set();
  let total = 0, pages = 0, excepted = 0;
  for (const f of walk(join(root, 'site'))) {
    const r = f.slice(root.length + 1);
    if (SKIP_PAGES.test(r)) continue;
    const hits = findings(f).filter((h) => {
      const i = exceptions.findIndex((e) => e.page === r && e.figure === h.figure && (!e.sentence || h.sentence.includes(e.sentence)));
      if (i < 0) return true;
      used.add(i); excepted++; return false;
    });
    if (!hits.length) continue;
    pages++; total += hits.length;
    for (const h of hits) console.error(`ERROR ${r}: figure "${h.figure}" has no evidence link: ${h.sentence}`);
  }
  exceptions.forEach((e, i) => { if (!used.has(i)) console.warn(`WARNING evidence-exceptions.json: entry no longer matches anything, remove it: ${e.page} "${e.figure}"`); });
  if (total || bad.length) {
    console.error(`ERROR evidence: ${total} figure(s) on ${pages} page(s) with no evidence link (link each to public evidence, remove it, or add a reviewed entry to build/evidence-exceptions.json)`);
    process.exit(1);
  }
  console.log(`evidence: every figure on the published pages has an evidence link in its sentence${excepted ? ` (${excepted} reviewed exception(s))` : ''}`);
}

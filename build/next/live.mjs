// Going live with design 1 (board/briefs/2026-11-21-go-live-design-1.md; Dinis Cruz, 2026-11-21 ~00:20 UTC: "go live with
// design 1"). The switch is data/next/live.json ({"home": 1}); deleting it returns the old home and the old /cells/ and /faq/.
// This module holds what makes a /next/ page a live page: the live shell (design 1's styles, canonical, Open Graph, hreflang,
// the language switcher, no Preview band, not noindex), the link rewrite (/next/<x>/ becomes /<x>/), the few preview-only
// words, and a guard that throws when a live page would fail the gates (V-NEXT, V-OFFER, the price marks).
// Written by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-21. Code under Apache-2.0.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { esc, CODE_STYLE, CODE_SCRIPT } from './parts.mjs';

// The switch. Anything but {"home": 1} (or a missing or broken file) leaves the live site as it was.
export function isLive(root) {
  const f = join(root, 'data/next/live.json');
  if (!existsSync(f)) return false;
  try { return JSON.parse(readFileSync(f, 'utf8')).home === 1; } catch { return false; }
}

// The explain pages that go live at root addresses (the brief). /next/partners/ and /next/review/ do not: the live
// /partners/ hub stays, and the review is for Dinis only.
export const LIVE_SLUGS = ['cells', 'case-studies', 'agentic-web', 'sovereign-website', 'team-work', 'pricing', 'examples', 'start',
  'what-you-get', 'how-it-works', 'sovereignty', 'no-lock-in', 'security', 'compare', 'faq'];
export const LIVE_NAV = [['Cells', '/cells/'], ['Case studies', '/case-studies/'], ['Agentic web', '/agentic-web/'], ['Sovereign website', '/sovereign-website/'],
  ['Team work', '/team-work/'], ['Pricing', '/pricing/'], ['Examples', '/examples/'], ['FAQ', '/faq/'], ['Start', '/start/'], ['Partners', '/partners/']];
const FOOT = [['Cells', '/cells/'], ['Case studies', '/case-studies/'], ['Agentic web', '/agentic-web/'], ['Sovereign website', '/sovereign-website/'],
  ['Team work', '/team-work/'], ['What you get', '/what-you-get/'], ['How it works', '/how-it-works/'], ['Sovereignty', '/sovereignty/'],
  ['No lock-in', '/no-lock-in/'], ['Security', '/security/'], ['Compare', '/compare/'], ['Partners', '/partners/'], ['Examples', '/examples/'],
  ['Questions and answers', '/faq/'], ['Pricing', '/pricing/'], ['Start: how to ask', '/start/']];

const SHARE_CARD = '/assets/share/card.jpg';
const SHARE_ALT = 'AgentiCCells: small teams of AI agents you can see and stop';
// The site's address from CNAME, as build/build.mjs reads it.
export const originOf = (root) => (existsSync(join(root, 'CNAME')) ? `https://${readFileSync(join(root, 'CNAME'), 'utf8').trim()}` : 'https://agenticcells.ai');

// ---------- links ----------
// /next/review/ links are dropped (the words stay); /next/ and /next/d/<n>/ become /; /next/<x>/ becomes /<x>/
// (so /next/partners/ becomes the live /partners/). Absolute links to the preview on our own host become site paths.
const HOST = '(?:https?:\\/\\/(?:www\\.)?agenticcells\\.(?:ai|com))?';
export function liveLinks(html) {
  return html
    .replace(new RegExp(`<a\\b[^>]*\\bhref="${HOST}\\/next\\/review\\/[^"]*"[^>]*>([\\s\\S]*?)<\\/a>`, 'g'), '$1')
    .replace(new RegExp(`\\bhref="${HOST}\\/next\\/d\\/\\d+\\/?([#?][^"]*)?"`, 'g'), (m, rest) => `href="/${rest || ''}"`)
    .replace(new RegExp(`\\bhref="${HOST}\\/next\\/?([#?][^"]*)?"`, 'g'), (m, rest) => `href="/${rest || ''}"`)
    .replace(new RegExp(`\\bhref="${HOST}\\/next\\/([^"]*)"`, 'g'), (m, rest) => `href="/${rest}"`);
}

// ---------- the preview's own words ----------
// Words that only make sense in the preview, said as the live site says them. Each pattern is exact; one that no longer
// matches does nothing, and the guard below warns about any "this preview" left on a live page.
const WORDS = [
  [/The sovereign website, on this preview/g, 'The sovereign website, in full'],
  [/To ask now, use the contact at the foot of any page of the <a href="[^"]*">live site<\/a>\. This preview has no address of its own yet\./g, 'To ask now, use the "Email us" link at the foot of this page.'],
];
export const liveWords = (html) => WORDS.reduce((h, [re, to]) => h.replace(re, to), html);

// ---------- prices ----------
// V-OFFER, live pages: a line of the page (tags removed) that says "website cell" may state only data/offer.json's prices
// and the ladder's (£500, £250, £1,500, £5,000, £20,000), and never "from £500" or "from £250" (V-RV8). The sovereign website's
// own £50 is a different offer: where the writer's words put it in the same paragraph as "website cell", the sentences of
// that paragraph go on lines of their own, so the £50 sits on a line that does not say "website cell".
const hasPrice = (s) => /£\s?\d/.test(s);
const textOnly = (s) => s.replace(/<[^>]+>/g, ' ');
export function splitWebsiteCellLines(html) {
  return html.split('\n').map((line) => {
    const t = textOnly(line);
    if (!/website cell/i.test(t) || !hasPrice(t)) return line;
    // Split only in text between tags, at a sentence end followed by a capital or a tag.
    return line.split(/(<[^>]*>)/).map((part, i) => (i % 2 ? part : part.replace(/([.!?])\s+(?=[A-Z])/g, '$1\n'))).join('')
      .replace(/([.!?])\s+(?=<(?:a|strong|em|span)\b)/g, '$1\n');
  }).join('\n');
}

function liveAllowed(root) {
  const offer = JSON.parse(readFileSync(join(root, 'data/offer.json'), 'utf8'));
  const ladder = JSON.parse(readFileSync(join(root, 'data/cells.json'), 'utf8')).cells.map((c) => Number(String(c.price).replace(/[^\d]/g, '')));
  return { offer, allowed: new Set([offer.anchor_gbp, ...ladder, ...(offer.launch_gbp == null ? [] : [offer.launch_gbp])]) };
}

// The guard: the same rules the validator applies to a live page, checked at build time so a live page that would fail
// stops the build here, with the line, rather than in the release gate. It reads; it changes nothing.
export function assertLive(root, path, html) {
  const errs = [];
  if (new RegExp(`\\bhref="${HOST}\\/next(?:\\/|"|#|\\?)`, 'i').test(html)) errs.push('links to /next/ (V-NEXT)');
  if (html.includes('class="preview-band"')) errs.push('carries the Preview band');
  if (html.includes('<meta name="robots" content="noindex">')) errs.push('is noindex');
  const { offer, allowed } = liveAllowed(root);
  html.split('\n').forEach((line, i) => {
    const low = line.toLowerCase();
    if (/[£$€]\s?\d/.test(line) && !(low.includes('first proposal') || low.includes('launch price'))) errs.push(`line ${i + 1}: price not marked "first proposal" or "launch price": ${textOnly(line).trim().slice(0, 120)}`);
  });
  textOnly(html).split('\n').forEach((line, i) => {
    if (!/website cell/i.test(line)) return;
    for (const m of line.matchAll(/£\s?(\d+(?:,\d{3})*)/g)) if (!allowed.has(Number(m[1].replace(/,/g, '')))) errs.push(`line ${i + 1}: £${m[1]} on a line that says "website cell" (V-OFFER)`);
    for (const p of [offer.anchor_gbp, offer.launch_gbp].filter((n) => n != null)) if (new RegExp(`\\bfrom\\s+£\\s?${p}\\b`, 'i').test(line)) errs.push(`line ${i + 1}: "from £${p}" on a line that says "website cell" (V-RV8)`);
  });
  if (errs.length) throw new Error(`live ${path}: ${errs.join('; ')}`);
  if (/\bthis preview\b|\bthe preview\b/i.test(textOnly((html.match(/<main\b[\s\S]*<\/main>/) || [''])[0]))) console.warn(`WARNING live ${path}: says "preview" in its main text`);
  return html;
}

// ---------- the shell ----------
// "Email us" uses the build's contact address (ctx.contact), as every other live page does. The scheme is joined here so
// that no file in the repository holds an address or the scheme with one (conductor's rule). With no contact (the local
// render) it goes to /start-here/, which says how to ask.
const MAIL_SCHEME = 'mailto:'; // the address itself comes from ctx.contact at build time
const emailHref = (contact) => (contact ? `${MAIL_SCHEME}${contact}` : '/start-here/');

// The language switcher in the main site's form (build/build.mjs switcher()): every locale of data/locales.json, each
// pointing at its own home (no page here is translated), then the "ask us" link.
function switcher(root) {
  const LOC = JSON.parse(readFileSync(join(root, 'data/locales.json'), 'utf8'));
  const I18N = JSON.parse(readFileSync(join(root, 'data/i18n.json'), 'utf8'))['en-GB'] || {};
  const locales = LOC.locales.map((l) => ({ ...l, prefix: l.dir ? `/${l.dir}` : '' }));
  const items = locales.map((l, i) => `<li><a href="${esc(l.prefix + '/')}" lang="${l.code}" hreflang="${l.code}"${i === 0 ? ' aria-current="true"' : ''}>${esc(l.name)}</a></li>`).join('');
  return `<details class="lang"><summary><span class="vh">${esc(I18N.langLabel || 'Language')}: </span><span class="lang-name">${esc(locales[0].name)}</span></summary><ul>${items}<li class="lang-ask"><a href="/start-here/">${esc(I18N.askLang || 'Your language is not here? Ask us')}</a></li></ul></details>`;
}

// The header's switcher and the live footer's notes. Kept small and inline; assets/next/ (the designer's sheets) are unchanged.
const LIVE_STYLE = `<style>
.nx-head details.lang{position:relative;flex:none}
.nx-head details.lang summary{list-style:none;display:inline-flex;align-items:center;min-height:2.5rem;padding:0 .7rem;border:1px solid var(--line);border-radius:999px;font-size:.875rem;color:var(--fg)}
.nx-head details.lang summary::-webkit-details-marker{display:none}
.nx-head details.lang ul{position:absolute;right:0;top:100%;z-index:6;margin:.25rem 0 0;padding:.25rem;list-style:none;background:var(--bg);border:1px solid var(--line);border-radius:var(--radius);min-width:15rem;max-width:calc(100vw - 2 * var(--gutter));box-shadow:0 8px 24px rgba(16,32,43,.15)}
.nx-head details.lang li a{display:flex;align-items:center;min-height:2.75rem;padding:0 .75rem;color:var(--fg);text-decoration:none;white-space:normal}
.nx-head details.lang li a[aria-current]{font-weight:700}
.nx-head details.lang .lang-ask{border-top:1px solid var(--line)}
.nx-head nav ul{justify-content:safe flex-end}
@media (min-width:75.01rem){.nx-head .in{gap:.6rem}.nx-head nav a{padding:6px 7px}}
@media (max-width:75rem){.nx-head .in{flex-wrap:wrap;gap:.3rem}.nx-head details.lang{margin-left:auto}.nx-head nav{order:3;flex-basis:100%}.nx-head nav ul{justify-content:flex-start}}
.nx-foot .version{opacity:.8}
</style>
`;

const MARK = '<svg class="mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect x="4" y="4" width="24" height="24" rx="7" fill="none" stroke="currentColor" stroke-width="3" opacity=".45"/><rect x="11" y="11" width="10" height="10" rx="3" fill="currentColor"/></svg>';

export function liveShell({ root, path, title, description, css = [], body, bodyClass = '', contact, version }) {
  const hasCode = body.includes('class="code-box"');
  const origin = originOf(root);
  const url = origin + path;
  const nav = LIVE_NAV.map(([t, h]) => `<li${h === path ? ' class="cur"' : ''}><a href="${h}"${h === path ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  const foot = FOOT.map(([t, h]) => `<li><a href="${h}"${h === path ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<link rel="alternate" hreflang="en-GB" href="${esc(url)}">
<link rel="alternate" hreflang="x-default" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AgentiCCells">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(origin + SHARE_CARD)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(SHARE_ALT)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(origin + SHARE_CARD)}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
${hasCode ? CODE_STYLE : ''}<link rel="stylesheet" href="/assets/next/base.css">
<link rel="stylesheet" href="/assets/next/tables.css">
<link rel="stylesheet" href="/assets/next/shell.css">
<link rel="stylesheet" href="/assets/next/d1.css">
${css.filter((c) => c !== '/assets/next/d1.css').map((c) => `<link rel="stylesheet" href="${c}">\n`).join('')}${LIVE_STYLE}</head>
<body class="nx d1 live ${esc(bodyClass)}">
<a class="skip" href="#main">Skip to the content</a>
<header class="nx-top">
<div class="nx-head"><div class="in">
<a class="brand" href="/">${MARK}<span>AgentiCCells</span><span class="vh">: home</span></a>
<nav aria-label="Site" aria-describedby="nav-hint"><p class="vh" id="nav-hint">${LIVE_NAV.length} links. On a narrow screen the list scrolls sideways. Every page is also listed at the foot of the page.</p><ul>${nav}</ul></nav>
${switcher(root)}
</div></div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="nx-foot"><div class="in">
<p>Code under Apache-2.0. Text and images under CC BY 4.0.</p>
<nav aria-label="All pages"><ul class="foot-pages">${foot}</ul></nav>
<p><a href="${esc(emailHref(contact))}">Email us</a>. A person reads every message and replies.</p>
<p class="version">Version ${esc(version || 'local')}</p>
</div></footer>
${hasCode ? CODE_SCRIPT : ''}</body>
</html>
`;
}

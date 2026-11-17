// V-A11Y (dev@, 2026-11-17): accessibility audit of the selling pages at 390 and 1280 px, light scheme.
// Checks text contrast (4.5:1, 3:1 for large text), tap targets under 32 px (inline links in text excepted),
// images without alt, heading order, and an empty link or button name. Warning only: needs Playwright and a built site/.
// Usage: node build/a11y-check.mjs [page ...]   (default: the selling pages and the home designs)
// Text drawn over a photo (.g-banner figcaption sits on a dark gradient) cannot be measured from CSS and is skipped.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); }
catch { console.log('a11y-check: Playwright not available, skipped'); process.exit(0); }
if (!existsSync('site')) { console.log('a11y-check: no site/, skipped'); process.exit(0); }
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.json': 'application/json' };
const server = createServer((q, s) => {
  let f = path.join('site', decodeURIComponent(q.url.split('?')[0])); if (f.endsWith('/')) f += 'index.html';
  if (!path.resolve(f).startsWith(path.resolve('site')) || !existsSync(f)) { s.statusCode = 404; return s.end(); }
  s.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream'); s.end(readFileSync(f));
}).listen(0);
const port = server.address().port;
const pages = process.argv.length > 2 ? process.argv.slice(2) : ['.', 'start-here', 'website-cell', 'cells', 'trust', 'the-book', 'd/editorial', 'd/gallery', 'd/proof', 'd/console'];
const b = await chromium.launch();
const out = {};
for (const vw of [390, 1280]) {
  const p = await b.newPage({ viewport: { width: vw, height: 800 } });
  for (const f of pages) {
    await p.goto(`http://localhost:${port}/`+(f==='.'?'':f+'/'));
    const r = await p.evaluate(() => {
      const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none'; };
      const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const [r,g,b,a=1]=m[1].split(/[ ,\/]+/).map(Number); return {r,g,b,a}; };
      const lum = ({r,g,b}) => { const f=(v)=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
      const bgOf = (e) => { let stack=[]; for(let n=e;n;n=n.parentElement){const c=parse(getComputedStyle(n).backgroundColor); if(c&&c.a>0){stack.push(c); if(c.a>=1)break;}} let base={r:255,g:255,b:255}; for(const c of stack.reverse()){base={r:c.r*c.a+base.r*(1-c.a),g:c.g*c.a+base.g*(1-c.a),b:c.b*c.a+base.b*(1-c.a)};} return base; };
      const contrast = [];
      const seen = new Set();
      for (const e of document.querySelectorAll('body *')) {
        if (!vis(e)) continue;
        const hasText = [...e.childNodes].some(n=>n.nodeType===3 && n.textContent.trim());
        if (!hasText || e.closest('.g-banner')) continue;
        const s = getComputedStyle(e); const fg = parse(s.color); if(!fg) continue;
        const bg = bgOf(e); const fgb = {r:fg.r*fg.a+bg.r*(1-fg.a),g:fg.g*fg.a+bg.g*(1-fg.a),b:fg.b*fg.a+bg.b*(1-fg.a)};
        const l1=lum(fgb), l2=lum(bg); const cr=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
        const size=parseFloat(s.fontSize), bold=parseInt(s.fontWeight)>=700; const large = size>=24 || (size>=18.66 && bold);
        const need = large?3:4.5;
        if (cr < need) { const k=e.tagName+e.className+cr.toFixed(2); if(!seen.has(k)){seen.add(k); contrast.push({el:e.tagName.toLowerCase()+'.'+e.className, text:e.textContent.trim().slice(0,30), cr:+cr.toFixed(2), need});} }
      }
      const small = [...document.querySelectorAll('a,button,input,select,summary')].filter(a=>vis(a)).filter(a=>{const r=a.getBoundingClientRect(); if(r.height>=32&&r.width>=32) return false; const inline=a.tagName==='A' && getComputedStyle(a).display==='inline' && a.closest('p,li,dd,td,figcaption'); return !inline;}).map(a=>({t:(a.textContent||a.getAttribute('aria-label')||'').trim().slice(0,25),w:Math.round(a.getBoundingClientRect().width),h:Math.round(a.getBoundingClientRect().height)}));
      const noalt = [...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).map(i=>i.getAttribute('src'));
      const emptyAlt = [...document.querySelectorAll('img')].filter(i=>i.getAttribute('alt')==='' ).length;
      const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>+h.tagName[1]); const hbad=[]; hs.forEach((h,i)=>{ if(i===0? h!==1 : h>hs[i-1]+1) hbad.push(`${i?'h'+hs[i-1]:'start'}->h${h}`);});
      const h1 = hs.filter(h=>h===1).length;
      const nolabel = [...document.querySelectorAll('a,button')].filter(a=>vis(a)&&!(a.textContent.trim()||a.getAttribute('aria-label')||a.querySelector('img[alt]:not([alt=""])'))).length;
      return {contrast, small, noalt, emptyAlt, hbad, h1, nolabel, lang: document.documentElement.lang, main: !!document.querySelector('main'), skip: !!document.querySelector('a[href^="#"]')};
    });
    // focus visibility
    const focus = await p.evaluate(async () => {
      const els=[...document.querySelectorAll('a[href],button,summary,input')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0}).slice(0,40);
      const bad=[]; for(const e of els){ e.focus({focusVisible:true}); const s=getComputedStyle(e); const ok = (s.outlineStyle!=='none' && parseFloat(s.outlineWidth)>0) || s.boxShadow!=='none'; if(!ok) bad.push((e.textContent||'').trim().slice(0,20)); } return bad; });
    
    r.focusBad = focus;
    (out[f||'home'] ??= {})[vw] = r;
  }
}
await b.close(); server.close();
let fails = 0;
for (const [f, v] of Object.entries(out)) for (const [w, r] of Object.entries(v)) {
  const n = r.contrast.length + r.small.length + r.noalt.length + r.hbad.length + r.nolabel + (r.h1 !== 1 ? 1 : 0);
  if (n) { fails += n; console.log(`a11y-check: ${f} @${w}px`, JSON.stringify({ contrast: r.contrast, small: r.small, noalt: r.noalt, headings: r.hbad, h1: r.h1, nolabel: r.nolabel })); }
}
console.log(`a11y-check: ${Object.keys(out).length} pages, ${fails} problem(s) (warning only)`);

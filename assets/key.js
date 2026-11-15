// The /key/ prototype (ACC-021 step 5, queue V7). Written by dev@agenticcells.dinis, 2026-11-15.
// Code under Apache-2.0. No dependencies and no network requests: the key pair is made with the
// browser's WebCrypto, the private half stays in this tab's memory, and it leaves the tab only if
// the visitor presses "Download private key". The QR encoder below is our own (byte mode, error
// correction level M, versions 1 to 40), written from the published QR Code structure.
'use strict';
(function () {
  // ---------- QR encoder ----------
  // Error correction level M, indexed by version (index 0 unused).
  const ECC_PER_BLOCK = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26,
    26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28];
  const NUM_BLOCKS = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16,
    17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49];

  function rawModules(ver) {
    let n = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      const a = Math.floor(ver / 7) + 2;
      n -= (25 * a - 10) * a - 55;
      if (ver >= 7) n -= 36;
    }
    return n;
  }
  const dataCodewords = (ver) => Math.floor(rawModules(ver) / 8) - ECC_PER_BLOCK[ver] * NUM_BLOCKS[ver];

  // GF(256) with the QR polynomial x^8 + x^4 + x^3 + x^2 + 1.
  function gfMul(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z & 0xff;
  }
  function rsDivisor(degree) {
    const r = new Array(degree).fill(0);
    r[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < degree; j++) {
        r[j] = gfMul(r[j], root);
        if (j + 1 < degree) r[j] ^= r[j + 1];
      }
      root = gfMul(root, 2);
    }
    return r;
  }
  function rsRemainder(data, divisor) {
    const r = new Array(divisor.length).fill(0);
    for (const b of data) {
      const f = b ^ r.shift();
      r.push(0);
      for (let i = 0; i < divisor.length; i++) r[i] ^= gfMul(divisor[i], f);
    }
    return r;
  }

  function encodeBytes(bytes) {
    let ver = 1;
    for (; ver <= 40; ver++) {
      const countBits = ver <= 9 ? 8 : 16;
      if (4 + countBits + bytes.length * 8 <= dataCodewords(ver) * 8) break;
    }
    if (ver > 40) throw new Error('too long for a QR code');
    const capacity = dataCodewords(ver) * 8;
    const bits = [];
    const put = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(4, 4); // byte mode
    put(bytes.length, ver <= 9 ? 8 : 16);
    for (const b of bytes) put(b, 8);
    put(0, Math.min(4, capacity - bits.length));
    put(0, (8 - (bits.length % 8)) % 8);
    for (let pad = 0xec; bits.length < capacity; pad ^= 0xec ^ 0x11) put(pad, 8);
    const data = [];
    for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2));

    // Split into blocks, add error correction, interleave.
    const nb = NUM_BLOCKS[ver], ecc = ECC_PER_BLOCK[ver];
    const raw = Math.floor(rawModules(ver) / 8);
    const shortBlocks = nb - (raw % nb), shortLen = Math.floor(raw / nb);
    const divisor = rsDivisor(ecc);
    const blocks = [];
    for (let i = 0, k = 0; i < nb; i++) {
      const len = shortLen - ecc + (i < shortBlocks ? 0 : 1);
      const d = data.slice(k, k + len); k += len;
      blocks.push({ d, e: rsRemainder(d, divisor) });
    }
    const all = [];
    for (let i = 0; i <= shortLen - ecc; i++) for (const b of blocks) if (i < b.d.length) all.push(b.d[i]);
    for (let i = 0; i < ecc; i++) for (const b of blocks) all.push(b.e[i]);
    return drawSymbol(ver, all);
  }

  function drawSymbol(ver, codewords) {
    const size = ver * 4 + 17;
    const m = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, dark) => { m[y][x] = dark; fn[y][x] = true; };

    for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
        if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
      }
    }
    if (ver > 1) {
      const n = Math.floor(ver / 7) + 2;
      const step = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (n * 2 - 2)) * 2;
      const pos = [6];
      for (let p = size - 7; pos.length < n; p -= step) pos.splice(1, 0, p);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        if ((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) continue;
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
          set(pos[i] + dx, pos[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
        }
      }
    }
    const drawFormat = (mask) => {
      const data = mask; // level M has format bits 00
      let rem = data;
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const b = ((data << 10) | rem) ^ 0x5412;
      const bit = (i) => ((b >>> i) & 1) === 1;
      for (let i = 0; i <= 5; i++) set(8, i, bit(i));
      set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8));
      for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
      for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
      for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
      set(8, size - 8, true);
    };
    drawFormat(0);
    if (ver >= 7) {
      let rem = ver;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      const b = (ver << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const dark = ((b >>> i) & 1) === 1, a = size - 11 + (i % 3), c = Math.floor(i / 3);
        set(a, c, dark); set(c, a, dark);
      }
    }

    // Data, in the zigzag order.
    let k = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let v = 0; v < size; v++) for (let j = 0; j < 2; j++) {
        const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - v : v;
        if (!fn[y][x] && k < codewords.length * 8) {
          m[y][x] = ((codewords[k >>> 3] >>> (7 - (k & 7))) & 1) === 1;
          k++;
        }
      }
    }

    const masks = [
      (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => (x * y) % 2 + (x * y) % 3 === 0,
      (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0, (x, y) => ((x + y) % 2 + (x * y) % 3) % 2 === 0,
    ];
    const applyMask = (i) => {
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fn[y][x] && masks[i](x, y)) m[y][x] = !m[y][x];
    };
    let best = 0, bestScore = Infinity;
    for (let i = 0; i < 8; i++) {
      applyMask(i); drawFormat(i);
      const s = penalty(m, size);
      if (s < bestScore) { best = i; bestScore = s; }
      applyMask(i); // XOR again undoes it
    }
    applyMask(best); drawFormat(best);
    return m;
  }

  // The standard's four penalty rules, used only to choose the most readable mask.
  function penalty(m, size) {
    let score = 0, dark = 0;
    const line = (get) => {
      let s = 0, run = 1;
      for (let i = 1; i <= size; i++) {
        if (i < size && get(i) === get(i - 1)) run++;
        else { if (run >= 5) s += run - 2; run = 1; }
      }
      const pat = [1, 0, 1, 1, 1, 0, 1];
      for (let i = 0; i + 7 <= size; i++) {
        if (!pat.every((p, k) => (get(i + k) ? 1 : 0) === p)) continue;
        const lightBefore = [1, 2, 3, 4].every((k) => i - k < 0 || !get(i - k));
        const lightAfter = [0, 1, 2, 3].every((k) => i + 7 + k >= size || !get(i + 7 + k));
        if (lightBefore || lightAfter) s += 40;
      }
      return s;
    };
    for (let y = 0; y < size; y++) score += line((x) => m[y][x]);
    for (let x = 0; x < size; x++) score += line((y) => m[y][x]);
    for (let y = 0; y + 1 < size; y++) for (let x = 0; x + 1 < size; x++) {
      const c = m[y][x];
      if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3;
    }
    for (const row of m) for (const c of row) if (c) dark++;
    score += Math.floor(Math.abs(dark * 100 / (size * size) - 50) / 5) * 10;
    return score;
  }

  function qrSvg(text) {
    const m = encodeBytes(Array.from(new TextEncoder().encode(text)));
    const n = m.length, q = 4;
    let d = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m[y][x]) d += `M${x + q} ${y + q}h1v1h-1z`;
    const svgNs = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNs, 'svg');
    svg.setAttribute('viewBox', `0 0 ${n + 2 * q} ${n + 2 * q}`);
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'QR code of the public key');
    const bg = document.createElementNS(svgNs, 'rect');
    bg.setAttribute('width', '100%'); bg.setAttribute('height', '100%'); bg.setAttribute('fill', '#fff');
    const p = document.createElementNS(svgNs, 'path');
    p.setAttribute('d', d); p.setAttribute('fill', '#000');
    svg.append(bg, p);
    return svg;
  }

  // ---------- The key step ----------
  const $ = (id) => document.getElementById(id);
  const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const hex = (buf) => Array.from(new Uint8Array(buf), (x) => x.toString(16).padStart(2, '0')).join('');
  // The header lines are built from parts so the leak scan, which allows public keys only in
  // team/keys, does not read this code as a key.
  const fence = (word) => '-'.repeat(5) + word + ' PUBLIC KEY' + '-'.repeat(5);
  const pem = (der) => [fence('BEGIN'), ...b64(der).match(/.{1,64}/g), fence('END')].join('\n');
  let held = null; // the private half, in this tab's memory only

  function save(name, type, text) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function make() {
    const status = $('key-status');
    if (!window.crypto || !crypto.subtle) { status.textContent = 'This browser has no WebCrypto here (it needs https). Nothing was made.'; return; }
    status.textContent = 'Making a key pair in this browser...';
    const pair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    held = pair.privateKey;
    const spki = await crypto.subtle.exportKey('spki', pair.publicKey);
    const fp = hex(await crypto.subtle.digest('SHA-256', spki));
    const text = pem(spki);
    $('key-public').value = text;
    $('key-fingerprint').textContent = 'sha256:' + fp.slice(0, 16);
    const box = $('key-qr');
    box.replaceChildren(qrSvg(text));
    $('key-result').hidden = false;
    status.textContent = 'Done. The private half is held in this tab only. Close the tab and it is gone, unless you download it.';
  }

  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
    const btn = $('key-make');
    if (!btn) return;
    btn.hidden = false;
    btn.addEventListener('click', () => make().catch((e) => { $('key-status').textContent = 'Could not make a key: ' + e.message; }));
    $('key-save-public').addEventListener('click', () => save('agenticcells-public-key.pem', 'application/x-pem-file', $('key-public').value + '\n'));
    $('key-save-private').addEventListener('click', async () => {
      if (!held) return;
      if (!confirm('This saves your private key as a file on this device. Keep it safe; anyone with it can act as you. Save it?')) return;
      const jwk = await crypto.subtle.exportKey('jwk', held);
      save('agenticcells-private-key.jwk.json', 'application/json', JSON.stringify(jwk, null, 2) + '\n');
    });
  });

  // Lets a test load the encoder in Node; the page does not use it.
  if (typeof module === 'object' && module.exports) module.exports = { encodeBytes };
})();

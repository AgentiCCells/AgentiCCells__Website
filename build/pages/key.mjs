// /key/: a prototype of step 5 (Key) of the website cell (ACC-021, queue V7).
// A page module for build.mjs's page hook. The work happens in /assets/key.js, in the
// visitor's browser: WebCrypto makes the key pair, our own encoder draws the QR code,
// and nothing is sent anywhere. Not in the nav while it is a prototype.
// Written by dev@agenticcells.dinis, 2026-11-15. Code under Apache-2.0.
export default async function key() {
  const html = `<h1>Your key (prototype)</h1>
<p class="note"><strong>Prototype. This page sends nothing.</strong> It makes no network request after it loads, keeps nothing on our side and is not yet part of any order. It shows how step 5 of the website cell (Key) could work. The flow and its prices are a proposal.</p>
<p>In the website cell, the person who owns the site holds a key. Their public key goes into their repository; their private key stays with them. Changes and steers they sign with it are how the team knows a request is really theirs.</p>
<h2>Make a key pair in this browser</h2>
<p>The pair is made by your browser's built-in WebCrypto (ECDSA, curve P-256). The private half stays in this tab's memory. It leaves the tab only if you press "Download private key", and then only as a file on your own device. Close the tab without downloading and it is gone.</p>
<noscript><p>This page needs JavaScript to make a key in your browser. Nothing else on this site does.</p></noscript>
<p><button type="button" id="key-make" hidden>Make a key pair</button></p>
<p id="key-status" role="status"></p>
<div id="key-result" hidden>
<h2>Your public key</h2>
<p>Fingerprint: <code id="key-fingerprint"></code></p>
<p><label for="key-public">Public key (safe to share)</label></p>
<textarea id="key-public" rows="6" readonly spellcheck="false"></textarea>
<p>The same public key as a QR code, drawn in this page:</p>
<div id="key-qr" class="key-qr"></div>
<p><button type="button" id="key-save-public">Download public key</button> <button type="button" id="key-save-private">Download private key</button></p>
<p>The private key downloads as a JSON Web Key file. Anyone who has that file can act as you: keep it somewhere safe and never send it to us.</p>
</div>
<h2>How to check that nothing is sent</h2>
<ul>
<li>Open your browser's developer tools, Network tab, then press the button: no request appears.</li>
<li>The script is <a href="/assets/key.js">/assets/key.js</a>, served from this site, with no third-party code. The QR encoder in it is our own.</li>
</ul>
<script src="/assets/key.js" defer></script>`;
  return [{
    path: '/key/',
    title: 'Your key (prototype): AgentiCCells',
    description: 'A prototype of the key step: make a key pair in your browser and see the public half as text and a QR code. Nothing is sent.',
    html,
  }];
}

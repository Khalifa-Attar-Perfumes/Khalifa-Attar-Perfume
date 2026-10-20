// Khalifa Business Manager — service worker
// HTML: network first (so updates arrive), falls back to cache offline.
// Assets (fonts, libraries, icons): cache first. Bump VERSION on every release.
const VERSION = 'kbm-v1.0.0';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './vendor/html2canvas.min.js', './vendor/jspdf.umd.min.js',
  './fonts/manrope.woff2', './fonts/cormorant.woff2',
  './icons/logo.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-64.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                             // sync calls (POST) always go to the network
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;                   // Google Apps Script etc. are never cached
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});

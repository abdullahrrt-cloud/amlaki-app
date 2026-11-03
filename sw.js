/* دفتر المشتريات — يحفظ ملفات البرنامج على الجهاز ليعمل بدون إنترنت */
const VERSION = 'daftar-d9be0aa27a';
const FILES = ["config.js", "fonts/almarai-arabic-400-normal.woff2", "fonts/almarai-arabic-700-normal.woff2", "fonts/almarai-latin-400-normal.woff2", "fonts/almarai-latin-700-normal.woff2", "fonts/cairo-arabic-400-normal.woff2", "fonts/cairo-arabic-500-normal.woff2", "fonts/cairo-arabic-600-normal.woff2", "fonts/cairo-arabic-700-normal.woff2", "fonts/cairo-latin-400-normal.woff2", "fonts/cairo-latin-500-normal.woff2", "fonts/cairo-latin-600-normal.woff2", "fonts/cairo-latin-700-normal.woff2", "fonts/fonts.css", "fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", "fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2", "fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2", "fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2", "fonts/ibm-plex-sans-arabic-latin-400-normal.woff2", "fonts/ibm-plex-sans-arabic-latin-500-normal.woff2", "fonts/ibm-plex-sans-arabic-latin-600-normal.woff2", "fonts/ibm-plex-sans-arabic-latin-700-normal.woff2", "fonts/noto-kufi-arabic-arabic-400-normal.woff2", "fonts/noto-kufi-arabic-arabic-500-normal.woff2", "fonts/noto-kufi-arabic-arabic-600-normal.woff2", "fonts/noto-kufi-arabic-arabic-700-normal.woff2", "fonts/noto-kufi-arabic-latin-400-normal.woff2", "fonts/noto-kufi-arabic-latin-500-normal.woff2", "fonts/noto-kufi-arabic-latin-600-normal.woff2", "fonts/noto-kufi-arabic-latin-700-normal.woff2", "fonts/noto-naskh-arabic-arabic-400-normal.woff2", "fonts/noto-naskh-arabic-arabic-500-normal.woff2", "fonts/noto-naskh-arabic-arabic-600-normal.woff2", "fonts/noto-naskh-arabic-arabic-700-normal.woff2", "fonts/noto-naskh-arabic-latin-400-normal.woff2", "fonts/noto-naskh-arabic-latin-500-normal.woff2", "fonts/noto-naskh-arabic-latin-600-normal.woff2", "fonts/noto-naskh-arabic-latin-700-normal.woff2", "fonts/reem-kufi-arabic-500-normal.woff2", "fonts/reem-kufi-arabic-600-normal.woff2", "fonts/reem-kufi-arabic-700-normal.woff2", "fonts/reem-kufi-latin-500-normal.woff2", "fonts/reem-kufi-latin-600-normal.woff2", "fonts/reem-kufi-latin-700-normal.woff2", "fonts/tajawal-arabic-400-normal.woff2", "fonts/tajawal-arabic-500-normal.woff2", "fonts/tajawal-arabic-700-normal.woff2", "fonts/tajawal-latin-400-normal.woff2", "fonts/tajawal-latin-500-normal.woff2", "fonts/tajawal-latin-700-normal.woff2", "guide.html", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "index.html", "lib/exceljs.min.js", "lib/firebase-app-compat.js", "lib/firebase-auth-compat.js", "lib/firebase-firestore-compat.js", "lib/html2canvas.min.js", "lib/jspdf.umd.min.js", "lib/jszip.min.js", "lib/pdf.min.js", "lib/pdf.worker.min.js", "manifest.webmanifest"];
const NETWORK_FIRST = ['config.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(['./', ...FILES])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('daftar-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const rel = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (NETWORK_FIRST.includes(rel)) {
    e.respondWith(fetch(req).then(res => { if (res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return res; }).catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.type === 'basic') { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return res;
  }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});

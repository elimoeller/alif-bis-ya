// Offline-Modus: alles beim ersten Besuch speichern, danach zuerst aus dem Speicher laden.
// Bei jeder Änderung an der Seite VERSION hochzählen, damit Nutzer die neue Fassung bekommen.
const VERSION="alif-v2";
const ASSETS=[
 "./",
 "index.html",
 "datenschutz.html",
 "fonts.css",
 "vendor/qrcode.js",
 "manifest.webmanifest",
 "fonts/amiri-arabic-400-normal.woff2",
 "fonts/amiri-arabic-700-normal.woff2",
 "fonts/amiri-latin-400-normal.woff2",
 "fonts/amiri-latin-700-normal.woff2",
 "fonts/amiri-latin-ext-400-normal.woff2",
 "fonts/amiri-latin-ext-700-normal.woff2",
 "fonts/atkinson-hyperlegible-latin-400-normal.woff2",
 "fonts/atkinson-hyperlegible-latin-700-normal.woff2",
 "fonts/atkinson-hyperlegible-latin-ext-400-normal.woff2",
 "fonts/atkinson-hyperlegible-latin-ext-700-normal.woff2",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "icons/apple-touch-icon.png",
 "icons/favicon-32.png"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const copy=res.clone();caches.open(VERSION).then(c=>c.put(e.request,copy))}
    return res;
  }).catch(()=>caches.match("index.html"))));
});

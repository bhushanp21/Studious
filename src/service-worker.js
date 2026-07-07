const CACHE_NAME = "studentos-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./screens/home.html",
  "./screens/schedule.html",
  "./screens/notice.html",
  "./screens/homework.html",
  "./screens/emergency.html",
  "./footer.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  
  // Skip caching for HTML files - always fetch fresh
  if (event.request.url.endsWith('.html')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});

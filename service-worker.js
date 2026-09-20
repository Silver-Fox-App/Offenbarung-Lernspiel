const CACHE_NAME = "offenbarung-lernspiel-v3";

const FILES_TO_CACHE = [
  "/Offenbarung-Lernspiel/",
  "/Offenbarung-Lernspiel/index.html",

  "/Offenbarung-Lernspiel/Offb-Lernspiel-URL_DE/index.html",
  "/Offenbarung-Lernspiel/Offb-Lernspiel-URL_DE/vorlage.png",

  "/Offenbarung-Lernspiel/Offb-Lernspiel-URL_EN/index.html",
  "/Offenbarung-Lernspiel/Offb-Lernspiel-URL_EN/vorlage.png",

   "/Offenbarung-Lernspiel/Offb-Lernspiel-URL_KO/index.html",
  "/Offenbarung-Lernspiel/Offb-Lernspiel-URL_KO/vorlage.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

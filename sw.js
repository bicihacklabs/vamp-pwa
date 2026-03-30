const CACHE_NAME = 'vamp-cache-v1';
const urlsToCache = [
  '/',
  'https://5577505873.blogspot.com/',
  // Agrega aquí la URL de tu logo o fuentes principales si quieres que carguen offline
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia de carga: Red primero, si falla, usa la Caché
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
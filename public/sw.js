// Define cache name and files to cache
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  'style.css',
  'script.js'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch files from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached files or fetch from network
        return response || fetch(event.request);
      })
  );
});


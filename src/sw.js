const CACHE_VERSION = 'static-v1';

const offlineResources = [
  '/index.html',
  '/offline.html',
  '/app.js'
];

const cacheOfflineResources = () =>
  caches.open(CACHE_VERSION)
    .then(cache => cache.addAll(offlineResources));

const onInstall = (e) => {
  console.log('[sw] - install');
  e.waitUntil(
    cacheOfflineResources()
  );
};

const onFetch = (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response =>
        response || fetch(e.request))
      .catch(() => {
        if (e.request.mode === 'navigate')
          return caches.match('/offline.html')
      })
  );
};

/* Registerer event listeners */
self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);

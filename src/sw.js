const CACHE_VERSION = 'static-v1';

const offlineResources = [
  '/index.html',
  '/offline.html',
  '/app.js',
  '/icons/sonat_200x200.png',
  '/icons/sonat_400x400.jpg',
  '/style.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css'
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

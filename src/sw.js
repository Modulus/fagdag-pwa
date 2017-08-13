const APP_SHELL_CACHE = 'app-shell-v1';
const DATA_CACHE = 'employees-v1';

const offlineResources = [
  'index.html',
  'offline.html',
  'app.js',
  'icons/sonat_200x200.png',
  'icons/sonat_400x400.jpg',
  'style.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css'
];

const cacheOfflineResources = () =>
  caches.open(APP_SHELL_CACHE)
    .then(cache => cache.addAll(offlineResources));

const handleOffline = e => () => {
  if (e.request.mode === 'navigate')
    return caches.match('offline.html', { ignoreSearch: true })
};

const getCachedFiles = e =>
  caches.match(e.request)
    .then(response =>
      response || fetch(e.request))
    .catch(handleOffline(e))

const onInstall = (e) => {
  console.log('[sw] - install');
  e.waitUntil(cacheOfflineResources());
};

const onFetch = (e) => {
  console.log('[sw] - fetch');
  e.respondWith(getCachedFiles(e));
};

const onActivate = (e) => {
  console.log('[sw] - activate');
};

/* Registerer event listeners */
self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);
self.addEventListener('activate', onActivate);

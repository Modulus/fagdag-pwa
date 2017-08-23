/* Les meir om Service Worker APIet på Mozilla sine sider:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */

/* Nøklar som vil bli brukt i Cache Storage
 * Les meir om Cache APIet her: https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */

const FILE_CACHE = 'app-shell-v1';

const appShellFiles = [
  '/offline.html',
  '/manifest.json',
  '/app.js',
  '/icons/sonat_200x200.png',
  '/icons/sonat_400x400.jpg',
  '/icons/sonat_32x32.png',
  '/style.css',
  '/cards.css',
];

const cacheOfflineResources = () =>
  Promise.all([caches.open(FILE_CACHE)])
    .then(([fileCache]) => {
      fileCache.addAll(appShellFiles);
    });

const handleOffline = e => () => {
  if (e.request.mode === 'navigate')
    return caches.match('/offline.html');
};

const getCachedFiles = e =>
  caches.match(e.request)
    .then(response => response || fetch(e.request))
    .catch(handleOffline(e))

const getEmployeeDataFromCache = e =>
  caches.match(e.request)
    .then(response => response.clone());

/* Lytt på install event
 * https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
 */

self.addEventListener('install', (e) => {
  e.waitUntil(cacheOfflineResources());
});

/* Lytt på fetch event
 * https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
 */

self.addEventListener('fetch', (e) => {
  e.respondWith(getCachedFiles(e));
});

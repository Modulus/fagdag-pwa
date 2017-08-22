/* Les meir om Service Worker APIet på Mozilla sine sider:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */

/* Nøklar som vil bli brukt i Cache Storage
 * Les meir om Cache APIet her: https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */

const FILE_CACHE = 'app-shell-v1';
const DATA_CACHE = 'employees-v1';

const appShellFiles = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/app.js',
  '/icons/sonat_200x200.png',
  '/icons/sonat_400x400.jpg',
  '/icons/sonat_32x32.png',
  '/style.css',
  '/cards.css',
];

const apiUrl = 'https://sonat-fagdag-pwa.firebaseio.com/employees.json';

const cacheOfflineResources = () =>
  Promise.all([caches.open(FILE_CACHE), caches.open(DATA_CACHE), fetch(apiUrl)])
    .then(([fileCache, dataCache, response]) => {
      fileCache.addAll(appShellFiles);
      dataCache.add(apiUrl);
      return response.clone().json().then(employees =>
        fileCache.addAll(employees.map(employee =>
          employee.image)));
    });

const handleOffline = e => () => {
  if (e.request.mode === 'navigate')
    return caches.match('offline.html', { ignoreSearch: true })
};

const getCachedFiles = e =>
  caches.match(e.request)
    .then(response => response || fetch(e.request))
    .catch(handleOffline(e))

const fetchEmployeeData = request =>
    Promise.all([caches.open(FILE_CACHE), caches.open(DATA_CACHE), fetch(request)])
      .then(([fileCache, dataCache, response]) => {
        dataCache.put(request.url, response.clone());
        return response;
      })
      .catch(error => { /* No internet connection */ });

const fetchWithFallBackToCache = e =>
  caches.match(e.request)
    .then(response => navigator.onLine ? fetchEmployeeData(e.request) : response.clone())
    .catch(navigator.onLine ? fetchEmployeeData(e.request) : []);

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
  if (e.request.url === apiUrl) {
    e.respondWith(fetchWithFallBackToCache(e));
  } else {
    e.respondWith(getCachedFiles(e));
  }
});

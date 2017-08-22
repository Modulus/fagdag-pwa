/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports) {

/* Les meir om Service Worker APIet på Mozilla sine sider:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */

/* Nøklar som vil bli brukt i Cache Storage
 * Les meir om Cache APIet her: https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */

const FILE_CACHE = 'app-shell-v1';
const DATA_CACHE = 'employees-v1';

const appShellFiles = ['/', '/index.html', '/offline.html', '/manifest.json', '/app.js', '/icons/sonat_200x200.png', '/icons/sonat_400x400.jpg', '/icons/sonat_32x32.png', '/style.css', '/cards.css'];

const apiUrl = 'https://sonat-fagdag-pwa.firebaseio.com/employees.json';

const cacheOfflineResources = () => Promise.all([caches.open(FILE_CACHE), caches.open(DATA_CACHE), fetch(apiUrl)]).then(([fileCache, dataCache, response]) => {
  fileCache.addAll(appShellFiles);
  dataCache.add(apiUrl);
  return response.clone().json().then(employees => fileCache.addAll(employees.map(employee => employee.image)));
});

const handleOffline = e => () => {
  if (e.request.mode === 'navigate') return caches.match('offline.html', { ignoreSearch: true });
};

const getCachedFiles = e => caches.match(e.request).then(response => response || fetch(e.request)).catch(handleOffline(e));

const fetchEmployeeData = request => Promise.all([caches.open(FILE_CACHE), caches.open(DATA_CACHE), fetch(request)]).then(([fileCache, dataCache, response]) => {
  dataCache.put(request.url, response.clone());
  return response;
}).catch(error => {/* No internet connection */});

const fetchWithFallBackToCache = e => caches.match(e.request).then(response => navigator.onLine ? fetchEmployeeData(e.request) : response.clone()).catch(navigator.onLine ? fetchEmployeeData(e.request) : []);

/* Lytt på install event
 * https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
 */

self.addEventListener('install', e => {
  e.waitUntil(cacheOfflineResources());
});

/* Lytt på fetch event
 * https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
 */

self.addEventListener('fetch', e => {
  if (e.request.url === apiUrl) {
    e.respondWith(fetchWithFallBackToCache(e));
  } else {
    e.respondWith(getCachedFiles(e));
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2U0OTAyYjgyNzY5Yzg0NGFjY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N3LmpzIl0sIm5hbWVzIjpbIkZJTEVfQ0FDSEUiLCJEQVRBX0NBQ0hFIiwiYXBwU2hlbGxGaWxlcyIsImFwaVVybCIsImNhY2hlT2ZmbGluZVJlc291cmNlcyIsIlByb21pc2UiLCJhbGwiLCJjYWNoZXMiLCJvcGVuIiwiZmV0Y2giLCJ0aGVuIiwiZmlsZUNhY2hlIiwiZGF0YUNhY2hlIiwicmVzcG9uc2UiLCJhZGRBbGwiLCJhZGQiLCJjbG9uZSIsImpzb24iLCJlbXBsb3llZXMiLCJtYXAiLCJlbXBsb3llZSIsImltYWdlIiwiaGFuZGxlT2ZmbGluZSIsImUiLCJyZXF1ZXN0IiwibW9kZSIsIm1hdGNoIiwiaWdub3JlU2VhcmNoIiwiZ2V0Q2FjaGVkRmlsZXMiLCJjYXRjaCIsImZldGNoRW1wbG95ZWVEYXRhIiwicHV0IiwidXJsIiwiZXJyb3IiLCJmZXRjaFdpdGhGYWxsQmFja1RvQ2FjaGUiLCJuYXZpZ2F0b3IiLCJvbkxpbmUiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndhaXRVbnRpbCIsInJlc3BvbmRXaXRoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBOzs7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QUFlTCxDQUFmLENBQWQ7QUFDRDtBQUNGLENBTkQsRSIsImZpbGUiOiJzdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjZTQ5MDJiODI3NjljODQ0YWNjZiIsIi8qIExlcyBtZWlyIG9tIFNlcnZpY2UgV29ya2VyIEFQSWV0IHDDpSBNb3ppbGxhIHNpbmUgc2lkZXI6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2VydmljZV9Xb3JrZXJfQVBJXG4gKi9cblxuLyogTsO4a2xhciBzb20gdmlsIGJsaSBicnVrdCBpIENhY2hlIFN0b3JhZ2VcbiAqIExlcyBtZWlyIG9tIENhY2hlIEFQSWV0IGhlcjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhY2hlXG4gKi9cblxuY29uc3QgRklMRV9DQUNIRSA9ICdhcHAtc2hlbGwtdjEnO1xuY29uc3QgREFUQV9DQUNIRSA9ICdlbXBsb3llZXMtdjEnO1xuXG5jb25zdCBhcHBTaGVsbEZpbGVzID0gW1xuICAnLycsXG4gICcvaW5kZXguaHRtbCcsXG4gICcvb2ZmbGluZS5odG1sJyxcbiAgJy9tYW5pZmVzdC5qc29uJyxcbiAgJy9hcHAuanMnLFxuICAnL2ljb25zL3NvbmF0XzIwMHgyMDAucG5nJyxcbiAgJy9pY29ucy9zb25hdF80MDB4NDAwLmpwZycsXG4gICcvaWNvbnMvc29uYXRfMzJ4MzIucG5nJyxcbiAgJy9zdHlsZS5jc3MnLFxuICAnL2NhcmRzLmNzcycsXG5dO1xuXG5jb25zdCBhcGlVcmwgPSAnaHR0cHM6Ly9zb25hdC1mYWdkYWctcHdhLmZpcmViYXNlaW8uY29tL2VtcGxveWVlcy5qc29uJztcblxuY29uc3QgY2FjaGVPZmZsaW5lUmVzb3VyY2VzID0gKCkgPT5cbiAgUHJvbWlzZS5hbGwoW2NhY2hlcy5vcGVuKEZJTEVfQ0FDSEUpLCBjYWNoZXMub3BlbihEQVRBX0NBQ0hFKSwgZmV0Y2goYXBpVXJsKV0pXG4gICAgLnRoZW4oKFtmaWxlQ2FjaGUsIGRhdGFDYWNoZSwgcmVzcG9uc2VdKSA9PiB7XG4gICAgICBmaWxlQ2FjaGUuYWRkQWxsKGFwcFNoZWxsRmlsZXMpO1xuICAgICAgZGF0YUNhY2hlLmFkZChhcGlVcmwpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmNsb25lKCkuanNvbigpLnRoZW4oZW1wbG95ZWVzID0+XG4gICAgICAgIGZpbGVDYWNoZS5hZGRBbGwoZW1wbG95ZWVzLm1hcChlbXBsb3llZSA9PlxuICAgICAgICAgIGVtcGxveWVlLmltYWdlKSkpO1xuICAgIH0pO1xuXG5jb25zdCBoYW5kbGVPZmZsaW5lID0gZSA9PiAoKSA9PiB7XG4gIGlmIChlLnJlcXVlc3QubW9kZSA9PT0gJ25hdmlnYXRlJylcbiAgICByZXR1cm4gY2FjaGVzLm1hdGNoKCdvZmZsaW5lLmh0bWwnLCB7IGlnbm9yZVNlYXJjaDogdHJ1ZSB9KVxufTtcblxuY29uc3QgZ2V0Q2FjaGVkRmlsZXMgPSBlID0+XG4gIGNhY2hlcy5tYXRjaChlLnJlcXVlc3QpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UgfHwgZmV0Y2goZS5yZXF1ZXN0KSlcbiAgICAuY2F0Y2goaGFuZGxlT2ZmbGluZShlKSlcblxuY29uc3QgZmV0Y2hFbXBsb3llZURhdGEgPSByZXF1ZXN0ID0+XG4gICAgUHJvbWlzZS5hbGwoW2NhY2hlcy5vcGVuKEZJTEVfQ0FDSEUpLCBjYWNoZXMub3BlbihEQVRBX0NBQ0hFKSwgZmV0Y2gocmVxdWVzdCldKVxuICAgICAgLnRoZW4oKFtmaWxlQ2FjaGUsIGRhdGFDYWNoZSwgcmVzcG9uc2VdKSA9PiB7XG4gICAgICAgIGRhdGFDYWNoZS5wdXQocmVxdWVzdC51cmwsIHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHsgLyogTm8gaW50ZXJuZXQgY29ubmVjdGlvbiAqLyB9KTtcblxuY29uc3QgZmV0Y2hXaXRoRmFsbEJhY2tUb0NhY2hlID0gZSA9PlxuICBjYWNoZXMubWF0Y2goZS5yZXF1ZXN0KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IG5hdmlnYXRvci5vbkxpbmUgPyBmZXRjaEVtcGxveWVlRGF0YShlLnJlcXVlc3QpIDogcmVzcG9uc2UuY2xvbmUoKSlcbiAgICAuY2F0Y2gobmF2aWdhdG9yLm9uTGluZSA/IGZldGNoRW1wbG95ZWVEYXRhKGUucmVxdWVzdCkgOiBbXSk7XG5cbi8qIEx5dHQgcMOlIGluc3RhbGwgZXZlbnRcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbnN0YWxsRXZlbnRcbiAqL1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCAoZSkgPT4ge1xuICBlLndhaXRVbnRpbChjYWNoZU9mZmxpbmVSZXNvdXJjZXMoKSk7XG59KTtcblxuLyogTHl0dCBww6UgZmV0Y2ggZXZlbnRcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaEV2ZW50XG4gKi9cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChlKSA9PiB7XG4gIGlmIChlLnJlcXVlc3QudXJsID09PSBhcGlVcmwpIHtcbiAgICBlLnJlc3BvbmRXaXRoKGZldGNoV2l0aEZhbGxCYWNrVG9DYWNoZShlKSk7XG4gIH0gZWxzZSB7XG4gICAgZS5yZXNwb25kV2l0aChnZXRDYWNoZWRGaWxlcyhlKSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
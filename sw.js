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

const appShellFiles = ['/fagdag-pwa/', '/fagdag-pwa/index.html', '/fagdag-pwa/offline.html', '/fagdag-pwa/manifest.json', '/fagdag-pwa/app.js', '/fagdag-pwa/icons/sonat_200x200.png', '/fagdag-pwa/icons/sonat_400x400.jpg', '/fagdag-pwa/icons/sonat_32x32.png', '/fagdag-pwa/style.css', '/fagdag-pwa/cards.css'];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWNkNDdhODRlODM4NGNhOWNkMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N3LmpzIl0sIm5hbWVzIjpbIkZJTEVfQ0FDSEUiLCJEQVRBX0NBQ0hFIiwiYXBwU2hlbGxGaWxlcyIsImFwaVVybCIsImNhY2hlT2ZmbGluZVJlc291cmNlcyIsIlByb21pc2UiLCJhbGwiLCJjYWNoZXMiLCJvcGVuIiwiZmV0Y2giLCJ0aGVuIiwiZmlsZUNhY2hlIiwiZGF0YUNhY2hlIiwicmVzcG9uc2UiLCJhZGRBbGwiLCJhZGQiLCJjbG9uZSIsImpzb24iLCJlbXBsb3llZXMiLCJtYXAiLCJlbXBsb3llZSIsImltYWdlIiwiaGFuZGxlT2ZmbGluZSIsImUiLCJyZXF1ZXN0IiwibW9kZSIsIm1hdGNoIiwiaWdub3JlU2VhcmNoIiwiZ2V0Q2FjaGVkRmlsZXMiLCJjYXRjaCIsImZldGNoRW1wbG95ZWVEYXRhIiwicHV0IiwidXJsIiwiZXJyb3IiLCJmZXRjaFdpdGhGYWxsQmFja1RvQ2FjaGUiLCJuYXZpZ2F0b3IiLCJvbkxpbmUiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndhaXRVbnRpbCIsInJlc3BvbmRXaXRoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBOzs7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QWNaLGVBQWVMLENBQWYsQ0FBZDtBQUNEO0FBQ0YsQ0FORCxFIiwiZmlsZSI6InN3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFjZDQ3YTg0ZTgzODRjYTljZDFkIiwiLyogTGVzIG1laXIgb20gU2VydmljZSBXb3JrZXIgQVBJZXQgcMOlIE1vemlsbGEgc2luZSBzaWRlcjpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TZXJ2aWNlX1dvcmtlcl9BUElcbiAqL1xuXG4vKiBOw7hrbGFyIHNvbSB2aWwgYmxpIGJydWt0IGkgQ2FjaGUgU3RvcmFnZVxuICogTGVzIG1laXIgb20gQ2FjaGUgQVBJZXQgaGVyOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FjaGVcbiAqL1xuXG5jb25zdCBGSUxFX0NBQ0hFID0gJ2FwcC1zaGVsbC12MSc7XG5jb25zdCBEQVRBX0NBQ0hFID0gJ2VtcGxveWVlcy12MSc7XG5cbmNvbnN0IGFwcFNoZWxsRmlsZXMgPSBbXG4gICcvZmFnZGFnLXB3YS8nLFxuICAnL2ZhZ2RhZy1wd2EvaW5kZXguaHRtbCcsXG4gICcvZmFnZGFnLXB3YS9vZmZsaW5lLmh0bWwnLFxuICAnL2ZhZ2RhZy1wd2EvbWFuaWZlc3QuanNvbicsXG4gICcvZmFnZGFnLXB3YS9hcHAuanMnLFxuICAnL2ZhZ2RhZy1wd2EvaWNvbnMvc29uYXRfMjAweDIwMC5wbmcnLFxuICAnL2ZhZ2RhZy1wd2EvaWNvbnMvc29uYXRfNDAweDQwMC5qcGcnLFxuICAnL2ZhZ2RhZy1wd2EvaWNvbnMvc29uYXRfMzJ4MzIucG5nJyxcbiAgJy9mYWdkYWctcHdhL3N0eWxlLmNzcycsXG4gICcvZmFnZGFnLXB3YS9jYXJkcy5jc3MnLFxuXTtcblxuY29uc3QgYXBpVXJsID0gJ2h0dHBzOi8vc29uYXQtZmFnZGFnLXB3YS5maXJlYmFzZWlvLmNvbS9lbXBsb3llZXMuanNvbic7XG5cbmNvbnN0IGNhY2hlT2ZmbGluZVJlc291cmNlcyA9ICgpID0+XG4gIFByb21pc2UuYWxsKFtjYWNoZXMub3BlbihGSUxFX0NBQ0hFKSwgY2FjaGVzLm9wZW4oREFUQV9DQUNIRSksIGZldGNoKGFwaVVybCldKVxuICAgIC50aGVuKChbZmlsZUNhY2hlLCBkYXRhQ2FjaGUsIHJlc3BvbnNlXSkgPT4ge1xuICAgICAgZmlsZUNhY2hlLmFkZEFsbChhcHBTaGVsbEZpbGVzKTtcbiAgICAgIGRhdGFDYWNoZS5hZGQoYXBpVXJsKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jbG9uZSgpLmpzb24oKS50aGVuKGVtcGxveWVlcyA9PlxuICAgICAgICBmaWxlQ2FjaGUuYWRkQWxsKGVtcGxveWVlcy5tYXAoZW1wbG95ZWUgPT5cbiAgICAgICAgICBlbXBsb3llZS5pbWFnZSkpKTtcbiAgICB9KTtcblxuY29uc3QgaGFuZGxlT2ZmbGluZSA9IGUgPT4gKCkgPT4ge1xuICBpZiAoZS5yZXF1ZXN0Lm1vZGUgPT09ICduYXZpZ2F0ZScpXG4gICAgcmV0dXJuIGNhY2hlcy5tYXRjaCgnb2ZmbGluZS5odG1sJywgeyBpZ25vcmVTZWFyY2g6IHRydWUgfSlcbn07XG5cbmNvbnN0IGdldENhY2hlZEZpbGVzID0gZSA9PlxuICBjYWNoZXMubWF0Y2goZS5yZXF1ZXN0KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlIHx8IGZldGNoKGUucmVxdWVzdCkpXG4gICAgLmNhdGNoKGhhbmRsZU9mZmxpbmUoZSkpXG5cbmNvbnN0IGZldGNoRW1wbG95ZWVEYXRhID0gcmVxdWVzdCA9PlxuICAgIFByb21pc2UuYWxsKFtjYWNoZXMub3BlbihGSUxFX0NBQ0hFKSwgY2FjaGVzLm9wZW4oREFUQV9DQUNIRSksIGZldGNoKHJlcXVlc3QpXSlcbiAgICAgIC50aGVuKChbZmlsZUNhY2hlLCBkYXRhQ2FjaGUsIHJlc3BvbnNlXSkgPT4ge1xuICAgICAgICBkYXRhQ2FjaGUucHV0KHJlcXVlc3QudXJsLCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7IC8qIE5vIGludGVybmV0IGNvbm5lY3Rpb24gKi8gfSk7XG5cbmNvbnN0IGZldGNoV2l0aEZhbGxCYWNrVG9DYWNoZSA9IGUgPT5cbiAgY2FjaGVzLm1hdGNoKGUucmVxdWVzdClcbiAgICAudGhlbihyZXNwb25zZSA9PiBuYXZpZ2F0b3Iub25MaW5lID8gZmV0Y2hFbXBsb3llZURhdGEoZS5yZXF1ZXN0KSA6IHJlc3BvbnNlLmNsb25lKCkpXG4gICAgLmNhdGNoKG5hdmlnYXRvci5vbkxpbmUgPyBmZXRjaEVtcGxveWVlRGF0YShlLnJlcXVlc3QpIDogW10pO1xuXG4vKiBMeXR0IHDDpSBpbnN0YWxsIGV2ZW50XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW5zdGFsbEV2ZW50XG4gKi9cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGUpID0+IHtcbiAgZS53YWl0VW50aWwoY2FjaGVPZmZsaW5lUmVzb3VyY2VzKCkpO1xufSk7XG5cbi8qIEx5dHQgcMOlIGZldGNoIGV2ZW50XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmV0Y2hFdmVudFxuICovXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCAoZSkgPT4ge1xuICBpZiAoZS5yZXF1ZXN0LnVybCA9PT0gYXBpVXJsKSB7XG4gICAgZS5yZXNwb25kV2l0aChmZXRjaFdpdGhGYWxsQmFja1RvQ2FjaGUoZSkpO1xuICB9IGVsc2Uge1xuICAgIGUucmVzcG9uZFdpdGgoZ2V0Q2FjaGVkRmlsZXMoZSkpO1xuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdy5qcyJdLCJzb3VyY2VSb290IjoiIn0=
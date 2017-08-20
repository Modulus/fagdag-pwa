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

const appShellFiles = ['/fagdag-pwa/', '/fagdag-pwa/index.html', '/fagdag-pwa/offline.html', '/fagdag-pwa/manifest.json', '/fagdag-pwa/app.js', '/fagdag-pwa/icons/sonat_200x200.png', '/fagdag-pwa/icons/sonat_400x400.jpg', '/fagdag-pwa/icons/sonat_32x32.png', '/fagdag-pwa/style.css'];

const apiUrl = 'https://sonat-fagdag-pwa.firebaseio.com/employees.json';

const cacheOfflineResources = () => Promise.all([caches.open(FILE_CACHE), caches.open(DATA_CACHE)]).then(([fileCache, dataCache]) => {
  fileCache.addAll(appShellFiles);
  dataCache.add(apiUrl);
});

const handleOffline = e => () => {
  if (e.request.mode === 'navigate') return caches.match('offline.html', { ignoreSearch: true });
};

const getCachedFiles = e => caches.match(e.request).then(response => response || fetch(e.request)).catch(handleOffline(e));

const fetchEmployeeData = request => Promise.all([caches.open(DATA_CACHE), fetch(request)]).then(([cache, response]) => {
  cache.put(request.url, response.clone());
  return response;
}).catch(error => {/* No internet connection */});

const cacheFirstThenNetwork = e => caches.match(e.request).then(response => {
  setTimeout(() => fetchEmployeeData(e.request), 0);
  return response;
});

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
    e.respondWith(cacheFirstThenNetwork(e));
  } else {
    e.respondWith(getCachedFiles(e));
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGIzYTU5NGQ5NzM3MTQ5YThjNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N3LmpzIl0sIm5hbWVzIjpbIkZJTEVfQ0FDSEUiLCJEQVRBX0NBQ0hFIiwiYXBwU2hlbGxGaWxlcyIsImFwaVVybCIsImNhY2hlT2ZmbGluZVJlc291cmNlcyIsIlByb21pc2UiLCJhbGwiLCJjYWNoZXMiLCJvcGVuIiwidGhlbiIsImZpbGVDYWNoZSIsImRhdGFDYWNoZSIsImFkZEFsbCIsImFkZCIsImhhbmRsZU9mZmxpbmUiLCJlIiwicmVxdWVzdCIsIm1vZGUiLCJtYXRjaCIsImlnbm9yZVNlYXJjaCIsImdldENhY2hlZEZpbGVzIiwicmVzcG9uc2UiLCJmZXRjaCIsImNhdGNoIiwiZmV0Y2hFbXBsb3llZURhdGEiLCJjYWNoZSIsInB1dCIsInVybCIsImNsb25lIiwiZXJyb3IiLCJjYWNoZUZpcnN0VGhlbk5ldHdvcmsiLCJzZXRUaW1lb3V0Iiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3YWl0VW50aWwiLCJyZXNwb25kV2l0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTs7OztBQUlBOzs7O0FBSUEsTUFBTUEsYUFBYSxjQUFuQjtBQUNBLE1BQU1DLGFBQWEsY0FBbkI7O0FBRUEsTUFBTUMsZ0JBQWdCLENBQ3BCLGNBRG9CLEVBRXBCLHdCQUZvQixFQUdwQiwwQkFIb0IsRUFJcEIsMkJBSm9CLEVBS3BCLG9CQUxvQixFQU1wQixxQ0FOb0IsRUFPcEIscUNBUG9CLEVBUXBCLG1DQVJvQixFQVNwQix1QkFUb0IsQ0FBdEI7O0FBWUEsTUFBTUMsU0FBUyx3REFBZjs7QUFFQSxNQUFNQyx3QkFBd0IsTUFDNUJDLFFBQVFDLEdBQVIsQ0FBWSxDQUFDQyxPQUFPQyxJQUFQLENBQVlSLFVBQVosQ0FBRCxFQUEwQk8sT0FBT0MsSUFBUCxDQUFZUCxVQUFaLENBQTFCLENBQVosRUFDR1EsSUFESCxDQUNRLENBQUMsQ0FBQ0MsU0FBRCxFQUFZQyxTQUFaLENBQUQsS0FBNEI7QUFDaENELFlBQVVFLE1BQVYsQ0FBaUJWLGFBQWpCO0FBQ0FTLFlBQVVFLEdBQVYsQ0FBY1YsTUFBZDtBQUNELENBSkgsQ0FERjs7QUFPQSxNQUFNVyxnQkFBZ0JDLEtBQUssTUFBTTtBQUMvQixNQUFJQSxFQUFFQyxPQUFGLENBQVVDLElBQVYsS0FBbUIsVUFBdkIsRUFDRSxPQUFPVixPQUFPVyxLQUFQLENBQWEsY0FBYixFQUE2QixFQUFFQyxjQUFjLElBQWhCLEVBQTdCLENBQVA7QUFDSCxDQUhEOztBQUtBLE1BQU1DLGlCQUFpQkwsS0FDckJSLE9BQU9XLEtBQVAsQ0FBYUgsRUFBRUMsT0FBZixFQUNHUCxJQURILENBQ1FZLFlBQVlBLFlBQVlDLE1BQU1QLEVBQUVDLE9BQVIsQ0FEaEMsRUFFR08sS0FGSCxDQUVTVCxjQUFjQyxDQUFkLENBRlQsQ0FERjs7QUFLQSxNQUFNUyxvQkFBb0JSLFdBQ3RCWCxRQUFRQyxHQUFSLENBQVksQ0FBQ0MsT0FBT0MsSUFBUCxDQUFZUCxVQUFaLENBQUQsRUFBMEJxQixNQUFNTixPQUFOLENBQTFCLENBQVosRUFDR1AsSUFESCxDQUNRLENBQUMsQ0FBQ2dCLEtBQUQsRUFBUUosUUFBUixDQUFELEtBQXVCO0FBQzNCSSxRQUFNQyxHQUFOLENBQVVWLFFBQVFXLEdBQWxCLEVBQXVCTixTQUFTTyxLQUFULEVBQXZCO0FBQ0EsU0FBT1AsUUFBUDtBQUNELENBSkgsRUFLR0UsS0FMSCxDQUtTTSxTQUFTLENBQUUsNEJBQThCLENBTGxELENBREo7O0FBUUEsTUFBTUMsd0JBQXdCZixLQUM1QlIsT0FBT1csS0FBUCxDQUFhSCxFQUFFQyxPQUFmLEVBQ0dQLElBREgsQ0FDUVksWUFBWTtBQUNoQlUsYUFBVyxNQUFNUCxrQkFBa0JULEVBQUVDLE9BQXBCLENBQWpCLEVBQStDLENBQS9DO0FBQ0EsU0FBT0ssUUFBUDtBQUNELENBSkgsQ0FERjs7QUFPQTs7OztBQUlBVyxLQUFLQyxnQkFBTCxDQUFzQixTQUF0QixFQUFrQ2xCLENBQUQsSUFBTztBQUN0Q0EsSUFBRW1CLFNBQUYsQ0FBWTlCLHVCQUFaO0FBQ0QsQ0FGRDs7QUFJQTs7OztBQUlBNEIsS0FBS0MsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBZ0NsQixDQUFELElBQU87QUFDcEMsTUFBSUEsRUFBRUMsT0FBRixDQUFVVyxHQUFWLEtBQWtCeEIsTUFBdEIsRUFBOEI7QUFDNUJZLE1BQUVvQixXQUFGLENBQWNMLHNCQUFzQmYsQ0FBdEIsQ0FBZDtBQUNELEdBRkQsTUFFTztBQUNMQSxNQUFFb0IsV0FBRixDQUFjZixlQUFlTCxDQUFmLENBQWQ7QUFDRDtBQUNGLENBTkQsRSIsImZpbGUiOiJzdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YjNhNTk0ZDk3MzcxNDlhOGM0ZCIsIi8qIExlcyBtZWlyIG9tIFNlcnZpY2UgV29ya2VyIEFQSWV0IHDDpSBNb3ppbGxhIHNpbmUgc2lkZXI6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2VydmljZV9Xb3JrZXJfQVBJXG4gKi9cblxuLyogTsO4a2xhciBzb20gdmlsIGJsaSBicnVrdCBpIENhY2hlIFN0b3JhZ2VcbiAqIExlcyBtZWlyIG9tIENhY2hlIEFQSWV0IGhlcjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhY2hlXG4gKi9cblxuY29uc3QgRklMRV9DQUNIRSA9ICdhcHAtc2hlbGwtdjEnO1xuY29uc3QgREFUQV9DQUNIRSA9ICdlbXBsb3llZXMtdjEnO1xuXG5jb25zdCBhcHBTaGVsbEZpbGVzID0gW1xuICAnL2ZhZ2RhZy1wd2EvJyxcbiAgJy9mYWdkYWctcHdhL2luZGV4Lmh0bWwnLFxuICAnL2ZhZ2RhZy1wd2Evb2ZmbGluZS5odG1sJyxcbiAgJy9mYWdkYWctcHdhL21hbmlmZXN0Lmpzb24nLFxuICAnL2ZhZ2RhZy1wd2EvYXBwLmpzJyxcbiAgJy9mYWdkYWctcHdhL2ljb25zL3NvbmF0XzIwMHgyMDAucG5nJyxcbiAgJy9mYWdkYWctcHdhL2ljb25zL3NvbmF0XzQwMHg0MDAuanBnJyxcbiAgJy9mYWdkYWctcHdhL2ljb25zL3NvbmF0XzMyeDMyLnBuZycsXG4gICcvZmFnZGFnLXB3YS9zdHlsZS5jc3MnXG5dO1xuXG5jb25zdCBhcGlVcmwgPSAnaHR0cHM6Ly9zb25hdC1mYWdkYWctcHdhLmZpcmViYXNlaW8uY29tL2VtcGxveWVlcy5qc29uJztcblxuY29uc3QgY2FjaGVPZmZsaW5lUmVzb3VyY2VzID0gKCkgPT5cbiAgUHJvbWlzZS5hbGwoW2NhY2hlcy5vcGVuKEZJTEVfQ0FDSEUpLCBjYWNoZXMub3BlbihEQVRBX0NBQ0hFKV0pXG4gICAgLnRoZW4oKFtmaWxlQ2FjaGUsIGRhdGFDYWNoZV0pID0+IHtcbiAgICAgIGZpbGVDYWNoZS5hZGRBbGwoYXBwU2hlbGxGaWxlcyk7XG4gICAgICBkYXRhQ2FjaGUuYWRkKGFwaVVybCk7XG4gICAgfSk7XG5cbmNvbnN0IGhhbmRsZU9mZmxpbmUgPSBlID0+ICgpID0+IHtcbiAgaWYgKGUucmVxdWVzdC5tb2RlID09PSAnbmF2aWdhdGUnKVxuICAgIHJldHVybiBjYWNoZXMubWF0Y2goJ29mZmxpbmUuaHRtbCcsIHsgaWdub3JlU2VhcmNoOiB0cnVlIH0pXG59O1xuXG5jb25zdCBnZXRDYWNoZWRGaWxlcyA9IGUgPT5cbiAgY2FjaGVzLm1hdGNoKGUucmVxdWVzdClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZSB8fCBmZXRjaChlLnJlcXVlc3QpKVxuICAgIC5jYXRjaChoYW5kbGVPZmZsaW5lKGUpKVxuXG5jb25zdCBmZXRjaEVtcGxveWVlRGF0YSA9IHJlcXVlc3QgPT5cbiAgICBQcm9taXNlLmFsbChbY2FjaGVzLm9wZW4oREFUQV9DQUNIRSksIGZldGNoKHJlcXVlc3QpXSlcbiAgICAgIC50aGVuKChbY2FjaGUsIHJlc3BvbnNlXSkgPT4ge1xuICAgICAgICBjYWNoZS5wdXQocmVxdWVzdC51cmwsIHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHsgLyogTm8gaW50ZXJuZXQgY29ubmVjdGlvbiAqLyB9KTtcblxuY29uc3QgY2FjaGVGaXJzdFRoZW5OZXR3b3JrID0gZSA9PlxuICBjYWNoZXMubWF0Y2goZS5yZXF1ZXN0KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmV0Y2hFbXBsb3llZURhdGEoZS5yZXF1ZXN0KSwgMCk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSk7XG5cbi8qIEx5dHQgcMOlIGluc3RhbGwgZXZlbnRcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbnN0YWxsRXZlbnRcbiAqL1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCAoZSkgPT4ge1xuICBlLndhaXRVbnRpbChjYWNoZU9mZmxpbmVSZXNvdXJjZXMoKSk7XG59KTtcblxuLyogTHl0dCBww6UgZmV0Y2ggZXZlbnRcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaEV2ZW50XG4gKi9cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChlKSA9PiB7XG4gIGlmIChlLnJlcXVlc3QudXJsID09PSBhcGlVcmwpIHtcbiAgICBlLnJlc3BvbmRXaXRoKGNhY2hlRmlyc3RUaGVuTmV0d29yayhlKSk7XG4gIH0gZWxzZSB7XG4gICAgZS5yZXNwb25kV2l0aChnZXRDYWNoZWRGaWxlcyhlKSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
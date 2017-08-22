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

const appShellFiles = ['/', '/index.html', '/offline.html', '/manifest.json', '/app.js', '/icons/sonat_200x200.png', '/icons/sonat_400x400.jpg', '/icons/sonat_32x32.png', '/style.css'];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGJkM2M2ODk1OWI4NWE5YzM0NGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N3LmpzIl0sIm5hbWVzIjpbIkZJTEVfQ0FDSEUiLCJEQVRBX0NBQ0hFIiwiYXBwU2hlbGxGaWxlcyIsImFwaVVybCIsImNhY2hlT2ZmbGluZVJlc291cmNlcyIsIlByb21pc2UiLCJhbGwiLCJjYWNoZXMiLCJvcGVuIiwidGhlbiIsImZpbGVDYWNoZSIsImRhdGFDYWNoZSIsImFkZEFsbCIsImFkZCIsImhhbmRsZU9mZmxpbmUiLCJlIiwicmVxdWVzdCIsIm1vZGUiLCJtYXRjaCIsImlnbm9yZVNlYXJjaCIsImdldENhY2hlZEZpbGVzIiwicmVzcG9uc2UiLCJmZXRjaCIsImNhdGNoIiwiZmV0Y2hFbXBsb3llZURhdGEiLCJjYWNoZSIsInB1dCIsInVybCIsImNsb25lIiwiZXJyb3IiLCJjYWNoZUZpcnN0VGhlbk5ldHdvcmsiLCJzZXRUaW1lb3V0Iiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3YWl0VW50aWwiLCJyZXNwb25kV2l0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTs7OztBQUlBOzs7O0FBSUEsTUFBTUEsYUFBYSxjQUFuQjtBQUNBLE1BQU1DLGFBQWEsY0FBbkI7O0FBRUEsTUFBTUMsZ0JBQWdCLENBQ3BCLEdBRG9CLEVBRXBCLGFBRm9CLEVBR3BCLGVBSG9CLEVBSXBCLGdCQUpvQixFQUtwQixTQUxvQixFQU1wQiwwQkFOb0IsRUFPcEIsMEJBUG9CLEVBUXBCLHdCQVJvQixFQVNwQixZQVRvQixDQUF0Qjs7QUFZQSxNQUFNQyxTQUFTLHdEQUFmOztBQUVBLE1BQU1DLHdCQUF3QixNQUM1QkMsUUFBUUMsR0FBUixDQUFZLENBQUNDLE9BQU9DLElBQVAsQ0FBWVIsVUFBWixDQUFELEVBQTBCTyxPQUFPQyxJQUFQLENBQVlQLFVBQVosQ0FBMUIsQ0FBWixFQUNHUSxJQURILENBQ1EsQ0FBQyxDQUFDQyxTQUFELEVBQVlDLFNBQVosQ0FBRCxLQUE0QjtBQUNoQ0QsWUFBVUUsTUFBVixDQUFpQlYsYUFBakI7QUFDQVMsWUFBVUUsR0FBVixDQUFjVixNQUFkO0FBQ0QsQ0FKSCxDQURGOztBQU9BLE1BQU1XLGdCQUFnQkMsS0FBSyxNQUFNO0FBQy9CLE1BQUlBLEVBQUVDLE9BQUYsQ0FBVUMsSUFBVixLQUFtQixVQUF2QixFQUNFLE9BQU9WLE9BQU9XLEtBQVAsQ0FBYSxjQUFiLEVBQTZCLEVBQUVDLGNBQWMsSUFBaEIsRUFBN0IsQ0FBUDtBQUNILENBSEQ7O0FBS0EsTUFBTUMsaUJBQWlCTCxLQUNyQlIsT0FBT1csS0FBUCxDQUFhSCxFQUFFQyxPQUFmLEVBQ0dQLElBREgsQ0FDUVksWUFBWUEsWUFBWUMsTUFBTVAsRUFBRUMsT0FBUixDQURoQyxFQUVHTyxLQUZILENBRVNULGNBQWNDLENBQWQsQ0FGVCxDQURGOztBQUtBLE1BQU1TLG9CQUFvQlIsV0FDdEJYLFFBQVFDLEdBQVIsQ0FBWSxDQUFDQyxPQUFPQyxJQUFQLENBQVlQLFVBQVosQ0FBRCxFQUEwQnFCLE1BQU1OLE9BQU4sQ0FBMUIsQ0FBWixFQUNHUCxJQURILENBQ1EsQ0FBQyxDQUFDZ0IsS0FBRCxFQUFRSixRQUFSLENBQUQsS0FBdUI7QUFDM0JJLFFBQU1DLEdBQU4sQ0FBVVYsUUFBUVcsR0FBbEIsRUFBdUJOLFNBQVNPLEtBQVQsRUFBdkI7QUFDQSxTQUFPUCxRQUFQO0FBQ0QsQ0FKSCxFQUtHRSxLQUxILENBS1NNLFNBQVMsQ0FBRSw0QkFBOEIsQ0FMbEQsQ0FESjs7QUFRQSxNQUFNQyx3QkFBd0JmLEtBQzVCUixPQUFPVyxLQUFQLENBQWFILEVBQUVDLE9BQWYsRUFDR1AsSUFESCxDQUNRWSxZQUFZO0FBQ2hCVSxhQUFXLE1BQU1QLGtCQUFrQlQsRUFBRUMsT0FBcEIsQ0FBakIsRUFBK0MsQ0FBL0M7QUFDQSxTQUFPSyxRQUFQO0FBQ0QsQ0FKSCxDQURGOztBQU9BOzs7O0FBSUFXLEtBQUtDLGdCQUFMLENBQXNCLFNBQXRCLEVBQWtDbEIsQ0FBRCxJQUFPO0FBQ3RDQSxJQUFFbUIsU0FBRixDQUFZOUIsdUJBQVo7QUFDRCxDQUZEOztBQUlBOzs7O0FBSUE0QixLQUFLQyxnQkFBTCxDQUFzQixPQUF0QixFQUFnQ2xCLENBQUQsSUFBTztBQUNwQyxNQUFJQSxFQUFFQyxPQUFGLENBQVVXLEdBQVYsS0FBa0J4QixNQUF0QixFQUE4QjtBQUM1QlksTUFBRW9CLFdBQUYsQ0FBY0wsc0JBQXNCZixDQUF0QixDQUFkO0FBQ0QsR0FGRCxNQUVPO0FBQ0xBLE1BQUVvQixXQUFGLENBQWNmLGVBQWVMLENBQWYsQ0FBZDtBQUNEO0FBQ0YsQ0FORCxFIiwiZmlsZSI6InN3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRiZDNjNjg5NTliODVhOWMzNDRhIiwiLyogTGVzIG1laXIgb20gU2VydmljZSBXb3JrZXIgQVBJZXQgcMOlIE1vemlsbGEgc2luZSBzaWRlcjpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TZXJ2aWNlX1dvcmtlcl9BUElcbiAqL1xuXG4vKiBOw7hrbGFyIHNvbSB2aWwgYmxpIGJydWt0IGkgQ2FjaGUgU3RvcmFnZVxuICogTGVzIG1laXIgb20gQ2FjaGUgQVBJZXQgaGVyOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FjaGVcbiAqL1xuXG5jb25zdCBGSUxFX0NBQ0hFID0gJ2FwcC1zaGVsbC12MSc7XG5jb25zdCBEQVRBX0NBQ0hFID0gJ2VtcGxveWVlcy12MSc7XG5cbmNvbnN0IGFwcFNoZWxsRmlsZXMgPSBbXG4gICcvJyxcbiAgJy9pbmRleC5odG1sJyxcbiAgJy9vZmZsaW5lLmh0bWwnLFxuICAnL21hbmlmZXN0Lmpzb24nLFxuICAnL2FwcC5qcycsXG4gICcvaWNvbnMvc29uYXRfMjAweDIwMC5wbmcnLFxuICAnL2ljb25zL3NvbmF0XzQwMHg0MDAuanBnJyxcbiAgJy9pY29ucy9zb25hdF8zMngzMi5wbmcnLFxuICAnL3N0eWxlLmNzcydcbl07XG5cbmNvbnN0IGFwaVVybCA9ICdodHRwczovL3NvbmF0LWZhZ2RhZy1wd2EuZmlyZWJhc2Vpby5jb20vZW1wbG95ZWVzLmpzb24nO1xuXG5jb25zdCBjYWNoZU9mZmxpbmVSZXNvdXJjZXMgPSAoKSA9PlxuICBQcm9taXNlLmFsbChbY2FjaGVzLm9wZW4oRklMRV9DQUNIRSksIGNhY2hlcy5vcGVuKERBVEFfQ0FDSEUpXSlcbiAgICAudGhlbigoW2ZpbGVDYWNoZSwgZGF0YUNhY2hlXSkgPT4ge1xuICAgICAgZmlsZUNhY2hlLmFkZEFsbChhcHBTaGVsbEZpbGVzKTtcbiAgICAgIGRhdGFDYWNoZS5hZGQoYXBpVXJsKTtcbiAgICB9KTtcblxuY29uc3QgaGFuZGxlT2ZmbGluZSA9IGUgPT4gKCkgPT4ge1xuICBpZiAoZS5yZXF1ZXN0Lm1vZGUgPT09ICduYXZpZ2F0ZScpXG4gICAgcmV0dXJuIGNhY2hlcy5tYXRjaCgnb2ZmbGluZS5odG1sJywgeyBpZ25vcmVTZWFyY2g6IHRydWUgfSlcbn07XG5cbmNvbnN0IGdldENhY2hlZEZpbGVzID0gZSA9PlxuICBjYWNoZXMubWF0Y2goZS5yZXF1ZXN0KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlIHx8IGZldGNoKGUucmVxdWVzdCkpXG4gICAgLmNhdGNoKGhhbmRsZU9mZmxpbmUoZSkpXG5cbmNvbnN0IGZldGNoRW1wbG95ZWVEYXRhID0gcmVxdWVzdCA9PlxuICAgIFByb21pc2UuYWxsKFtjYWNoZXMub3BlbihEQVRBX0NBQ0hFKSwgZmV0Y2gocmVxdWVzdCldKVxuICAgICAgLnRoZW4oKFtjYWNoZSwgcmVzcG9uc2VdKSA9PiB7XG4gICAgICAgIGNhY2hlLnB1dChyZXF1ZXN0LnVybCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4geyAvKiBObyBpbnRlcm5ldCBjb25uZWN0aW9uICovIH0pO1xuXG5jb25zdCBjYWNoZUZpcnN0VGhlbk5ldHdvcmsgPSBlID0+XG4gIGNhY2hlcy5tYXRjaChlLnJlcXVlc3QpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBmZXRjaEVtcGxveWVlRGF0YShlLnJlcXVlc3QpLCAwKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcblxuLyogTHl0dCBww6UgaW5zdGFsbCBldmVudFxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0luc3RhbGxFdmVudFxuICovXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIChlKSA9PiB7XG4gIGUud2FpdFVudGlsKGNhY2hlT2ZmbGluZVJlc291cmNlcygpKTtcbn0pO1xuXG4vKiBMeXR0IHDDpSBmZXRjaCBldmVudFxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZldGNoRXZlbnRcbiAqL1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgKGUpID0+IHtcbiAgaWYgKGUucmVxdWVzdC51cmwgPT09IGFwaVVybCkge1xuICAgIGUucmVzcG9uZFdpdGgoY2FjaGVGaXJzdFRoZW5OZXR3b3JrKGUpKTtcbiAgfSBlbHNlIHtcbiAgICBlLnJlc3BvbmRXaXRoKGdldENhY2hlZEZpbGVzKGUpKTtcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3cuanMiXSwic291cmNlUm9vdCI6IiJ9
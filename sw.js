const CACHE_NAME = 'meuw-academy-v1';

// Cần cache các file tĩnh quan trọng để app chạy được offline
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/base.css',
  '/css/animations.css',
  '/css/components.css',
  '/css/mascot.css',
  '/css/question-types.css',
  '/css/responsive.css',
  '/js/app.js',
  '/js/router.js',
  '/js/state.js',
  '/js/mascot.js',
  '/js/audio.js',
  '/js/schedule-calendar.js',
  '/js/utils.js',
  // Lưu ý: Các file assets cụ thể sẽ được cache dynamically khi trình duyệt fetch
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Chỉ xử lý GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Nếu không có trong cache, fetch từ mạng và lưu vào cache
      return fetch(event.request).then((response) => {
        // Đảm bảo response hợp lệ trước khi cache
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Fallback offline page nếu cần (ở đây trả về index.html cho SPA)
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

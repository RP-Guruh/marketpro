var CACHE_NAME = 'cache';
var urlsToCache = [
  '/',
  'index.html'
];

// install service worker
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


/*
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll([
      '/',
      '/index.html',
      '/css/styleIndex.css',
      '/js/main.js',
      'https://fonts.googleapis.com/css?family=Alfa+Slab+One&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'
     ]);
   })
 );
});

*/

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// aktivasi service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName != CACHE_NAME
        }).map(function(cacheName) {
            return caches.delete(cacheName)
          })
       );
     })
   );
});
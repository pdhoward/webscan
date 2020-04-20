const CACHE_NAME = 'v1_cache_PWA_QR_NFC',
  urlsToCache = [
    './',
    'script.js',
    'sqr/build.js',
    './img/favicon.png',
    'sqr/js/adapter.js',
    'sqr/data/zbar.wasm',
    'sqr/js/camera-test.js',
    'assets/puritym/css/style.css',
    'assets/dropdown-menu/style.light.css',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"'
  ]

/* During the installation phase, static assets are usually cached. */

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

/* Once the Service Worker (SW) is installed, it is activated and searches 
** for resources to make it work offline. 
*/

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // What is no longer needed in cache is deleted. 
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // The SW is instructed to activate the current cache 
      .then(() => self.clients.claim())
  )
})

/* When the browser retrieves a url */

self.addEventListener('fetch', e => {
  // Retrieve either with the object in cache or continue and search for the real url 
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          // Retrive in cache 
          return res
        } 
        // Retrieve with the original url
        return fetch(e.request)
      })
  )
})
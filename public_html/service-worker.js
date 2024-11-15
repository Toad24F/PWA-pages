const CACHE_NAME = 'pwa-example-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    'app.js',
    '/icon.png'
];

self.addEventListener('install', event => {
    console.log('Service Worker instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache).catch(err => {
                console.error('Error al añadir archivos al caché:', err);
            });
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activado.');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

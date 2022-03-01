// importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('http://127.0.0.1:5505').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/style.css',
       '/script.js',
       '/chart.js',
       
     ]);
   })
 );
});
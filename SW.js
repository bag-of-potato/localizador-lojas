const version = 'loc-v1.0';
const cacheFiles = ['./index.html', './lojas.json', './manifest.json'];
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(version).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener('fetch', function(event){
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                return response;
            })
            .catch(function() {
                return caches.match(event.request);

            })
    );
});
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(nome){
                    if(nome !== version){
                        return caches.delete(nome);
                    }
                })
            );
        })
    );
});
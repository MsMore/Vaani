self.addEventListener("install", e => {
    
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./src/master.css","./images/logo.PNG", "./.well-known/assetlinks.json", "./test.js"])
        })
    )

});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});

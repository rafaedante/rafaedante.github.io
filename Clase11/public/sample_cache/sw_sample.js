// self

// Proceso
// fetch: se ejecuta al interceptar una peticion saliente
self.addEventListener('fetch', async function(e) {       
        ///const r = await fetch(e.request)
        ///console.log(e.request.url)   
        
        const respuesta = caches.match(e.request).then(
            res => {
                if(res) {
                    // TENGO UNA RESPUESTA DE LA CACHE
                    return res
                } else {
                    // NO TENGO UNA RESPUESTA DE LA CACHE
                }
            }
        )

        e.respondWith(respuesta)
})


//Preparacion
// install: se ejecuta una vez al principio
self.addEventListener('install', e => {
    // COPIADO DE ARCHIVOS A LA CACHE
    const miCache = caches.open('CACHE_SUPERLISTA').then(
        cache => cache.add('/index.html')
    )
    
    e.waitUntil()

})


//activate: se ejecuta al haber un cambio en este archivo
self.addEventListener('activate', e => {
    // ACTUALIZACION DE LOS ARCHIVOS DE LA CACHE
})

const NOMBRE_CACHE = 'SUPERLISTA_CACHE'
const ARCHIVOS_A_CACHEAR = []

const SUPERLISTA_CACHES = {
    inmutable: {
        nombre: 'SUPERLISTA_CACHE_INMUTABLE_V2',
        archivos:[
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items',
            'https://fonts.gstatic.com/s/materialicons/v121/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
        ]
    },
    estatica: {
        nombre: 'SUPERLISTA_CACHE_ESTATICA',
        archivos:[
            '/',
            '/sw.js',
            '/index.html', 
            '/css/estilos.css',
            '/js/rest.js',
            '/js/main.js',
            '/js/workers.js', 
            '/workers/busqueda.worker.js', 
            '/manifest.json',
            '/img/icon192.png'
        ]
    },
    dinamica: {
        nombre: 'SUPERLISTA_CACHE_DINAMICA'        
    }
}


// Proceso
// fetch: se ejecuta al interceptar una peticion saliente
self.addEventListener('fetch', async function(e) {       
        const respuesta = caches.match(e.request).then(res => {
            if(res) {
                return res
            } else {
                return fetch(e.request).then(online_res => {
                    //agrego el archivo a la cache dinamia
                    caches.open(SUPERLISTA_CACHES.dinamica.nombre).then(cache => {
                        cache.put(e.request, online_res)
                    })

                    // retorno la respuesta
                    return online_res.clone()
                })
            }
        })

        e.respondWith(respuesta)

})


//Preparacion
// install: se ejecuta una vez al principio
self.addEventListener('install', e => {
    // COPIADO DE ARCHIVOS A LA CACHE
    /*const promesaCache = caches.open(NOMBRE_CACHE).then(
        cache => cache.addAll(ARCHIVOS_A_CACHEAR)
    )
    e.waitUntil(promesaCache)
    */

    const promesaCacheInm = caches.open(SUPERLISTA_CACHES.inmutable.nombre).then(
        cache => cache.addAll(SUPERLISTA_CACHES.inmutable.archivos))

    const promesaCacheEst = caches.open(SUPERLISTA_CACHES.estatica.nombre).then(
            cache => cache.addAll(SUPERLISTA_CACHES.estatica.archivos))

    e.waitUntil(Promise.all([promesaCacheInm, promesaCacheEst]))

})


//activate: se ejecuta al haber un cambio en este archivo
self.addEventListener('activate', e => {
    // ACTUALIZACION DE LOS ARCHIVOS DE LA CACHE
    const listaBlanca = [
        SUPERLISTA_CACHES.dinamica.nombre,
        SUPERLISTA_CACHES.estatica.nombre,
        SUPERLISTA_CACHES.inmutable.nombre
    ]

    const limpieza = caches.keys().then(nombreCache => {
        return Promise.all(
            nombreCache.map(nombre => {
                if(listaBlanca.indexOf(nombre) === -1) {
                    return caches.delete(nombre)
                }
            })
        )
    })

    e.waitUntil(limpieza)
})






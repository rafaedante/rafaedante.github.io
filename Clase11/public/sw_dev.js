
// Proceso
// fetch: se ejecuta al interceptar una peticion saliente
self.addEventListener('fetch', async function(e) {       
        

})


//Preparacion
// install: se ejecuta una vez al principio
self.addEventListener('install', e => {
    

})


//activate: se ejecuta al haber un cambio en este archivo
self.addEventListener('activate', e => {
    // ACTUALIZACION DE LOS ARCHIVOS DE LA CACHE
    
})

self.addEventListener('push', e => {
    console.log('NOTIFICACION PUSH RECIBIDA: ', e.data.json())

    // Mostrar la notificacion
    self.registration.showNotification(e.data.title, e.data.options)
})




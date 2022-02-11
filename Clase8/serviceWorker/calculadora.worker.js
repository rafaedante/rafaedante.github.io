//Recibo un mensaje
self.addEventListener('message', e => {
    //console.log(e)
    const {numero1, numero2} = e.data
    /* equivalente
    const numero1 = e.data.numero1
    const numero2 = e.data.numero2 
    */

    const suma = numero1 + numero2

    // Envio un mensaje
    self.postMessage(suma)
})
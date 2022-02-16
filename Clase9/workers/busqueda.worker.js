self.addEventListener('message', e => {
    const {datos, filtro} = e.data

    const respuesta = datos.filter(val => val.titulo.includes(filtro))

    self.postMessage(respuesta)
})
//Objetos
const RESTClient = function(endpoint) {
    function crearPeticion(url, metodo = 'GET', cuerpo = '') {
        return async function(completado) {
            let res

            if(metodo == 'GET')
                res = await fetch(url)
            else
                res = await fetch(url, {method: metodo, body: cuerpo})
            
            let data = await res.json()

            completado(data)
        }
    }    

    return {        
        get: crearPeticion(endpoint),
        post: (cuerpo, callback) => crearPeticion(endpoint, 'POST', cuerpo)(callback),
        put: (id, cuerpo, callback) => crearPeticion(endpoint + '/' + id, 'PUT', cuerpo)(callback),
        delete: (id, callback) => crearPeticion(endpoint + '/' + id, 'DELETE')(callback)
    }

}
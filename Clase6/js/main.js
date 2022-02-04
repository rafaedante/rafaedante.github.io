
let datos = [
    {titulo: 'Carne', cantidad: 12, precio: 2500},
    {titulo: 'Jabon', cantidad: 15, precio: 2000}
]

let datosPrevios = []

const rest = RESTClient('https://5cfdb2b8ca949b00148d38ba.mockapi.io/items')

const btnAgregar = document.querySelector('#btnAgregar')
const inpBusqueda = document.querySelector('#inpBusqueda')
const btnDeshacer = document.querySelector('#btnDeshacer')
const inpAgregar = document.querySelector('#inpAgregar')
const galeria = document.querySelector('#galeria')
const lnkLimpiarLista = document.querySelector('#lnkLimpiarLista')


//Funciones

const template = ({titulo, cantidad, precio}) => `<div class="item">
    <div class="titulo">
        ${titulo}
    </div>
    <div class="controles">
    <span> ${cantidad}</span>
    <span> ${precio}</span>
    </div>
    <div class="borrar">
    <a href="#" class="borrar">Eliminar</a>
    </div>
    </div>`

function render(lista = [{titulo: '', cantidad: 0, precio: 0}]) {

    galeria.innerHTML = ''
    lista.forEach(item => {
        galeria.innerHTML += template(item)
    })

}

/*  FORMA 1

async function loadAPI(completado) {
    const endpoint = 'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items'

    const res = await fetch(endpoint)
    const json = await res.json()

    datos = json

    completado(datos)

}

*/

//Eventos

// Al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
   /* 1era FORMA
     loadAPI(function() {
        render(datos)
    })   */  

    /* 2da FORMA
    rest.getAll(function(json) {
        datos = json
        render(json)
    }) */

    /* 3era FORMA
    rest.get(function(json) {
        datos = json
        render(json)
    }) */

    //4ta FORMA
    rest.get(function(json) {
        datos = json
        render(json)
    }) 
})

// Al hacer click en el boton Agregar Item
btnAgregar.addEventListener('click', () => {
    datosPrevios = datos.slice(0)
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 10
    }) 
    
    rest.post(JSON.stringify({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 10
    }), function(p) {
        console.log(p)
    })

   render(datos)
   inpAgregar.value = ''
})




// Al hacer click en el boton Deshacer
btnDeshacer.addEventListener('click', () => {
    datos = datosPrevios
    render(datos)
})


// Al ingresar datos en el campo de busqueda
inpBusqueda.addEventListener('input', e => {
    let vista = datos.filter(val => val.titulo.includes(e.target.value))
    render(vista)
})


// Al hacer click en limpiar lista
lnkLimpiarLista.addEventListener("click", () => {
    datosPrevios = datos.slice(0)
    datos = []
    render(datos)
})

// Al hacer click en guardar lista
// Al hacer click en cargar lista
// Al hacer click en un item con la clase borrar

//Objetos

/*

const rest = (function(){

    ---FORMA 2

     async function loadAPI(completado) {
        const endpoint = 'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items'
    
        const res = await fetch(endpoint)
        const json = await res.json()
    
        completado(json)
    
    } 

    --- FORMA 3

    // REFACTOR PARA MANEJAR TODOS LOS METODOS HTTP (GET-POST-PUT-DELETE)
    const endpoint = 'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items'

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
        //getAll: loadAPI
        get: crearPeticion(endpoint),
        post: (cuerpo, callback) => crearPeticion(endpoint, 'POST', cuerpo)(callback),
        put: (id, cuerpo, callback) => crearPeticion(endpoint + '/' + id, 'PUT', cuerpo)(callback),
        delete: (id, callback) => crearPeticion(endpoint + '/' + id, 'DELETE')(callback)
    }

})()

*/





let datos = [
    {titulo: 'Carne', cantidad: 12, precio: 2500},
    {titulo: 'Jabon', cantidad: 15, precio: 2000}
]

let datosPrevios = []

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

//Eventos

// Al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    render(datos)
})

// Al hacer click en el boton Agregar Item
btnAgregar.addEventListener('click', () => {
    datosPrevios = datos.slice(0)
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 10
    })
   // alert("item agregado")
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
    /* let vista = datos.filter((val) => {
        if(val.titulo.includes(e.target.value)) {
            return true
        } else {
            return false
        }
    }) */

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





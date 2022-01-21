
let datos = [
    {titulo: 'Carne', cantidad: 12, precio: 2500},
    {titulo: 'Jabon', cantidad: 15, precio: 2000}
]

let vista = []
let datosPrevios = []

const btnAgregar = document.querySelector('#btnAgregar')
const inpBusqueda = document.querySelector('#inpBusqueda')
const btnDeshacer = document.querySelector('#btnDeshacer')
const inpAgregar = document.querySelector('#inpAgregar')



//Funciones


//Eventos

// Al hacer click en el boton Agregar Item
btnAgregar.addEventListener('click', () => {
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 10
    })
})




// Al hacer click en el boton Deshacer
// Al ingresar datos en el campo de busqueda
// Al hacer click en limpiar lista
// Al hacer click en guardar lista
// Al hacer click en cargar lista
// Al hacer click en un item con la clase borrar

//Objetos





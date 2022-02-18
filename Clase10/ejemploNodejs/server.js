/* var a = 5
var b = 10
var c = a + b
console.log(c) */


const PORT = 8081
const NUM_SRV = 10

for(let i=1; i< NUM_SRV; i++) {
    require('http').createServer((req, res) => res.end(`Servidor en ${PORT+i}`)).listen(PORT+i, () => console.log(`SRV listen ${PORT+i}`))
}

const http = require('http')
const fs = require('fs')

let contadorVisitas = 0
const server = http.createServer((req, res) => {
    //console.log(req)
    let url = req.url
    let metodo = req.method
    console.log(url, metodo)

    if(url == '/') {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(`<h2 style="color:magenta">Hola node,js server: <span style="color:blue;"> ${PORT}</span></h2>`)
        res.write(`<h3 style="color:green">Contador de Visitas: ${++contadorVisitas}</h3>`)
        res.end(`<p style="color:white; background-color: black;">FyH: ${new Date().toLocaleString()}</p>`)
    } else if(url == '/pages') {
        let webpage = fs.readFileSync('index.html', 'utf-8')
        res.writeHead(200, {'content-type': 'text/html'})
        res.end(webpage)
    }
    else {
        res.writeHead(404, {'content-type': 'text/html'})        
        res.end(`<h2 style="color:red;">Ruta <span style= color:orange;>${url} </span> no implementada</h2>`)
    }
})


server.listen(PORT, err => {
    if(err) return console.log(`Error en el servidor ${err}`)
    console.log(`Servidor node.js escuchando en el puerto ${PORT}`)
})
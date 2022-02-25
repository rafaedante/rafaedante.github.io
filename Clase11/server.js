const express = require('express')
const webPush = require('web-push')
const path = require('path')

const app = express()

const PUBLIC_VAPID_KEY = "BLGheUUBlmtQ3T-kouteemTjgczceyjw8Z7TroN2SR4UUCG6FcjTQ_Bu5UOGVmxyEp62hyuJ8GZOicCDGM59_tc"

const PRIVATE_VAPID_KEY = "g7TVTr-JfUDPu9Bvk6iwkamYGPTAwdV4eMI0cB82a8Y"

webPush.setVapidDetails(
    'mailto: info@educacionit.com',
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
)

// Middlewares
//app.use('/public', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//Rutas

/* app.get('/', function(req, res) {
    res.send('Hola mundo')
}) */

app.post('/subscribir', function(req, res){
    webPush.sendNotification(
        req.body,
        JSON.stringify({
            title: 'Un mensaje desde la web',
            options: {
                body : 'Este es un mensaje proveniente desde el servidor push '
            }
        })
    )

    res.status(200)
    res.send({})
})

app.listen(3000, () => console.log('Servidor ejecutandose en http://localhost:3000'))
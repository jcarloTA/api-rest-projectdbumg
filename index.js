const express = require("express");

const bodyParser = require('body-parser');

const usersRoute = require('./api/resources/users/users.route');
const productosRoute = require('./api/resources/productos/productos.route');
const comprasRoute = require('./api/resources/compras/compras.route');
const encuestasRoute = require('./api/resources/encuestas/encuestas.route');

const app = express();
app.use(bodyParser.json())

app.get('/', (req, res)  => {
    res.send('Api funcionando')
})

app.use('/api/users', usersRoute)
app.use('/api/productos', productosRoute)
app.use('/api/compras', comprasRoute)
app.use('/api/encuestas', encuestasRoute)

app.listen(3000, () => {
    console.log('Esuchando en el puerto 3000')
})

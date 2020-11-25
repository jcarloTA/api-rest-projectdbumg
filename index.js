const express = require("express");

const bodyParser = require('body-parser');

const usersRoute = require('./api/resources/users/users.route');

const app = express();
app.use(bodyParser.json())

app.get('/', (req, res)  => {
    res.send('Api funcionando')
})

app.use('/api/users', usersRoute)

app.listen(3000, () => {
    console.log('Esuchando en el puerto 3000')
})

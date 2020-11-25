const express = require('express')

productosModel = require('./productos.model');

productosRoute = express.Router();


productosRoute.get('/', async(req, res) => {
    try {
        console.log('body', req.params);
        const response = await productosModel.obtenerProductos();
        if(response) {
            res.status(200).json({success:true, productos: response});
        } else {
            res.status(200).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})


module.exports = productosRoute

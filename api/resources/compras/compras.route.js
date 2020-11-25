const express = require('express')

comprasModel = require('./compras.model');

comprasRoute = express.Router();

comprasRoute.post('/por_cliente', async (req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.id_usuario || !req.body.productos || req.body.productos.length == 0) {
            res.status(400).send('Los campos id_usuario y podructos es necesario');
            return;
        }
        const response = await comprasModel.crearCompraPorCliente(req.body);
        if(response) {
            res.status(200).json({success:true});
        } else {
            res.status(500).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

comprasRoute.post('/por_vendedor', async (req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.id_vendedor || !req.body.productos || req.body.productos.length == 0) {
            res.status(400).send('Los campos id_vendedor y podructos es necesario');
            return;
        }
        const response = await comprasModel.crearCompraPorCliente(req.body);
        if(response) {
            res.status(200).json({success:true});
        } else {
            res.status(500).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

comprasRoute.post('/update_status', async (req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.id_status || !req.body.id_compra) {
            res.status(400).send('Los campos id_status y id_compra es oblilgatorio');
            return;
        }
        const response = await comprasModel.actualizarEstadoCompra(req.body);
        if(response) {
            res.status(200).json({success:true});
        } else {
            res.status(500).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

comprasRoute.post('/update_status', async (req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.id_status || !req.body.id_compra) {
            res.status(400).send('Los campos id_status y id_compra es oblilgatorio');
            return;
        }
        const response = await comprasModel.actualizarEstadoCompra(req.body);
        if(response) {
            res.status(200).json({success:true});
        } else {
            res.status(500).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

comprasRoute.post('/crear_pago', async (req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.id_compra || !req.body.monto, !req.body.id_tipo_pago) {
            res.status(400).send('Los campos id_compra, id_tipo_pago y monto es oblilgatorio');
            return;
        }
        const response = await comprasModel.crearPago(req.body);
        if(response) {
            res.status(200).json({success:true});
        } else {
            res.status(500).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

comprasRoute.get('/tipos', async(req, res) => {
    try {
        console.log('body', req.params);
        const response = await comprasModel.obtenerTipoDeCompras();
        if(response) {
            res.status(200).json({success:true, tipos: response});
        } else {
            res.status(200).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})



comprasRoute.get('/tipos_pagos', async(req, res) => {
    try {
        console.log('body', req.params);
        const response = await comprasModel.obtenerTiposDePagos();
        if(response) {
            res.status(200).json({success:true, tipos: response});
        } else {
            res.status(200).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})



module.exports = comprasRoute

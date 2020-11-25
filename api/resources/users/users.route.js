const express = require('express')

userModel = require('./users.model');

usersRoute = express.Router();


usersRoute.get('/', async(req, res) => {
    try {
        const users = await userModel.getUsers();
        res.json({users:users});
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al obtener todos los usuarios');
    }
})

usersRoute.post('/rol', async(req, res) => {
    try {
        console.log('body', req.body);
        const response = await userModel.createRol(req.body);
        console.log("response",response);
        if(response) {
            res.status(200).json({success: true})
        } else {
            res.status(200).json({success: false})
        }
    } catch (err) {
        res.status(500).json({err})
    }
})

usersRoute.post('/client', async(req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.nombre || !req.body.email || !req.body.password) {
            res.status(400).send('Los campos nombre, email y password son obligatorios');
            return;
        }
        const response = await userModel.createClient(req.body);
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

usersRoute.post('/login', async(req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.email || !req.body.password) {
            res.status(400).send('Los campos email y password son obligatorios');
            return;
        }
        const response = await userModel.loginUser(req.body);
        if(response) {
            res.status(200).json({success:true, user: response});
        } else {
            res.status(200).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

usersRoute.get('/direccion/:id_usuario', async(req, res) => {
    try {
        console.log('body', req.params);
        if(!req.params.id_usuario) {
            res.status(400).send('el campo id_usaurio es obligatorio');
            return;
        }
        const response = await userModel.obtenerDireccion(req.params.id_usuario);
        if(response) {
            res.status(200).json({success:true, direcciones: response});
        } else {
            res.status(200).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})

usersRoute.post('/direccion', async(req, res) => {
    try {
        console.log('body', req.body);
        if(!req.body.nombre || !req.body.descripcion || !req.body.id_usuario) {
            res.status(400).send('Los campos nombre, descripcion y id_user son obligatorios');
            return;
        }
        const response = await userModel.crearDireccion(req.body);
        if(response) {
            res.status(200).json({success:true, user: response});
        } else {
            res.status(200).json({success:false});
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Error al crear usuario');
    }
})





module.exports = usersRoute

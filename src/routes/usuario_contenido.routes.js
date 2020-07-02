const express = require('express');
const router =  express.Router();

const UsuarioContenido = require('../models/usuarioContenido');

const Usuario = require('../models/usuario');

router.post('/',  async (req, res) =>{
    await UsuarioContenido.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.put('/:id', async (req, res) => {
    await UsuarioContenido.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/:id', async (req, res) => {
    await UsuarioContenido.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

router.get('/', async (req, res) =>{
    const UsuarioContenidos = await UsuarioContenido.find();
    res.json(UsuarioContenidos);
});

module.exports = router;
const express = require('express');
const router =  express.Router();

const Usuario = require('../models/usuario');

router.post('/',  async (req, res) =>{
    await Usuario.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.put('/:id', async (req, res) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

module.exports = router;
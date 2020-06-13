const express = require('express');
const router =  express.Router();

const Categoria = require('../models/categoria')

router.post('/',  async (req, res) =>{
    await Categoria.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/', async (req, res) =>{
    const categorias = await Categoria.find();
    res.json(categorias);
});

router.put('/:id', async (req, res) => {
    await Categoria.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/:id', async (req, res) => {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

module.exports = router;
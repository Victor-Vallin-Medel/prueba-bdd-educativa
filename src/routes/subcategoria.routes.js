const express = require('express');
const router =  express.Router();

const SubCategoria = require('../models/subCategoria');

router.post('/',  async (req, res) =>{
    await SubCategoria.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/', async (req, res) =>{
    const subCategorias = await SubCategoria.find();
    res.json(subCategorias);
});

router.put('/:id', async (req, res) => {
    await SubCategoria.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/:id', async (req, res) => {
    await SubCategoria.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

module.exports = router;
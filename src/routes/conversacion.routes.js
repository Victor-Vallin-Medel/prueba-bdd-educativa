const express = require('express');
const router =  express.Router();

const Conversacion = require('../models/conversacion');

router.post('/',  async (req, res) =>{
    await Conversacion.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/', async (req, res) =>{
    const conversaciones = await Conversacion.find();
    res.json(conversaciones);
});

router.put('/:id', async (req, res) => {
    await Conversacion.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/:id', async (req, res) => {
    await Conversacion.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

module.exports = router;
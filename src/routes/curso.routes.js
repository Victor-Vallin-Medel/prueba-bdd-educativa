const express = require('express');
const router =  express.Router();

const Curso = require('../models/curso');

router.post('/',  async (req, res) =>{
    await Curso.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/', async (req, res) =>{
    const cursos = await Curso.find();
    res.json(cursos);
});

router.put('/:id', async (req, res) => {
    await Curso.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/:id', async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

module.exports = router;
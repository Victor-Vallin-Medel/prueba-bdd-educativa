const express = require('express');
const router =  express.Router();

const Curso = require('../models/curso');

const Usuario = require('../models/usuario');

router.post('/',  async (req, res) =>{
    await Curso.insertMany([req.body.curso]);
    res.json({
        status: "200"
    })
});

router.get('/', async (req, res) =>{
    const cursos = await Curso.find();
    res.json(cursos);
});

router.delete('/:id', async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

//Inscripcion a curso
router.put('/inscripcionCurso', async (req, res) => {
    let body = req.body;
    const user = body.user;
    const newCourses = user.cursos.concat({ idCurso: body.idCurso, finalizado: false });
    await Usuario.findByIdAndUpdate(user._id, {$set:{cursos: newCourses}}, {new: true}, (erro, doc) => {
        if(erro){
            res.status(500).json({ ok: false, err: erro});
        } else {
            res.status(200).json({ ok: true })};
        });
});

module.exports = router;
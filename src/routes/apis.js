const express = require('express');
const router =  express.Router();

const Categoria = require('../models/categoria')
const SubCategoria = require('../models/subCategoria');
const Curso = require('../models/curso');
const Usuario = require('../models/usuario');
const UsuarioContenido = require('../models/usuarioContenido');
const Conversacion = require('../models/conversacion');

//******Subcategorias Services *********// */
router.post('/subCategoria',  async (req, res) =>{
    await SubCategoria.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/subCategoria', async (req, res) =>{
    const subCategorias = await SubCategoria.find();
    res.json(subCategorias);
});

router.put('/subCategoria/:id', async (req, res) => {
    await SubCategoria.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/subCategoria/:id', async (req, res) => {
    await SubCategoria.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});


//******Categorias Services *********// */

router.post('/Categoria',  async (req, res) =>{
    await Categoria.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/Categoria', async (req, res) =>{
    const categorias = await Categoria.find();
    res.json(categorias);
});

router.put('/Categoria/:id', async (req, res) => {
    await Categoria.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/Categoria/:id', async (req, res) => {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

//******Cursos Services *********// */

router.post('/Curso',  async (req, res) =>{
    await Curso.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/Curso', async (req, res) =>{
    const cursos = await Curso.find();
    res.json(cursos);
});

router.put('/Curso/:id', async (req, res) => {
    await Curso.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/Curso/:id', async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

//******Usuarios Services *********// */

router.post('/Usuario',  async (req, res) =>{
    await Usuario.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/Usuario', async (req, res) =>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.put('/Usuario/:id', async (req, res) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/Usuario/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});


//******Usuario-Contenido Services *********// */

router.post('/UsuarioContenido',  async (req, res) =>{
    await UsuarioContenido.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/UsuarioContenido', async (req, res) =>{
    const usuarioContenidos = await UsuarioContenido.find();
    res.json(usuarioContenidos);
});

router.put('/UsuarioContenido/:id', async (req, res) => {
    await UsuarioContenido.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/UsuarioContenido/:id', async (req, res) => {
    await UsuarioContenido.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

//******Conversacions Services *********// */

router.post('/Conversacion',  async (req, res) =>{
    await Conversacion.insertMany([req.body]);
    res.json({
        status: "200"
    })
});

router.get('/Conversacion', async (req, res) =>{
    const conversaciones = await Conversacion.find();
    res.json(conversaciones);
});

router.put('/Conversacion/:id', async (req, res) => {
    await Conversacion.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "200"
    });
});

router.delete('/Conversacion/:id', async (req, res) => {
    await Conversacion.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});






module.exports = router;
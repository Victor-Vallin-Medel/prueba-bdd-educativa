const express = require('express');
const bcrypt = require('bcryptjs');
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

// Update passwd
router.post('/passwd/:id', async (req, res) => {
    const passwd = bcrypt.hashSync(req.body.passwd, 7);
    await Usuario.findByIdAndUpdate(req.params.id, { passwd: passwd }, (erro, user) => {
        if (erro) res.status(500).json({ ok: false, err: erro });

        if (!user) res.status(400).json({ ok: false, err: "Usuario no encontrado" });

        res.json({ ok: true });
    })
});

// Update info user
router.patch('/:id', async (req, res) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }, (erro, user) => {
        if (erro) res.status(500).json({ ok: false, err: erro });

        if (!user) res.status(400).json({ ok: false, err: "Usuario no encontrado" });

        res.json({ ok: true, usuario: user });
    });
});

router.delete('/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({
        status: "200"
    });
});

module.exports = router;
const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

// Login
router.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, ( erro, user) => {
        // Error
        if (erro) return res.status(500).json({ ok: false, err: erro });
        
        // Usuario inexistente
        if (!user) return res.status(400).json({ ok: false, err: "Usuario o contraseña incorrectos" });
        
        // Constraseña incorrecta
        if (!bcrypt.compareSync(body.passwd, user.passwd)) return res.status(400).json({ ok: false, err: "Usuario o contraseña incorrectos" });
        
        // Eliminación de propiedad cursos. No se toma en cuenta para la firma del jwt.
        delete user.cursos;
        // Creación de jwt con objeto usuario, llave secreta y tiempo de caducidad.
        let token = jwt.sign({ usuario: user }, process.env.PRIVATE_KEY, { expiresIn: process.env.EXPIRATION });

        res.json({ ok: true, usuario: user, jwt: token});
    });
});

// Register
router.post('/register', (req, res) => {
    let body = req.body;

    // Objeto usuario.
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        passwd: bcrypt.hashSync(body.passwd, 7),
        rol: body.rol,
        perfil: {
            username: body.username
        }
    });
    
    // Se guarda el objeto
    usuario.save((err, user) => {
        // Error
        if (err) return res.status(500).json({ ok: false, err: err });
        
        // Success
        res.json({ ok: true, usuario: user });
    });
});

module.exports = router;
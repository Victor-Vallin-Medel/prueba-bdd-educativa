const express = require('express');
const { Schema } = require('mongoose');
const router =  express.Router();

const Conversacion = require('../models/conversacion');

router.post('/init/:id',  async (req, res) =>{
    const body = req.body;
    const transmitter = req.params.id;

    let message = new Conversacion({
        miembros: [ Schema.Types.ObjectId(transmitter), Schema.Types.ObjectId(body.receiver)],
        mensajes: [{
            IdAutor: Schema.Types.ObjectId(transmitter),
            cuerpo: body.msg,
            fechEnviado: new Date()
        }]
    });
    
    await message.save((erro, chat) => {
        // Error
        if (erro) return res.status(500).json({ ok: false, err: erro });
        
        // Success
        res.json({ ok: true, message: chat.mensajes.pop() });
    });
});

router.get('/', async (req, res) =>{
    const conversaciones = await Conversacion.find();
    res.json(conversaciones);
});

// router.get();

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
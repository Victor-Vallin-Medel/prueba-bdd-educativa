const express = require('express');
const { Schema } = require('mongoose');
const router =  express.Router();

const Conversacion = require('../models/conversacion');

// Create new chat
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

// Get user chats
router.get('/user/:id', async (req, res) =>{
    // User id to get chats
    const user = req.params.id;

    // Callback to manage errors
    let callback = (erro, chats) => {
        if (erro) res.status(500).json({ ok: false, err: erro });

        if (!chats) res.status(400).json({ ok: false, err: "Chats no encontrados" });
    };

    // Return chats with members docs (users), exclude messages
    await Conversacion.find({ miembros: { $in: [user] }}, "-mensajes", callback)
        .populate('miembros').exec((erro, chats) => {
            if (erro || !chats) callback(erro, chats);

            res.json({ ok: true, chats: chats });
    });
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
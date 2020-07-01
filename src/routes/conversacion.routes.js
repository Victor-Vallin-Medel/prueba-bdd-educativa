const express = require('express');
const mongoose = require('mongoose');
const router =  express.Router();

const Conversacion = require('../models/conversacion');

// Create new chat
router.post('/init/:id', (req, res) =>{
    const body = req.body;
    const transmitter = req.params.id;

    let message = new Conversacion({
        miembros: [ mongoose.Types.ObjectId(transmitter), mongoose.Types.ObjectId(body.receiver)],
        mensajes: [{
            IdAutor: mongoose.Types.ObjectId(transmitter),
            cuerpo: body.msg,
            fechaEnviado: Date.now()
        }]
    });

    // Callback to manage errors
    let callback = (erro, chat) => {
        if (erro) res.status(500).json({ ok: false, err: erro });

        if (!chat) res.status(400).json({ ok: false, err: "Chat no recuperado" });
    };
    
    message.save().then(chat => {
        chat.populate({ path: 'miembros', select: '_id nombre perfil.username', match: { _id: { $ne: transmitter }}})
            .execPopulate((erro, chat) => {
                if (erro || !chat) callback(erro, chat);

                res.json({ ok: true, chat: chat });
            });
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
        .populate({ path: 'miembros', select: '_id nombre perfil.username', match: { _id: { $ne: user }}})
        .exec((erro, chats) => {
            if (erro || !chats) callback(erro, chats);

            res.json({ ok: true, chats: chats });
    });
});

// Get chat messages
router.get('/messages/:id', async (req, res) => {
    await Conversacion.findById(req.params.id, "mensajes" , (erro, chat) => {
        if (erro) res.status(500).json({ ok: false, err: erro });

        if (!chat) res.status(400).json({ ok: false, err: "Mensajes no encontrados" });

        res.json({ ok: true, messages: chat.mensajes });
    })
});

// Send message in existing chat
router.put('/messages/:id', async (req, res) => {
    const body = req.body;
    let message = {
        IdAutor: mongoose.Types.ObjectId(body.autor),
        cuerpo: body.msg,
        fechaEnviado: Date.now()
    }

    await Conversacion.findByIdAndUpdate(req.params.id, { $push: { mensajes: message }}, { new: true})
        .exec((erro, chat) => {
            if (erro) res.status(500).json({ ok: false, err: erro });

            if (!chat) res.status(400).json({ ok: false, err: "Mensajes no enviado" });

            res.json({ ok: true, message: chat.mensajes.pop() });
    });
});

// Delete message
router.delete('/chat/:_cid/message/:_mid', async (req, res) => {
    const params = req.params;

    await Conversacion.findByIdAndUpdate(params._cid, { $pull: { mensajes: { _id: params._mid }}})
        .exec((erro, chat) => {
            if (erro) res.status(500).json({ ok: false, err: erro });

            if (!chat) res.status(400).json({ ok: false, err: "Mensajes no encontrados" });

            res.json({ ok: true, _mid: params._mid });
        });
});

module.exports = router;
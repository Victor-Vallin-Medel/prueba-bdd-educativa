const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioContenido = new Schema({
    idUsuario: String,
    idContenido: String,
    calificacion: Number,
});

module.exports = mongoose.model('UsuarioContenido', UsuarioContenido);
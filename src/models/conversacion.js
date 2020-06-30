const mongoose = require('mongoose');
const { Schema } = mongoose;

const Conversacion = new Schema({
    miembros: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    mensajes: 
    [
        {
        IdAutor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        cuerpo: String,
        fechaEnviado: Date,
        }
    ]
});

module.exports = mongoose.model('Conversacion', Conversacion);
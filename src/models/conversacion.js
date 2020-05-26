const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCateogria = new Schema({
    miembros: [String],
    mensajes: 
    [
        {
        IdAutor: String,
        cuerpo: String,
        fechaEnviado: Date,
        }
    ]
});

module.exports = mongoose.model('SubCateogria', SubCateogria);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Categoria = new Schema({
    nombre: String,
    subCategoria: [{ nombre: String, id: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('Categoria', Categoria);
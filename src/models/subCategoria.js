const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCategoria = new Schema({
    nombre: String,
});

module.exports = mongoose.model('SubCategoria', SubCategoria);
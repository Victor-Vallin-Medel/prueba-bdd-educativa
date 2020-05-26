const mongoose = require('mongoose');
const { Schema } = mongoose;


const Curso = new Schema({
    nombre: String,
    autor: String,
    idSubCategorias: [String],
    contenidos:[{
        titulo:String,
        nivel: Number,
        video: String,
        quiz: {
            titulo: String,
            preguntas: [{
                pregunta: String,
                respuestas:[{
                    respuesta: String,
                    correcta: Boolean,
                }],
            }],
        }
    }],
});

module.exports = mongoose.model('Curso', Curso);
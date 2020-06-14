const mongoose = require('mongoose');
const { Schema } = mongoose;

const Usuario = new Schema({
    nombre: String,
    email: String,
    passwd: String,
    rol: String,
    perfil: {
        username:String,
        imagen: String,
    },
    cursos:[{
        idCurso: String,
        finalizado: Boolean,
    }]
});

// Eliminación de password al retornar el objeto por petición
Usuario.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.passwd;

    return userObject;
}

module.exports = mongoose.model('Usuario', Usuario);
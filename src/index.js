// Config
require('./environment/config');

const database = require('./database');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

database.initMongo();

//Settings
app.set('port', process.env.PORT);

//Middlewares 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/api/subCategoria', require('./routes/subcategoria.routes'));
app.use('/api/Categoria', require('./routes/categoria.routes'));
app.use('/api/Curso', require('./routes/curso.routes'));
app.use('/api/Usuario', require('./routes/usuario.routes'));
app.use('/api/UsuarioContenido', require('./routes/usuario_contenido.routes'));
app.use('/api/Conversacion', require('./routes/conversacion.routes'));

//server is listening
app.listen(process.env.PORT, () => {
    console.log('Server on port', app.get('port'));
});
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb://victor:hola@localhost:27017/educativaExpress?authSource=admin';

mongoose.connect(uri)
.then(db => console.log('db connection succesfully'))
.catch(err => console.log(error));

//Settings
app.set('port', process.env.PORT || 4000);


//Middlewares 
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', require('./routes/apis'));

//Static files
app.use(express.static(__dirname + '/public'));


//server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
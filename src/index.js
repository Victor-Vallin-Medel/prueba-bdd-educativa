const database = require('./database');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

database.initMongo();

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', require('./routes/apis'));

//Static files
app.use(express.static(__dirname + '/public'));


//server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
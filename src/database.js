const mongoose = require('mongoose');

const DATABASE_CONNECTION = 'mongodb://mongo/educativaExpress';

exports.initMongo = function() {
    mongoose.connect(DATABASE_CONNECTION)
        .then(db => console.log('db connection succesfully'))
        .catch(err => console.log(err));
}
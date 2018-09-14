const mongoose = require('mongoose');

mongoose.connect('mongodb://ds255332.mlab.com:55332/apperture-dashboards', { 
    auth: {
        user: 'apperture',
        password: '6hWk%86t4h!M'
    },
    useNewUrlParser: true 
});

module.exports = mongoose.connection;
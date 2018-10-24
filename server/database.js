const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://apperture_api:2myyWhJ69k87nUR@apperture-s1ojt.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true 
}, (error) => {
    if (error) {
        console.error('Unable to connect to MongoDB Atlas');
        throw error;
    } else {
        console.log('Successfully connected to MongoDB Atlas');
    }  
});

module.exports = mongoose.connection;

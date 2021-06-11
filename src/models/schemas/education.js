const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    degree: {
        type: String,
        required: true,
        trim: true
    },

    stream: {
        type: String,
        required: true,
        trim: true
    },

    percentage: {
        type: Number,
        required: true,
        trim: true
    },

    yearOfJoining: {
        type: Number,
        required: true,
        trim: true
    },

    yearOfPassing: {
        type: Number,
        required: true,
        trim: true
    }
    
});

module.exports = educationSchema;
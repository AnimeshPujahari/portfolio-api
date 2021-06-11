const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    completionDate: {
        type: Number,
        required: true,
        trim: true
    },

    file: {
        type: Buffer
    }
});

module.exports = certificateSchema;
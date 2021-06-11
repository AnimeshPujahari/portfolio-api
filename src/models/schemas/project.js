const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

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

    link: {
        type: String,
        required: true,
        trim: true
    },

    file: {
        type: Buffer
    }
});

module.exports = projectSchema;
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    projects: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },

            description: {
                type: String,
                required: true,
                trim: true,
                maxlength: 1000
            },

            link: {
                type: String,
                required: true,
                trim: true,
            },

            image: {
                type: Buffer
            }
        }
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Project = mongoose.model('Project' , projectSchema);

module.exports = Project;
const mongoose = require('mongoose');

const educateSchema = new mongoose.Schema({

    education: [
        {
            school: {
                type: String,
                required: true,
                trim: true
            },
        
            qualification: {
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
                type: String,
                required: true,
                trim: true
            }
        }
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Educate = mongoose.model('Educate' , educateSchema);

module.exports = Educate;
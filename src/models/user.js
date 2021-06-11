const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Schemas
const projectSchema = require('../models/schemas/project');
const educationSchema = require('../models/schemas/education');
const certificateSchema = require('../models/schemas/certificate');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain password');
            }
        }
    },

    phonenumber: {
        type: String,
        validate(value){
            if(!validator.isMobilePhone('en-IN', value)){
                throw new Error('Invalid mobilenumber');
            }
        }
    },

    address: {
        type: String,
        trim: true
    },

    image: {
        type: Buffer
    },

    projectDetail: [projectSchema],

    educationDetail: [educationSchema],

    certificateDetail: [certificateSchema],

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});


//Login the user
userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}


//Hide sensitive information
userSchema.methods.toJSON = function(){
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.projectDetail;
    delete userObject.educationDetail;
    //delete userObject.certificateDetail;
    delete userObject.image;

    return userObject;
}


//Generate token
userSchema.methods.generateAuthToken = async function() {

    const user = this;

    const token = jwt.sign( {_id: user._id.toString() } , process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
}

//Encrypt the password
userSchema.pre('save' , async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8);
    }
    
    next();
    
})

const User = mongoose.model('User' , userSchema);

module.exports = User;
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Educate = require('../models/education');
const Project = require('../models/projects');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 32
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error({
                    error: 'Invalid email'
                })
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error({
                    error: 'Password can not contain password'
                })
            }
        }
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value , "en-IN")){
                throw new Error({
                    error: 'Invalid mobile number'
                })
            }
        }
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    about: {
        type: String,
        trim: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],

    avatar : {
        type: Buffer
    }
});


//Education Virtual
userSchema.virtual('educates' , {
    ref: 'Educate',
    localField: '_id',
    foreignField: 'owner'
})

//Poject Virtual
userSchema.virtual('project' , {
    ref: 'Project',
    localField: '_id',
    foreignField: 'owner'
});

//Hiding private data
userSchema.methods.toJSON = function() {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


//Generating authentication tokens
userSchema.methods.generateAuthTokens = async function() {

    const user = this;

    const token = jwt.sign( {_id: user._id} , process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
}


//Login user 
userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({email});

    if(!user){
        return res.send({
            error:'Unable to login'
        })
    }

    const isValidate = await bcrypt.compare(password , user.password);

    if(!isValidate){
        return res.send({
            error: 'Unable to login'
        })
    }

    return user;
}

//Hash the password
userSchema.pre('save' , async function(next) {

    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8);
    }

    next()
});


//User remove deletes all data
userSchema.pre('remove' , async function(next) {
    const user = this;

    await Educate.deleteMany({owner : user._id});
    await Project.deleteMany({owner: user._id});

    next();
})

const User = mongoose.model('User' , userSchema);

module.exports = User;
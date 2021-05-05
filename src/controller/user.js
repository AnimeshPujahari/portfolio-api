const User = require('../models/user');
const multer = require('multer');

//Create user credentials
exports.createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthTokens();

        res.send({
            user , token
        });
    }catch(e){
        res.status(400).send(e);
    }
}

//Login user
exports.loginUser = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password);
        const token = await user.generateAuthTokens();
        res.json({
            user , token
        })
    }catch(e){
        res.status(500).send()
    }
}


//Get user details
exports.getUser = async (req, res) => {
    res.send(req.user);
}

//Update user details
exports.updateUser = async (req, res) => {

    const updates= Object.keys(req.body);
    const toUpdate = ['name' , 'email' , 'password' , 'phone' , 'address' , 'about'];

    const isValidate = updates.every((update) => {
        return toUpdate.includes(update);
    })

    if(!isValidate){
        return res.send({
            error: 'Invalid update parameter'
        })
    }

    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })
        await req.user.save();
        res.json({
            user: req.user
        })
    }catch(e){
        res.status(400).send();
    }
}


//Delete user details
exports.deleteUser = async (req, res) => {
    try{
        await req.user.remove();
        res.send({
            user:req.user
        })
    }catch(e){
        res.status(400).send();
    }
}

//Logout user 
exports.logoutUser = async (req, res) => {
    try{
        
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(400).send();
    }
}


//Logout all
exports.logoutAll = async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
}


//Upload profile Pic
exports.upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file , cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            cb(new Error('Throw new error'));
        }

        cb(undefined , true);
    }
})

exports.uploadPic = async (req, res) => {
    try{
        req.user.avatar = req.file.buffer;

        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }
}
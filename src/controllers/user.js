const multer = require('multer');

const User = require('../models/user');

exports.createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        const token = await user.generateAuthToken();

        await user.save();

        res.send({
            user, token
        });
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Get User
exports.getUser = async (req, res) => {
    res.send(req.user);
}

//Update User
exports.updateUser = async (req, res) => {

    const updates = Object.keys(req.body);
    const toUpdate = ['name', 'email' , 'password' , 'phonenumber' , 'address' , 'image'];
    const validate = updates.every((update) => {
        return toUpdate.includes(update);
    });

    if(!validate){
        throw new Error('Invalid operation');
    }

    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.send({
            user: req.user
        })
    }catch(e){
        res.send({
            message: e.message
        });
    }
}

//Delete User
exports.deleteUser = async (req, res) => {
    try{
        await req.user.remove();

        res.send({
            user: req.user,
            message: 'User deleted'
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Login user
exports.loginUser = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({
            user, token
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//logout user
exports.logoutUser = async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send({
            user: req.user,
            message: 'Log out successful'
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//logout all
exports.logoutAll = async (req, res) => {
    try{
        req.user.tokens = [];

        await req.user.save();
        res.send({
            message: 'Successfully logged out of all devices'
        });
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Upload a pic
exports.upload = multer({
    limits: {
        fileSize : 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Invalid file type'));
        }

        cb(undefined , true);
    }
});

exports.uploadPic = async (req, res) => {
    try{
        req.user.image = req.file.buffer;
        await req.user.save();

        res.send({
            user: req.user
        });
    }catch(e){
        res.send({
            message: e.message
        })
    }
}
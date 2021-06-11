const jwt = require('jsonwebtoken');

//Model
const User = require('../models/user');

const auth = async (req, res ,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify( token , process.env.JWT_SECRET);
        const user = await User.findOne({ _id : decode._id , 'tokens.token' : token });

        if(!user){
            throw new Error('Unauthorized');
        }

        req.user = user;
        req.token = token;

        next();
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

module.exports = auth;
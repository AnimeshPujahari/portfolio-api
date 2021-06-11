const express = require('express');

//Controllers
const {
    createUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    logoutUser,
    logoutAll,
    upload,
    uploadPic
} = require('../controllers/user');

const auth = require('../auth/authenticate');

const router = express.Router();

router.post('/user/create' , createUser);

router.post('/user/login' , loginUser);

router.get('/user/profile' , auth , getUser);

router.patch('/user/update' , auth , updateUser);

router.delete('/user/delete' , auth , deleteUser);

router.post('/user/logout' , auth , logoutUser);

router.post('/user/logoutall' , auth, logoutAll);

router.post('/user/upload' , auth , upload.single('image') , uploadPic);

module.exports = router;
const express = require('express');

const {
    createUser,
    getUser,
    loginUser,
    updateUser,
    deleteUser,
    logoutUser,
    logoutAll,
    upload,
    uploadPic
} = require('../controller/user');
const auth = require('../middlewares/userAuth');

const router = express.Router();

//User signup route
router.post('/user/signup' , createUser);

//User login route
router.post('/user/login' , loginUser);

//User logout route
router.post('/user/logout' , auth , logoutUser);

//User logoutAll route
router.post('/user/logoutAll' , auth , logoutAll);

//User profile route
router.get('/user/me' , auth , getUser);

//User update route
router.patch('/user/update' , auth , updateUser);

//User delete route
router.delete('/user/delete' , auth , deleteUser);

//User pic uploda route
router.post('/user/upload' , auth , upload.single('avatar') , uploadPic);

module.exports = router;
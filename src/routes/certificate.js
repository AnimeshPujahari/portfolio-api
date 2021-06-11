const express = require('express');

const {
    createCertificate,
    addCertificate,
    updateCertificate,
    fetchCertificate,
    deleteCertificate,
    deleteAllCertificate,
    upload,
    uploadFile
} = require('../controllers/certificate');

const auth = require('../auth/authenticate');

const router = express.Router();

router.post('/certificate/create' , auth , createCertificate);

router.patch('/certificate/add' , auth , addCertificate);

router.patch('/certificate/update/:id' , auth , updateCertificate);

router.get('/certificate/fetch' , auth , fetchCertificate);

router.delete('/certificate/delete/:id' , auth, deleteCertificate);

router.delete('/certificate/delete', auth, deleteAllCertificate); 

router.post('/certificate/upload/:id' , auth , upload.single('file'), uploadFile);

module.exports = router;
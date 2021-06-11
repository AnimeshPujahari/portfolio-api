const express = require('express');

//Controllers
const {
    createEducation,
    addEducation,
    fetchEducation,
    updateEducation,
    deleteEducation,
    deleteAllEducation
} = require('../controllers/education');

const auth = require('../auth/authenticate');

const router = express.Router();

router.post('/education/create' , auth , createEducation);

router.patch('/education/add' , auth , addEducation);

router.get('/education/fetch' , auth , fetchEducation);

router.patch('/education/update/:id' , auth , updateEducation);

router.delete('/education/delete/:id' , auth , deleteEducation);

router.delete('/education/delete' , auth , deleteAllEducation);

module.exports = router;
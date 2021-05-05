const express = require('express');

const {
    createEducation,
    addEducation,
    updateEducation,
    getEducation,
    deleteAllEducation,
    deleteEducation
} = require('../controller/education');

const auth = require('../middlewares/userAuth');

const router = express.Router();

//To create education entry
router.post('/education/create' , auth , createEducation);

//To add more details
router.patch('/education/add' , auth , addEducation);

//To update a education details
router.patch('/education/update/:id' , auth , updateEducation);

//To get education details
router.get('/education/fetch' , auth , getEducation);

//To delete all education details
router.delete('/education/delete' , auth , deleteAllEducation);

//To delete a particular education
router.delete('/education/delete/:id' , auth , deleteEducation);

module.exports = router;
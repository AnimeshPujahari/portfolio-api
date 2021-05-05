const express = require('express');

const {
    createProject,
    addProjects,
    getProjects,
    updateProject,
    deleteAllProjects,
    deleteProject,
    upload,
    uplodaPic
} = require('../controller/projects'); 

const auth = require('../middlewares/userAuth');

const router = express.Router();

//To create new Project entry
router.post('/project/create' , auth , createProject);

//To add new projects
router.patch('/project/add' , auth , addProjects);

//To update project based on Id
router.patch('/project/update/:id' , auth , updateProject);

//To fetch all the projects
router.get('/project/fetch' , auth , getProjects);

//To delete all projects
router.delete('/project/delete' , auth , deleteAllProjects);

//To delete a project
router.delete('/project/delete/:id' , auth , deleteProject);

//To upload a picter
router.post('/project/upload/:id' , auth , upload.single('avatar') , uplodaPic);

module.exports = router;
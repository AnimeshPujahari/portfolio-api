const express = require('express');

//Controllers
const {
    createProject,
    addProject,
    updateProject,
    fetchProject,
    deleteProject,
    deleteAllProject,
    upload,
    uploadFile
} = require('../controllers/project');

//Auth
const auth = require('../auth/authenticate');

const router = express.Router();

router.post('/project/create' , auth , createProject);

router.patch('/project/add' , auth , addProject);

router.patch('/project/update/:id' , auth , updateProject);

router.get('/project/fetch' , auth , fetchProject);

router.delete('/project/delete/:id' , auth , deleteProject);

router.delete('/project/delete' , auth , deleteAllProject);

router.post('/project/upload/:id' , auth , upload.single('file') , uploadFile);

module.exports = router;
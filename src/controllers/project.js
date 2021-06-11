const multer = require('multer');

//Create new project entry
exports.createProject = async (req, res) => {
    try{
        req.user.projectDetail = req.body;

        await req.user.save();

        res.send({
            user: req.user
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Add new project
exports.addProject = async (req, res) => {
    try{

        if(req.user.projectDetail.length === 0){
            throw new Error('Project entry not found');
        }

        req.user.projectDetail.push(req.body);

        await req.user.save();

        res.send({
            project: req.user.projectDetail
        })

    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Update a project
exports.updateProject = async (req, res) => {

    try{
        const updates = Object.keys(req.body);
        const toUpdate = ['name' , 'description' , 'link' , 'file'];
        const isValidating = updates.every((update) => {
            return toUpdate.includes(update);
        });
        
        if(!isValidating) {
            throw new Error('Invalid updating field');
        }

        updates.forEach((update) => {
            req.user.projectDetail.forEach((project) => {
                if(project._id.toString() === req.params.id){
                    project[update] = req.body[update];
                }
            });
        })

        await req.user.save();

        res.send({
            project: req.user.projectDetail
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Delete project /delete/:id
exports.deleteProject = async (req, res) => {
    try{
        req.user.projectDetail = req.user.projectDetail.filter((project) => {
            return project._id.toString() !== req.params.id;
        });

        await req.user.save();

        res.send({
            project : req.user.projectDetail
        });
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Delete all project /deleteAll/
exports.deleteAllProject = async (req, res) => {
    try{
        req.user.projectDetail = [];
        await req.user.save();

        res.send({
            user: req.user
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}


//View projects
exports.fetchProject = async (req, res) => {
    try{
        res.send({
            project: req.user.projectDetail
        })
    }catch(e){
        res.send({
            message: e.message  
        });
    }
}

//Upload file
exports.upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file , cb){
        if(!file.originalname.match(/\.(pdf|doc|docx)$/)){
            cb(new Error('Invalid file type'));
        }

        cb(undefined , true);
    }
});

exports.uploadFile = async (req, res) => {
    try{
        req.user.projectDetail.forEach((project) => {
            if(project._id.toString() === req.params.id){
                project.file = req.file.buffer;
            }
        });

        await req.user.save();

        res.send({
            project: req.user.projectDetail
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}


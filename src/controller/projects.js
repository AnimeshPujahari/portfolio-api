const Project = require('../models/projects');
const multer = require('multer');

//Create a project entry
exports.createProject = async (req, res) => {
    try{
        const proj = await Project.findOne({owner: req.user._id});

        if(proj){
            return res.send({
                error: 'Project entry exist, Please add new into the entry'
            })
        }

        const project = new Project({
            owner: req.user._id
        });

        project.projects.push(req.body);

        await project.save();
        res.status(200).send(project);
    }catch(e){
        res.status(500).send()
    }
}


//To add other projects into entry
exports.addProjects = async (req, res) => {
    try{
        const project = await Project.findOne({ owner : req.user._id });

        project.projects.push(req.body);

        await project.save();
        res.send(project);
    }catch(e){
        res.status(400).send();
    }
}


//To fetch projects 
exports.getProjects = async (req, res) => {
    try{
        await req.user.populate('project').execPopulate();
        res.send(req.user.project);
    }catch(e){
        res.status(400).send();
    }
}


//To update a project based on ID
exports.updateProject = async (req, res) => {

    var toCheckEntry = 0;

    const updates = Object.keys(req.body);
    const toUpdate = ['name' , 'description' , 'link' , 'files' , 'images'];

    const isValidate = updates.every((update) => {
        return toUpdate.includes(update);
    })

    if(!isValidate) {
        return res.send({
            error: 'Invalid operation'
        });
    }

    try{
        const project = await Project.findOne({ owner : req.user._id });

        project.projects.forEach((project) => {
            if(project._id.toString() === req.params.id){
                updates.forEach((update) => {
                    project[update] = req.body[update];
                });
            }else{
                toCheckEntry++;
            }
        });

        if(toCheckEntry === project.projects.length){
            return res.send({
                error: 'No projects found'
            })
        }

        await project.save();
        res.send(project);
    }catch(e){
        res.status(400).send();
    }
}


//To delete all projects
exports.deleteAllProjects = async (req, res) => {
    try{
        const project = await Project.findOne({ owner : req.user._id });
        project.projects = [];
        await project.save();

        res.send(project);
    }catch(e){
        res.status(400).send();
    }
}


//Delete a project based on ID
exports.deleteProject = async (req, res) => {
    try{
        const project = await Project.findOne({ owner : req.user._id });

        project.projects = project.projects.filter((project) => {
            return project._id.toString() !== req.params.id;
        });

        await project.save();

        res.send(project);
    }catch(e){
        res.status(400).send();
    }
}


//Upload project pic
exports.upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req , file , cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            cb(new Error('Invalid file type'));
        }

        cb(undefined , true);
    }
})

exports.uplodaPic = async (req , res) => {
    try{
        const project = await Project.findOne({ owner : req.user._id });
        let counter = 0;

        project.projects.forEach((project) => {
            if(project._id.toString() === req.params.id){
                project.image = req.file.buffer;
                console.log(project);
            }else {
                counter++;
            }
        })

        if(counter === project.projects.length){
            return res.send({
                error: 'No project found'
            });
        }

        await project.save();
        res.send(project);
    }catch(e){

    }
}
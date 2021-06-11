//Education creation
exports.createEducation = async (req ,res) => {
    try{
        req.user.educationDetail = req.body;

        await req.user.save();

        res.send({
            educations: req.user.educationDetail
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Add education
exports.addEducation = async (req , res) => {
    try{
        
        if(req.user.educationDetail.length === 0){
            throw new Error('Education entry not found');
        }

        req.user.educationDetail.push(req.body);

        await req.user.save();
        res.send({
            education: req.user.educationDetail
        });

    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Update education
exports.updateEducation = async (req, res) => {
    try{
        const updates = Object.keys(req.body);
        const toUpdate = ['name' , 'degree' , 'stream' ,'percentage' , 'yearOfJoining' , 'yearOfPassing'];
        const toValidate = updates.every((update) => {
            return toUpdate.includes(update);
        });
        
        if(!toValidate){
            throw new Error('Invalid update field');
        }

        updates.forEach((update) => {
            req.user.educationDetail.forEach((education) => {

                if(education._id.toString() === req.params.id){
                    education[update] = req.body[update];
                }
            });
        });

        await req.user.save();

        res.send({
            education: req.user.educationDetail
        })
    }catch(e){
        res.send({
            message: e.message
        });
    }
}


//Fetch educations
exports.fetchEducation = async (req, res) => {
    try{
        res.send({
            education : req.user.educationDetail
        });
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Delete education
exports.deleteEducation = async (req, res) => {
    try{
        req.user.educationDetail = req.user.educationDetail.filter((education) => {
            return education._id.toString() !== req.params.id;
        });
        
        await req.user.save();

        res.send({
            education : req.user.educationDetail
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

exports.deleteAllEducation = async (req, res) => {
    try{
        req.user.educationDetail = [];
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
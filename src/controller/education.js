const Educate = require('../models/education');

//Create a new Education entry
exports.createEducation = async (req, res) => {
    try{
        const ed = await Educate.findOne({owner : req.user._id});

        if(ed){
            return res.send({
                error: 'Entry exist, Please add more if you want to'
            });
        }

        const educate = new Educate({
            owner: req.user._id
        });

        educate.education.push(req.body);
        await educate.save();
        res.send(educate);
    }catch(e){
        res.status(500).send(e);
    }
}


//Add more education details
exports.addEducation = async (req, res) => {
    try{
        const educate = await Educate.findOne( {owner : req.user._id} );

        educate.education.push(req.body);
        await educate.save();
        res.send(educate);
    }catch(e){
        res.status(400).send(e);
    }
}


//Get all education details
exports.getEducation = async (req, res) => {
    try{
        await req.user.populate('educates').execPopulate();
        res.send(req.user.educates);
    }catch(e){
        res.status(400).send();
    }
}


//To update a particular education object
exports.updateEducation = async (req, res) => {

    var toCheckPresence = 0; //To check for invalid ID
    
    const updates = Object.keys(req.body);
    const toUpdate = ['school' , 'qualification' , 'stream' , 'percentage'];


    const isValidate = updates.every((update) => {
        return toUpdate.includes(update);
    });

    if(!isValidate) {
        return res.send({
            error: 'Invalid Operation'
        })
    }

    try{
        const educate = await Educate.findOne({owner : req.user._id});
        educate.education.forEach((education) => {
            if(education._id.toString() === req.params.id){
                updates.forEach((update) => {
                    education[update] = req.body[update];
                })
            }else{
                toCheckPresence++;
            }
        });

        if(toCheckPresence === educate.education.length){
            res.send(
                {
                    error : 'No education found'
                }
            )
        }

        await educate.save();
        res.send(educate.education);
    }catch(e){
        res.status(500).send()
    }
}

//Delete all education entry
exports.deleteAllEducation = async (req ,res) => {
    try{
        const educate = await Educate.findOne({owner: req.user._id});
        educate.education = [];

        await educate.save();

        res.send(educate);
    }catch(e){
        res.status(500).send()
    }
}


//Delete a specific education entry
exports.deleteEducation = async (req, res) => {
    try{
        const educate = await Educate.findOne({owner : req.user._id});

        educate.education = educate.education.filter((education) => {
            return education._id.toString() !== req.params.id;
        })

        await educate.save();
        res.send(educate);
    }catch(e){
        res.status(500).send();
    }
}
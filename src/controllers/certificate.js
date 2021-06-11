const multer = require('multer');

//Create certificate entry
exports.createCertificate = async (req ,res) => {
    try{
        req.user.certificateDetail = req.body;

        await req.user.save();

        res.send({
            certificate : req.user.certificateDetail
        });
    }catch(e){
        res.send({
            message: e.message
        });
    }
}

//Add certificate entry
exports.addCertificate = async (req, res) => {
    try{
        if(req.user.certificateDetail.length === 0){
            throw new Error('Certificate entry not found');
        }

        req.user.certificateDetail.push(req.body);

        await req.user.save();

        res.send({
            certificate: req.user.certificateDetail
        });
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Update certificate
exports.updateCertificate = async (req, res) => {
    try{
        const updates = Object.keys(req.body);
        const toUpdate = ['name' , 'description' , 'completionDate' , 'file'];
        const toValidate = updates.every((update) => {
            return toUpdate.includes(update);
        })

        if(!toValidate){
            throw new Error('Invalid update field');
        }

        updates.forEach((update) => {
            req.user.certificateDetail.forEach((certificate) => {
                if(certificate._id.toString() === req.params.id){
                    certificate[update] = req.body[update];
                }
            });
        });

        await req.user.save();

        res.send({
            certificate : req.user.certificateDetail
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Delete certificate
exports.deleteCertificate = async (req, res) => {
    try{
        req.user.certificateDetail = req.user.certificateDetail.filter((certificate) => {
            return certificate._id.toString() !== req.params.id;
        });

        await req.user.save();

        res.send({
            certificate: req.user.certificateDetail
        });
    }catch(e){
        res.send({
            message: e.message
        });
    }
}

//Fetch certificate
exports.fetchCertificate = async (req, res) => {
    try{
        res.send({
            certificate: req.user.certificateDetail
        })
    }catch(e){
        res.send({
            message: e.message
        })
    }
}

//Delete all certificate
exports.deleteAllCertificate = async (req, res) => {
    try{
        req.user.certificateDetail = [];

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

//Upload file
exports.upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file , cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)){
            cb(new Error('Invalid file type'));
        }

        cb(undefined , true);
    }
});

exports.uploadFile = async (req, res) => {
    try{
        req.user.certificateDetail.forEach((certificate) => {
            if(certificate._id.toString() === req.params.id){
                certificate.file = req.file.buffer;
            }
        });

        await req.user.save();

        res.send({
            certificate : req.user.certificateDetail
        });
    }catch(e){
        res.send({
            message: e.message
        });
    }
}
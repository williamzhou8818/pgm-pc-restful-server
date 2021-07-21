const express = require('express');
const router = express.Router();
const ResAvatar = require('../../../models/ResModel');
const multer =  require('multer');
const fs = require('fs');
const auth = require('../../../middleware/auth');
const clientOss = require('../../../utils/aws_oss_config');

const client = clientOss;

var storageAvatar =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uploadResAvatar = multer(
    { storage: storageAvatar }
);

router.post('/init-tb', auth, (req, res) => { 
    let newAva = {
        uuid: req.query.id
    }

    ResAvatar.findAll({where: {uuid: req.query.id}})
        .then(avatar => {
            if(avatar[0]) return res.status(400).json({msg: 'resource data already exiting'});

            ResAvatar.create(newAva)
            .then(myResAva => {
                if (myResAva) {
                    return res.status(200).json({msg: 'resource avatar table has been success created!'});
                }
            }).catch(err => console.log(err));
        })

})

router.post('/upload-ava', auth, uploadResAvatar.single('ava-file') , async(req, res) =>  { 

    if (req.file) {
    
        try { 
            let fileName  = req.file.filename;
            let filePath = req.file.path;
            const result =  await client.put('res-avatar/'+ req.id +'/' + fileName, filePath.replace('\\', '/'));
            if (result) { 
                console.log(result);
                ResAvatar.update(
                    {
                        ava_name: req.body.ava_file_name,  
                        ava_url: result.url 
                    },
                    {
                        where: { 
                            uuid: req.query.id
                        }
                    }
                ).then(result => {  
                    if (result[0] === 1) {
                        fs.unlink(filePath.replace('\\', '/'), (err) => {
                            if (err) throw err;
                            console.log('File deleted!');
                            return res.status(200).json({msg: "保存成功"});
                        })
                    }
                })

                
            }

        } catch(e) {
            console.log(e);
            return res.status(400).json({msg: "Server Error"});
        }

    }

})

router.post('/upload-img', auth, uploadResAvatar.single('ava-img'), async (req, res) => {

    if (req.file) { 
        console.log(req.file);
    
        try { 
            let fileName = req.file.filename; 
            let filePath = req.file.path;

            const  result = await client.put('res-avatar/'+ req.id + "/" + fileName, filePath.replace('\\', '/'));

            if (result) { 
                console.log(result);    
                ResAvatar.update(
                    {
                        img_name: req.body.ava_img_name,  
                        ava_img_url: result.url 
                    },
                    {
                        where: { 
                            uuid: req.query.id
                        }
                    }
                ).then(result => {  
                    if (result[0] === 1) {
                        fs.unlink(filePath.replace('\\', '/'), (err) => {
                            if (err) throw err;
                            console.log('File deleted!');
                            return res.status(200).json({msg: "保存成功"});
                        })
                    }
                })

                
            }

        } catch(e) { 
            console.log(e);
            return res.status(400).json({msg: "Server Error"});
        }


    }



})





module.exports =  router;
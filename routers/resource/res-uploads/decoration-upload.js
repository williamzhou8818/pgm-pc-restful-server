const express = require('express');
const router = express.Router();
const ResDeco = require('../../../models/ResDeco');
const multer =  require('multer');
const fs = require('fs');
const auth = require('../../../middleware/auth');
const clientOss = require('../../../utils/aws_oss_config');
const client = clientOss;


var storageDeco =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uploadResDeco = multer(
    { storage: storageDeco }
);

router.post('/init-tb', auth, (req, res) => { 
    let newDeco = {
        uuid: req.query.id
    }

    ResDeco.findAll({where: {uuid: req.query.id}})
        .then(deco => {
            if(deco[0]) return res.status(400).json({msg: 'resource data already exiting'});

            ResDeco.create(newDeco)
            .then(myResDeco => {
                if (myResDeco) {
                    return res.status(200).json({msg: 'resource decoration table has been success created!'});
                }
            }).catch(err => console.log(err));
        })

})

router.post('/upload-drc', auth, uploadResDeco.single('drc_file') , async(req, res) =>  { 

    if (req.file) {
    
        try { 
            let fileName  = req.file.filename;
            let filePath = req.file.path;
            const result =  await client.put('res-deco/'+ req.id +'/' + fileName, filePath.replace('\\', '/'));
            if (result) { 
                console.log(result);
                ResDeco.update(
                    {
                        drc_name: req.body.drc_file_name,  
                        drc_url: result.url 
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

router.post('/upload-img', auth, uploadResDeco.single('deco-img'), async (req, res) => {

    if (req.file) { 
        console.log(req.file);
    
        try { 
            let fileName = req.file.filename; 
            let filePath = req.file.path;

            const  result = await client.put('res-deco/'+ req.id + "/" + fileName, filePath.replace('\\', '/'));

            if (result) { 
                console.log(result);
                ResDeco.update(
                    {
                        img_name: req.body.deoc_img_name,  
                        img_url: result.url 
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
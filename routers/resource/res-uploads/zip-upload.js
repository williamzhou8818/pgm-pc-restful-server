const express = require('express');
const router = express.Router();
const ResZip = require('../../../models/ResZip');
const multer =  require('multer');
const fs = require('fs');
const auth = require('../../../middleware/auth');
const clientOss = require('../../../utils/aws_oss_config');
const client = clientOss;

var storageZip =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uploadResZip = multer(
    { storage: storageZip }
);

router.post('/init-tb', auth, (req, res) => { 
    let newZip = {
        uuid: req.query.id
    }

    ResZip.findAll({where: {uuid: req.query.id}})
        .then(zip => {
            if(zip[0]) return res.status(400).json({msg: 'resource data already exiting'});

            ResZip.create(newZip)
            .then(myResZip => {
                if (myResZip) {
                    return res.status(200).json({msg: 'resource Zip table has been success created!'});
                }
            }).catch(err => console.log(err));
        })

})

router.post('/upload-zipper', auth, uploadResZip.single('mdl-file') , async(req, res) =>  { 

    if (req.file) {
    
        try { 
            let fileName  = req.file.filename;
            let filePath = req.file.path;
            const result =  await client.put('res-zip/'+ req.id +'/' + fileName, filePath.replace('\\', '/'));
            if (result) { 
                console.log(result);
                ResZip.update(
                    {
                        mdl_name: req.body.mdl_file_name,  
                        mdl_url: result.url 
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

router.post('/upload-img', auth, uploadResZip.single('img-file'), async (req, res) => {

    if (req.file) { 
        console.log(req.file);
    
        try { 
            let fileName = req.file.filename; 
            let filePath = req.file.path;

            const  result = await client.put('res-stitch/'+ req.id + "/" + fileName, filePath.replace('\\', '/'));

            if (result) { 
                console.log(result);
                ResZip.update(
                    {
                        img_name: req.body.img_file_name,  
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
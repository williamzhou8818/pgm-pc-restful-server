const express = require('express');
const router = express.Router();
const ResFab = require('../../../models/ResFab');
const multer =  require('multer');
const fs = require('fs');
const auth = require('../../../middleware/auth');
const clientOss = require('../../../utils/aws_oss_config');
const client = clientOss;

var storageFab =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uploadResFab = multer(
    { storage: storageFab }
);

router.post('/init-tb', auth, (req, res) => { 
    let newFab = {
        uuid: req.query.id
    }

    ResFab.findAll({where: {uuid: req.query.id}})
        .then(fab => {
            if(fab[0]) return res.status(400).json({msg: 'resource data already exiting'});

            ResFab.create(newFab)
            .then(myResFab => {
                if (myResFab) {
                    return res.status(200).json({msg: 'resource fab table has been success created!'});
                }
            }).catch(err => console.log(err));
        })

})

router.post('/upload-fab', auth, uploadResFab.single('fab-file') , async(req, res) =>  { 

    if (req.file) {
    
        try { 
            let fileName  = req.file.filename;
            let filePath = req.file.path;
            const result =  await client.put('res-fab/'+ req.id +'/' + fileName, filePath.replace('\\', '/'));
            if (result) { 
                console.log(result);
                ResFab.update(
                    {
                        name: req.body.fab_file_name,  
                        fab_url: result.url 
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

router.post('/upload-img', auth, uploadResFab.single('fab-img'), async (req, res) => {

    if (req.file) { 
        console.log(req.file);
    
        try { 
            let fileName = req.file.filename; 
            let filePath = req.file.path;

            const  result = await client.put('res-fab/'+ req.id + "/" + fileName, filePath.replace('\\', '/'));

            if (result) { 
                console.log(result);
                ResFab.update(
                    {
                        img_name: req.body.fab_img_name,  
                        fab_img_url: result.url
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
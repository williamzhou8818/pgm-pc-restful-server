const express =  require('express'); 
const router = express.Router();
const ResBtn = require('./../../../models/ResButton');
const multer =  require('multer');
const OSS = require('ali-oss');
const fs = require('fs');
const auth = require('../../../middleware/auth');

const client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAI4G4tqE9gYvgWzxXknjAu',
    accessKeySecret: 'ddTXBZVakDj2UNdoQoChafs6PdSFC8',
    bucket: 'pgm-aphro3d-server-uploads',
    //endpoint: 'oss-cn-shanghai.aliyuncs.com',
    endpoint: 'oss-accelerate.aliyuncs.com'
})
  

//create button uploads links  
// 1 upload xml file
// 2 upload button img file 
// 3 upload  mdl file 
// also allow to save each file name fields

var storageBtn =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uploadResBtn = multer(
    { storage: storageBtn }
);


router.post('/init-tb', auth, (req, res) => { 
    
    let newBtn =  { 
        uuid: req.query.id
    }

    ResBtn.findAll({where: {uuid: req.query.id}})
    .then(btn =>  {
        if (btn[0]) return res.status(400).json({msg: 'resource data already exiting'});

        ResBtn.create(newBtn)
        .then(myResbtn => {
            if(myResbtn) {
                return res.status(200).json({msg: 'resource button table has been success created!'});
            }
        }).catch(err => console.log(err))
    })
})


//upload btn mdl
router.post('/upload-mdl', auth, uploadResBtn.single('btn-mdl-file'), async (req, res) =>  { 
    //req.auth user id tto maike  as folder id 
    console.log(req.file);
    if (req.file) {

        try {
            let fileName  = req.file.filename;
            let filePath = req.file.path;
            const result =  await client.put('res-button/'+ req.id +'/' + fileName, filePath.replace('\\', '/'));
            if (result) {
                console.log(result);
                ResBtn.update(
                        { 
                            mdl_name: req.body.btn_mdl_name,
                            mdl_url: result.url
                        },
                        {
                            where: { 
                                uuid: req.query.id
                            }
                        }
                    ).then(result => { 
                        if (result[0] === 1) {
                            fs.unlink(filePath.replace('\\','/'), (err) => {
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


//btn-res upload xml file
router.post('/upload-btn', auth, uploadResBtn.single('res-btn-file'), async (req, res) => { 
    
    if (req.file) { 
        console.log(req.file);
    
        try { 
            let fileName = req.file.filename; 
            let filePath = req.file.path;

            const  result = await client.put('res-button/' + req.id + "/" + fileName, filePath.replace('\\', '/'));

            if (result) { 
                console.log(result);
                ResBtn.update(
                    {
                        xml_name: req.body.res_btn_name,  
                        xml_url: result.url 
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


//btn-img_url
router.post('/upload-btn-img', auth, uploadResBtn.single('res-btn-img'), async (req, res) => { 
    
    if (req.file) { 
        console.log(req.file);
    
        try { 
            let fileName = req.file.filename; 
            let filePath = req.file.path;

            const  result = await client.put('res-button/'+ req.id + "/" + fileName, filePath.replace('\\', '/'));

            if (result) { 
                console.log(result);
                ResBtn.update(
                    {
                        img_name: req.body.res_btn_img_name,  
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







module.exports = router;
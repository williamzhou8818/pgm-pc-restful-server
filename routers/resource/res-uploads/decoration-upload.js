const express = require('express');
const router = express.Router();
const ResDco = require('../../../models/ResDeco');
const multer =  require('multer');
const OSS = require('ali-oss');
const fs = require('fs');

//decoration  upload 
// drc_url, img_url
// drc_url_name, img_url_name 

router.post('/init-tb', (req, res) => { 
    let newDeco = {
        uuid: req.query.id
    }
})






module.exports =  router;
//**************************************************************** */
/**
 * @DESC  WR05_ Resource
 * 
 */
//**************************************************************** */

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const ResFab = require('../../models/ResFab');
const ResModel = require('../../models/ResModel');
const ResButton = require('../../models/ResButton');
const ResZip  =  require('../../models/ResZip');
const ResStitch = require('../../models/ResStitch');
const ResDeco  = require('../../models/ResDeco');
const  {Op} = require('sequelize'); 

/******************************************************************* */ 
  /**@GET mutipual resfab uuid and return selected item */
router.get('/res_fab_by_ids', (req, res) => {
    if (req.body.data) {
        ResFab.findAll({
            where: { 
                [Op.or]: req.body.data
            }
        }).then(result => { 
            return res.status(200).send(result);
        }).catch(err => {
            return  res.status(500).send('Server Error');
        })
    }
})

 /**@GET mutipal button uuid and return selected item */
router.get('/res_button_by_ids', (req, res) => { 

    if (req.body.data) {
        ResButton.findAll({
            where: {
                [Op.or]:  req.body.data
            }
        }).then(result => {
            return res.status(200).send(result);
        }).catch(err => {
            return res.status(500).send('Server Error');
        })

    }
})
/**@Get mutipal zipper uuid and return selected item */
router.get('/res_zipper_by_ids', (req, res) => { 

    if (req.body.data) {
        ResZip.findAll({
            where: {
                [Op.or]:  req.body.data
            }
        }).then(result => {
            return res.status(200).send(result);
        }).catch(err => {
            return res.status(500).send('Server Error');
        })

    }
})

/**@Get mutipal zipper uuid and return selected item */
router.get('/res_avatar_by_ids', (req, res) => { 

    if (req.body.data) {
        ResModel.findAll({
            where: {
                [Op.or]:  req.body.data
            }
        }).then(result => {
            return res.status(200).send(result);
        }).catch(err => {
            return res.status(500).send('Server Error');
        })

    }
})


/****end */




/**
 * @GET fetch all fabric, model, accessoires, 
 * without  auth
*/
router.get('/', (req, res) =>  { 
    
    // 1.token
    // 2.resource_type [0: fabric, 1: , 2, 3, 4]???
    // 3.resource_id [ ] ???
    // const {resource_type,  resource_id} = req.body;
    // can use resource_id to get single resource item
    
    let resource_data = { "0": [], "1": [], "2": [], "3": [], "4": [], "5": [] };
    
    switch (req.query.resource_type)  {
    case "0":
        ResFab.findAll({})
        .then(result => {
            let resFabArr = [];
            if (!result) return res.status(500).send('server error');
            result.map(data =>  { 
                resFabArr.push(data.dataValues);
            })
            resource_data[0] = resFabArr;
            return res.status(200).json(resource_data[req.query.resource_type]);
        })
        break;
    case "1": 
        ResModel.findAll({})
        .then(result => {
            let resModelArr = [];
            if (!result) return res.status(500).send('server error');
            result.map(data => {
                resModelArr.push(data.dataValues);
            })
            resource_data[1] = resModelArr;
            return res.status(200).json(resource_data[req.query.resource_type]);
        })
        break;
    case "2": 
        ResButton.findAll({})
            .then(result => {
                let resButtonArr = [];
                if (!result) return res.status(500).send('server error');
                result.map(data =>  { 
                    resButtonArr.push(data.dataValues);
                })
                resource_data[2] = resButtonArr;
                return res.status(200).json(resource_data[req.query.resource_type]);
            })
        break;
    case "3": 
        ResZip.findAll({})
            .then(result => { 
                let resZipArr = [];
                if (!result) return res.status(500).send('serevr error');
                result.map(data => {
                    resZipArr.push(data.dataValues);
                })
                resource_data[3] = resZipArr;
                return res.status(200).json(resource_data[req.query.resource_type]);
            })
        break;
    case "4": 
        ResStitch.findAll({})
            .then(result => {
                let resStitchArr = [];
                if (!result) return res.status(500).send('server error');
                result.map(data =>  { 
                    resStitchArr.push(data.dataValues);                 
                })
                resource_data[4] = resStitchArr;
                return res.status(200).json(resource_data[req.query.resource_type]);
            })
        break;
    case "5": 
        ResDeco.findAll({})
            .then(result => {
                let resDecoArr = [];
                if (!result) return res.status(500).send('server error');
                result.map(data => {
                    resDecoArr.push(data.dataValues);
                })
                resource_data[5] = resDecoArr;
                return res.status(200).json(resource_data[req.query.resource_type]);
            })
        break;
    default:
        return res.status(200).json(resource_data[0]);
    }

    })



/********************************************************************************* */
//@POSTS


//create a fabric
router.post('/res-fabric', (req, res) => { 
    let _fabric = {
        uuid: "B3C6D66C-2D69-4694-A935-C8270EB41C12",
        name: "尼丝纺",
        fab_url: "http://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/myFabricRes/B3C6D66C.fab",
        fab_img_url: "http://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/myFabricRes/F8CF9532.png"
    }

    ResFab.create(_fabric)
        .then(result => {
            return res.status(201).json(result);
        }).catch(err => { 
            return res.status(500).send('Server Error');
        })
})


//create a Resource Model
router.post('/res-model', (req, res) => { 
    let _resModel = {
        uuid: uuid.v4(),
        ava_url: "http://106.14.153.11:5500/.../test.ava", 
        ava_img_url: "http://106.14.153.11:5500/.../img_url.png"
    }
    ResModel.create(_resModel)
        .then(result =>  { 
            return res.status(201).json(result);
        }).catch(err => { 
            return res.status(500).send('server error');
        })
})


//create a Resource Button
router.post('/res-button', (req, res) => {
    let _resButton = {
        uuid: uuid.v4(),
        mdl_url: "http://106.14.153.11:5500/.../test.mdl",
        xml_url: "http://106.14.153.11:5500/.../test.xml",
        img_url: "http://106.14.153.11:5500/.../img.png"
    }
    ResButton.create(_resButton)
        .then(result => {
            return res.status(201).json(result);
        }).catch(err =>  {
            return res.status(500).send('server error');
        })
})


//create a Resource Zip
router.post('/res-zip', (req, res) => { 
    let _resZip = { 
        uuid: uuid.v4(), 
        mdl_url: "http://106.14.153.11:5500/.../test-zip.mdl",
        xml_url: "http://106.14.153.11:5500/.../test-zip.xml",
        img_url: "http://106.14.153.11:5500/.../test-button-img.png"
    }
    ResZip.create(_resZip)
        .then(result => {
            return res.status(200).json(result);
        }).catch(err => {
            return res.status(500).send('server error');
        })
})


//create a Resource Stitch
router.post('/res-stitch', (req, res) =>  {
    let _resStitch = {
        uuid: uuid.v4(),
        mdl_url: "http://106.14.153.11:5500/.../test-stitch.mdl",
        xml_url: "http://106.14.153.11:5500/.../test-stitch.xml",
        img_url: "http://106.14.153.11:5500/.../test-stitch.png"
    }
    ResStitch.create(_resStitch)
        .then(result =>  { 
            return res.status(201).json(result);
        }).catch(err => { 
            return res.status(500).send('server error');
        })

})


//create a  resource decoration
router.post('/res-deco', (req, res) => { 
    let _resDeco = {
        uuid: uuid.v4(), 
        mdl_url: `; DROP TABLE sqlinjection; --`,
        xml_url: "http://106.14.153.11:5500/.../test-decoration.xml",
        img_url: "http://106.14.153.11:5500/.../test-decoration.mdl"
    }

    ResDeco.create(_resDeco)
        .then(result => { 
            return res.status(201).json(result);
        }).catch(err => {
            return res.status(500).send('server error');
        })

})


//create a resource for avater _ human_model
// router.post('/res-avater',  (req, res) => {  
    
//     let _resAvater =  {
//         uuid: uuid.v4(),
//         ava_url: '',
//         ava_img_url: ''
//     }
// })
//********************************************************************************* */



module.exports = router;
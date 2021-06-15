//************************************************************************ */
/**
 * @DESC WR04
 */
//********************************************************************** */

const express = require('express');
const router = express.Router();
const uuid  = require('uuid');
const WR04 = require('../../models/WR04'); 










/****************************************************************** */
/**@GET Project by id */
router.get('/query-project-file-list/:project_id', (req, res) => { 

    WR04.findAll({
        where: { 
            uuid: req.params.project_id
        }
    }).then(result =>  { 
        return res.status(200).json(result);
    }).catch(err => { 
        console.log(err)
        return res.status(500).send('Server Error');
    })

})

/****************************************************************** */






/****************************************************************** */
/**@POST */

//create a new pc projects 
router.post('/project', (req, res) => { 
    let _project = { 
        uuid: uuid.v4(), 
        project_file: "https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric%20Skirt02.pvd",
        proj_profile: "https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric%20Skirt02.png",
    }

    //create a new recode to database
    WR04.create(_project)
        .then(result => { 
            if (result) { 
                return res.status(200).json(result);
            }
        }).catch(err => { 
            return res.status(500).send('Server Error');
        })


})



/****************************************************************** */


module.exports = router;
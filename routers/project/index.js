/**
 * @swagger
 * /project:
 *   get:
 *     summary: Retrieve a list of projects. 
 *     description: Retrieve a list of projects from /api/vi/project.
 *     responses: 
 *         200: 
 *           description: A list of projects.
 *           content: 
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      data:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                              id: 
 *                                type: integer
 *                                description: the project id  PK
 *                                example: 0
 *                              uuid:
 *                                type: string
 *                                description: The project uuid using for return data
 *                                example: aa221312-c42f-4154-8845-aba3a8e0edd1
 *                              project_file:  
 *                                type: string
 *                                description: The project file uri
 *                                example: https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/A%20Style%20Skirt.pvd
 *                              proj_profile:  
 *                                type: string 
 *                                description: The project profile image uri
 *                                example: https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/A%20Style%20Skirt.png                              
 * 
 *
 * /project/{id}:
 *   get:
 *     summary: Retrieve a single project.
 *     description: Retrieve a single project.
 *     responses:
 *       200:
 *         description: A single project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The project ID.
 *                       example: 0
 *                     uuid: 
 *                       type: string
 *                       description: The project uuid
 *                       example: 268bbaa2-1b6f-4ee5-bf5b-1122a29519de
 *                     project_file:
 *                       type: string
 *                       description: The project file uri.
 *                       example: https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric%20Skirt01.pvd
 *                     project_profile: 
 *                       type: string 
 *                       description:  The project profile image uri
 *                       example: https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/A%20Style%20Skirt.png
 *
 */
 /**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     project_file:
 *                       type: string
 *                       description: The project profile file uri.
 *                       example: https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/A%20Style%20Skirt.pvd
 *                     proj_profile:
 *                       type: string
 *                       description: The project profile uri.
 *                       example: https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/A%20Style%20Skirt.png


*/










//end of swagger-setting



//************************************************************************ */
/**
 * @DESC WR04, WR08 _ Project
 */
//********************************************************************** */

const express = require('express');
const router = express.Router();
const uuid  = require('uuid');
const Project = require('../../models/Project'); 
// const FakeProjectModel =  require('../../models/FakeProjectModel');

const  {Op} = require('sequelize'); 

/****************************************************************** */



/**@GET Project by id */

router.get('/get_project_by_ids', (req, res) => { 
   
    if (req.body.data) {
 
        Project.findAll({
            where: { 
                [Op.or]: req.body.data
            }
        }).then(result =>  { 
            return res.status(200).send(result); 
        }).catch(err => { 
            console.log(err)
            return res.status(500).send('Server Error');
        })

    }

})


/**@GET Fetch all the project */
router.get('/', (req, res) =>  {
    Project.findAll({})
     .then(result => { 
        return res.status(200).json(result);
     }).catch(err =>  {
         console.log(err);
         return res.status(500).send('Server Error');
     })
})


/****************************************************************** */






/****************************************************************** */
/**@POST */

//create a new pc projects 
router.post('/', (req, res) => { 
    let _project = { 
        uuid: uuid.v4(), 
        project_file: "http://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric_Skirt02.pvd",
        proj_profile: "http://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric_Skirt02.png",
        checked: false
    }

    //create a new recode to database
    Project.create(_project)
        .then(result => { 
            if (result) { 
                return res.status(201).json(result);
            }
        }).catch(err => { 
            return res.status(500).send('Server Error');
        })


})



/****************************************************************** */


module.exports = router;
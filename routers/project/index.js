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



/****************************************************************** */
//testing  data 
router.get('/fack-project-data',  (req, res) =>  {
    const data = [
        {
          "id": 286,
          "checked": false,
          "name": "Style-One",
          "imgUrl": "http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/826664b-00e4-df62-af6-b258340fc7f6.png",
        },
        {
          "id": 286,
          "checked": false,
          "name": "Style-Two",
          "imgUrl": "http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/2a48dc6-0be3-8e52-add-26122cf21261.png",
        },
        {
          "id": 286,
          "checked": false,
          "name": "Style-Three",
          "imgUrl": "http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/84b351-afb7-a17e-f633-1c5416a1b6a.png",
        },
        { 
          "id": 286,
          "checked": false,
          "name": "Style-Four",
          "imgUrl": "http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/0e8be42-dc21-1202-b4ae-45362e4dfc7.png",
        },
        {
          "id": 286,
          "checked": true,
          "name": "Style-Five",
          "imgUrl": "http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/0e8be42-dc21-1202-b4ae-45362e4dfc7.png",
        } 
      ]
    
    res.status(200).json(data);
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


/**@GET Project by id */
router.get('/:project_id', (req, res) => { 

    Project.findAll({
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
router.post('/', (req, res) => { 
    let _project = { 
        uuid: uuid.v4(), 
        project_file: "https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric%20Skirt02.pvd",
        proj_profile: "https://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/Asymmetric%20Skirt02.png",
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
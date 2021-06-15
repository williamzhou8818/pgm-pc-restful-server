//**************************************************************** */
/**
 * @DESC  WR05_ Resource
 * 
 */
//**************************************************************** */

const express = require('express');
const router = express.Router();
const uuid = require('uuid');


/******************************************************************* */


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

    let resource_data = {
    
            "0": [
                {
                    uuid: "aa221312-c42f-4154-8845-aba3a8e0edd1",
                    fab_url:"http://106.14.153.11:5500/.../fabric.fab",
                    fab_img_url: "http://106.14.153.11:5500/.../fabric.png"
                },
                {
                    uuid: "268bbaa2-1b6f-4ee5-bf5b-1122a29519de",
                    fab_url:"http://106.14.153.11:5500/.../fabric.fab",
                    fab_img_url: "http://106.14.153.11:5500/.../fabric.png"
                }
            ],
            
            "1": [
                {
                    uuid: "8d4eb2ad-d571-4499-a643-544e3b2d64f5",
                    ava_url: "http://106.14.153.11:5500/.../test.ava",
                    ava_img_url: "http://106.14.153.11:5500/.../img_url.png"                               
                },
                {
                    uuid: "8d4eb2ad-d571-4499-a643-544e3b2d64f5",
                    ava_url: "http://106.14.153.11:5500/.../test.ava",
                    ava_img_url: "http://106.14.153.11:5500/.../img_url.png"  
                }
            ], 
            
            "2": [
                {
                    uuid: "268bbaa1b6f-4ee5-bf5b-1122a29519de",
                    mdl_url: "http://106.14.153.11:5500/.../test.mdl",
                    xml_url: "http://106.14.153.11:5500/.../test.xml",
                    img_url: "http://106.14.153.11:5500/.../img.png"
                },
                {
                    uuid: "268bb12a2-1b6f-4ee5-bf5b-1122a29519de",
                    mdl_url: "http://106.14.153.11:5500/.../test2.mdl",
                    xml_url: "http://106.14.153.11:5500/.../test2.xml",
                    img_url: "http://106.14.153.11:5500/.../img2.png"
                }
            ],

            "3": [ 
                {
                    uuid: "8d4eb2ad-d571-4499-a643-544e3b2d64f5",
                    mdl_url:"http://106.14.153.11:5500/.../zip.mdl",
                    xml_url:"http://106.14.153.11:5500/.../zip.xml",
                    img_url:"http://106.14.153.11:5500/.../zip.png",
                }, 
                {
                    uuid: "8d4eb2ad-seed71-4499-a643-544e3b2d64f5",
                    mdl_url:"http://106.14.153.11:5500/.../zip.mdl",
                    xml_url:"http://106.14.153.11:5500/.../zip.xml",
                    img_url:"http://106.14.153.11:5500/.../zip.png",
                }

            ],

            "4": [
                {
                    uuid: "8d4eb2ad-setffe71-4499-a643-544e3b2d64f5",
                    mdl_url:"http://106.14.153.11:5500/.../stitch.mdl",
                    xml_url:"http://106.14.153.11:5500/.../stitch.xml",
                    img_url:"http://106.14.153.11:5500/.../stitch.png",
                },
                {
                    uuid: "8d4eb2ad-se3dd71-4499-a643-544e3b2d64f5",
                    mdl_url:"http://106.14.153.11:5500/.../stitch.mdl",
                    xml_url:"http://106.14.153.11:5500/.../stitch.xml",
                    img_url:"http://106.14.153.11:5500/.../stitch.png",
                }
            ],

            "5": [
                {
                    uuid: "8d4eb2ad-sesfsfs3dd71-4499-a643-544e3b2d64f5",
                    mdl_url:"http://106.14.153.11:5500/.../decorate.mdl",
                    xml_url:"http://106.14.153.11:5500/.../decorate.xml",
                    img_url:"http://106.14.153.11:5500/.../decorate.png",

                },
                { 
                    uuid: "8d4ebseeerrdd-se3dd71-4499-a643-544e3b2d64f5",
                    mdl_url:"http://106.14.153.11:5500/.../decorate.mdl",
                    xml_url:"http://106.14.153.11:5500/.../decorate.xml",
                    img_url:"http://106.14.153.11:5500/.../decorate.png",
                }

            ]

     }

    
    return res.status(200).json(resource_data[req.query.resource_type]);
     



    // console.log(resource_data[req.query.resource_type]);

    
    


})



module.exports = router;
const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require('./utils/database')
const path = require('path');
const multer = require('multer');
var fs = require('fs');

const auth = require('./middleware/auth');

const ProjectM = require('./models/Project');

const clientOss = require('./utils/aws_oss_config');

const client = clientOss;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
   
const upload = multer(
  { storage: storage}
);
const app = express();
const cors = require('cors');       

//*** swagger */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PGM-Aphro3D Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "PGM",
        url: "https://pgm.com.cn",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5500/api/v1",
      },
    ],
  },
  apis: ["./routers/project/index.js", "./routers/resource/index.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })

);

const PORT = 5500 ||  process.env.PORT;
app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '520mb', extended:false}));


//public folder
let publicFolder = path.join(__dirname, 'public');
let uploadsFolder = path.join(__dirname, 'uploads');
app.use('/public', express.static(publicFolder));
app.use('/my-uploads', express.static(uploadsFolder));

//***************************************************************************************************** */
//router
app.use('/api/v1/auth', require('./routers/auth'));
app.use('/api/v1/user', require('./routers/user'));
app.use('/api/v1/project', require('./routers/project'));
app.use('/api/v1/resource', require('./routers/resource'));
app.use('/api/v1/res-btn-upload', require('./routers/resource/res-uploads/button-upload'));
app.use('/api/v1/res-deco-upload', require('./routers/resource/res-uploads/decoration-upload'));
app.use('/api/v1/res-fab-upload', require('./routers/resource/res-uploads/fab-upload'));
app.use('/api/v1/res-ava-upload', require('./routers/resource/res-uploads/avatar-upload'));
app.use('/api/v1/res-stitch-upload', require('./routers/resource/res-uploads/stitch-upload'));
app.use('/api/v1/res-zip-upload', require('./routers/resource/res-uploads/zip-upload'));
//testing 
app.use('/api/v1/fake-project-data', require('./routers/project/fake-project-model'));

//***************************************************************************************************** */


//init new projects
app.post('/init-project-tb', auth, (req, res) => { 
   //res.json(req.query.id);
   console.log('recivied from token')
   console.log(req.id)

   let newPrj = { 
    uuid:req.query.id, 
    checked: false
   }

   ProjectM.findAll({where: {uuid: req.query.id}})
    .then(pro =>  {
      if (pro[0]) return  res.status(400).json({msg:'data already exiting'});
    
      ProjectM.create(newPrj)
      .then(pro=> {
        if (pro) {
          return  res.status(200).json({msg:'data has been created'});
        }
      }).catch(err => console.log(err));   
      
    })
   

})

//Ava Project file test
app.post('/upload', auth, upload.single('pad_file'),async function (req, res, next) {

  console.log('recivied from token')
  console.log(req.id)
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const progress = (p, _checkpoint) => {
      console.log(p); // Object??????????????????
      console.log(_checkpoint); // ??????????????????????????????
    };

     
    if (req.file) { 
     
      setTimeout(() => {
        return  res.status(200).json({msg: "????????????"});
       }, 2000);
       
        try {
          const fileName = req.file.filename;
          const filePath = req.file.path;      

          const result = await client.multipartUpload("projects-uploads/"+ req.id +"/" + fileName, filePath.replace('\\','/'), {
            progress,
            meta: {
              year: 2021,
              people: 'test',
            },
          });
           // console.log(result);
          //const head =  await client.head('')
          if (result.res.statusMessage === 'OK') {
            console.log(result.res)
            let _uploadFilePath = result.res.requestUrls[0].split('?')
            console.log(_uploadFilePath)

            //uplate current id project field
            ProjectM.update(
            {project_file: _uploadFilePath[0], project_file_name: req.body.project_file_name},{
              where: { 
                uuid: req.query.id
              }
            }).then(result => { 
              //console.log(res[0]);
              if (result[0] === 1) {
                fs.unlink(filePath.replace('\\', '/'), (err) => {
                  if (err) throw err;
                  // if no error, file has been deleted successfully
                  //console.log(result);
                  console.log('File deleted!');
                  // updet 
                  // return res.status(200).json({msg: "????????????"});
                })
              }
            })
        
            // ProjectM.findAll({where: {uuid: req.query.id}})
            //   .then(pro => {
            //       if (!pro[0]){
            //         //Create a new prject item into project table
            //         let newPrj = { 
            //           uuid:req.query.id, 
            //           project_file_name: req.body.project_file_name,
            //           project_file: _uploadFilePath[0],
            //           checked: false
            //         }

            //         ProjectM.create(newPrj)
            //           .then(result=> {
            //             if (result) {
            //               fs.unlink(filePath.replace('\\', '/'), (err) => {
            //                 if (err) throw err;
            //                 // if no error, file has been deleted successfully
            //                 //console.log(result);
            //                 console.log('File deleted!');
            //                 // updet 
            //                 //  return res.status(200).json({msg: "????????????"});
            //               })
            //             }
            //           }).catch(err => console.log(err));    
                      
            //         } else {
            //           //uplate current id project field
            //           ProjectM.update(
            //             {project_file: _uploadFilePath[0], project_file_name: req.body.project_file_name},{
            //               where: { 
            //                 uuid: req.query.id
            //               }
            //             }).then(result => { 
            //               //console.log(res[0]);
            //               if (result[0] === 1) {
            //                 fs.unlink(filePath.replace('\\', '/'), (err) => {
            //                   if (err) throw err;
            //                   // if no error, file has been deleted successfully
            //                   //console.log(result);
            //                   console.log('File deleted!');
            //                   // updet 
            //                  // return res.status(200).json({msg: "????????????"});
            //                 })
            //               }
            //             })
            //         }




              //    })
          } 

          // const result = await client.put

        } catch (err) { 
          console.log(err);
          return res.status(400).json({msg: "Somthing wrong"});

        }

    }



    // console.log(req.file);
    // let image = {
    //    // image_url:`http://${req.headers.host}/my-uploads/${req.file.path.replace("\\","/")}`
    //    // image_url:`http://${req.headers.host}/my-uploads/${req.file.filename}`

    // }
    // res.status(200).json({msg: '????????????'})
  })

//Ava_img file upload test 
app.post('/upload-img', auth, upload.single('image'), async function (req, res, next) { 
  // console.log(req.file);
  console.log('recivied from token')
  console.log(req.id) // user_id

  if (req.file) { 
    try {
      const fileName = req.file.filename;
      const filePath = req.file.path;
      //console.log(filePath.replace('\\', '/'))
      const result = await client.put("projects-uploads/"+ req.id +"/" + fileName, filePath.replace('\\', '/'));
         
        if (result) { 
           console.log(result);   
                           //uplate current id project field
            ProjectM.update(
            {proj_profile: result.url,  proj_profile_name: req.body.proj_profile_name },{
              where: { 
                uuid: req.query.id
              }
            }).then(result => { 
              //console.log(res[0]);
              if (result[0] === 1) {
                fs.unlink(filePath.replace('\\', '/'), (err) => {
                  if (err) throw err;
                  // if no error, file has been deleted successfully
                  //console.log(result);
                  console.log('File deleted!');
                  // updet 
                  return res.status(200).json({msg: "????????????"});
                })
              }
            })
          // ProjectM.findAll({where: {uuid: req.query.id}})
          // .then(pro =>  {
          //     if (!pro[0]) {
          //       //Create a new prject item into project table
          //       let newPrj = { 
          //         uuid:req.query.id,
          //         proj_profile_name: req.body.proj_profile_name,
          //         proj_profile:  result.url,
          //         checked: false
          //       }

          //       ProjectM.create(newPrj)
          //         .then(result=> {
          //           if (result) {
          //             fs.unlink(filePath.replace('\\', '/'), (err) => {
          //               if (err) throw err;
          //               // if no error, file has been deleted successfully
          //               //console.log(result);
          //               console.log('File deleted!');
          //               // updet 
          //               return res.status(200).json({msg: "????????????"});
          //             })
          //           }
          //         }).catch(err => console.log(err));                   

          //     } else {
          //       //uplate current id project field
          //       ProjectM.update(
          //         {proj_profile: result.url,  proj_profile_name: req.body.proj_profile_name },{
          //           where: { 
          //             uuid: req.query.id
          //           }
          //         }).then(result => { 
          //           //console.log(res[0]);
          //           if (result[0] === 1) {
          //             fs.unlink(filePath.replace('\\', '/'), (err) => {
          //               if (err) throw err;
          //               // if no error, file has been deleted successfully
          //               //console.log(result);
          //               console.log('File deleted!');
          //               // updet 
          //               return res.status(200).json({msg: "????????????"});
          //             })
          //           }
          //         })
          //     }
   
          // })
        }
    } catch (e)  { 
      console.log(e);
      return res.status(400).json({msg: "Somthing wrong"});
    }   
  }
  
  // res.status(200).json({msg: "????????????"});    
})

//upload project 3d image
app.post('/upload-img3d', auth, upload.single('image3d'), async function(req, res, next) {
  // console.log(req.file);
  console.log('recivied id from token')
  console.log(req.id)

  if (req.file) { 
    try {
      const fileName = req.file.filename;
      const filePath = req.file.path;
      //console.log(filePath.replace('\\', '/'))
      const result = await client.put("projects-uploads/"+ req.id +"/" + fileName, filePath.replace('\\', '/'));
         
        if (result) { 
           console.log(result); 
          //uplate current id project field
          ProjectM.update(
          {proj_profile_3d: result.url, proj_profile_3d_name: req.body.proj_profile_3d_name},{
            where: { 
              uuid: req.query.id
            }
          }).then(result => { 
            //console.log(res[0]);
            if (result[0] === 1) {
              fs.unlink(filePath.replace('\\', '/'), (err) => {
                if (err) throw err;
                // if no error, file has been deleted successfully
                //console.log(result);
                console.log('File deleted!');
                // updet 
                return res.status(200).json({msg: "????????????"});
              })
            }
          })  
          // ProjectM.findAll({where: {uuid: req.query.id}})
          // .then(pro =>  {
          //     if (!pro[0]) {
          //       //Create a new prject item into project table
          //       let newPrj = { 
          //         uuid: req.query.id,
          //         proj_profile_3d_name: req.body.proj_profile_3d_name,
          //         proj_profile_3d: result.url,
          //         checked: false
          //       }

          //       ProjectM.create(newPrj)
          //         .then(result=> {
          //           if (result) {
          //             fs.unlink(filePath.replace('\\', '/'), (err) => {
          //               if (err) throw err;
          //               // if no error, file has been deleted successfully
          //               //console.log(result);
          //               console.log('File deleted!');
          //               // updet 
          //               return res.status(200).json({msg: "????????????"});
          //             })
          //           }
          //         }).catch(err => console.log(err));                   

          //     } else {
          //       //uplate current id project field
          //       ProjectM.update(
          //         {proj_profile_3d: result.url, proj_profile_3d_name: req.body.proj_profile_3d_name},{
          //           where: { 
          //             uuid: req.query.id
          //           }
          //         }).then(result => { 
          //           //console.log(res[0]);
          //           if (result[0] === 1) {
          //             fs.unlink(filePath.replace('\\', '/'), (err) => {
          //               if (err) throw err;
          //               // if no error, file has been deleted successfully
          //               //console.log(result);
          //               console.log('File deleted!');
          //               // updet 
          //               return res.status(200).json({msg: "????????????"});
          //             })
          //           }
          //         })
          //     }
   
          // })
        }
    } catch (e)  { 
      console.log(e);
      return res.status(400).json({msg: "Somthing wrong"});
    }   
  }
  
}) 



//***************************************************************************************************** */

//main root
app.use('/', (req, res) =>  {
    res.status(200).json({msg: 'Welcome to PGM Aphoro3D Api'});
});


//listen port 5500
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
sequelize.sync().then(result => {
    console.log(result);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch(err => {console.log(err);})
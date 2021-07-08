const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require('./utils/database')
const path = require('path');
const multer = require('multer');
const co = require('co');
const OSS = require('ali-oss');
var fs = require('fs');

const ProjectM = require('./models/Project');

const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'LTAI4G4tqE9gYvgWzxXknjAu',
  accessKeySecret: 'ddTXBZVakDj2UNdoQoChafs6PdSFC8',
  bucket: 'pgm-aphro3d-server-uploads',
  //endpoint: 'oss-cn-shanghai.aliyuncs.com',
  endpoint: 'oss-accelerate.aliyuncs.com',
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
   
const upload = multer({ storage: storage});
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

//testing 
app.use('/api/v1/fake-project-data', require('./routers/project/fake-project-model'));

//***************************************************************************************************** */

//Ava Project file test
app.post('/upload', upload.single('ava_file'),async function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    if (req.file) { 
        try {
          const fileName = req.file.filename;
          const filePath = req.file.path;      
          
          // console.log(fileName)
          // console.log(filePath)

          const result = await client.put(fileName, filePath.replace('\\','/'));
          if (result) {
            console.log(result)
            ProjectM.findAll({where: {uuid: req.query.id}})
              .then(pro => {
                  if (!pro[0]){
                    //Create a new prject item into project table
                    let newPrj = { 
                      uuid:req.query.id, 
                      project_file: result.url,
                      proj_profile: "http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/1625729574227-man.png",
                      checked: false
                    }

                    ProjectM.create(newPrj)
                      .then(result=> {
                        if (result) {
                          fs.unlink(filePath.replace('\\', '/'), (err) => {
                            if (err) throw err;
                            // if no error, file has been deleted successfully
                            //console.log(result);
                            console.log('File deleted!');
                            // updet 
                            return res.status(200).json({msg: "创建成功"});
                          })
                        }
                      }).catch(err => console.log(err));    
                      
                    } else {
                      //uplate current id project field
                      ProjectM.update(
                        {project_file: result.url},{
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
                              return res.status(200).json({msg: "保存成功"});
                            })
                          }
                        })
                    }




                  })
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
    // res.status(200).json({msg: '保存成功'})
  })

//Ava_img file upload test 
app.post('/upload-img', upload.single('image'), async function (req, res, next) { 
  console.log(req.file);
  
  if (req.file) { 
    try {
      const fileName = req.file.filename;
      const filePath = req.file.path;
      //console.log(filePath.replace('\\', '/'))
      const result = await client.put(fileName, filePath.replace('\\', '/'));
         
        if (result) { 
           console.log(result);   
          ProjectM.findAll({where: {uuid: req.query.id}})
          .then(pro =>  {
              if (!pro[0]) {
                //Create a new prject item into project table
                let newPrj = { 
                  uuid:req.query.id,
                  project_file: "http://aphro3d-web-pc-uploads.oss-cn-shanghai.aliyuncs.com/A_Style_Skirt.pvd",
                  proj_profile:  result.url,
                  checked: false
                }

                ProjectM.create(newPrj)
                  .then(result=> {
                    if (result) {
                      fs.unlink(filePath.replace('\\', '/'), (err) => {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        //console.log(result);
                        console.log('File deleted!');
                        // updet 
                        return res.status(200).json({msg: "创建成功"});
                      })
                    }
                  }).catch(err => console.log(err));                   

              } else {
                //uplate current id project field
                ProjectM.update(
                  {proj_profile: result.url},{
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
                        return res.status(200).json({msg: "保存成功"});
                      })
                    }
                  })
              }
   
          })
        }
    } catch (e)  { 
      console.log(e);
      return res.status(400).json({msg: "Somthing wrong"});
    }   
  }
  
  // res.status(200).json({msg: "保存成功"});    
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
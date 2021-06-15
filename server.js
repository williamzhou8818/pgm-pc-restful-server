const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require('./utils/database')
const path = require('path');
const multer = require('multer');
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
// app.use('/', express.static(publicFolder));
app.use('/my-uploads', express.static(uploadsFolder));

//***************************************************************************************************** */
//router
app.use('/api/v1/auth', require('./routers/auth'));
app.use('/api/v1/user', require('./routers/user'));
app.use('/api/v1/project', require('./routers/project'));
app.use('/api/v1/resource', require('./routers/resource'));

//***************************************************************************************************** */

//Image upload test
app.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    let image = {
       // image_url:`http://${req.headers.host}/my-uploads/${req.file.path.replace("\\","/")}`
        image_url:`http://${req.headers.host}/my-uploads/${req.file.filename}`

    }
    res.status(200).json(image)
  })
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
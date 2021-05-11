const express = require('express');
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



const PORT = 5500 ||  process.env.PORT;
app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '520mb', extended:false}));


//public folder
let publicFolder = path.join(__dirname, 'public');
let uploadsFolder = path.join(__dirname, 'uploads');
// app.use('/', express.static(publicFolder));
app.use('/my-uploads', express.static(uploadsFolder));


//router
app.use('/api/v1/auth', require('./routers/auth'));
app.use('/api/v1/user', require('./routers/user'));


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
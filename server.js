const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');



const PORT = 5500 ||  process.env.PORT;
app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '520mb', extended:false}));

//public folder
let publicFolder = path.join(__dirname, 'public');
app.use('/', express.static(publicFolder));


//router
app.use('/api/v1/auth', require('./routers/auth'));
app.use('/api/v1/user', require('./routers/user'));

//main root
app.use('/', (req, res) =>  {

    res.status(200).json({msg: 'Welcome to PGM Aphoro3D Api'});
});
//listen port 5500
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




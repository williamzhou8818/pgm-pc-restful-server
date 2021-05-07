const express = require('express');
const app = express();
const cors = require('cors');



const PORT = 5500 ||  process.env.PORT;
app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '520mb', extended:false}));

app.use('/', (req, res) =>  {
    res.status(200).json({msg: 'Welcome to PGM Aphoro3D Api'});
});

//listen port 5500
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




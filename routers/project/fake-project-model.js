const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const FakeProjectModel =  require('../../models/FakeProjectModel');




/*************************************************************/
//Testing Get fake project data

/************************************************************* */
router.get('/', (req, res) => { 
    FakeProjectModel.findAll({})
    .then(result => { 
        if (result) {
            return res.status(200).json(result);
        }
    }).catch(err => { 
        return res.status(500).send('Server Error');
    }) 

})



/***************************************************************** */
/**Post_ Create a fake project data */
router.post('/', (req, res) => {
    const _fakeData =  { 
        uuid: uuid.v4(), 
        name: 'StyleSix',
        img_url: 'http://pgm-aphro3d-server-uploads.oss-accelerate.aliyuncs.com/84b351-afb7-a17e-f633-1c5416a1b6a.png',
        checked: false
    }

    FakeProjectModel.create(_fakeData)
        .then(result => { 
            if (result) { 
                return res.status(201).json(result);
            }
        }).catch(err =>  {
            return  res.status(500).send('Server Error');
        })

})


/**************************************************************** */


module.exports = router;
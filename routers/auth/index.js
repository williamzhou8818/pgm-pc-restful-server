
const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');



/**
 * @route  GET api/auth
 * @desc   Get logged  in user
 * @access Private
 */
 let  ip;
 require('dns').lookup(require('os').hostname(), function (err, add, fam) {
     console.log('addr: ' + add);
     ip = add;
 })


 router.get('/', (req, res) => { 

    const tempObj = [
        {
            user_id: uuidv4(),
            local_ip: ip,
            port: "5500",
            title: "test one"
         },
         {
            user_id: uuidv4(),
            local_ip: ip,
            port: "5500",
            image: `http://${req.headers.host}/00005-00.png`,
            title: "test two"
         },

    ]

    res.status(200).json({auth: tempObj });

})



module.exports = router;

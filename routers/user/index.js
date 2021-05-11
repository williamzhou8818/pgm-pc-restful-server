
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

//Test register user with ip, mac, and user_id from pc
router.post('/', (req, res) => { 
    const { user_id, address, mac} = req.body;
    //need to check userid 
    //if now user exitting save create new new 
    const payload = { 
        user: {
            id: user_id,
            uuid: uuidv4(),
            address: address,
            mac: mac
        }
    }

    jwt.sign(payload, 'dogrRuning', {
        expiresIn: 3600,
    }, (err, token) => { 
        if (err) throw err; 
        res.json({token});
    });
}) 

module.exports = router;

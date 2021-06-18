
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
const { check, validationResult } =  require('express-validator/check');
const {v4: uuidv4} = require('uuid');
const UserPc = require('../../models/UserPc');


//****************************************************************************** */

/**
 * @route  GET api/auth
 * @desc   Get logged in for pc user
 * @access Private
 */
router.post('/', [
    check('email', 'Please include a valid email').isEmail(), 
    check('password', 'Password is required').exists()
], (req, res) => { 
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) { 
    return res.status(400).json({errors: errors.array()});
  }

  const { email, poassword , address, mac } = req.body;

  try { 

    // import pc user db model
    UserPc.findAll({where: {email: email}})
        .then(user => {
            if (!user[0]) { 
                return res.status(400).send('Invalid Credentials');
            }

            //todo: check pc user is right pc user 
            //
            const payload =  { 
                userpc: {
                    id: user[0].uuid,
                    full_name: user[0].full_name
                }
            }

            jwt.sign(payload, 'dogrRun', {
                expiresIn:  3600,
            }, (err, token) => {
                if (err) throw err;
                res.json({token})
            });

        })

  } catch (err) { 
    console.log(err.message);
    res.status(500).send('Server Error');
  }

})



//**test create a test pc user */
router.post("/create-pcuser", (req, res) => { 
   //  const salt = await bcrypt.genSalt(10);
   
    let _pcUser = { 
        uuid: uuidv4(),
        full_name: "william zhou",
        email: "test@test.com",
        password: "123456"
    }

    try { 

        UserPc.create(_pcUser)
            .then(result => { 
                if (result) { 
                    res.send('user success been created');
                }
            })



    } catch (err) { 
        console.log(err);
    }

})


//****************************************************************************** */








module.exports = router;

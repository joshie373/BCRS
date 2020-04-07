const express = require('express');
const User = require('../db_models/user');
const bcrypt = require('bcryptjs');

//configs
const router = express.Router();

//user Sign-in
router.post('/signin',function(req,res,next){
    User.findOne({'username': req.body.username},function(err,user){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(user);

            //checks if user already exists
            if(user){
                let passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

                if (passwordIsValid){
                    res.status(200).send({
                        type: 'success',
                        auth: true, 
                        username: user.username,
                        time_stamp: new Date()
                    });
                }else{
                    console.log(`The password for username: ${req.body.username} is invalid`);
                    res.status(401).send({
                        type: 'error',
                        text: `invalid username and/or password, please try again`,
                        auth: false,
                        time_stamp: new Date()
                    });
                }
            }
        }
    })
});
module.exports = router;
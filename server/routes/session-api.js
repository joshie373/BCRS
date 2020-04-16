const express = require('express');
const User = require('../db_models/user');
const bcrypt = require('bcryptjs');

//configs
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashtag algorithm


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
                        text: `Check your password and try again!`,
                        auth: false,
                        time_stamp: new Date()
                    });
                }
            }else{
                console.log(`The  username: ${req.body.username} is not found`);
                res.status(401).send({
                    type: 'error',
                    text: `The  username: ${req.body.username} is not found!`,
                    auth: false,
                    time_stamp: new Date()
                });
            }
        }
    })
});
module.exports = router;


//createUser
router.post('/register',function(req,res,next){
    let hashedPassword = bcrypt.hashSync(req.body.password,saltRounds); //salt/hash the password

    let u = {
        username: req.body.username,
        password: hashedPassword, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email:req.body.email,
        securityQuestions: req.body.securityQuestions
    };

    User.create(u,function(err,newUser){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(newUser);

            res.status(200).send({
                type: 'success',
                auth: true,
                username: newUser.username,
                time_stamp: new Date()
            })
        }
    })
});

//verifyUser
router.get('/verify/users/:username', function (req, res, next) {
    User.findOne({ 'username': { $regex : `^${req.params.username}$`,$options:'i' }}, function (err, user) {
      if (err) {
        console.log('session api', err);
        return next(err);
      } else {
        console.log('session api', user);
        res.json(user);
      }
    })
  })

//resetPassword
router.post('/users/:username/reset-password', function (req, res, next) {
    const password = req.body.password;

    User.findOne({'username': req.params.username}, function (err, user) {
        if (err) {
            console.log(err);
            reutrn next(err);
        } else {
            console.log(user);

            let hashedPassword = bcrypt.hashSync(password, saltRounds);

            user.set ({
                password: hashedPassword
            });
            
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    res.json(user);
                }
            })
        }
    })
});

module.exports = router;
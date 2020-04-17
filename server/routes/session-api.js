const express = require('express');
const User = require('../db_models/user');
const bcrypt = require('bcryptjs');

//configs
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashtag algorithm


//user Sign-in
router.post('/signin',function(req,res,next){ // post request
    User.findOne({'username': req.body.username},function(err,user){ // uses User model and finds one username (which is unique) of the users
        if(err){
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        }else{
            console.log(user); // logs the securityQuestions to the console

            //checks if user already exists
            if(user){
                let passwordIsValid = bcrypt.compareSync(req.body.password,user.password); // encrypts the requested body's password

                if (passwordIsValid){ // if the password is valid
                    res.status(200).send({ // sends a success status
                        type: 'success',
                        auth: true, // authorized
                        username: user.username,
                        time_stamp: new Date() // notes the date
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
            return next(err);
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

//verify security questions
router.post('/verify/users/:username/security-questions', function (req, res, next) {
  const answerSQ1 = req.body.answerSQ1.trim().toLowerCase();
  const answerSQ2 = req.body.answerSQ2.trim().toLowerCase();
  const answerSQ3 = req.body.answerSQ3.trim().toLowerCase();
  User.findOne({ 'username': { $regex : `^${req.params.username}$`,$options:'i' }}, function (err, user) {
    if (err) {
      console.log('session api', err);
      return next(err);
    } else {
      console.log('session api', user);
      let validAnswer1 = answerSQ1 === user.securityQuestions[0].answer.trim().toLowerCase();
      let validAnswer2 = answerSQ2 === user.securityQuestions[1].answer.trim().toLowerCase();
      let validAnswer3 = answerSQ3 === user.securityQuestions[2].answer.trim().toLowerCase();
      console.log('session api', validAnswer1, validAnswer2, validAnswer3)
      if (validAnswer1 && validAnswer2 && validAnswer3) {
        res.status(200).send({
          type: 'success',
          auth: true
        })
      } else {
        res.status(200).send({
          type: 'error',
          auth: false
        })
      }
    }
  })
});

const express = require('express');
const User = require('../db_models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();
const saltRounds = 10; //default salt rounds for hashtag algorithm


//FindAll
router.get('/',function(req,res,next){
    User.find({}).where('isDisabled').equals(false).exec(function(err,users){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(users);
            res.json(users);
        }
    })
});

//findById
router.get('/:id',function(req,res,next){
    User.findOne({'_id': req.params.id},function(err,user){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(user);
            res.json(user);
        }
    })
});

//updateUser
router.put('/:id',function(req,res,err){
    User.findOne({'_id': req.params.id},function(err,user){
        if(err){
            console.log(err);
            return next(err);
        }else{

            user.set({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                role: req.body.role,
                securityQuestions: req.body.securityQuestions
            });

            user.save(function(err,savedUser){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    console.log(savedUser);
                    res.json(savedUser);
                }
            })
        }
    })
});

//deleteUser
router.delete('/:id',function(req,res,next){
    User.findOne({'_id': req.params.id},function(err,user){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(err);

            if(user) {
                user.set({
                    isDisabled: true
                });

                user.save(function(err,savedUser){
                    if(err){
                        console.log(err);
                        return next(err);
                    }else{
                        console.log(savedUser);
                        res.json(savedUser);
                    }
                })
            }
        }
    })
});

//getUserRole
router.get('/:username/role', (request, response) => {
    // Declare the username and get the value off the url if it exists
    var username = request.params && request.params.username ? request.params.username : null;

    // if the username was not defined then return a bad request response
    if (!username) {
      // set the status code to 400, bad request and send a message
      response.status(400).send('Request is invalid or missing the username.');
    } else {
      // Using the findOne method of the user model return a role based on provided username
      User.findOne({ 'username': { $regex : `^${username}$`,$options:'i' } }, (err, user) => {
        // if there is an error
        if (err) {
          // log the error to the console
          console.log('users api', 'An error occurred finding that username', err);
          // return an http status code 500, server error and the error
          response.status(500).send(err);
        } else {
          // return user role
          console.log('users api', user);
          response.status(200).json(user.role);
        }
      });
    }
});

//getUserId
router.get('/:username/id', (request, response) => {
    // Declare the username and get the value off the url if it exists
    var username = request.params && request.params.username ? request.params.username : null;

    // if the username was not defined then return a bad request response
    if (!username) {
      // set the status code to 400, bad request and send a message
      response.status(400).send('Request is invalid or missing the username.');
    } else {
      // Using the findOne method of the user model return a role based on provided username
      User.findOne({ 'username': { $regex : `^${username}$`,$options:'i' } }, (err, user) => {
        // if there is an error
        if (err) {
          // log the error to the console
          console.log('users api', 'An error occurred finding that username', err);
          // return an http status code 500, server error and the error
          response.status(500).send(err);
        } else {
          // return user role
          console.log('users api', user);
          response.status(200).json(user._id);
        }
      });
    }
});

//FindSelectedSecurityQuestions
router.get('/:username/security-questions', (request, response) => { // get request
  var username;
  if (request.params && request.params.username) { // if the username exists and contains the word username
    username = request.params.username; // sets the username variable to whatever is present
  } else {
    username = null; // otherwise set it to null
  }

  if (!username) {
    response.status(400).send('Request is invalid or missing the username.');
  } else {
    User.findOne({ 'username': username }, (err, user) => { // finds one username
      // if there is an error
      if (err) {
        // log the error to the console
        console.log('users api', 'An error occurred finding that username', err);
        // return an http status code 500, server error and the error
        response.status(500).send(err);
      } else {
        // return security questions
        console.log('users api', user);
        response.status(200).json(user.securityQuestions);
      }
    });
  }
});
module.exports = router;

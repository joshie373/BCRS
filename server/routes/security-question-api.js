const express = require('express'); // requires express
const SecurityQuestion = require('../db_models/security-question'); // requires security question model

router = express.Router();

//FindAllSecurityQuestions
router.get('/', function(req,res,next){ // get request
    SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err,securityQuestions){ // uses SecurityQuestion model to find anything that isn't disabled and invokes a function
        if(err){
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        }
        else{
            console.log(securityQuestions); // logs the securityQuestions to the console
            res.json(securityQuestions); // wraps the securityQuestions in a json object and returns it
        }
    })
});

//findById
router.get('/:id', function(req,res,next){ // get request
    SecurityQuestion.findOne({'_id':req.params.id},function(err,securityQuestion){ // uses SecurityQuestion model and finds one id of the security questions
        if(err){
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        }
        else{
            console.log(securityQuestion); // logs the securityQuestions to the console
            res.json(securityQuestion); // wraps the securityQuestions in a json object and returns it
        }
    })
});

//CreateSecurityQuestion
router.post('/', function(req,res,next){ // post request
    let = sq = { // creates an object
        text: req.body.text // key:value pair where text will be the request's body text
    };
    SecurityQuestion.create(sq,function(err,securityQuestion){ // uses SecurityQuestion model to create a new security question based on the variable made above
        if(err){
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        }
        else{
            console.log(securityQuestion); // logs the securityQuestions to the console
            res.json(securityQuestion); // wraps the securityQuestions in a json object and returns it
        }
    })
});

//updateSecurityQuestion
router.put('/:id', function(req,res,next){ // put request (update)

    SecurityQuestion.findOne({'_id':req.params.id},function(err,securityQuestion){ // uses SecurityQuestion model and finds one id of the security questions
        if(err){
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        }
        else{
            console.log(securityQuestion); // logs the securityQuestions to the console
            securityQuestion.set({ // updates a securityQuestion
                text: req.body.text // changes the text field to the requested body's text
            });


            securityQuestion.save(function(err,securityQuestion){ // saves the changes made to the security question
                if(err){
                    console.log(err); // returns an error
                    return next(err); // jumps to the next task
                }
                else{
                    console.log(securityQuestion); // logs the securityQuestions to the console
                    res.json(securityQuestion); // wraps the securityQuestions in a json object and returns it
                }
            })
        }
    })
});

//deleteSecurityQuestion
router.delete('/:id', function(req,res,next){ // delete request
    SecurityQuestion.findOne({'_id': req.params.id},function(err,securityQuestion){ // uses SecurityQuestion model and finds one id of the security questions
        if(err){
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        }
        else{
            console.log(securityQuestion); // logs the securityQuestions to the console
            if(securityQuestion){
                securityQuestion.set({ // updates a securityQuestion
                    isDisabled:true // disabled the securityQuestion
                });
                securityQuestion.save(function(err,savedSecurityQuestion){ // saves the changes made to the security question
                    if(err){
                        console.log(err); // returns an error
                        return next(err); // jumps to the next task
                    }
                    else{
                        console.log(savedSecurityQuestion); // logs the securityQuestions to the console
                        res.json(savedSecurityQuestion); // wraps the securityQuestions in a json object and returns it
                    }
                })
            }
        }
    });
});

//FindSelectedSecurityQuestions
router.get('/:username/security-questions', function (req, res, next) { // get request
    User.findOne({'username': req.params.username}, function (err, user) { // uses User model and finds one username (which is unique) of the users
        if (err) {
            console.log(err); // returns an error
            return next(err); // jumps to the next task
        } else {
            console.log(user); // logs the securityQuestions to the console
            res.json(user.securityQuestions); // wraps the securityQuestions in a json object and returns it
        }
    })
});

//findSecurityQuestionsByIds
// this is a post request: findByIds
router.post('/find-by-ids', function(req, res, next) {
  const question1 = req.body.question1; // data sent from question 1 form field
  const question2 = req.body.question2; // data sent from question 2 form field
  const question3 = req.body.question3; // data sent from question 3 form field

  SecurityQuestion.find({ // uses SecurityQuestion model
    $or: [  // iterates through an array to find all questions
      {'_id': question1},
      {'_id': question2},
      {'_id': question3},
    ]
  }).exec(function (err, securityQuestions) { // executes a database call to return either an error or success data
    if (err) {
      console.log('security-questions api', err); // logs an error to the console
      return next(err); // moves onto the next task
    } else {
    // return the security questions in the proper order
      const questions = [ // creates an array of objects
        {
          id:req.body.question1, // assigns an id to the data sent from question 1 form field
          text: '' // assigns a text key with an empty string
        },
        {id:req.body.question2, text: '' },
        {id:req.body.question3, text: '' }
      ];

      // we need to return the questions in the proper order
      questions.forEach((question) => { // for every object in the array (every question in the database)
        // find the question that matches the id
        const matchedQuestion = securityQuestions.find((securityQuestion) => {
          return securityQuestion.id === question.id;
        });
        if(matchedQuestion){
            question.text = matchedQuestion.text; // assigns the matched question text to mq.text
        }
      })

      console.log(securityQuestions); // logs the matched security questions to the console
      res.status(200).json(questions); // responds with a success status and wraps the questions selected by ids as a json object and returns it
    }
  })
});

module.exports = router; // exports the module

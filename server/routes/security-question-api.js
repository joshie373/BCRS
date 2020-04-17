const express = require('express');
const SecurityQuestion = require('../db_models/security-question');

router = express.Router();

//FindAllSecurityQuestions
router.get('/', function(req,res,next){
    SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err,securityQuestions){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(securityQuestions);
            res.json(securityQuestions);
        }
    })
});

//findById
router.get('/:id', function(req,res,next){
    SecurityQuestion.findOne({'_id':req.params.id},function(err,securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(securityQuestion);
            res.json(securityQuestion);
        }
    })
});

//CreateSecurityQuestion
router.post('/', function(req,res,next){
    let = sq = {
        text: req.body.text
    };
    SecurityQuestion.create(sq,function(err,securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(securityQuestion);
            res.json(securityQuestion);
        }
    })
});

//updateSecurityQuestion
router.put('/:id', function(req,res,next){

    SecurityQuestion.findOne({'_id':req.params.id},function(err,securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(securityQuestion);
            securityQuestion.set({
                text: req.body.text
            });


            securityQuestion.save(function(err,securityQuestion){
                if(err){
                    console.log(err);
                    return next(err);
                }
                else{
                    console.log(securityQuestion);
                    res.json(securityQuestion);
                }
            })
        }
    })
});

//deleteSecurityQuestion
router.delete('/:id', function(req,res,next){
    SecurityQuestion.findOne({'_id': req.params.id},function(err,securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(securityQuestion);
            if(securityQuestion){
                securityQuestion.set({
                    isDisabled:true
                });
                securityQuestion.save(function(err,savedSecurityQuestion){
                    if(err){
                        console.log(err);
                        return next(err);
                    }
                    else{
                        console.log(savedSecurityQuestion);
                        res.json(savedSecurityQuestion);
                    }
                })
            }
        }
    });
});

//FindSelectedSecurityQuestions
router.get('/:username/security-questions', function (req, res, next) {
    User.findOne({'username': req.params.username}, function (err, user) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log(user);
            res.json(user.securityQuestions);
        }
    })
});
module.exports = router;

//findSecurityQuestionsByIds
router.post('/find-by-ids', function(req, res, next) {
  const question1 = req.body.question1;
  const question2 = req.body.question2;
  const question3 = req.body.question3;
  SecurityQuestion.find({
    $or: [
      {'_id': question1},
      {'_id': question2},
      {'_id': question3},
    ]
  }).exec(function (err, securityQuestions) {
    if (err) {
      console.log('security-questions api', err);
      return next(err);
    } else {
    // return the security questions in the proper order
      const questions = [
        {id:req.body.question1, text: '' },
        {id:req.body.question2, text: '' },
        {id:req.body.question3, text: '' }
      ];

      // we need to return the questions in the proper order
      questions.forEach((question) => {
        // find the question that matches the id
        const matchedQuestion = securityQuestions.find((securityQuestion) => {
          return securityQuestion.id === question.id;
        });
        if(matchedQuestion){
            question.text = matchedQuestion.text;
        }
      })

      console.log(securityQuestions);
      res.status(200).json(questions);
    }
  })
});

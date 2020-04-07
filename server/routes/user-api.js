const express = require('express');
const User = require('../db_models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();
const saltRounds = 10; //default salt rounds for hashtag algorithm


//FindAll
router.get('/',function(req,res,next){
    User.find({}).where(isDisabled).equals(false).exec(function(err,users){
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

//createUser
router.post('/',function(req,res,next){
    let hashedPassword = bcrypt.hashSync(req.body.password,saltRounds); //salt/hash the password

    let u = {
        username: req.body.username,
        password: hashedPassword, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email:req.body.email
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
                role: req.body.role
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
module.exports = router;

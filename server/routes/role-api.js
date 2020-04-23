const express = require('express');
const Role = require('../db_models/role');

const router = express.Router();


//findAllRoles
router.get('/',function(req,res,next){
    Role.find({},function(err,roles){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(roles);
            res.json(roles);
        }
    });
});

//findRoleById
router.get('/:roleId',function(req,res,next){
    Role.findOne({'_id': req.params.roleId},function(err,role){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(role);
            res.json(role);
        }
    });
});

//createRole
router.post('/',function(req,res,next){
    const r = {
        text: req.body.text
    };

    Role.create(r,function(err,role){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(role);
            res.json(role);
        }
    });
});

//updateRole
router.put('/:roleId',function(req,res,next){
    Role.findOne({'_id':req.params.roleId}, function(err,role){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(role);

            role.set({
                text: req.body.text
            });

            role.save(function(err,role){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    console.log(role);
                    res.json(role);
                }
            });
        }
    });
});

//deleteRole
router.delete('/:roleId',function(req,res,next){
    Role.findByIdAndDelete({'_id': req.params.roleId},function(err,role){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(role);
            res.json(role);
        }
    });
});

module.exports = router;


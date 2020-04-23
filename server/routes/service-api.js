const express = require('express');
const Service = require('../db_models/service');

router = express.Router();

//findAllServices
router.get('/', function (req, res, next) {
    Service.find({}, function (err, services) {
      if (err) {
        console.log('service api', err);
        return next(err);
      } else {
        console.log('service api', services);
        res.json(services);
      }
    });
});

//findById
router.get('/:id', function(req,res,next){ 
    Service.findOne({'_id':req.params.id},function(err,service){ 
        if(err){
            console.log(err); 
            return next(err); 
        }
        else{
            console.log(service); 
            res.json(service); 
        }
    })
});

//CreateService
router.post('/', function(req,res,next){ 
    let = serv = { 
        title: req.body.title,
        id: req.body.id,
        price: req.body.price
    };
    Service.create(serv,function(err,service){ 
        if(err){
            console.log(err); 
            return next(err); 
        }
        else{
            console.log(service); 
            res.json(service); 
        }
    })
});

//updateService
router.put('/:serviceId', function(req,res,next){ 
    Service.findOne({'_id':req.params.serviceId},function(err,service){ 
        if(err){
            console.log(err); 
            return next(err); 
        }
        else{
            console.log(service); 
            service.set({ 
                title: req.body.title,
                price: req.body.price
            });


            service.save(function(err,service){ 
                if(err){
                    console.log(err); 
                    return next(err); 
                }
                else{
                    console.log(service); 
                    res.json(service); 
                }
            })
        }
    })
});

//deleteService
router.delete('/:serviceId',function(req,res,next){
    Service.findByIdAndDelete({'_id': req.params.serviceId},function(err,service){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(service);
            res.json(service);
        }
    });
});

module.exports = router;
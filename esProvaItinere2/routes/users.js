var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//var shortid = require('shortid');

var User = require('../models/user');

router.use(function(req,res,next){
  if(req.query.t && req.query.t==="mike") {
      next()
  }
  else{
    res.status(401).json({error:"Token not valid"});
  }
});

router.get('/',function(req, res) {
        User.find({}).exec(function (err ,users) {
            console.log("err:", err);
            if (err) return res.status(500).json({error: err});
            res.json(users);

        })
});


router.get('/:id', function(req, res, next) {
  User.find({id:req.params.id}),function(err,users){

    if (!users) return res.status(404).json({error:"user not found"});
    res.status(200).json(users);
  }
});

router.post('/',function(req,res,next){
    var newUser = new User(req.body);

    newUser.save(function(err){
      if(err) return res.status(500).json({error:err});
      res.status(201).json(req.body);
    })
})

router.put('/:id',function(req,res,next){
  User.find({id:req.params.id},function(err,users){
    if(!users) return res.status(404).json({message:"user not found"});

    for(var i=0;i<users.length;i++){
      users[i]=req.body;
    }
    users.save(function(err){
      if(err) return res.status(500).json({error:err});
      res.json(users);
    })
  })
})

router.delete('/:id',function(req,res,next){
  User.remove({id:req.params.id},function(err){
    if(!users) return res.status(404).json({err:"user not found"});
    res.json({message:'user deleted'});
  })
})
module.exports = router;

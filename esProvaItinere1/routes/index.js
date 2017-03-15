var express = require('express');
var router = express.Router();
var shortid= require('shortid');

var middlewareToken = function(req,res,next){
  if(req.query.x && req.query.x==="pippo"){
    next();
  }
  else{
    res.status(401).json({error:"Token not valid"});
  }
}

router.get('/', function(req, res, next) {
  res.json(users);
});

router.get('/:id',function(req,res,next) {
    console.log(req.params.id);
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            return res.json(users[i]);
        }
    }
    res.json(404,{error:"not found element"});
})

router.post('/', middlewareToken , function(req,res,next){
    req.body.id=shortid.generate();
    users.push(req.body);
    //console.log("sono qui");
    //console.log(req.body);
    //res.json({message:"ok"});
    //users.push("_id:shortid.generate()");
    res.status(201).json(req.body);
});

router.put('/:id',middlewareToken , function(req,res,next) {
    /*for(var i=0;i<users.length;i++){
        if(users[i].id==req.params.id){
            users[i]=req.body;
        }
    }*/
    for (key in req.params.id) {//for Hash : cicla i campi nel body della request
        users.push(req.body);
    }
    res.status(201).json(req.body);
})

router.delete('/:id',middlewareToken , function(req,res,next) {
    console.log(req.params.id);
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            users.splice(i,1);
            return res.json(users[i]);
        }
    }
    res.json(404,{error:"Not found element"});

})
module.exports = router;

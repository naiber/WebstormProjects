var express = require('express');
var router = express.Router();
//var p=Math.pow();
/* GET home page. */

router.use(function(req,res,next){
  /*console.log(req.query.x);
  req.val=parseInt(req.query.x)%2;
  console.log(req.val);*/
  if(req.query.x && isNaN(req.query.x) && parseInt(req.query.x)%2==0) {
    next();
  }
  else{
    res.status(401).send({error:"Token not valid"});
  }
})

router.get('/',
    function(req, res, next) {
      console.log("sono qui dentro");
      res.json(req.query.x);
});

router.get('/square',function(req,res,next){
  res.status(200).json("il quadrato di "+req.query.x+" è : "+Math.pow(req.query.x,2));
    }
)

router.get('/cube',function(req,res,next){
      res.status(200).json("il cubo di "+req.query.x+" è : "+Math.pow(req.query.x,3));
    }
)

module.exports = router;

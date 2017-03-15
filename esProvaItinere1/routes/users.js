var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req,res,next){
  console.log("sono qui");
  console.log(req.body);
  res.json({message:"ok"});
  //users.push("_id:shortid.generate()");
})

module.exports = router;

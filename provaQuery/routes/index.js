var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',function (req,res,next) {

  if(!req.query) return res.status(404).json({message:'resources not found'});

  if(req.query.token==='Mike'/*&&req.query.appid==='ok'*/){

    res.status(200).send('user authorized');

    /*switch (req.query.appid){
      case 'resToken':
        res.send(req.query.token)
            break;
      case 'resAppId':
        res.send(req.query.appid)
            break;
    }*/


  }
  else {
    res.status(401).send('user unauthorized');
  }
});

router.get('/:id', function(req, res, next) {

  if(!req.query) return res.status(404).json({message:'resources not found'});

  var id=req.params.id;

  if(isNaN(id)){
    res.send('not a number');
  }
  else if(id>=10&&id<=20){
    res.status(200).send('ok');
  }
  else {
    res.status(401).send('not found');
  }
});

module.exports = router;

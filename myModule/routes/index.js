var express = require('express');
var router = express.Router();
var moment = require('moment');
var ad= require('../modules/cmodule');

/* GET home page. */

router.get('/',function(req,res){
    res.send(moment().format('LLL'));
    }
)
router.get('/weeks/:week', function(req, res, next) {

  res.send(ad.addWeek(req.params.week));

});

router.get('/days/:day',function(req,res){

      res.send(ad.addDay(req.params.day));
    }
)
module.exports = router;

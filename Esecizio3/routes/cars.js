var express = require('express');
var router = express.Router();

var Car = require('../models/car');

/* GET users listing. */
var middle= function(req, res, next) {
    if(req.query.t && req.query.t==="mike") {
        next()
    }
    else{
        res.status(401).json({error:"Token not valid"});
    }
};

router.get('/',function(req, res,next) {
        Car.find(function (err ,cars) {
            if (err) return res.status(500).json({error: err});
            res.json(cars);

        })
    }
);

router.get('/:id',function (req, res,next)
    {

        Car.find({_id:req.params.id}, function (err ,cars) {

            if (err) return res.status(500).json({error: err});
            res.status(200).json(cars);

        })
    }
);

router.post('/',function(req,res,next) {
        var newCar = new Car(req.body);

        newCar.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newCar);
        })
});

router.put('/:id', function (req, res,next) {
        Car.findOne({_id: req.params.id}, function (err ,cars) {

                if (err) return res.status(500).json({error: err});

                if(!cars) return res.status(404).json({message:'auto non trovata'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    cars[key] = req.body[key];
                }

                cars.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(cars);
                })
            }

        )
    }
);

router.delete('/:id',function (req, res,next)
    {
        Car.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Auto eliminata correttamente'})
        })
    }
)



module.exports = router;

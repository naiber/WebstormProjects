/**
 * Created by MicheleSpinello on 07/12/2016.
 */
var express = require('express');
var router = express.Router();

var Seller = require('../models/seller');

var middle= function(req, res, next) {
    if(req.query.t && req.query.t==="mike") {
        next()
    }
    else{
        res.status(401).json({error:"Token not valid"});
    }
};

router.get('/',function(req, res,next)
    {
        Seller.find(function (err ,sellers) {

            if (err) return res.status(500).json({error: err});
            res.json(sellers);

        })
    }
);

router.get('/:id',function (req, res,next)
    {

        Seller.find({_id:req.params.id}, function (err ,sellers) {

            if (err) return res.status(500).json({error: err});
            res.status(200).json(sellers);

        })
    }
);

router.post('/',function(req,res,next)
    {
        var newSeller = new Seller(req.body);

        newSeller.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newSeller);
        })

    }
);

router.put('/:id', function (req, res,next) {
    Seller.findOne({_id: req.params.id}, function (err ,sellers) {

                if (err) return res.status(500).json({error: err});

                if(!sellers) return res.status(404).json({message:'Concessionario non trovata'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    sellers[key] = req.body[key];
                }

            sellers.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(sellers);
                })
            }

        )
    }
);

router.delete('/:id',function (req, res,next)
    {
        Seller.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Concessionaria eliminata correttamente'})
        })
    }
)



module.exports = router;

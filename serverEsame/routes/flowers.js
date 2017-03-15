var express = require('express');
var router = express.Router();
var Flower = require('../models/flower');
/* GET users listing. */

router.get('/',function(req, res,next)
{
    Flower.find({},function (err ,flowers) {
        if (err) return res.status(500).json({error: err});
        res.json(flowers);
    })
})

router.get('/:id',function(req, res,next)
{
    Flower.find({_id:req.params.id},function (err ,flowers) {

        if (err) return res.status(500).json({error: err});
        res.json(200,flowers);

    })
});

router.post('/',function(req,res,next) {
    console.log('qui:', req.body);
        var newFlower = new Flower(req.body);

        newFlower.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newFlower);
        })

    }
);

router.put('/:id', function (req, res,next) {
    Flower.findOne({_id: req.params.id}, function (err ,flowers) {
                console.log("qui!")
                if (err) return res.status(500).json({error: err});

                if(!flowers) return res.status(404).json({message:'Fiore non trovato'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    flowers[key] = req.body[key];
                }

            flowers.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(flowers);
                })
            }

        )
    }
);

router.delete('/:id',function (req, res,next)
    {
        Flower.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Fiore eliminato correttamente'})
        })
    }
);


module.exports = router;

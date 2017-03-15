/**
 * Created by MicheleSpinello on 21/12/2016.
 */
var express = require('express');
var router = express.Router();


var vTokenW = function (req,res,next){
    if(req.query.t && req.query.t==="write") {
        next()
    }
    else{
        res.status(401).json({error:"Token not valid"});
    }
};

var vTokenR = function (req,res,next){
    if(req.query.t && req.query.t==="read") {
        next()
    }
    else{
        res.status(401).json({error:"Token not valid"});
    }
};

router.get('/',vTokenR,function(req, res,next)
{
    Player.find(function (err ,players) {

        if (err) return res.status(500).json({error: err});
        res.json(200,players);

    })
});

router.get('/:id',vTokenR,function(req, res,next)
{
    Player.find({_id:req.params.id},function (err ,players) {

        if (err) return res.status(500).json({error: err});
        res.json(200,players);

    })
});

router.post('/',vTokenW,function(req,res,next)
    {
        var newPlayer = new Player(req.body);

        newPlayer.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newPlayer);
        })

    }
);

router.put('/:id',vTokenW, function (req, res,next) {
    Player.findOne({_id: req.params.id}, function (err ,players) {

                if (err) return res.status(500).json({error: err});

                if(!players) return res.status(404).json({message:'giocatore non trovato'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    players[key] = req.body[key];
                }

                players.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(players);
                })
            }

        )
    }
);

router.delete('/:id',vTokenW,function (req, res,next)
    {
        Player.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Giocatore eliminato correttamente'})
        })
    }
);

module.exports = router;

/**
 * Created by MicheleSpinello on 21/12/2016.
 */
var express = require('express');
var router = express.Router();

var Team = require('../models/team');
var Player = require('../models/player');


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
    Team.find(function (err ,teams) {

        if (err) return res.status(500).json({error: err});
        res.json(teams);

    })
});

router.get('/:id',vTokenR,function(req, res,next) {

    Team.find({_id: req.params.id}, function (err, teams) {

        if (err) return res.status(500).json({error: err});
        res.json(200, teams);

    })
});

router.post('/',vTokenW,function(req,res,next)
    {
        var newTeam = new Team(req.body);

        newTeam.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newTeam);
        })

    }
);

router.post('/:id/players',vTokenW,function(req, res,next) {

    Team.findOne({_id:req.params.id}, function (team){

        var newPlayer = new Player(req.body);

        team.players.push(newPlayer)

        team.save().exec(function (err) {

            if (err) return handleError(err);

            res.status(201).json(newPlayer);
        });
    })

});

router.put('/:id',vTokenW, function (req, res,next) {
        Team.findOne({_id: req.params.id}, function (err ,teams) {

                if (err) return res.status(500).json({error: err});

                if(!teams) return res.status(404).json({message:'squadra non trovata'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    teams[key] = req.body[key];
                }

                teams.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(teams);
                })
            }

        )
    }
);

router.delete('/:id',vTokenW,function (req, res,next)
    {
        Team.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Squadra eliminata correttamente'})
        })
    }
);

module.exports = router;

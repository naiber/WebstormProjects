/**
 * Created by MicheleSpinello on 27/10/2016.
 */
var express = require('express');
var router = express.Router();
//const mongoose = require('mongoose');

var User = require('../models/user');

router.use(function(req,res,next){
    if(req.query.t && req.query.t==="mike") {
        next()
    }
    else{
        res.status(401).json({error:"Token not valid"});
    }
});

router.get('/',function(req, res)
    {
        User.find(function (err ,users) {

            if (err) return res.status(500).json({error: err});
            res.json(users);

        })
    }
);

router.get('/:id',function (req, res,next)
    {

        User.find({_id:req.params.id}, function (err ,users) {

            if (err) return res.status(500).json({error: err});
            res.status(200).json(users);

        })
    }
);

router.post('/',function(req,res,next)
    {
        var newUser = new User(req.body);

        newUser.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newUser);
        })

    }
);

router.put('/:id', function (req, res,next) {
        User.findOne({_id: req.params.id}, function (err ,users) {

            if (err) return res.status(500).json({error: err});

            if(!users) return res.status(404).json({message:'Utente non trovato'});

            for(key in req.body){//for Hash : cicla i campi nel body della request
                    users[key] = req.body[key];
                }

            users.save(function(err)
            {
                if (err) return res.status(500).json({error: err});
                res.json(users);
            })
        }

        )
    }
);

router.delete('/:id',function (req, res,next)
    {
        User.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Utente eliminato correttamente'})
        })
    }
)

module.exports=router;
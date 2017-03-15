var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */

router.get('/',function(req, res,next)
{
    User.find({},function (err ,users) {
        if (err) return res.status(500).json({error: err});
        res.json(users);
    })
})

router.get('/:id',function(req, res,next)
{
    User.find({_id:req.params.id},function (err ,users) {

        if (err) return res.status(500).json({error: err});
        res.json(200,users);

    })
});

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
                console.log("qui!")
                if (err) return res.status(500).json({error: err});

                if(!users) return res.status(404).json({message:'utente non trovato'});

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
);


module.exports = router;

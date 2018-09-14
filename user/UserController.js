var express = require('express');
var router = express.Router();
var bp = require('body-parser');
var jwt = require('jsonwebtoken');

var secret = 's3cr3t';
router.use(bp.urlencoded({extended: true}));
router.use(bp.json());
var token_required = function(req, res, next){
    console.log(req.headers);
    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({message:"No token!"})
    try {
        token = token.split(" ")[1];
        console.log(token);
        var id = jwt.verify(token, secret);
        req.user_id = id; 
    } catch (error) {
        console.log(error);
        return res.status(401).send({"message":"Invalid token!"});
    }
    next();
}

router.use(token_required);

router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err){
            console.log(err);
            return res.status(500).send("There was a problem finding the user");
        }
        if(!user) return res.status(404).send("User not found!");
        res.status(200).send(user);
    });
});


router.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err) return res.status(500).send("There was a problem getting the data from database!");
        return res.status(200).send(users);
    });
});


var User = require('./User');

module.exports = router;
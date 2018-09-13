var express = require('express');
var router = express.Router();
var bp = require('body-parser');
router.use(bp.urlencoded({extended: true}));
router.use(bp.json());

router.post('/', (req, res) => {
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        salary : req.body.sal
    },
    (err, user) => {
        if (err) return res.status(500).send("There was a problem adding the account");
        return res.status(200).send(user);
    });
});

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
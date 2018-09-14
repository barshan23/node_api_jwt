var express = require('express');
var router = express.Router();
var bp = require('body-parser');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var secret = 's3cr3t';

router.use(bp.urlencoded({extended: true}));
router.use(bp.json());

router.post('/register', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        salary : req.body.salary
    }, function(err, user){
        console.log(user);
        if (err) return res.status(500).send("There was a problem!");
        var token = jwt.sign({id: user._id}, secret, {
            expiresIn: 86400 // 24 hours
        });
        return res.status(200).send({message: "Successfully registered", token: token});
    });
});

router.post('/login', (req, res) =>{
    // var hash = bcrypt.hashSync(req.body.password, 8);
    // console.log(hash);
    User.findOne({email : req.body.email}, function(err, user){
        if (err){
            console.log(err);
            return res.status(500).send("There was a problem!");
        }
        if (user && bcrypt.compareSync(req.body.password, user.password)){
            // console.log(user.password);
            var token = jwt.sign({id: user._id}, secret, {
                expiresIn: 86400 // 24 hours
            });
            return res.status(200).send({message: "Success", token: token});
        }
        return res.status(401).send({message: "Invalid credentials!"});
    });
});


var User = require('../user/User');
module.exports = router;
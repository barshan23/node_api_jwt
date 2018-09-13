var express = require('express');
var router = express.Router();
var bp = require('body-parser');
var User = require('../user/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var secret = 's3cr3t';


router.use(bp.json());

router.post('/register', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        pasword: hash,
        salary : req.body.salary
    }, function(err, user){
        if (err) return res.status(500).send("There was a problem!");
        var token = jwt.sign({id: user._id}, secret, {
            expiresIn: 86400 // 24 hours
        });
        return status(200).send({message: "Successfully registered", token: token});
    });
});

router.post('/login', (req, res) =>{
    var hash = bcrypt.hashSync(req.body.password, 8);
});


var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
router.get('/', function displayHomer(req, res) {
    res.sendFile(path.join(__dirname, '.', '../homer.png'));
    //res.sendFile('homer.png');
});

// Register User
router.post('/register', function (req, res) {
    var password = req.body.password;
    var password2 = req.body.password2;

    if (password === password2) {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            res.send(user).end()
        });
    } else {
        res.status(500).send("{erros: \"Passwords don't match\"}").end()
    }
});


// Endpoint to login
router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.send(req.user);
    }
);

// Endpoint to get current user
router.get('/user', function (req, res) {
    res.send("User " + req.user);
});


// Endpoint to logout
router.get('/logout', function (req, res) {
    req.logout();
    res.send(null)
});

module.exports = router;
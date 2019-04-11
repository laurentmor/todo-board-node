var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path'),
    User = require('../models/user');

router.get('/', function displayHomer(req, res) {
    res.sendFile(path.join(__dirname, '.', '../homer.png'));

});

function createValidUserFromRequest(req) {
    var password = req.body.password;


    /** @namespace req.body.password2 */
    if (password === req.body.password2) {
        return new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

    } else {
        return null;
    }
}

// Register User
router.post('/create', function (req, res) {

    var validUser = createValidUserFromRequest(req, res);
    if (validUser) {
        User.createUser(validUser, function (err, user) {
            if (err) throw err;
            res.send(user).end()
        });
    } else res.status(500).send("{error: \"Passwords don't match\"}").end();

});


// Endpoint to login
router.post('/login', function (req, res) {
    var options = {successRedirect: '/', failureRedirect: '/login'};
    passport.authenticate('local', options, function () {
        res.send(req.user);

    });
});





// Endpoint to get current user
router.get('/user', function (req, res) {
    res.send("User " + req.user);
});


// Endpoint to logout
router.get('/logout', function (req, res) {
    req.logout();
    res.send(null)
});

router.get('/all', function (req, res) {
    var user = req.user;
    if (req.isAuthenticated() && User.hasRole(user, "admin")) {
        User.find({}, function (err, result) {
            if (err) throw err;
            else res.status(200).send(result).end();
        })
    } else {
        res.status(401).end();
    }
});

// noinspection JSUndefinedPropertyAssignment
module.exports = router;
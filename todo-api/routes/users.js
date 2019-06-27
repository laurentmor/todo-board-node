const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path'),
    User = require('../models/User');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.', '../homer.png'));

});

const createValidUserFromRequest = req => {
    let password = req.body.password;


    /** @namespace req.body.password2 */
    if (password === req.body.password2) {
        return new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role

        });

    } else {
        return null;
    }
};

// Register User
router.post('/create', (req, res) => {

    let validUser = createValidUserFromRequest(req, res);
    if (validUser) {
        User.createUser(validUser, (err, user) => {
            if (err) throw err;
            res.send(user).end()
        });
    } else res.status(500).send("{error: \"Passwords don't match\"}").end();

});


function localAuth(req, res, next) {

    log.info("using local auth");
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', {}, (error, user, info) => {

        if (error) {
            res.status(401).send(error);
        } else if (!user) {
            res.status(401).send(info);
        } else {
            req.session.user = user;

            next();
        }

        res.status(401).send(info);
    })(req, res);
}

function googleAuth(req, res, next) {
//TODO implement G authentication
}

//Endpoint with default 'local' strategy
router.post('/login', (req, res, next) => {
    localAuth(req, res, next);
});
// Endpoint to login with specific strategy
router.post('/login/:strategy',
    // wrap passport.authenticate call in a middleware function
    (req, res, next) => {
        let strategy;
        if (!req.params) strategy = "local";
        else strategy = req.params.strategy || "local";
        if (strategy) {
            switch (strategy) {
                case "local":
                    localAuth(res, req, next);
                    break;
                case "google":
                    googleAuth(req, res, next);
                    break;
                default:
                    localAuth(req, res, next);
                    break;

            }
        } else {
            localAuth(req, res, next);
        }


    },

    // function to call once successfully authenticated
    (req, res) => {
        res.status(200).send(req.session.User);
    });


// Endpoint to get current user
router.get('/profile', (req, res) => {
    res.send(req.session.User);
});


// Endpoint to logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send(null)
});

router.get('/all', (req, res) => {
    let user = req.session.User;
    if (user && User.hasRole(user, "admin")) {
        User.find({}, (err, result) => {
            if (err) throw err;
            else res.status(200).send(result).end();
        })
    } else {
        res.status(401).end();
    }
});

// noinspection JSUndefinedPropertyAssignment
module["exports"] = router;
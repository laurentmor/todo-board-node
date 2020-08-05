import  express from 'express';
const router = express.Router();
import passport from 'passport';
import logger from "../config/logger-config";
import {ensureLoggedIn} from "connect-ensure-login";


router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.status(200).send(req.session.user);
    }
    else {

        logger.warn('Attempt to use Auth API while not logged in');
        res.status(401).send({
        "User":"Not logged "
        }).end();
    }



});

const createValidUserFromRequest = (req, res) => {
    let password = req.body.password;
    let password2= req.body.password2;
    let username = req.body.username;
    let error=undefined;
    if (username===undefined)error={error:"username.required"};
    else if(password===undefined)error={error:"password.required"};
    else if (password!==password2)error={error:"password.must.match"};
    if (error)res.status(422).send(error).end();
    else {
        return new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role

        });

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
    }


});


const localAuth = (req, res, next) => {
    //const options = {successRedirect: '/', failureRedirect: '/fail'};


    passport.authenticate('local',null, (err, user) => {
        logger.info("/auth/v1/login  local auth endpoint");
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            logger.info(req.user.username);
            res.send(user).end();
            //return res.redirect('/auth/v1/profile');
        });
    })(req, res, next);

    //res.sendBackwards()
};

const googleAuth = (req, res, next) => {
//TODO implement G authentication

    /*passport.authenticate('google',{failureRedirect:'/user/',scope:['profile'] },(error,user,info)=>{
       res.status(200).send(error).end();
       next();
   })(req,res);*/
    next();
    req();
    res();
};

//Endpoint with default 'local' strategy
router.post('/login', function(req, res, next) {
    localAuth(req,res,next);
});
// Endpoint to login with specific strategy
router.get('/login/:strategy',
    // wrap passport.authenticate call in a middleware function
    (req, res, next) => {
        let strategy = req.params.strategy || "local";

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



    },

    // function to call once successfully authenticated
    (req, res) => {
        res.status(200).send(req.session.user);
    });


// Endpoint to get current user
router.get('/profile',ensureLoggedIn('/login'), (req, res) => {
    logger.info('auth succeeded');
    res.send(req.cookies);
});


// Endpoint to logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send(null)
});

router.get('/all', (req, res) => {
    logger.info("List all user endpoint invoked");
    let user = req.session.user;
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
 export default router;


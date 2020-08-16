import express from 'express';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';
import logger from '../config/logger-config';
import User from '../models/User';
const router = express.Router();
router.get('/next',(req,res,next)=>{
  try
  {
    throw new Error("stack test");
  }
  catch (e) {
    next(e);
  }
});
router.get('/', (req, res) => {

  if (req.isAuthenticated()) {
    res.status(200).send(req.session.user);
  } else {
    logger.warn('Attempt to use Auth API while not logged in');
    res.status(401).send({
      User: 'Not logged ',
    }).end();
  }
});

const createValidUserFromRequest = (req, res) => {
  /*const { password } = req.body;
  const { password2 } = req.body;
  const { username } = req.body;
  let error;
  if (username === undefined)error = { error: 'username.required' };
  else if (password === undefined)error = { error: 'password.required' };
  else if (password !== password2)error = { error: 'password.must.match' };
  if (error)res.status(422).send(error).end();
  else {
    return new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,

    });
  }*/
  User.validateUser(req.body,null,(e)=>{
    logger.error(e.error.ValidationError);
  });
};

router.all((req)=>{
  logger.info(req);
});
router.post('/validate', (req,
  res)=>{
  createValidUserFromRequest(req,res);

});
// Register User
router.post('/create', (req, res) => {
  const validUser = createValidUserFromRequest(req, res);
  if (validUser) {
    User.createUser(validUser, (err, user) => {
      if (err) throw err;
      res.send(user).end();
    });
  }
});

const localAuth = (req, res, next) => {
  // const options = {successRedirect: '/', failureRedirect: '/fail'};

  passport.authenticate('local', null, (err, user) => {
    logger.info('/auth/v1/login  local auth endpoint');
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      logger.info(req.user.username);
      res.send(user).end();
      // return res.redirect('/auth/v1/profile');
    });
  })(req, res, next);

  // res.sendBackwards()
};

const googleAuth = (req, res, next) => {
// TODO implement G authentication

   passport.authenticate('google',{failureRedirect:'/user/',scope:['profile'] },(error,user,info)=>{
       res.status(200).send(error).end();
       next();
   })(req,res);
  next();
  req();
  res();
};

// Endpoint with default 'local' strategy
router.post('/login', (req, res, next) => {
  localAuth(req, res, next);
});
// Endpoint to login with specific strategy
router.get('/login/:strategy',
  // wrap passport.authenticate call in a middleware function
  (req, res, next) => {
    const strategy = req.params.strategy || 'local';

    switch (strategy) {
      case 'local':
        localAuth(res, req, next);
        break;
      case 'google':
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
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  logger.info('auth succeeded');
  res.send(req.cookies);
});

// Endpoint to logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send(null);
});

router.get('/all', (req, res) => {
  logger.info('List all user endpoint invoked');
  const { user } = req.session;
  if (user && User.hasRole(user, 'admin')) {
    User.find({}, (err, result) => {
      if (err) throw err;
      else res.status(200).send(result).end();
    });
  } else {
    res.status(401).end();
  }
});

// noinspection JSUndefinedPropertyAssignment
export default router;

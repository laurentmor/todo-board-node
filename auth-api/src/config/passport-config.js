import passport from 'passport';
/* eslint-disable  import/no-unresolved */
import {
  GL_CID,GL_CS,GL_CB ,GL_UP_URL,TWITTER_CONSUMER_KEY,TWITTER_CONSUMER_SECRET
} from '@env';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import logger from './logger-config';

import User from '../models/User';

// endregion
// region using google

// let logger=new Logger();

// region  Using LocalStrategy with passport
import { Strategy as LocalStrategy } from 'passport-local';
import crypt from 'bcryptjs';

import { Strategy as TwitterStrategy} from 'passport-twitter';

const loginTwitter=(passport)=>{
  passport.use('login-twitter',new TwitterStrategy({
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:4268/auth/v1/twitter"
    },

    function(token, tokenSecret, profile, done) {
    logger.info(done());
    done();


    }
  ));
}

const login=(passport)=>{
  const isValidPassword = (user, password) => crypt.compareSync(password, user.password);
  passport.use('login', new LocalStrategy({
      passReqToCallback : true
    },
    (req, username, password, done) => {
      // check in mongo if a user with username exists or not
      User.getUserByUsername({ 'username' :  username },
        (err, user) => {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log the error and redirect back
          if (!user){
            logger.error('User Not Found with username '+username);
            return done(null, false, req.flash('message', 'User Not found.'));
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)){
            logger.error('Invalid Password');
            return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
          }
          // User and password both match, return user from done method
          // which will be treated like success
          return done(null, user);
        }
      );

    })
  );

}
const initPassport = passport => {
  logger.info('Passport config');
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser((user, done) => {
    logger.info('serializing user: ');logger.info(user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      logger.info('deserializing user:',user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
  loginTwitter(passport);
  //signup(passport);

};
  export default initPassport;

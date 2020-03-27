#!/env/node

import {PORT,NODE_ENV,DB,SECRET} from '@env';

import express from "express";

import bodyParser from "body-parser";


import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';


import  passport  from'./config/passport-config';
import logger from "./config/logger-config";
import UserRouter from './routes/users';


import  MongoStore from'connect-mongo'  ;

const app = express();
app.get("/", function (req, res) {


    res.status(200).send("Hello World! from auth server").end();
});



async function connectToDB () {
    mongoose.set('useCreateIndex', true);
    const connectPromise= mongoose.connect(DB, {useNewUrlParser: true});
    await connectPromise.then(()=>{
        logger.info("Connected to DB " +DB);


        // BodyParser Middleware
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
        app.use(cookieParser());



// Express Session depending on ENV
        const sessionOptions = {

            secret: SECRET,
            saveUninitialized: true,
            resave: true


        };
        //use DB session storage only in production as session won't need to be persisted upon server restart in development

        if (NODE_ENV === "production") {
            // noinspection JSCheckFunctionSignatures
            sessionOptions.store = new MongoStore({    mongooseConnection: mongoose.connection
            });
        }
        app.use(session(sessionOptions));


// Passport init
        app.use(passport.initialize({userProperty: 'User.js'}));
        // noinspection JSCheckFunctionSignatures
        app.use(passport.session(sessionOptions));

        app.use('/auth/v1/', UserRouter, () => {
            logger.info("binding UserRouter to handle user requests " );
        });




    }).catch((err)=>{
        logger.error("DB connect error  "+DB+" error "+err);

    });


    //await Promise.all(connectPromise);
}
connectToDB().then(()=>{
    app.listen(PORT);
    logger.info('Auth API listening on port ' + PORT + ' in ' + NODE_ENV)
}).catch((e)=>{logger.error("Server won`t start!" + e)});

/*
*
* */
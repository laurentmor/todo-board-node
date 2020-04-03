#!/env/node

// noinspection NpmUsedModulesInstalled
import {PORT,NODE_ENV,DB,SECRET} from '@env';
import http from 'http';
import express from "express";

import bodyParser from "body-parser";


import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';


import logger from "./config/logger-config";
import TodoRouter from './routes/todos';

import  MongoStore from'connect-mongo'  ;


const app = express();
app.get("/", function (req, res) {



    res.status(200).send("Hello World!").end();
});



async function connectToDB () {
    mongoose.set('useCreateIndex', true);
    const connectPromise= mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});
    await connectPromise.then(()=>{
        logger.info("Connected to MongoDB (OK): " + DB);

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

            /*sessionOptions.store = new MongoStore({
                mongooseConnection: mongoose.connection
            }).set(mongoose.connection);*/
        }
        app.use(session(sessionOptions));


// Passport init
       /* app.use(passport.initialize({userProperty: 'User.js'}));
        app.use(passport.session(sessionOptions));
*/
        /*app.use('/user', UserRouter, () => {
            logger.info("binding UserRouter to handle user requests " );
        });*/
        app.use("/todo", TodoRouter, () => {
            logger.info("bind: " + TodoRouter);
        });




    }).catch((err)=>{
        logger.error("DB connect error  "+DB+" error "+err);

    });


    //await Promise.all(connectPromise);
}
 connectToDB().then(function () {
    app.listen(PORT, logger.info('Todo API listening on port ' +PORT+ ' in '+ NODE_ENV  ));
    if(process.argv[2]==="-c"){
        process.exit(0);
    }
}).catch((e)=>{logger.error("Server won`t start!" + e)});


http.createServer();
//export default app;
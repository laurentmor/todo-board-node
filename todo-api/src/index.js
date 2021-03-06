#!/env/node

import {DB, NODE_ENV, PORT, SECRET} from "@env";


import express from "express";

import bodyParser from "body-parser";


import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

import logger from "./config/logger-config";
import router from './routes/todos';


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const app = express();
app.use(limiter);
app.get("/", function (req, res) {

    const msg = "Hello World!";

    res.status(200).json(msg).end();
});


/**
 *
 * @returns {Promise<void>}
 */
async function connectToDB () {
    logger.info('Connected to DB '+DB);
    mongoose.set('useCreateIndex', true);
    const connectPromise= mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});

    await connectPromise.then(()=> {

        app.use((req, res, next) => {
            res.contentType('application/json');
            next();
        });

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
        app.use("/todo", router, () => {
            logger.info("bind: " + router);
        });


    }).catch((err) => {
        logger.error("DB connect error  " + DB + " error " + err);

    });


    //await Promise.all(connectPromise);
}

 connectToDB().then(function () {
    app.listen(PORT, logger.info('Todo API listening on port ' +PORT+ ' in '+ NODE_ENV  ));
    if(process.argv[2]==="-c"){
        process.exit(0);
    }
}).catch((e)=>{logger.error("Server won`t start!" + e)});
export default app;

import mongoose from 'mongoose';
import {FastifyInstance} from "fastify";

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const database = process.env.MONGO_DATABASE || 'fastify';
const connectToDb=(fastify:FastifyInstance)=>{
	fastify.log.info(`mongodb://${host}:${port}/${database}`)
	mongoose.connect(`mongodb://${host}:${port}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
		if (!err)
			fastify.log.trace(`MongoDB connection successful.`);
		else
			fastify.log.error('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
	});
	return mongoose;
}


module.exports = connectToDb;

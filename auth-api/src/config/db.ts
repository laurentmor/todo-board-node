import mongoose from 'mongoose';
<<<<<<< HEAD
import {FastifyInstance} from "fastify";
=======
>>>>>>> 2ee97ac (added shit)

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const database = process.env.MONGO_DATABASE || 'fastify';
<<<<<<< HEAD
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
=======

mongoose.connect(`mongodb://${host}:${port}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	if (!err)
		console.log('MongoDB connection successful.');
	else
		console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;
>>>>>>> 2ee97ac (added shit)

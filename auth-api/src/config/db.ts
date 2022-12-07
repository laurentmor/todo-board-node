import mongoose from 'mongoose';
<<<<<<< HEAD
<<<<<<< HEAD
import {FastifyInstance} from "fastify";
=======
>>>>>>> 2ee97ac (added shit)
=======
import {FastifyInstance} from "fastify";
>>>>>>> 0f95521 (fix sec)

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const database = process.env.MONGO_DATABASE || 'fastify';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0f95521 (fix sec)
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
<<<<<<< HEAD


module.exports = connectToDb;
=======
=======
>>>>>>> 0f95521 (fix sec)


<<<<<<< HEAD
module.exports = mongoose;
>>>>>>> 2ee97ac (added shit)
=======
module.exports = connectToDb;
>>>>>>> 0f95521 (fix sec)

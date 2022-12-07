<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0f95521 (fix sec)
import pino from "pino";

//import { DB, NODE_ENV, PORT, SECRET } from '@env'

import pino_colada from "pino-colada";

import fastify_cors from "fastify-cors";
import product from "./models/product";

import healthRoutes from "../src/routes/health";

import productRoutes from "../src/routes/product";
import customController from "../src/routes/customController";

import fastify0, {FastifyError, FastifyInstance,FastifyRequest,FastifyReply} from "fastify";

import fastify_blipp from "fastify-blipp";

<<<<<<< HEAD
const logger = pino({
	prettyPrint: {},
	prettifier: pino_colada
})
const fastify:FastifyInstance = fastify0({logger:logger});
require('../src/config/db')(fastify);
=======
const pino = require('pino')
=======
>>>>>>> 0f95521 (fix sec)
const logger = pino({
	prettyPrint: {},
	prettifier: pino_colada
})
<<<<<<< HEAD
const fastify = require('fastify')({logger:logger});
require('../src/config/db');
>>>>>>> 2ee97ac (added shit)
=======
const fastify:FastifyInstance = fastify0({logger:logger});
require('../src/config/db')(fastify);
>>>>>>> 0f95521 (fix sec)

const createServer  = async () => {


<<<<<<< HEAD
<<<<<<< HEAD
	await fastify.register(fastify_cors);
	fastify.register(fastify_blipp);

	await fastify.register(healthRoutes, { prefix: '/health' });
	await fastify.register(productRoutes, { prefix: '/product' });
	fastify.register(require('fastify-autocrud'), {
		prefix: '/api/products',
		Collection: product,
		additionalRoute: customController
	})

	fastify.setErrorHandler((error:FastifyError, req:FastifyRequest, res:FastifyReply) => {
		req.log.error(error.toString());
		res.send({ error });
	});
	fastify.blipp();
	process.on('warning', (warning) => {
		console.log(warning.stack);
	});
	return fastify;
};

export default createServer;
=======
	await fastify.register(require('fastify-cors'));
=======
	await fastify.register(fastify_cors);
	fastify.register(fastify_blipp);
>>>>>>> 0f95521 (fix sec)

	await fastify.register(healthRoutes, { prefix: '/health' });
	await fastify.register(productRoutes, { prefix: '/product' });
	fastify.register(require('fastify-autocrud'), {
		prefix: '/api/products',
		Collection: product,
		additionalRoute: customController
	})

	fastify.setErrorHandler((error:FastifyError, req:FastifyRequest, res:FastifyReply) => {
		req.log.error(error.toString());
		res.send({ error });
	});
	fastify.blipp();
	process.on('warning', (warning) => {
		console.log(warning.stack);
	});
	return fastify;
};

<<<<<<< HEAD
module.exports = createServer;
>>>>>>> 2ee97ac (added shit)
=======
export default createServer;
>>>>>>> 0f95521 (fix sec)

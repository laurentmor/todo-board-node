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

const logger = pino({
	prettyPrint: {},
	prettifier: pino_colada
})
const fastify:FastifyInstance = fastify0({logger:logger});
require('../src/config/db')(fastify);

const createServer  = async () => {


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

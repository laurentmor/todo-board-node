const pino = require('pino')
const logger = pino({
	prettyPrint: {},
	prettifier: require('pino-colada')
})
const fastify = require('fastify')({logger:logger});
require('../src/config/db');

const createServer  = async () => {


	await fastify.register(require('fastify-cors'));

	await fastify.register(require('../src/routes/health'), { prefix: '/health' });
	await fastify.register(require('../src/routes/product'), { prefix: '/product' });

	fastify.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return fastify;
};

module.exports = createServer;

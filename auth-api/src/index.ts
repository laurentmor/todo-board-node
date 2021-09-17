<<<<<<< HEAD
import server from "./server";



export const init = async () => {
	const fastify = await server();



	fastify.listen(5000, (err:Error, address:string) => {
		if (err) throw err;
		fastify.log.info(`fastify 🚀 server listening on ${address}`);

	});


	return fastify;
};

module.exports= init();
=======
const server = require('./server');

const init = async () => {
	const fastify = await server();

	fastify.listen(5000, (err, address) => {
		if (err) throw err;
		console.log(`fastify 🚀 server listening on ${address}`);
	});

	return fastify;
};

module.exports = init();
>>>>>>> 2ee97ac (added shit)

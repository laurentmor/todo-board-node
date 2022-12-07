<<<<<<< HEAD
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
=======
import server from "./server";
>>>>>>> 0f95521 (fix sec)



export const init = async () => {
	const fastify = await server();



	fastify.listen(5000, (err:Error, address:string) => {
		if (err) throw err;
		fastify.log.info(`fastify 🚀 server listening on ${address}`);

	});


	return fastify;
};

<<<<<<< HEAD
module.exports = init();
>>>>>>> 2ee97ac (added shit)
=======
module.exports= init();
>>>>>>> 0f95521 (fix sec)

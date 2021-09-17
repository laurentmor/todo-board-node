async function routes (fastify) {

	fastify.get('/', async (req, res) => {
		res.status(200).send('OK');
	});

}

<<<<<<< HEAD
export default routes;
=======
module.exports = routes;
>>>>>>> 2ee97ac (added shit)

import boom from "boom";

const customRoute = {
    method: 'GET',
    url: '/custom',
    handler: async function (req, reply) {
        try {
            reply.type('application/json').code(200).send({ "customroute": "ok" })
        } catch (err) {
            throw boom.boomify(err)
        }
    }
}

export default [customRoute];

import fastifyPlugin from "fastify-plugin"

const auth = async (fastify, options) => {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
}

export default fastifyPlugin(auth)
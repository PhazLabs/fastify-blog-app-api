import fastifyPlugin from "fastify-plugin";
import fastifyJwt from '@fastify/jwt'

const jwt = async (fastify, options) => {
    fastify.register(fastifyJwt, {
        secret: fastify.config.JWT_SECRET || 'supersecret',
        sign: {
            algorithm: 'HS256',
            expiresIn: '1d',
        },
    })



    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify({ maxAge: '1d' })
        } catch (err) {
            reply.send(err)
        }
    })
}

export default fastifyPlugin(jwt)
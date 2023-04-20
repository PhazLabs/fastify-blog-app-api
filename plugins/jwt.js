import { readFileSync } from 'fs'
import fastifyPlugin from "fastify-plugin";
import fastifyJwt from '@fastify/jwt'

const jwt = async (fastify, options) => {
    fastify.register(fastifyJwt, {
        secret: fastify.config.JWT_SECRET,
    })
}

export default fastifyPlugin(jwt)
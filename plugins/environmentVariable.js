import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

const schema = {
    type: 'object',
    required: [ 'PORT', 'MONGO_URI' ],
    properties: {
        PORT: {
            type: 'string',
            default: 3001
        },
        MONGO_URI: {
            type: 'string',
            default: 'mongodb://127.0.0.1:27017/test'
        },
        JWT_SECRET: {
            type: 'string',
            default: 'supersecret'
        }
    }
}

async function env (fastify, options) {
    fastify.register(fastifyEnv, {
        dotenv: true,
        schema,
    })
}

export default fp(env)
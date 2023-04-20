import fp from "fastify-plugin";
import fastifyBcrypt from "fastify-bcrypt";

const bcrypt = async (fastify, options) => {
    fastify.register(fastifyBcrypt, {
        saltWorkFactor: 12
    })
}

export default fp(bcrypt)
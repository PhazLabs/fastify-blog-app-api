import mongoose from "mongoose";

export async function connect (fastify) {
    try {
        await mongoose.connect(fastify.config.MONGO_URI);
        fastify.log.info('Database connected')
    } catch (err) {
        fastify.log.error(err)
    }
}
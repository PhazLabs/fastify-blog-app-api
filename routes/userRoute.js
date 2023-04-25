import { loginSchema } from "../schema/userSchema.js"

const userRoute = async (fastify, options) => {
    fastify.get('/test',
        {
            onRequest: [fastify.authenticate]
        },
        async (request, reply) => {
            console.log("request url ", request.url)
            return {hello: 'world'}
        })

    fastify.post('/signup', async (request, reply) => {
        try {
            const user = await fastify.userService.signup(request.body)
            reply.send({user: user})
        } catch (err) {
            fastify.log.info(err)
            reply.send({error: err})
        }
    })

    fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
        try {
            const { username, password } = request.body
            const userLogged = await fastify.userService.login(username, password)

            const token = fastify.jwt.sign({ id: userLogged._id }, fastify.config.JWT_SECRET)

            reply.code(200).send({ user: userLogged, accessToken: token })
        } catch(err) {
            fastify.log.info(err)
            reply.send(err)
        }
    })

    fastify.get('/me', {
        onRequest: [fastify.authenticate]
    },
    async (request, reply) => {
        try {
            const userId = request.user.id;
            const user = await fastify.userService.getUserInfo(userId)
            reply.send({user})
        } catch (err) {
            reply.code(500).send({error: err})
        }
    },
    )
}


export default userRoute;
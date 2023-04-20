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

    fastify.post('/login', async (request, reply) => {
        try {
            const { username, password } = request.body
            const userLogged = await fastify.userService.login(username, password)

            const token = fastify.jwt.sign({sub: userLogged._id, name: userLogged.name, role: userLogged.role }, fastify.config.JWT_SECRET, {
                algorithm: "HS256",
                expiresIn: 3600
            })

            reply.send({message: "Loggin success", user: userLogged, accessToken: token})
        } catch(err) {
            fastify.log.info(err)
            reply.send(err)
        }
    })

    fastify.get('/me', {
            preHandler: [fastify.authenticate]
        },
        async (request, reply) => {
            const authorization = request.headers.authorization
            const jwtToken = authorization.split(' ')[1]

            const decoded = fastify.jwt.verify(jwtToken)
            const user = await fastify.userService.getUserInfo(decoded.sub)

            reply.send({user})
        },
    )
}


export default userRoute;
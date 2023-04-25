import { articleSchema } from '../schema/articleSchema.js'

const articleRoute = async (fastify, options) => {
    fastify.get('/articles', async (request, reply) => {
        const articles = await fastify.articleService.getArticles()
        reply.send({articles})  
    })

    fastify.post('/article', {
        schema: articleSchema,
        preHandler: [fastify.authenticate]
    },
    async (request, reply) => {
        const userId = request.user.id;
        const user = await fastify.userService.getUserInfo(userId)

        const article = await fastify.articleService.postArticle(request.body, user)
        reply.send({article})
    })
}

export default articleRoute
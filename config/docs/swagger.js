import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifyPlugin from "fastify-plugin"

const swagger = async (fastify, options) => {
    fastify.register(fastifySwagger, {
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'Fastify Blog app API',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost:3001',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
            ],
            definitions: {
                User: {
                  type: 'object',
                  required: ['id', 'email'],
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: {type: 'string', format: 'email' },
                    role: { type: 'string' },
                  }
                }
              },
        },
        
    })
    fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    })


}

export default fastifyPlugin(swagger)
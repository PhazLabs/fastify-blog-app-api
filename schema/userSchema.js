export const loginSchema = {
    description: 'post login user',
    tags: ['user'],
    summary: 'qwerty',
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['username', 'password']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                user: { 
                    type: 'object', 
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        username: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                    },
                },
                accessToken: { type: 'string' }
            },
        }
    }
}
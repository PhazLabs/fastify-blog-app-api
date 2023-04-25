export const articleSchema = {
    description: 'post article',
    tags: ['article'],
    summary: 'qwerty',
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
        required: ['title', 'content']
    },
    // response: {
    //     200: {
    //         type: 'object',
    //         properties: {
    //             message: { type: 'string' },
    //             article: {
    //                 type: 'object',
    //                 properties: {
    //                     _id: { type: 'string' },
    //                     title: { type: 'string' },
    //                     content: { type: 'string' },
    //                 },
    //             },
    //         },
    //     }
    // }
}
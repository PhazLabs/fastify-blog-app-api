import Article from '../models/Article.js'

class ArticleService {
    constructor (fastify) {
        this.fastify = fastify
    }

    // Post article
    async postArticle(article, user) {
        try {
            console.log(user.role);
            if (user.role !== "admin" && user.role !== "writter" ) {
                throw new Error('Your are not admin you cannot post article thanks.')
            }

            const newArticle = new Article({ ...article, author: user._id })
            await newArticle.save()
            return newArticle

        } catch (err) {
            throw err
        }
    }

    async getArticles() {
        try {
            const articles = await Article.find()
            return articles
        } catch (err) {
            throw err
        }
    }
}

export default ArticleService
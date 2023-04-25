import mongoose from "mongoose";

const { Schema } = mongoose;

const ArticleSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Article = mongoose.model('Article', ArticleSchema)

export default Article;
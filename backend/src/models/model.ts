import mongoose, { Schema, model } from 'mongoose';

const articleSchema: Schema = new Schema({
    author:  String,
    title:  String,
    description:  String,
    url: String,
    urlToImage:  String,
    publishedAt:  String,
});

const schema = mongoose.model('article', articleSchema);

export default schema;
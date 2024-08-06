import mongoose, { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema({
    email:String,
    password:String
});

const schema = mongoose.model('User', userSchema);

export default schema;
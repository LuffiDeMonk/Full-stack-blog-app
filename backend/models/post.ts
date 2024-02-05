import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    posterImage: {
        type: String,
        required: true
    }
})


export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
import mongoose, { Schema } from 'mongoose';
import { required } from 'nodemon/lib/config';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
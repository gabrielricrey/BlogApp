import express from 'express';
import Comment from '../models/comments.model.js';
import BlogPost from '../models/blogpost.model.js';
import User from '../models/user.model.js'
import { auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/:id', auth, async (req, res) => {
    const body = req.body;
    const postId = req.params.id

    if (!body.comment) {
        res.status(401).json({ message: 'Content needed' })
    }

    try {
        const comment = await new Comment({ content: body.comment, author: req.user.userId, post: postId })
        comment.save();

        await BlogPost.findByIdAndUpdate(postId, { $push: { comments: comment._id } })
        await User.findByIdAndUpdate(req.user.userId, { $push: { comments: comment._id } })
        res.status(201).json({ success: true, commentCreated: comment })


    } catch (error) {
        res.status(500).json({ message: 'Server error, try again' })
    }

})

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid comment ID' });
    }

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(id);
        await BlogPost.findByIdAndUpdate(comment.post, { $pull: { comments: id } });
        await User.findByIdAndUpdate(req.user.userId, { $pull: { comments: id } });

        res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, try again' });
        console.error('Error deleting comment:', error);
    }


})

export default router;
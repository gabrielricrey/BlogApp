import express from 'express';
import Comment from '../models/comments.model.js';
import BlogPost from '../models/blogpost.model.js';
import User from '../models/user.model.js'
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/:id', auth, async (req,res) => {
    const body = req.body;
    const postId = req.params.id

    if(!body.comment) {
        res.status(401).json({message: 'Content needed'})
    }

    try{
        const comment = await new Comment({content: body.comment, author: req.user.userId, post: postId})
        comment.save();

        await BlogPost.findByIdAndUpdate(postId, { $push: {comments: comment._id}})
        await User.findByIdAndUpdate(req.user.userId, { $push: {comments: comment._id}})
        res.status(201).json({success: true, commentCreated: comment})


    } catch(error) {
        res.status(500).json({message: 'Server error, try again'})
    }
 
})

export default router;
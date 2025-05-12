import express from 'express';
import {auth} from '../middleware/auth.js'
import Like from '../models/like.model.js'
import BlogPost from '../models/blogpost.model.js';
import User from '../models/user.model.js'


const router = express.Router();

router.post('/', auth, async (req,res) => {

    const id = req.user.userId;
    const {postId} = req.body;

    try {
        const like = await new Like({user: id})
        like.save();
        
        await BlogPost.findByIdAndUpdate(postId, { $push: {likes: like._id}})
        await User.findByIdAndUpdate(id, { $push: {likes: like._id}})

        return res.status(200).json({success: true, likeCreated: like})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server error, try again'})
    }

})
import express from 'express';
import BlogPost from '../models/blogpost.model.js';
import User from '../models/user.model.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const blogposts = await BlogPost.find().populate('author').populate({path: 'comments', populate: 'author'})
        if(!blogposts) {
            res.json({message: "No blogposts found"})
            return
        }
        res.status(200).json(blogposts);
    } catch(error) {
        res.status(500).json({error: "Error getting blogposts", errorMessage: error})
    }
})

router.get('/:id', async (req,res) => {
    const {id} = req.params
    try {
        const blogpost = await BlogPost.findById(id)
        if(!blogpost) {
            res.json({message: "No blogpost found"})
            return
        }
        res.status(200).json(blogpost);
    } catch(error) {
        res.status(500).json({error: "Error getting blogpost", errorMessage: error})
    }
})

router.delete('/:id', async (req,res) => {
    const {id} = req.params
    try {
        const blogpost = await BlogPost.findByIdAndDelete(id)
        if(!blogpost) {
            res.json({message: "No blogpost found with this id"})
            return
        }
        res.status(200).json({message: "Succesfully deleted"});
    } catch(error) {
        res.status(500).json({error: "Error deleting blogpost", errorMessage: error})
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params
    const body = req.body;

    if(!body.title || !body.content || !body.author) {
        res.json({error: "Title, content, author required"})
        return;
    }

    const blogpost = await BlogPost.findByIdAndUpdate(id,{$set: body},{new:true})
    if(!blogpost) {
        res.status(404).json({error: "No post with matching id found"})
        return;
    }
    res.status(200).json(blogpost);
})

router.post('/', auth, async (req,res) => {
    const body = req.body;
    if(!body.title || !body.content) {
        res.json({error: "Title and content required"})
        return;
    }

    body.author = req.user.userId
    console.log(body)
    try {
        const blogpost = await BlogPost.create(body)
        res.status(200).json({success: true, post: blogpost});

    } catch(error) {
        res.status(500).json({error: "Error creating blogpost", error})
    }
})

export default router
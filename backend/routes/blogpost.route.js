import express from 'express';
import BlogPost from '../models/blogpost.model.js';
import User from '../models/user.model.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/byfriends', auth, async (req, res) => {

    const user = await User.findById(req.user.userId).populate('friends');

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.friends.length === 0) {
        return res.status(200).json({ message: "User has no friends" });
    }

    const friendsIds = user.friends.map(friend => friend._id)

    try {
        const blogposts = await BlogPost.find({ author: { $in: friendsIds } }).populate('author').populate({ path: 'comments', populate: 'author' })

        if (blogposts.length === 0) {
            return res.status(200).json({ message: "No blogposts from friends found" });
        }
        return res.status(200).json(blogposts);
    } catch (error) {
        return res.status(500).json({ error: "Error getting blogposts", errorMessage: error })
    }
})

router.get('/myposts', auth, async (req, res) => {
    const id = req.user.userId
    try {
        const posts = await BlogPost.find({ author: id }).populate('author').populate({ path: 'comments', populate: 'author' })

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Error getting blogposts", errorMessage: error })
    }
})

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        const posts = await BlogPost.find({ author: id })
        if (!posts) {
            res.json({ message: "No blogposts found" })
            return
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error getting blogpost", errorMessage: error })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const blogpost = await BlogPost.findById(id)
        if (!blogpost) {
            res.json({ message: "No blogpost found" })
            return
        }
        res.status(200).json(blogpost);
    } catch (error) {
        res.status(500).json({ error: "Error getting blogpost", errorMessage: error })
    }
})



router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const blogpost = await BlogPost.findByIdAndDelete(id)
        if (!blogpost) {
            res.json({ message: "No blogpost found with this id" })
            return
        }
        res.status(200).json({ message: "Succesfully deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting blogpost", errorMessage: error })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body;

    if (!body.title || !body.content || !body.author) {
        res.json({ error: "Title, content, author required" })
        return;
    }

    const blogpost = await BlogPost.findByIdAndUpdate(id, { $set: body }, { new: true })
    if (!blogpost) {
        res.status(404).json({ error: "No post with matching id found" })
        return;
    }
    res.status(200).json(blogpost);
})

router.post('/', auth, async (req, res) => {
    const body = req.body;

    if (!body.title || !body.content) {
        res.json({ error: "Title and content required" })
        return;
    }

    body.author = req.user.userId
    try {
        const blogpost = await BlogPost.create(body)
        res.status(200).json({ success: true, post: blogpost });
        await User.findByIdAndUpdate(req.user.userId, { $push: { posts: blogpost._id } }, { new: true })

    } catch (error) {
        res.status(500).json({ error: "Error creating blogpost", error })
    }
})

export default router
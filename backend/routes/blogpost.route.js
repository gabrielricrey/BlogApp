import express from 'express';
import BlogPost from '../models/blogpost.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comments.model.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/byfriends', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('following');

        if (!user) {
            return res.status(404).json({ posts: [], message: "User not found" });
        }

        if (user.following.length === 0) {
            return res.status(200).json({ posts: [], message: "User follows no one" });
        }

        const followingIds = user.following.map(follow => follow._id);

        const blogposts = await BlogPost.find({ author: { $in: followingIds } })
            .populate('author')
            .populate({ path: 'comments', populate: 'author' });

        return res.status(200).json({ posts: blogposts, message: blogposts.length === 0 ? "No blogposts from following found" : undefined });

    } catch (error) {
        return res.status(500).json({ posts: [], message: "Error getting blogposts", errorMessage: error.message });
    }
});


router.get('/myposts', auth, async (req, res) => {
    const id = req.user.userId
    console.log(id);
    try {
        const posts = await BlogPost.find({ author: id }).populate({path: 'author', select: '-password'}).populate({ path: 'comments', populate: {path: 'author', select: '-password' }})
        console.log(posts);
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Error getting blogposts", errorMessage: error })
    }
})

router.get('/user/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const posts = await BlogPost.find({ author: id }).populate('author').populate({ path: 'comments', populate: 'author' })
        if (!posts) {
            res.json({ message: "No blogposts found" })
            return
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error getting blogpost", errorMessage: error })
    }
})

router.get('/:id', auth,async (req, res) => {
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



router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const blogpost = await BlogPost.findByIdAndDelete(id)
        if (!blogpost) {
            return res.status(400).json({ message: "No blogpost found with this id" });
        }

        await User.findByIdAndUpdate(req.user.userId, { $pull: { posts: id } });
        await Comment.deleteMany({ post: id });

        return res.status(200).json({ success: true, message: "Succesfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
})

router.put('/:id', auth, async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title, content, author required" });
    }

    try {

        const blogpost = await BlogPost.findByIdAndUpdate(id, { $set: { title, content } }, { new: true })
        if (!blogpost) {
            return res.status(404).json({ error: "No post with matching id found" });
        }
        res.status(200).json({ success: true, updatedPost: blogpost });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error, try again later' })
    }
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
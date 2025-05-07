import express from 'express';
import User from '../models/user.model.js';
import BlogPost from '../models/blogpost.model.js';
import Comment from '../models/comments.model.js';
import { auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/register', async (req, res) => {
  const body = req.body;

  if (!body.username || !body.password || !body.email) {
    return res.status(400).json({ message: 'Missing username, password or email' });
  }

  try {

    const newUser = await User.create(body);
    res.status(200).json({ success: true, data: newUser })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverfel' });
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -_id').populate('friendRequests', 'username')

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Serverfel' });
  }
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Ogiltigt ID-format' })
  }

  try {
    const user = await User.findById(id).select('-password -_id')
    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte' });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ message: 'Serverfel' + error});
  }
});

router.get('/', auth, async (req, res) => {
  const query = req.query.search;
  const currentUserId = req.user.userId

  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' },_id: {$ne: currentUserId} });
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: 'Serverfel:' + error })
  }

})


export default router;
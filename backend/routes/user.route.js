import express from 'express';
import User from '../models/user.model.js';
import BlogPost from '../models/blogpost.model.js';
import Comment from '../models/comments.model.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req,res) => {
    const body = req.body;

    if(!body.username || !body.password || !body.email) {
        return res.status(400).json({message: 'Missing username, password or email'});
    }

    try{

        const newUser = await User.create(body);
        res.status(200).json({success: true, data: newUser})
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfel' });
    }
})

router.get('/me', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password -_id')

      res.status(200).json(user);
      console.log(user);
    } catch (err) {
      res.status(500).json({ message: 'Serverfel' });
    }
  });
  

export default router;
import express from 'express';
import User from '../models/user.model.js';

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

export default router;
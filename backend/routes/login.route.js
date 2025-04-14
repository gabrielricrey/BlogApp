import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req,res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({message: 'Missing username or password'});
    }

    try{
        const user = await User.findOne({username: username})
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({message: 'User not found'});
        }

        const payload = {
            userID: user._id,
            username: user.username
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '1d'});

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });


    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfel' });
    }
})

export default router;
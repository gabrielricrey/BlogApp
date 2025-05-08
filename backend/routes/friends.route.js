import express from 'express';
import User from '../models/user.model.js';
import { auth } from '../middleware/auth.js';

const router = express.Router()

router.post('/:id/send-request/', auth, async (req,res) => {
    const { id } = req.params;
    const senderId = req.user.userId;

    if(id === senderId) {
        return res.status(400).json({ message: 'You cannot send a friend request to yourself' });
    }

    try{
        const sender = await User.findById(senderId);
        const receiver = await User.findById(id);
        
        if(!receiver) {
            return res.status(400).json({message: 'User not found'})
        }
        
        if(receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({message: 'Friend request already sent.'})
        }
        
        receiver.friendRequests.push(senderId);
        sender.sentRequests.push(receiver._id)
        
        await receiver.save();
        await sender.save();
        
        res.send("Friend request sent!")
    } catch(error) {
        res.status(500).json({message: error})
    }
})

router.post('/:id/accept-request/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const sender = await User.findById(id)
        
        if(!currentUser.friendRequests.includes(id)) {
            return res.status(400).json({message: 'No friend request'})
        }
        
        currentUser.friendRequests = currentUser.friendRequests.filter((reqId) => reqId.toString() !== id)
        sender.sentRequests = sender.sentRequests.filter((sentId) => sentId.toString() !== currentUserId);
        
        currentUser.friends.push(id);
        sender.friends.push(currentUserId);
        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Friend request accepted!'})
    } catch(error) {
        res.status(500).json({message: 'Server error' + error})
    }
})

router.post('/:id/deny-request/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const sender = await User.findById(id)
        
        if(!currentUser.friendRequests.includes(id)) {
            return res.status(400).json({message: 'No friend request'})
        }
        
        currentUser.friendRequests = currentUser.friendRequests.filter((reqId) => reqId.toString() !== id)
        sender.sentRequests = sender.sentRequests.filter((sentId) => sentId.toString() !== currentUserId);
        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Friend request denied!'})
    } catch(error) {
        res.status(500).json({message: 'Server error' + error})
    }
})

router.get('/', auth, async(req,res) => {
    const id = req.user.userId
    try {
        const user = await User.findById(id).populate('friends', 'username')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ message: 'Server error' + error});
    }
})

export default router;
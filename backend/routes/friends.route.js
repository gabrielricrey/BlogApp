import express from 'express';
import User from '../models/user.model.js';
import { auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

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

router.delete('/:id/cancel-request/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const receiver = await User.findById(id)
        
        if(!currentUser.sentRequests.includes(id)) {
            return res.status(400).json({message: 'No pending friend request'})
        }
        
        currentUser.sentRequests = currentUser.sentRequests.filter((reqId) => reqId.toString() !== id)
        receiver.friendRequests = receiver.friendRequests.filter((recId) => recId.toString() !== currentUserId);
        
        await currentUser.save();
        await receiver.save();
        
        res.status(200).json({message: 'Friend request canceled!'})
    } catch(error) {
        res.status(500).json({message: 'Server error' + error})
    }
})

router.delete('/:id/remove-friend/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const sender = await User.findById(id)
        
        if(!currentUser.friends.includes(id)) {
            return res.status(400).json({message: 'Not friends'})
        }
        
        currentUser.friends = currentUser.friends.filter((friend) => friend.toString() !== id)
        sender.friends = sender.friends.filter((friend) => friend.toString() !== currentUserId)

        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Friend removed!'})
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

router.get('/user/:id', auth, async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({message: 'Invalid Id'});
    }

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
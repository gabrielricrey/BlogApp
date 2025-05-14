import express from 'express';
import User from '../models/user.model.js';
import { auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router()

router.post('/:id/follow/', auth, async (req,res) => {
    const { id } = req.params;
    const senderId = req.user.userId;

    if(id === senderId) {
        return res.status(400).json({ message: 'You cannot send a follow request to yourself' });
    }

    try{
        const sender = await User.findById(senderId);
        const receiver = await User.findById(id);
        
        if(!receiver) {
            return res.status(400).json({message: 'User not found'})
        }

        if(receiver.private) {
            
            if(receiver.followRequests.includes(senderId)) {
                return res.status(400).json({message: 'Follow request already sent.'})
            }
            
            receiver.followRequests.push(senderId);
            sender.sentRequests.push(receiver._id)
            
            await receiver.save();
            await sender.save();
            
            res.status(200).json({message: "Follow request sent!"})
        } else {
            receiver.followers.push(senderId)
            sender.following.push(receiver._id)

            await receiver.save();
            await sender.save();

            res.status(200).json({message: 'Now following this user!'})
        }

    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/:id/accept-request/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const sender = await User.findById(id)
        
        if(!currentUser.followRequests.includes(id)) {
            return res.status(400).json({message: 'No follow request'})
        }
        
        currentUser.followRequests = currentUser.followRequests.filter((reqId) => reqId.toString() !== id)
        sender.sentRequests = sender.sentRequests.filter((sentId) => sentId.toString() !== currentUserId);
        
        currentUser.followers.push(id);
        sender.following.push(currentUserId);
        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Follow request accepted!'})
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
        
        if(!currentUser.followRequests.includes(id)) {
            return res.status(400).json({message: 'No follow request'})
        }
        
        currentUser.followRequests = currentUser.followRequests.filter((reqId) => reqId.toString() !== id)
        sender.sentRequests = sender.sentRequests.filter((sentId) => sentId.toString() !== currentUserId);
        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Follow request denied!'})
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
            return res.status(400).json({message: 'No pending follow request'})
        }
        
        currentUser.sentRequests = currentUser.sentRequests.filter((reqId) => reqId.toString() !== id)
        receiver.followRequests = receiver.followRequests.filter((recId) => recId.toString() !== currentUserId);
        
        await currentUser.save();
        await receiver.save();
        
        res.status(200).json({message: 'Follow request canceled!'})
    } catch(error) {
        res.status(500).json({message: 'Server error' + error})
    }
})

router.delete('/:id/remove-follower/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const sender = await User.findById(id)
        
        if(!currentUser.followers.includes(id)) {
            return res.status(400).json({message: 'Not a follower'})
        }
        
        currentUser.followers = currentUser.followers.filter((follower) => follower.toString() !== id)
        sender.following = sender.following.filter((following) => following.toString() !== currentUserId)

        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Follower removed!'})
    } catch(error) {
        res.status(500).json({message: 'Server error' + error})
    }
})
router.delete('/:id/unfollow/', auth, async (req,res) => {
    const {id} = req.params;
    const currentUserId = req.user.userId

    try{

        const currentUser = await User.findById(currentUserId);
        const sender = await User.findById(id)
        
        if(!currentUser.following.includes(id)) {
            return res.status(400).json({message: 'Not following'})
        }
        
        currentUser.following = currentUser.following.filter((follower) => follower.toString() !== id)
        sender.followers = sender.followers.filter((following) => following.toString() !== currentUserId)

        
        await currentUser.save();
        await sender.save();
        
        res.status(200).json({message: 'Unfollowed user!'})
    } catch(error) {
        res.status(500).json({message: 'Server error' + error})
    }
})

router.get('/', auth, async(req,res) => {
    const id = req.user.userId
    try {
        const user = await User.findById(id).populate('followers', 'username')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.followers);
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
        const user = await User.findById(id).populate('followers', 'username')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.followers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' + error});
    }
})

export default router;
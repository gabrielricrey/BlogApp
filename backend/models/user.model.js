import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    private : {
        type: Boolean,
        required: true,
        default: false
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sentRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]

})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next()
    }

    this.password = await bcrypt.hash(this.password,10)
    next();
})

export default mongoose.model('User', userSchema)
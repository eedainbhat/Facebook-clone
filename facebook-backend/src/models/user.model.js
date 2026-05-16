require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const postModel = require('./post.model');

const userSchema = new mongoose.Schema({
    profilePicture: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: [true, "username already taken"],
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already taken"],
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        unique: [true, "Phone number already taken"],
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ], 
    isVerified: { //blue tick badge (like on instagram)
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '7d' });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 12);
}


module.exports = mongoose.model("User", userSchema);    
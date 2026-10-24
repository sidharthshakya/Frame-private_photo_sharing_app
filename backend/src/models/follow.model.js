const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const postSchema = new mongoose.Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

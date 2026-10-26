const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const likeSchema = new mongoose.Schema({
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postLiked: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {
    timestamps: true
});

likeSchema.index({ likedBy: 1, postLiked: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;

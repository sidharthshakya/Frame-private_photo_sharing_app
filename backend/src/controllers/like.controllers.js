const Like = require("../models/like.model");
const Post = require("../models/post.model");

const likeController = async (req, res) => {

    try {

        const userId = req.user._id
        const postId = req.params.postId

        const post = await Post.findById(postId)

        if(!post){
        return res.status(404).json({
            message: 'post not found',
        });    
        }

        const alreadyLiked = await Like.findOne({
            likedBy: userId,
            postLiked: postId
        })

        if(alreadyLiked){
            return res.status(409).json({
            message: 'already liked',
        });
        }

        await Like.create({
            likedBy: userId,
            postLiked: postId
        })

        return res.status(201).json({
            message: 'liked successfully',
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

const unlikeController = async (req, res) => {

    try {

        const userId = req.user._id
        const postId = req.params.postId

        const post = await Post.findById(postId)

        if(!post){
        return res.status(404).json({
            message: 'post not found',
        });    
        }

        const isLiked = await Like.findOne({
            likedBy: userId,
            postLiked: postId
        })

        if(!isLiked){
            return res.status(404).json({
            message: 'like not found',
        });
        }

        await Like.deleteOne({
            likedBy: userId,
            postLiked: postId
        })

        return res.status(201).json({
            message: 'unliked successfully',
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

module.exports = { likeController, unlikeController };
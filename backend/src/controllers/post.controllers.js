const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const Post = require('../models/post.model');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: 'Image file is required for a post'
            });
        }

        const user = req.user;
        const { caption } = req.body;
        const { originalname, buffer } = req.file;

        const file = await client.files.upload({
            file: await toFile(Buffer.from(buffer), 'file'),
            fileName: originalname,
            folder: '/insta_clone/posts'
        });

        const post = await Post.create({
            caption,
            img_url: file.url,
            author: user._id
        });

        return res.status(201).json({
            message: 'post created successfully',
            post
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

const getPostController = async (req, res) => {

    try {

        const user = req.user;

        const posts = await Post.find({
            author: user._id
        });

        return res.status(200).json({
            message: 'posts fetched successfully',
            posts
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

const getPostByIdController = async (req, res) => {

    try {

        const user = req.user;
        const postId = req.params.id

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        if(post.author.toString() !== user._id.toString()){
            return res.status(401).json({
            message: 'unauthorized access',
        });    
        }

        return res.status(200).json({
            message: 'post fetched successfully',
            post
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};


module.exports = { createPostController, getPostController, getPostByIdController };
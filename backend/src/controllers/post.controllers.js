const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {

    try {

        const { originalname, buffer } = req.file;

        await client.files.upload({
            file: await toFile(Buffer.from(buffer), 'file'),
            fileName: originalname,
            folder:'/insta_clone/posts'
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

module.exports = { createPostController };
const Follow = require("../models/follow.model");
const User = require("../models/user.model");

const followController = async (req, res) => {

    try {

        const userId = req.user._id.toString()
        const followId = req.params.userId;

        if (userId === followId) {
            return res.status(400).json({
                message: 'you cannot follow yourself',
            });
        }

        const followExist = await User.findById(followId);

        if (!followExist) {
            return res.status(404).json({
                message: 'user not found',
            });
        }

        const alreadyFollowing = await Follow.findOne({
            followBy: userId,
            follow: followId
        });

        if (alreadyFollowing) {
            return res.status(409).json({
                message: 'already following',
            });
        }

        await Follow.create({
            followBy: userId,
            follow: followId
        });

        return res.status(201).json({
            message: 'successfully following',
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

module.exports = { followController };
const Follow = require("../models/follow.model");
const User = require("../models/user.model");
const Request = require("../models/request.model");

const followRequestController = async (req, res) => {

    try {

        const userId = req.user._id.toString();
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

        const alreadyRequested = await Request.findOne({
            requestBy: userId,
            requestFor: followId
        });


        if (alreadyFollowing) {
            return res.status(409).json({
                message: 'already following',
            });
        }

        if (alreadyRequested) {
            return res.status(409).json({
                message: 'already requested',
            });
        }

        await Request.create({
            requestBy: userId,
            requestFor: followId
        });

        return res.status(201).json({
            message: 'successfully requested',
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

const followController = async(req,res)=>{
    try {

        const userId = req.user._id.toString();
        const requestId = req.params.requestId;

        if (userId === requestId) {
            return res.status(400).json({
                message: 'you cannot follow yourself',
            });
        }

        const requestExist = await User.findById(requestId);

        if (!resquestExist) {
            return res.status(404).json({
                message: 'user not found',
            });
        }

        const alreadyFollowing = await Follow.findOne({
            followBy: requestId,
            follow: userId
        });


        if (alreadyFollowing) {
            return res.status(409).json({
                message: 'already following',
            });
        }

        await Follow.create({
            followBy: requestId,
            follow: userId
        });

        return res.status(201).json({
            message: 'successfully requested',
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }
}

const unfollowController = async (req, res) => {

    try {

        const userId = req.user._id.toString();
        const followId = req.params.userId;

        if (userId === followId) {
            return res.status(400).json({
                message: 'you cannot unfollow yourself',
            });
        }

        const followExist = await User.findById(followId);

        if (!followExist) {
            return res.status(404).json({
                message: 'user not found',
            });
        }

        const isFollowing = await Follow.findOne({
            followBy: userId,
            follow: followId
        });

        if (!isFollowing) {
            return res.status(409).json({
                message: 'not following user',
            });
        }

        await Follow.deleteOne({
            followBy: userId,
            follow: followId
        });

        return res.status(200).json({
            message: 'unfollowed successfully',
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

module.exports = { followRequestController, unfollowController, followController };
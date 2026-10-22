const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {

    try {

        const { username, email, password, bio, profile_img } = req.body;

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existedUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            bio,
            profile_img,
            password: hashedPass
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });

        res.cookie('insta-clone-token', token);

        return res.status(201).json({
            message: 'user created successfully',
            success: true,
            data: { username, email, bio, profile_img }
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

const loginController = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (!existedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isValid = await bcrypt.compare(password, existedUser.password);

        if (!isValid) {
            return res.status(400).json({
                message: 'Invalid User'
            });
        }

        const token = jwt.sign({ id: existedUser._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });

        res.cookie('insta-clone-token', token);

        return res.status(200).json({
            message: 'user login successfully',
            success: true,
            data: {
                username: existedUser.username,
                email: existedUser.email,
                bio: existedUser.bio,
                profile_img: existedUser.profile_img
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: 'internal error',
            error: err.message
        });
    }

};

module.exports = { registerController, loginController };
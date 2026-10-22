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

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY);

        res.cookie('insta-clone-token', token, { expiresIn: '1h' });

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

module.exports = { registerController };
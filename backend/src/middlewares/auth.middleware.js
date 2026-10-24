const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const identifyUser = async (req, res, next) => {
    try {

        const token = req.cookies['insta-clone-token'];

        if (!token) {
            return res.status(401).json({
                message: 'unauthorized user',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "unauthorized user"
            });
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({
            message: 'unauthorized user',
            error: err.message
        });
    }


};

module.exports = { identifyUser };
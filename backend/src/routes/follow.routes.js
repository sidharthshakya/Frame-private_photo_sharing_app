const express = require('express');
const router = express.Router();
const { followController, unfollowController } = require("../controllers/follow.controllers");
const { identifyUser } = require('../middlewares/auth.middleware');

router.post('/:userId', identifyUser, followController);
router.post('/unfollow/:userId', identifyUser, unfollowController);

module.exports = router;
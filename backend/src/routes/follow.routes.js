const express = require('express');
const router = express.Router();
const { followRequestController, followController, unfollowController } = require("../controllers/follow.controllers");
const { identifyUser } = require('../middlewares/auth.middleware');

router.post('/request/:userId', identifyUser, followRequestController);
router.post('/:requestId', identifyUser, followController);
router.post('/unfollow/:userId', identifyUser, unfollowController);

module.exports = router;
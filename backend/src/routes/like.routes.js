const express = require('express');
const router = express.Router();
const { identifyUser } = require('../middlewares/auth.middleware');
const { likeController } = require('../controllers/like.controllers');

router.post('/:postId', identifyUser, likeController);

module.exports = router;
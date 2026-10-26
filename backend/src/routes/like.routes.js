const express = require('express');
const router = express.Router();
const { identifyUser } = require('../middlewares/auth.middleware');
const { likeController, unlikeController } = require('../controllers/like.controllers');

router.post('/:postId', identifyUser, likeController);
router.post('/unlike/:postId', identifyUser, unlikeController);

module.exports = router;
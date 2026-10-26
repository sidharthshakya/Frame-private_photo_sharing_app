const express = require('express');
const router = express.Router();
const { followController } = require("../controllers/follow.controllers");
const { identifyUser } = require('../middlewares/auth.middleware');

router.post('/:userId', identifyUser, followController);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } });
const { createPostController, getPostController } = require('../controllers/post.controllers');
const { identifyUser } = require('../middlewares/auth.middleware');

router.post('/create', upload.single('post'), identifyUser, createPostController);
router.get('/get', identifyUser, getPostController);

module.exports = router;
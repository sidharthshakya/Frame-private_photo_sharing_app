const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage,limits: {fileSize: 5 * 1024 * 1024} })
const { createPostController } = require('../controllers/post.controllers');

router.post('/create', upload.single('post'), createPostController);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');


router.post('/', verifyToken, createPost); 
router.get('/', getAllPosts);  

module.exports = router;

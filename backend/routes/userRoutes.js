const express = require('express');
const router = express.Router();
const { getUserProfile, updateBio } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Public route to get a user's profile and posts
router.get('/:username', getUserProfile);
router.put('/bio',verifyToken , updateBio); // "protect" = auth middleware



module.exports = router;

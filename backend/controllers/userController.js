const User = require('../models/User');
const Post = require('../models/Post');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        username: user.username
      },
      posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBio = async (req, res) => {
  try {
    const user = await User.findById(req.userId); 
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = req.body.bio || "";
    await user.save();

    res.status(200).json({ message: "Bio updated successfully", bio: user.bio });
  } catch (err) {
    console.error('Bio update error:', err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getUserProfile, updateBio };

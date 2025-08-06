const Post = require('../models/Post');

// Create a new post (requires authentication)
const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Post content is required" });
  }

  try {
    const newPost = new Post({
      content,
      author: req.userId, // set by verifyToken middleware
    });

    await newPost.save();

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts (public)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name username")
      .sort({ createdAt: -1 });


    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};


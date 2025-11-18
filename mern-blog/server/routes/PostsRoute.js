const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const validate = require("../middleware/validate");
const { createPostSchema } = require("../controllers/postValidation");
const { protect, admin } = require("../middleware/auth");

// Get all posts (public)
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Get single post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("category", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Create post (authenticated users)
router.post("/", protect, validate(createPostSchema), async (req, res, next) => {
  try {
    const authorId = req.auth.userId;
    const post = await Post.create({ ...req.body, author: authorId });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Update post (only creator or admin)
router.put("/:id", protect, validate(createPostSchema), async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author !== req.auth.userId && req.auth?.claims?.publicMetadata?.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to edit this post" });
    }

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Delete post (only creator or admin)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author !== req.auth.userId && req.auth?.claims?.publicMetadata?.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

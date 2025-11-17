const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const validate = require("../middleware/validate");
const { createPostSchema } = require("../controllers/postValidation");
const { protect, admin } = require("../middleware/auth"); // protect uses Clerk requireAuth()

/**
 * GET /api/posts
 * Public: fetch all posts
 */
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/posts/:id
 * Public: fetch single post
 */
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("category", "name");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/posts
 * Protected: only authenticated users can create posts
 */
router.post(
  "/",
  protect, // Clerk authentication
  validate(createPostSchema),
  async (req, res, next) => {
    try {
      const authorId = req.auth.userId; // Clerk user ID
      const post = await Post.create({ ...req.body, author: authorId });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/posts/:id
 * Protected: only authenticated users can update posts
 * Optional: restrict to admin by adding `admin` middleware
 */
router.put(
  "/:id",
  protect,
  validate(createPostSchema),
  async (req, res, next) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!post) return res.status(404).json({ message: "Post not found" });

      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/posts/:id
 * Protected: only authenticated users can delete posts
 * Optional: restrict to admin by adding `admin` middleware
 */
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

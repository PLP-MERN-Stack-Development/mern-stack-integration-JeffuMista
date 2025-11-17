const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const validate = require("../middleware/validate");
const { createPostSchema } = require("../controllers/postValidation");

// GET /api/posts
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

// GET /api/posts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// POST /api/posts
router.post("/", validate(createPostSchema), async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// PUT /api/posts/:id
router.put("/:id", validate(createPostSchema), async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/posts/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

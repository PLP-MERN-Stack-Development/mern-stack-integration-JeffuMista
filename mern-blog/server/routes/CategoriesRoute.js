const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect, admin } = require("../middleware/clerkAuth");

// Get all categories (public)
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// Create category (authenticated)
router.post("/", protect, async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name,
      userId: req.auth.userId,
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

// Update category (creator or admin)
router.put("/:id", protect, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    const isOwner = category.userId === req.auth.userId;
    const isAdmin = req.auth.claims.publicMetadata?.role === "admin";

    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

    Object.assign(category, req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// Delete category (creator or admin)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    const isOwner = category.userId === req.auth.userId;
    const isAdmin = req.auth.claims.publicMetadata?.role === "admin";

    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

    await category.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

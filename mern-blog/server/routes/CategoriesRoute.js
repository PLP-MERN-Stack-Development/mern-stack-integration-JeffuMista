const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const requireAuth = require("../middleware/requireAuth");

// create category
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name,
      userId: req.auth.userId,
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete category (creator or admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ message: "Not found" });

    const isOwner = category.userId === req.auth.userId;
    const isAdmin = req.auth.sessionClaims?.metadata?.role === "admin";

    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Forbidden" });

    await category.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

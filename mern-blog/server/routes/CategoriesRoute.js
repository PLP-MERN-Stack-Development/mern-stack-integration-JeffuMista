const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const validate = require("../middleware/validate");
const { createCategorySchema } = require("../controllers/categoryValidation");
const { protect, admin } = require("../middleware/auth"); // Clerk middleware

/**
 * GET /api/categories
 * Public: anyone can fetch categories
 */
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/categories/:id
 * Public: anyone can fetch single category
 */
router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/categories
 * Protected: only authenticated users can create categories
 * Tracks creator via Clerk ID
 */
router.post(
  "/",
  protect,
  validate(createCategorySchema),
  async (req, res, next) => {
    try {
      const createdBy = req.auth.userId; // Clerk user ID
      const category = await Category.create({ ...req.body, createdBy });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/categories/:id
 * Protected: only admins can update categories
 */
router.put(
  "/:id",
  protect,
  admin,
  validate(createCategorySchema),
  async (req, res, next) => {
    try {
      const updated = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updated) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/categories/:id
 * Protected: only admins can delete categories
 */
router.delete("/:id", protect, admin, async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

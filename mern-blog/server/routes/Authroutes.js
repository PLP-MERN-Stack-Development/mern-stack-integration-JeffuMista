// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const User = require("../models/User");

/**
 * @route   GET /api/auth/profile
 * @desc    Get logged-in user profile
 * @access  Protected (Clerk)
 */
router.get("/profile", protect, async (req, res) => {
  try {
    // req.auth.userId is provided by Clerk middleware
    const clerkUserId = req.auth.userId;

    // Optional: fetch additional user info from DB if needed
    const user = await User.findOne({ clerkId: clerkUserId }).select("-password");

    res.json({
      clerkUserId,
      user: user || null, // If you store user in DB
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/clerkAuth");

// @route   GET /api/auth/profile
// @desc    Get logged-in user profile
// @access  Protected
router.get("/profile", protect, async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const user = await User.findOne({ clerkId: clerkUserId }).select("-password");

    res.json({
      clerkUserId,
      user: user || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

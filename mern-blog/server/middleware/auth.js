// Refactored for Clerk authentication
const { requireAuth } = require("@clerk/clerk-sdk-node");
const User = require("../models/User");

// Protect middleware for routes
exports.protect = requireAuth();

// Optional admin middleware
exports.admin = async (req, res, next) => {
  try {
    // Example: fetch user from DB using Clerk userId
    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Admin access required" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

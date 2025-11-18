// Protect route: only signed-in users
exports.protect = (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }
  next();
};

// Admin-only route
exports.admin = (req, res, next) => {
  if (req.auth?.claims?.publicMetadata?.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
};

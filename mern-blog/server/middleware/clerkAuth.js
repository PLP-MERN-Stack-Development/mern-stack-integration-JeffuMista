// middleware/clerkAuth.js
const { verifyToken } = require("@clerk/clerk-sdk-node");

// Protect route: only signed-in users
exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verifyToken(token);
    req.auth = {
      userId: payload.sub,
      claims: payload,
    };
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

// Admin-only route
exports.admin = (req, res, next) => {
  if (req.auth?.claims?.publicMetadata?.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
};

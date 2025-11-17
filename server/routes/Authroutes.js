const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../controllers/authValidation");
const { protect } = require("../middleware/auth");

// @route POST /api/auth/register
router.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    next(error);
  }
});

// @route POST /api/auth/login
router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    next(error);
  }
});

// @route GET /api/auth/profile
router.get("/profile", protect, async (req, res, next) => {
  res.json(req.user);
});

module.exports = router;

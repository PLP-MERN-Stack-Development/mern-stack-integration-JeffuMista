// server.js - Main server file for the MERN blog application

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { connectDB } = require("./config/db");

// Import routes
const postRoutes = require("./routes/PostsRoute");
const categoryRoutes = require("./routes/CategoriesRoute");
const authRoutes = require("./routes/Authroutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// Log requests in development mode
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API routes
// app.use("/api/posts", postRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("MERN Blog API is running");
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Handle unhandled promise rejections
const unhandledPromise = require("./utils/unhandledPromise");
unhandledPromise;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Mern-blog API is running on http://localhost:${PORT}`)
);
// module.exports = app;

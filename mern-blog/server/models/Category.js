const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true }, // creator ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);

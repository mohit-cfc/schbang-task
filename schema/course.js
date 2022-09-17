const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  topics: Array,
  duration: Number,
  category: {
    type: String,
    enum: ["business", "engineering", "health", "language"],
  },
  isApproved: Boolean,
});

module.exports = mongoose.model("course", CourseSchema);

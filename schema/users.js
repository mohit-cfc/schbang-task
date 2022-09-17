const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  name: String,
  salt: String,
  role: {
    type: String,
    enum: ["employee", "super-admin", "admin"],
    default: "employee",
  },
});

module.exports = mongoose.model("user", UserSchema);

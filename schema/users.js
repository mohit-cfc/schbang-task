const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  name: String,
  salt: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
});

module.exports = mongoose.model("user", UserSchema);

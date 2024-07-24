const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

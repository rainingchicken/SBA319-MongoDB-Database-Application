const mongoose = require("mongoose");
const ROLE = require("../db/roles");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ROLE.BASIC,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const User = require("../models/userModel");
async function setUser(req, res, next) {
  const userId = req.body.userId;
  const users = await User.find();
  if (userId) {
    req.user = users.find((user) => user._id.toString() === userId);
  }
  next();
}
module.exports = setUser;

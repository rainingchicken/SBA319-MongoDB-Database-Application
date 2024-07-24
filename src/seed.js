const User = require("../models/userModel");
const Dashboard = require("../models/dashboardModel");

const seed = async () => {
  const user1 = new User({
    name: "rain",
    role: "admin",
  });
  user1.save();
  const dashboard1 = new Dashboard({
    name: "rain's dashboard",
    userId: user1._id,
  });
  dashboard1.save();
  dashboard1.populate("userId");

  const user2 = new User({
    name: "ray",
    role: "basic",
  });
  user2.save();
  const dashboard2 = new Dashboard({
    name: "ray's dashboard",
    userId: user2._id,
  });
  dashboard2.save();
  dashboard2.populate("userId");
};
module.exports = seed;

const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});
const Dashboard = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard;

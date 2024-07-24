const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    default: 0,
  },
  applied: Boolean,
  dashboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard",
    required: [true, "dashboardId is a required field"],
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

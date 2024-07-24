const User = require("../models/userModel");
const Dashboard = require("../models/dashboardModel");
const Job = require("../models/jobModel");
const users = require("../db/users");
const dashboards = require("../db/dashboards");
const jobs = require("../db/jobs");

const seed = async () => {
  for (let i = 0; i < users.length; i++) {
    let jobArr = [];
    const createdUser = new User({
      username: users[i].username,
      role: users[i].role,
    });
    createdUser.save();
    const createdDashboard = new Dashboard({
      name: dashboards[i].name,
      userId: createdUser._id,
    });
    createdDashboard.save();
    createdDashboard.populate("userId");
    for (let j = 0; j < jobs[i].length; j++) {
      const createdJob = new Job({
        title: jobs[i][j].title,
        pay: jobs[i][j].pay,
        applied: jobs[i][j].applied,
        dashboardId: createdDashboard._id,
      });
      createdJob.save();
      createdJob.populate("dashboardId");
      jobArr.push(createdJob);
    }
    createdDashboard.jobs = jobArr;
  }
};
module.exports = seed;

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { authUser, authRole } = require("./basicAuth");
const ROLE = require("./db/roles");
const dashboardRouter = require("./routes/dashboard");
const User = require("./models/userModel");
const Dashboard = require("./models/dashboardModel");
const setUser = require("./src/setUser");
const seed = require("./src/seed");
const conn = require("./db/conn");
const Job = require("./models/jobModel");
conn();

app.use(express.json());
app.use(setUser);

app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

app.get("/seed", async (req, res) => {
  try {
    await User.deleteMany({});
    await Dashboard.deleteMany({});
    await Job.deleteMany({});
    await seed();
    res.json({ msg: "Data inserted" });
  } catch (error) {
    console.log(`Something went wrong loading seed data: ${error.message}`);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

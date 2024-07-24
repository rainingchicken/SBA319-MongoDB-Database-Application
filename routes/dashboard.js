const express = require("express");
const router = express.Router();
const Dashboard = require("../models/dashboardModel");
const Job = require("../models/jobModel");
// const jobsRouter = require("./jobs");
const { authUser } = require("../basicAuth");
const {
  canViewDashboard,
  canDeleteDashboard,
  canPatchDashboard,
  scopedDashboards,
} = require("../src/permissions/dashboard");

router.get("/", authUser, async (req, res) => {
  const dashboards = await Dashboard.find();
  res.json(scopedDashboards(req.user, dashboards));
});

router.get(
  "/:dashboardId",
  setDashboard,
  authUser,
  authGetDashboard,
  (req, res) => {
    res.json(req.dashboard);
  }
);

router.patch(
  "/:dashboardId",
  setDashboard,
  authUser,
  authPatchDashboard,
  async (req, res) => {
    const updatedDashboard = await Dashboard.findByIdAndUpdate(
      req.params.dashboardId,
      req.body
    );
    res.json(updatedDashboard);
  }
);

router.delete(
  "/:dashboardId",
  setDashboard,
  authUser,
  authDeleteDashboard,
  async (req, res) => {
    const deletedDashboard = await Dashboard.findByIdAndDelete(
      req.params.dashboardId
    );
    res.json(deletedDashboard);
  }
);

router.get("/:dashboardId/jobs", async (req, res) => {
  const theseJobs = await Job.find({
    dashboardId: req.params.dashboardId,
  });
  res.send(theseJobs);
});
router.post("/:dashboardId/jobs", async (req, res) => {
  const reqbody = req.body;
  reqbody.dashboardId = req.params.dashboardId; //lololol this works
  console.log(reqbody);
  const newJob = new Job(reqbody);
  // newJob.save();
  let error;
  try {
    await newJob.save();
    res.send(newJob);
  } catch (err) {
    res.send({ errorMessage: err });
  }

  // assert.equal(
  //   error.errors["dashboardId"].message,
  //   "Path `dashboardId` is required."
  // );

  // error = cat.validateSync();
  // assert.equal(
  //   error.errors["dashboardId"].message,
  //   "Path `dashboardId` is required."
  // );
});
router.get("/:dashboardId/jobs/:jobId", async (req, res) => {
  const thisJob = await Job.findById(req.params.jobId);
  res.send(thisJob);
});

async function setDashboard(req, res, next) {
  const dashboardId = req.params.dashboardId;
  const dashboards = await Dashboard.find();
  req.dashboard = dashboards.find(
    (dashboard) => dashboard._id.toString() === dashboardId
  );

  if (req.dashboard == null) {
    res.status(404);
    return res.send("Dashboard not found");
  }
  next();
}

function authGetDashboard(req, res, next) {
  if (!canViewDashboard(req.user, req.dashboard)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}
function authPatchDashboard(req, res, next) {
  if (!canPatchDashboard(req.user, req.dashboard)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}
function authDeleteDashboard(req, res, next) {
  if (!canDeleteDashboard(req.user, req.dashboard)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

module.exports = router;

const express = require("express");
const router = express.Router();
const Dashboard = require("../models/dashboardModel");

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

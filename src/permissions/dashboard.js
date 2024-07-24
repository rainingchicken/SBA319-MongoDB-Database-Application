const ROLE = require("../../db/roles");

function canViewDashboard(user, dashboard) {
  return (
    user.role === ROLE.ADMIN ||
    dashboard.userId.toString() === user._id.toString()
  );
}

function scopedDashboards(user, dashboards) {
  if (user.role === ROLE.ADMIN) return dashboards;
  return dashboards.filter(
    (dashboard) => dashboard.userId.toString() === user._id.toString()
  );
}

function canDeleteDashboard(user, dashboard) {
  return (
    user.role === ROLE.ADMIN ||
    dashboard.userId.toString() === user._id.toString()
  );
}

function canPatchDashboard(user, dashboard) {
  return dashboard.userId.toString() === user._id.toString();
}

module.exports = {
  canViewDashboard,
  scopedDashboards,
  canDeleteDashboard,
  canPatchDashboard,
};

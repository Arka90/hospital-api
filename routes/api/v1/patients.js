const express = require("express");
const router = express.Router();
const passport = require("passport");
const patientController = require("../../../controllers/patientsController");
const reportsController = require("../../../controllers/reportsController");

router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.register
);

router.use(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  reportsController.createReport
);

router.get("/:id/all_reports", reportsController.all_reports);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const patientController = require("../../../controllers/patientsController");

// only docotrs can register patient so its protected
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.register
);

// only doctor can create reports so it's protected
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);

router.get("/:id/all_reports", patientController.all_reports);

module.exports = router;

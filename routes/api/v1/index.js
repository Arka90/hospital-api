const express = require("express");
const router = express.Router();

// Any request with doctor in it directed to doctor folder
router.use("/doctors", require("./doctors"));

// Any request with patients in it directed to patients folder
router.use("/patients", require("./patients"));

// Any request with reports in it directed to reports folder
router.use("/reports", require("./reports"));

module.exports = router;

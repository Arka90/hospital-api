const express = require("express");
const router = express.Router();

// Any request with doctor in it directed to doctor folder
router.use("/doctors", require("./doctors"));

// Any request with patients in it directed to patients folder
router.use("/patients", require("./patients"));

router.use("/reports", require("./reports"));

module.exports = router;

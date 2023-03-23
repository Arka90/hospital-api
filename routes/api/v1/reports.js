const express = require("express");
const router = express.Router();
const reportsController = require("../../../controllers/reportsController");

router.get("/:status", reportsController.reportsByStatus);

module.exports = router;

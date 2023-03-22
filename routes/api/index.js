const express = require("express");
const router = express.Router();

// any request with v1 directed to v1 route folder
router.use("/v1", require("./v1"));

module.exports = router;

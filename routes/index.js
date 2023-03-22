const express = require("express");
const router = express.Router();

// any request with api directed to api route folder
router.use("/api", require("./api"));

module.exports = router;

const Report = require("../models/report");

module.exports.reportsByStatus = async (req, res) => {
  try {
    //finding reports by status and populating the doctor created by
    let reports = await Report.find({ status: req.params.status })
      .sort("createdAt")
      .populate({
        path: "created_by",
        select: "name username",
      });

    //Sending the report as response
    return res.status(200).json({
      status: "Success",
      data: {
        reports,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

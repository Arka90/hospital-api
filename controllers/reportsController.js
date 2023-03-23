const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.createReport = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        status: "failure",
        message: "No patient found please register",
      });
    }

    let report = await Report.create({
      created_by: req.user,
      status: req.body.status,
    });

    patient.reports.push(report);
    await patient.save();

    return res.status(201).json({
      status: "Success",
      message: "Report Created",
      report,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports.all_reports = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        status: "failure",
        message: "No patient found",
      });
    }

    await patient.populate({
      path: "reports",

      populate: [
        { path: "created_by", model: "Doctor", select: "username name" },
      ],
    });

    const reports = patient.reports;

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

module.exports.reportsByStatus = async (req, res) => {
  try {
    let reports = await Report.find({ status: req.params.status }).populate({
      path: "created_by",
      select: "name username",
    });

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

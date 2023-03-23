const Patient = require("../models/patient");
const Report = require("../models/report");
// registering the patient
module.exports.register = async (req, res) => {
  try {
    // Finding Patient by id
    let patient = await Patient.findOne({ phoneNo: req.body.phoneNo });

    // if patient not exisits the create and return patient
    if (!patient) {
      patient = await Patient.create({ phoneNo: req.body.phoneNo });
      return res.status(201).json({
        status: "Success",
        message: "Patient Successfully Registered",
        patient,
      });
    }

    // else display patient already exists
    return res.status(200).json({
      status: "Success",
      message: "Patient Already exists",
      patient,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async (req, res) => {
  try {
    // finding the patient
    let patient = await Patient.findById(req.params.id);

    // if no patient found return No patient found please register
    if (!patient) {
      return res.status(404).json({
        status: "failure",
        message: "No patient found please register",
      });
    }

    // if patient found create report
    let report = await Report.create({
      created_by: req.user,
      status: req.body.status,
    });

    //push the new report on report array of patient
    patient.reports.push(report);

    // save the document
    await patient.save();

    //return the response
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
    // find the patient
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      //if no patient found just return not found
      return res.status(404).json({
        status: "failure",
        message: "No patient found",
      });
    }

    //populating patient reports and created by doctor
    await patient.populate({
      path: "reports",

      populate: [
        //by selecting username and name only this two field will be include in the result
        { path: "created_by", model: "Doctor", select: "username name" },
      ],
    });

    //get the reports
    const reports = patient.reports;

    //send the reports
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

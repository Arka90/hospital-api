const Patient = require("../models/patient");

// registering the patient
module.exports.register = async (req, res) => {
  try {
    let patient = await Patient.findOne({ phoneNo: req.body.phoneNo });

    if (!patient) {
      patient = await Patient.create({ phoneNo: req.body.phoneNo });
      return res.status(201).json({
        status: "Success",
        message: "Patient Successfully Registered",
        patient,
      });
    }

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

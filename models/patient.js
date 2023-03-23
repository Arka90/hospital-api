const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: Number,
      require: true,
    },

    //this report field will help to fetch all reports of an particular patient
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

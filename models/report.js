const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      require: true,
    },
    status: {
      type: String,
      enum: [
        "negative",
        "travelled-quarantine",
        "symptoms-quarantine",
        "positive-admit",
      ],
      require: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

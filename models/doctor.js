const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  username: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

// to save save password by encrypting
doctorSchema.pre("save", async function (next) {
  //Only run if password is modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// to check password
doctorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

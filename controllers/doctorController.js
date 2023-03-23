const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

//Registering Doctor
module.exports.register = async (req, res) => {
  try {
    // Finding the doctor by username
    const doctorAlreadyExists = await Doctor.findOne({
      username: req.body.username,
    });

    // If already exists returning Asking the doctor to login
    if (doctorAlreadyExists) {
      return res.status(400).json({
        status: "failure",
        message: "Doctor Already Register, Please log in",
      });
    }

    //if doctor not exsits then create one
    const doctor = await Doctor.create(req.body);

    // if creating of doctor failed returning
    if (!doctor) {
      return res.status(500).json({
        status: "failure",
        message: "Something went wrong",
      });
    }

    // doctor creation successfull
    return res.status(200).json({
      status: "Success",
      message: "You are registered",
    });
  } catch (err) {
    // Any error occoured during creating doctor will handeled here
    console.log(err);

    return res.status(500).json({
      status: "failure",
      message: "internal Server Error",
    });
  }
};

// Login Doctors
module.exports.createSession = async (req, res) => {
  try {
    //Finding if the doctor exists
    let doctor = await Doctor.findOne({
      username: req.body.username,
    });

    // if their is no doctor with that user name or Password incorrect then return a message invalid password or Username
    if (
      !doctor ||
      !(await doctor.correctPassword(req.body.password, doctor.password))
    ) {
      return res.status(422).json({
        status: "failure",
        message: "Invalid Username/Password",
      });
    }

    //Else create JWT and send
    return res.status(200).json({
      status: "Success",
      message: "Sign in successful, Here is your token,please keep it safe",
      data: {
        token: jwt.sign(doctor.toJSON(), "ThisIsMySecret", {
          expiresIn: "1d",
        }),
      },
    });
  } catch (err) {
    // Any error occoured during loging in doctor will handeled here

    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

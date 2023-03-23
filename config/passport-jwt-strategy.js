const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Doctor = require("../models/doctor");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ThisIsMySecret",
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
      let doctor = await Doctor.findById(jwtPayload._id);

      if (doctor) {
        return done(null, doctor);
      }

      return done(null, false);
    } catch (err) {
      console.log("Error in finding registered Doctor");
      return;
    }
  })
);

module.exports = passport;

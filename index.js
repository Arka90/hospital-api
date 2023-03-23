const port = 3000;
const express = require("express");
const passportJWT = require("./config/passport-jwt-strategy");

const app = express();
app.use(express.urlencoded({ extended: true }));

const db = require("./config/mongoose");
// Any request wtih / going to handelled by routes folder
app.use("/", require("./routes"));

// Starting Server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port ${port} ✔`);
});

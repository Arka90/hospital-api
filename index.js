const express = require("express");
const port = 3000;
const app = express();
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

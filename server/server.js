// Importing required modules
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// parse env variables
require("dotenv").config();

// Configuring port
const port = process.env.PORT || 9000;
process.env.DB_URL = "mongodb://mongo:27017/redclip-db";
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log("Unable to connect to database.");
  } else {
    console.log("Connected to database!");
  }
});

const app = express();
// Configure middlewares
app.use(cors());
app.use(express.json());

app.set("view engine", "html");

// Static folder
app.use(express.static(__dirname + "/views/"));

// Defining route middleware
app.use("/posts", require("./routes/post_routes"));
app.use("/comments", require("./routes/comment_routes"));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}`);

module.exports = app;

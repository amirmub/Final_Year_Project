require("dotenv").config();
const express = require("express");
const app = express();

// db connection file
const dbConnection = require("./config/config");
dbConnection();

app.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log("its listening PORT http://localhost:5000");
});

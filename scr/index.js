const express = require("express");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();

const port = 5000;
app.listen(port, () => {
  console.log(`Server is Running on the Port${port}`);
});

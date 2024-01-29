const express = require("express");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extende: false }));
app.use("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exist, choose a diffrent username");
  } else {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(data.password, saltRound);
    data.password = hashPassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("username cannot found");
    }
    const lsPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (lsPasswordMatch) {
      res.render("home");
    } else {
      res.send("Wrong Password");
    }
  } catch (err) {
    res.send("Wrong Detail");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is Running on the Port${port}`);
});

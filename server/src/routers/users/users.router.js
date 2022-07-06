const express = require("express");
const chalk = require("chalk");
const User = require("../../db/models/users/users.model");
// const fs = require("fs");
const path = require("path");

// console.log(filePath);

// const publicDirectoryPath = path.join(__dirname, "../public");
// console.log(publicDirectoryPath);
// console.log(__dirname);

// C:\Users\benny\Desktop\Git\BE WeekEnd Projects\KitchenBook\
//C:\Users\benny\Desktop\Git\BE WeekEnd Projects\KitchenBook\client\src\App.jsx

const router = new express.Router();

// add new user - SIGN In
router.post("/users/new", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    //todo need to understand how redirect work
    res.redirect("http://localhost:3000/");
    // filePath = __dirname + "\\public\\" + "index.html";
    // res.sendFile(filePath);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
  }
});

module.exports = router;

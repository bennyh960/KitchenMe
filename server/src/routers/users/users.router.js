const express = require("express");
const chalk = require("chalk");
const User = require("../../db/models/users/users.model");
const auth = require("../../middleware/auth.js");

const router = new express.Router();

// add new user - SIGN In
router.post("/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
  }
});
//* Get user data and generate Auth Token - login and forgotpassword
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(chalk.red(error.message));
  }
});

// * LOGOUT
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send("userExit");
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

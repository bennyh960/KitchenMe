const express = require("express");
const chalk = require("chalk");
const User = require("../../db/models/users/users.model");
const auth = require("../../middleware/auth.js");
const multerUpload = require("../../middleware/multer");
// const multer = require("multer");
const sharp = require("sharp");

const router = new express.Router();

//* add new user - SIGN In
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
//* Login
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

//* PasswordReset
router.post("/users/reset/password", async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    // ! we can add here email api to send password
    let text;
    if (!user) text = "bad";
    else text = "ok";
    res.send(text);
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

// =====================================================
// * upload image
router.post(
  "/users/me/avatar",
  auth,
  multerUpload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send("Image uploaded as png file");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// *get image
router.get("/users/:id/avatar", async (req, res) => {
  try {
    // console.log(chalk.yellow(req.params.id));
    const user = await User.findById(req.params.id);
    // console.log(chalk.yellow(user));
    // console.log(chalk.yellow(user));
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
    // option 2 on client side : <img src="http://localhost:3000/users/userID/avatar" />
    //example userID = 62ba0fb908e77757705f127e
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
  }
});

// ========================================

// *GET USERS DATA
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (e) {
    // console.log(chalk.red(e.message));
    res.status(500).send(e.message);
  }
});

module.exports = router;

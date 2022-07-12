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
// * Get User by ID
router.get("/users/profile/:userId", async (req, res) => {
  try {
    // console.log(req.params);
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("Error:User not found");
    }
    if (user._id === req.params.userId) {
      throw new Error("user can see his data in  profile page");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// * Get User pending and friendlist by ID
router.get("/user/lists/:userId", async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("Error:User not found");
    }
    if (user._id === req.params.userId) {
      throw new Error("user can see his data in profile page");
    }
    res.send({ pending: user.pending, friends: user.friends });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// =====================================================
// * upload image
router.post(
  "/users/me/avatar",
  auth,
  multerUpload.single("avatar"),
  async (req, res) => {
    // console.log("benny", req.file);
    const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();
    req.user.avatar = buffer;
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send("Image uploaded as png file");
  },
  (error, req, res, next) => {
    // res.status(400).send("=======================");
    res.status(400).send({ error: error.message });
  }
);
// *get image
router.get("/users/:id/avatar", async (req, res) => {
  try {
    if (!req.params.id) throw new Error();
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
    console.log(chalk.red.inverse(error.message));
  }
});

// ========================================

// *GET USERS DATA
router.get("/users/:name", async (req, res) => {
  try {
    const regexstring = req.params.name;
    const regexp = new RegExp(regexstring, "gi");
    const users = await User.find({ name: { $regex: regexp } }).limit(10);

    res.send(users);
  } catch (e) {
    // console.log(chalk.red(e.message));
    res.status(500).send(e.message);
  }
});

// ===================== Social -friend request
// * send friend request
router.post("/users/friend/request", auth, async (req, res) => {
  try {
    if (req.body.id === req.user._id) throw new Error("user cant add himself to friends");
    const friend = await User.findOne({ _id: req.body.id, pending: { $ne: req.user._id } });
    if (!friend) throw new Error("friend not found or already pending");

    friend.pending.push(req.user._id);

    await friend.save();
    req.user.pending.push(friend._id);
    await req.user.save();
    res.status(201).send("pending");
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// * Cancle friend request
router.patch("/users/friend/request/cancle", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.userId === req.body.friendId) throw new Error("user cant delete himself ");
    // const friend = await User.findOne({ _id: req.body.friendId, pending: { $in: [req.body.userId] } });
    // const friend = await User.findOne({ _id: req.body.friendId });
    const friend = await User.updateOne(
      { _id: req.body.friendId },
      {
        $pull: {
          pending: [req.body.userId],
        },
      },
      { new: true }
    );
    const user = await User.updateOne(
      { _id: req.body.userId },
      {
        $pull: {
          pending: [req.body.friendId],
        },
      },
      { new: true }
    );

    // const user = await User.findOne({ _id: req.body.userId, pending: { $in: [req.body.friendId] } });
    // const user = await User.findOne({ _id: req.body.userId });
    // if (!friend) throw new Error("friend not pending");
    // if (!user) throw new Error("user not pending");

    // friend.pending = Array.from(friend.pending).filter((id) => id !== req.body.userId);
    // await friend.save();

    // user.pending = Array.from(user.pending).filter((id) => id !== req.body.friendId);
    // await user.save();
    // console.log(chalk.yellow(user.pending.includes(req.body.friendId)));

    res.status(202).send({ user, friend });
    // res.status(202).send("cancle");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// * get friend request
// router.get("/users/friend/request",auth,async(req,res)=>{

// })

module.exports = router;

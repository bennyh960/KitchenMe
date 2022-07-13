const express = require("express");
const chalk = require("chalk");
const auth = require("../../middleware/auth");
const Recipe = require("../../db/models/recipes/recipes.model");
const User = require("../../db/models/users/users.model");
const Notification = require("../../db/models/notifications/notification.model");

const router = new express.Router();

// add notification to db
router.post("/user/notifications", auth, async (req, res) => {
  try {
    let notification = await Notification.findOneAndUpdate(
      { owner: req.user._id },
      { $push: { description: { type: req.body.type, content: req.body.content } } }
    );

    if (!notification) {
      notification = new Notification({
        owner: req.user._id,
        description: [{ type: req.body.type, content: req.body.content }],
      });
    }

    await notification.save();
    res.status(201).send(notification);
    console.log(chalk.inverse.green("New notification added to  DB"));
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
    console.log(chalk.inverse.red("Failed to add notification"));
  }
});

// *Get recipes
// router.get("/recipes/public", async (req, res) => {
//   try {
//     const recipes = await Recipe.find().sort("-updatedAt");
//     res.send(recipes);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

// //* Get user recipes
router.get("/user/notifications", auth, async (req, res) => {
  try {
    // await req.user.populate("recipes").execPopulate(); //its seems its no longer a function

    await req.user.populate({ path: "notifications", options: { sort: { createdAt: -1 } } });
    res.send({ notifiation: req.user.notifications, owner: req.user.name });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(chalk.red(e.message));
  }
});

module.exports = router;

const express = require("express");
const chalk = require("chalk");
const Recipe = require("../../db/models/recipes/recipes.model");
const sharp = require("sharp");
const multer = require("multer");
const auth = require("../../middleware/auth");
const User = require("../../db/models/users/users.model");
const mongoose = require("mongoose");

const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 2e6,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|jfif)$/)) {
      cb(new Error("Please upload an image with max size of 2MB"));
    }
    cb(undefined, true); //accept the upload
  },
});

// add new recipe
router.post("/recipes/new", auth, upload.single("image"), async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      owner: req.user._id,
    });
    if (req.file) {
      const buffer = await sharp(req.file.buffer).png().toBuffer();
      recipe.image = buffer;
    }
    await recipe.save();
    res.status(201).send(recipe);
    // res.status(201).send("xxx");
    console.log(chalk.inverse.green("New recipe added to user DB"));
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
    console.log(chalk.inverse.red("Failed to add recipe"));
  }
});

// *Get recipes
router.get("/recipes/public", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort("-updatedAt");
    res.send(recipes);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//* Get user recipes
router.get("/recipes/user", auth, async (req, res) => {
  try {
    // await req.user.populate("recipes").execPopulate(); //its seems its no longer a function

    await req.user.populate({ path: "recipes", options: { sort: { createdAt: -1 } } });
    res.send({ recipes: req.user.recipes, owner: req.user.name });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(chalk.red(e.message));
  }
});
//* Get others recipes
router.get("/recipes/friends/:id", async (req, res) => {
  try {
    console.log(req.params);
    // objectId = mongoose.Types.ObjectId(req.params.id);
    // const friend = await User.findById(objectId);
    const friend = await User.findById(req.params.id);
    // const friend = await User.findOne({ _id: req.params.id });

    await friend.populate({ path: "recipes", options: { sort: { createdAt: -1 } } });
    res.send({ recipes: friend.recipes, owner: friend.name });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(chalk.red.inverse(e.message));
  }
});

module.exports = router;

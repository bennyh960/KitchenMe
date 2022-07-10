const express = require("express");
const chalk = require("chalk");
const Recipe = require("../../db/models/recipes/recipes.model");
const multer = require("multer");
const auth = require("../../middleware/auth");
const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 2e6,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
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
      recipe.image = req.file.buffer;
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
router.get("/recipes/user", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort("-updatedAt");
    res.send(recipes);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
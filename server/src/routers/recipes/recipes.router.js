const express = require("express");
const chalk = require("chalk");
const Recipe = require("../../db/models/recipes/recipes.model");

const router = new express.Router();

// add new recipe
router.post("/recipes", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
  }
});

module.exports = router;

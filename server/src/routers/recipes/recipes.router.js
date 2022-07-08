const express = require("express");
const chalk = require("chalk");
const Recipe = require("../../db/models/recipes/recipes.model");

const router = new express.Router();

// add new recipe
router.post("/recipes/new", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
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

module.exports = router;

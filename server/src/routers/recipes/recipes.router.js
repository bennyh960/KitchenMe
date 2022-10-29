const express = require("express");
const chalk = require("chalk");
const Recipe = require("../../db/models/recipes/recipes.model");
const sharp = require("sharp");
const multer = require("multer");
const auth = require("../../middleware/auth");
const User = require("../../db/models/users/users.model");
const mongoose = require("mongoose");
// const { findByIdAndUpdate } = require("../../db/models/recipes/recipes.model");

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
      ownerName: req.user.name,
    });
    if (req.file) {
      const buffer = await sharp(req.file.buffer).resize({ width: 600, height: 400 }).png().toBuffer();
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

// /users/:id/avatar
router.get("/recipes/image/:id", async (req, res) => {
  try {
    if (!req.params.id) throw new Error();
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || !recipe.image) {
      throw new Error("no recipe error on server side");
    }

    res.set("Content-Type", "image/png");
    console.log(req.url);
    res.send(recipe.image);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red.inverse(error.message));
  }
});

// *Get recipes
router.get("/recipes/public", auth, async (req, res) => {
  // console.log(req.body)
  try {
    const recipes = await Recipe.find({
      owner: { $in: [req.user._id, ...req.user.friends.map((f) => f.friendId)] },
    }).sort("-updatedAt");

    const recipeToSend = recipes.map((recipe) => {
      // delete recipe[image];
      // recipe.image = `/recipe/image/${recipe._id}`;
      const obj = {
        _id: mongoose.Types.ObjectId(recipe._id),
        name: recipe.name,
        category: recipe.category,
        image: `recipes/image/${recipe._id.toString()}`,
        public: recipe.public,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        ownerName: recipe.ownerName,
        rank: recipe.rank,
        owner: mongoose.Types.ObjectId(recipe.owner),
        voted: recipe.voted.map((v) => {
          return { ...v, voterId: mongoose.Types.ObjectId(v) };
        }),
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      };
      return obj;
    });
    // console.log(recipeToSend);

    // res.send(recipes);
    res.send(recipeToSend);
    // console.log(req.user.friends.map((f) => f.friendId));
  } catch (e) {
    console.log(e.message);
    res.status(404).send(e.message);
  }
});

//* Get user recipes
router.get("/recipes/user", auth, async (req, res) => {
  try {
    // await req.user.populate("recipes").execPopulate(); //its seems its no longer a function

    await req.user.populate({ path: "recipes", options: { sort: { createdAt: -1 } } });

    // const userRecipesRank = req.user.recipes.map((r) => r.rank);
    // console.log(userRecipesRank);

    const userRankFromHisRecipes =
      req.user.recipes.reduce((acc, res) => acc + res.rank, 0) / (req.user.recipes.length * 20);

    let FinalRank = Math.round(userRankFromHisRecipes * 2) / 2;

    if (req.user.friends.length < 10 && FinalRank > 3) {
      FinalRank = 3;
      // console.log("==========", FinalRank);
    }

    req.user.rank = FinalRank;
    // console.log("xxxx", FinalRank);
    await req.user.save();

    // ============
    const recipeToSend = req.user.recipes.map((recipe) => {
      // delete recipe[image];
      // recipe.image = `/recipe/image/${recipe._id}`;
      const obj = {
        _id: mongoose.Types.ObjectId(recipe._id),
        name: recipe.name,
        category: recipe.category,
        image: `recipes/image/${recipe._id.toString()}`,
        public: recipe.public,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        ownerName: recipe.ownerName,
        rank: recipe.rank,
        owner: mongoose.Types.ObjectId(recipe.owner),
        voted: recipe.voted.map((v) => {
          return { ...v, voterId: mongoose.Types.ObjectId(v) };
        }),
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      };
      return obj;
    });

    res.send({ recipes: recipeToSend, owner: req.user.name });
    // ============

    // res.send({ recipes: req.user.recipes, owner: req.user.name });
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

    // Update rank of friends so user can get updated
    // const userRankFromHisRecipes =
    // friend.recipes.reduce((acc, res) => acc + res.rank, 0) / (req.user.recipes.length * 20);
    // const FinalRank = Math.round(userRankFromHisRecipes * 2) / 2;
    // friend.rank = FinalRank;
    // console.log(FinalRank);
    // await friend.save();
    // ============================
    const recipeToSend = friend.recipes.map((recipe) => {
      // delete recipe[image];
      // recipe.image = `/recipe/image/${recipe._id}`;
      const obj = {
        _id: mongoose.Types.ObjectId(recipe._id),
        name: recipe.name,
        category: recipe.category,
        image: `recipes/image/${recipe._id.toString()}`,
        public: recipe.public,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        ownerName: recipe.ownerName,
        rank: recipe.rank,
        owner: mongoose.Types.ObjectId(recipe.owner),
        voted: recipe.voted.map((v) => {
          return { ...v, voterId: mongoose.Types.ObjectId(v) };
        }),
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      };
      return obj;
    });

    res.send({ recipes: recipeToSend, owner: friend.name });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(chalk.red.inverse(e.message));
  }
});

// *Vote for recipe
router.post("/recipes/vote/", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.postId);

    const validVoterIndex = recipe.voted.findIndex((v) => {
      return v.voterId.toString() === req.body.userId;
    });

    if (validVoterIndex === -1) {
      recipe.voted.push({ voterId: req.body.userId, voteRank: req.body.rank });
      console.log(validVoterIndex);
    } else {
      recipe.voted[validVoterIndex] = { voterId: req.body.userId, voteRank: req.body.rank };
      console.log("update vote");
    }

    const RecipeRank = recipe.voted.reduce((previousValue, currentValue) => previousValue + currentValue.voteRank, 0);
    recipe.rank = RecipeRank / recipe.voted.length;

    await recipe.save();
    res.send("you voted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("vote for recipe error");
  }
});

router.get("/recipes/vote/", async (req, res) => {
  try {
    console.log(req.query);
    const recipe = await Recipe.findById(req.query.postId);

    if (!recipe) throw new Error("recipe not found - see recipe router");
    const validVoterIndex = recipe.voted.findIndex((v) => {
      return v.voterId.toString() === req.query.userId;
    });

    if (validVoterIndex === -1) {
      res.send("0");
    } else {
      const userVoteScore = recipe.voted[validVoterIndex].voteRank / 20;
      console.log(userVoteScore);
      res.send(userVoteScore.toString());
      // res.sendStatus(200);
    }
  } catch (e) {
    res.sendStatus(404).send(e.message);
    console.log("get user vote error");
  }
});

router.delete("/recipe/post/delete", async (req, res) => {
  await Recipe.findOneAndDelete({ _id: req.body.id });
  console.log(req.body.id);
  console.log("post deleted");
});

module.exports = router;

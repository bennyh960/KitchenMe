const express = require("express");
const chalk = require("chalk");
const cors = require("cors");

// my files import
require("./server/src/db/mongoose");
const recipeRouter = require("./server/src/routers/recipes/recipes.router");
const userRouter = require("./server/src/routers/users/users.router");

const app = express();
const PORT = process.env.PORT || 5000;

// app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use router
app.use(recipeRouter);
app.use(userRouter);

// console.log(__dirname + "\\public");
// app.use(express.static(__dirname + "\\public\\"));

app.listen(PORT, () => {
  console.log(chalk.green("Server run on port ", PORT));
});

const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// my files import
require("./server/src/db/mongoose");
const recipeRouter = require("./server/src/routers/recipes/recipes.router");
const userRouter = require("./server/src/routers/users/users.router");
// const notificationRoter = require("./server/src/routers/notifications/notification.router");

//* i guess it would be important when change from dev to prod
// const publicPath = path.join(__dirname, "../client/build");

const app = express();
const PORT = process.env.PORT || 5000;

// app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use router
app.use(recipeRouter);
app.use(userRouter);
// app.use(notificationRoter);

// * Step to connect heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(chalk.green("Server run on port ", PORT));
});

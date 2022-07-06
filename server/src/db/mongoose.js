const mongoose = require("mongoose");
const chalk = require("chalk");

// const password = "cJdVCPdEriOTlmGr";
// const dbURL = `mongodb+srv://bennyh960:${password}@cluster0.eic8q.mongodb.net/myDB-tasks?retryWrites=true&w=majority`;
mongoose
  .connect("mongodb://127.0.0.1:27017/kitchenMe", {
    // mongoose
    // .connect(dbURL, {

    autoIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(chalk.green.inverse("Mongoose connect"));
  })
  .catch((e) => {
    console.log(chalk.red.inverse("Mongoose connection faild"));
    console.log(chalk.red.inverse(e));
  });

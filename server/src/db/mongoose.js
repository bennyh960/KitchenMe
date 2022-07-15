const mongoose = require("mongoose");
const chalk = require("chalk");

const password = "cJdVCPdEriOTlmGr";
const MONGODB_URI = `mongodb+srv://bennyh960:${password}@cluster0.eic8q.mongodb.net/MeetBacH?retryWrites=true&w=majority`;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kitchenMe", {
    // .connect(MONGODB_URI || "mongodb://127.0.0.1:27017/MeetBacH", {
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

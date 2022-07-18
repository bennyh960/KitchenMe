const mongoose = require("mongoose");
const chalk = require("chalk");

// const password = "cJdVCPdEriOTlmGr";
// const DB_Name = "MeetBacH";
// const MONGODB_URI = `mongodb+srv://bennyh960:${password}@cluster0.eic8q.mongodb.net/${DB_Name}?retryWrites=true&w=majority`;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mitbachDev", {
    // .connect("mongodb://127.0.0.1:27017/mitbachDev", {
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

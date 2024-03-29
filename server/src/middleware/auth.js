const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../db/models/users/users.model");

const auth = async (req, res, next) => {
  console.log("Check authentication");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.authTokenSW);

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) console.log("cant find user");
    if (!user) throw new Error("cant find logedin user ");
    req.token = token;
    req.user = user;
    console.log(chalk.green.inverse("Succss auth"));
    next();
  } catch (error) {
    res.status(401).send("Error: Please autenticate");
  }
};

module.exports = auth;

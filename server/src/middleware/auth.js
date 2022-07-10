const jwt = require("jsonwebtoken");
const User = require("../db/models/users/users.model");

const auth = async (req, res, next) => {
  console.log("Check authentication");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.authTokenSW);
    // console.log(decoded);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) console.log("cant find user");
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error: Please autenticate");
  }
};

module.exports = auth;

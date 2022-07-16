const mongoose = require("mongoose");
const validator = require("validator");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // minlength: 7 //TODO remove note
    },
    rank: {
      type: Number,
      default: 1,
      validate(value) {
        if (value < 0) {
          throw new Error("cant get lower than 0...");
        }
      },
    },
    avatar: {
      type: Buffer,
    },
    isAvatar: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        friendId: String,
        name: String,
        rank: Number,
      },
    ],
    pending: [
      {
        note: String,
        pendingId: String,
        content: String,
      },
    ],
    // pending: [mongoose.Schema.Types.ObjectId],
    // notifications: Array,
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// * COnnect users with thir posts
// recipes
userSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "owner",
});
// ! pause useing this
// userSchema.virtual("notifications", {
//   ref: "Notification",
//   localField: "_id",
//   foreignField: "owner",
// });

// * Public data to share
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// * UserSchema Generate Ahuthentication token methode - post register or login
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // const token = jwt.sign({ _id: user._id.toString() }, process.env.authTokenSW);
  const token = jwt.sign({ _id: user._id.toString() }, "dontForgetUseEnvFile");
  // console.log(token);
  user.tokens.push({ token });
  await user.save();
  return token;
};

// * UserSchema To check if valid login user
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    // console.log("model.jsx", user);
    if (!user) throw new Error("Email and Password are not match.");
    console.log("user is in system - check for password matching...");
    // * continue with password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Email and Password are not match.");
    }
    console.log(chalk.green.inverse("Login succesfuly"));
    return user;
  } catch (error) {
    console.log(error);
  }
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    console.log(chalk.yellow.inverse("Password encryption done"));
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

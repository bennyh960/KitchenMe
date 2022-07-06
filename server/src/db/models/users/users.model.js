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
    age: {
      type: Number,
      validate(value) {
        if (value < 5) {
          throw new Error("This site is not for kids...");
        }
      },
    },
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

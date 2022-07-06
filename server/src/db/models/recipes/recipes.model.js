const mongoose = require("mongoose");
const validator = require("validator");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        ingredient: {
          type: String,
          trim: true,
          required: true,
        },
        amount: {
          type: String,
          trim: true,
          required: true,
        },
        note: {
          type: String,
          trim: true,
        },
      },
    ],
    instructions: [
      {
        instructions: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    image: {
      type: Buffer,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // in order to conect relation between 2 models we must call it in same name
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

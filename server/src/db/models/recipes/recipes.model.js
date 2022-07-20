const mongoose = require("mongoose");
const validator = require("validator");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,

      trim: true,
    },
    public: {
      type: Boolean,
      default: false,
    },

    ingredients: [
      [
        // type: String,
        // trim: true,
        // required: true,
      ],
    ],
    instructions: [
      {
        type: String,
        trim: true,
        required: true,
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
    ownerName: {
      type: String,
      trim: true,
    },
    rank: {
      type: Number,
      default: 0,
    },
    voted: [
      {
        voterId: {
          type: mongoose.Schema.Types.ObjectId,
          // type: String,
        },
        voteRank: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

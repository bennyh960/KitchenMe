const mongoose = require("mongoose");

const messangerSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },

    users: Array,

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Messagnger = mongoose.model("Messagnger", messangerSchema);

module.exports = Messagnger;

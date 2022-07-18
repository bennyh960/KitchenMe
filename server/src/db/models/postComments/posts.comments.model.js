const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
      //   unique: true,
    },
    blog: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;

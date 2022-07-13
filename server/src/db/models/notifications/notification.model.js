const mongoose = require("mongoose");

const notificationScema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",

      unique: true,
    },
    description: [
      {
        type: {
          type: String,
          trim: true,
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

const Notification = mongoose.model("Notification", notificationScema);

module.exports = Notification;

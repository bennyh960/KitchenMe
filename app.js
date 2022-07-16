const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
// const dotenv = require("dotenv");
const socket = require("socket.io");
// dotenv.config();

// my files import
require("./server/src/db/mongoose");
const recipeRouter = require("./server/src/routers/recipes/recipes.router");
const userRouter = require("./server/src/routers/users/users.router");
const messangerRouter = require("./server/src/routers/messanger/messanger.router");
// const notificationRoter = require("./server/src/routers/notifications/notification.router");

//* i guess it would be important when change from dev to prod
// const publicPath = path.join(__dirname, "../client/build");

const app = express();
const PORT = process.env.PORT || 5000;

// app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use router
app.use(recipeRouter);
app.use(userRouter);
app.use("/api/messages", messangerRouter);
// app.use(notificationRoter);

// * Step to connect heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const server = app.listen(PORT, () => {
  console.log(chalk.green("Server run on port ", PORT));
});

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    // const { to, from, message } = data;
    // console.log(chalk.yellow(to, from, message));
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

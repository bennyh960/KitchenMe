const express = require("express");
const chalk = require("chalk");
// const auth = require("../../middleware/auth");
const User = require("../../db/models/users/users.model");
const { addMessage, getAllMessages } = require("./messanger.controler");

const router = new express.Router();

//* app.use("/api/messages",messangerRouter); //!Note that start point is set in app (its not have to , just want know new thecq)

router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessages);

// //* Get user recipes example to populate
// router.get("/user/notifications", auth, async (req, res) => {
//   try {
//     await req.user.populate("recipes").execPopulate(); //its seems its no longer a function

//     await req.user.populate({ path: "notifications", options: { sort: { createdAt: -1 } } });
//     res.send({ notifiation: req.user.notifications, owner: req.user.name });
//   } catch (e) {
//     res.status(500).send(e.message);
//     console.log(chalk.red(e.message));
//   }
// });

module.exports = router;

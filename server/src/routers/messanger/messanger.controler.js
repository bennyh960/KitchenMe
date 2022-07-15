const Messagnger = require("../../db/models/chat-messanger/message.model");

module.exports.addMessage = async (req, res, next) => {
  // console.log("add message controler test");
  try {
    const { from, to, message } = req.body;
    const data = await Messagnger.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.send({ msg: "Message added successfully" });

    return res.send({ msg: "Failed to add message" });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  // console.log("get all messages message controler test");
  try {
    const { from, to } = req.body;
    const messages = await Messagnger.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt: 1 });

    const messagesArr = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // console.log(messagesArr);
    res.send(messagesArr);
  } catch (error) {
    next(error);
  }
};

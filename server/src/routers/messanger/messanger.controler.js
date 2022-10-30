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
    // console.log(messages);
    const messagesArr = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: msg.createdAt,
      };
    });

    res.send(messagesArr);
  } catch (error) {
    next(error);
  }
};
module.exports.getLastMessage = async (req, res, next) => {
  // console.log("get all messages message controler test");
  try {
    const { from, to } = req.body;
    // console.log(from, to);
    const messages = await Messagnger.find({
      users: {
        $all: [from, to],
      },
      sender: to,
    }).sort({ updateAt: 1 });
    // console.log(messages);
    const messagesArr = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: msg.createdAt,
      };
    });

    res.send(messagesArr.sort((a, b) => b.createdAt - a.createdAt)[0]);
  } catch (error) {
    next(error);
  }
};

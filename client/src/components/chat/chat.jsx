import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import messangerApi from "../../api/messangerApi";
import usersApi from "../../api/usersApi";
import { io } from "socket.io-client";
// import { scrollIntoView } from "react-select/dist/declarations/src/utils";

export default function Chat({ friendsList, userId }) {
  const [message, setMessage] = useState("");
  const [friend, setFriend] = useState({ id: "", name: "" });
  const [messagesHistory, setMessagesHistory] = useState([]);
  const [arriavalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  // * Handle Avatar Bug - in future determine in docuemnt is avatar set
  const validAvatar = async (friendId) => {
    try {
      const { data } = await usersApi.users.get(`/${friendId}/avatar`);
      if (!data) return false;
      // console.log("avatar");
      return true;
    } catch (error) {
      console.log("no avatar at chat");
    }
  };

  // * draw friend list in left window
  const drawFriendsList = () => {
    const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;

    return friendsList.map((friend) => {
      return (
        <div
          className="friend-box-chat"
          key={friend.friendId}
          onClick={() => setFriend({ id: friend.friendId, name: friend.name })}
        >
          <div className="friend-img-chat ">
            {/* <img src={process.env.PUBLIC_URL + "/images/avatarEx.png"} alt="" className="chat-small-avatar" /> */}
            {validAvatar(friend.friendId) ? (
              // <img src={`http://localhost:5000/users/${friend.friendId}/avatar`} className="chat-small-avatar" alt="" />
              <img src={`${url}/${friend.friendId}/avatar`} className="chat-small-avatar" alt="" />
            ) : (
              <img src={"https://identix.state.gov/qotw/images/no-photo.gif"} className="chat-small-avatar" alt="" />
            )}
          </div>
          <div className="friend-box-data">
            <div className="friend-box-name-container line">
              <div className="friend-box-name">{friend.name}</div>
              <div className="friend-box-unread">3</div>
            </div>
            <div className="friend-box-content">
              <div className="friend-box-last-msg">how r u? dsskddd dsa ddddddfsd </div>
              <div className="friend-box-last-msg-time">10 minutes</div>
            </div>
          </div>
        </div>
      );
    });
  };

  // useEffect(() => {}, [friendsList]);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const { data } = await messangerApi.post("/getmsg", {
          from: userId,
          to: friend.id,
          message,
        });
        // console.log(data);
        setMessagesHistory(data);
      } catch (error) {
        console.log(error.msg);
      }
    };
    if (friend) {
      getAllMessages();
    }
  }, [friend, userId, message]);

  const handleMessageInput = ({ target: { value } }) => {
    setMessage(value);
    // console.log(friendsList);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    // console.log(message);

    try {
      // const { data } = await messangerApi.post("/addmsg", {
      await messangerApi.post("/addmsg", {
        from: userId,
        to: friend.id,
        message,
      });
      // console.log(data);
    } catch (error) {
      console.log(error.msg);
    }

    setMessage("");

    // *socket
    socket.current.emit("send-msg", {
      to: friend.id,
      from: userId,
      message,
    });

    // update Ui with socket
    // [...messagesHistory].push
    setMessagesHistory((prev) => {
      return [...prev, { fromSelf: true, message }];
    });
  };

  const drawAllMessagesInBody = () => {
    return messagesHistory.map((msg, idx) => {
      return (
        <div ref={scrollRef} key={idx} className={`message-text ${msg.fromSelf ? "sended" : "rechived"}`}>
          <div className="content-msg">
            <p>{msg.message}</p>
          </div>
        </div>
      );
    });
  };

  // * Socket client
  useEffect(() => {
    if (userId) {
      const url = process.env.NODE_ENV === "production" ? `` : `http://localhost:5000`;
      // socket.current = io("http://localhost:5000");
      socket.current = io(url);
      socket.current.emit("add-user", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        // console.log(arriavalMessage);
        // console.log({ msg });
      });
    }
  }, [message]);

  useEffect(() => {
    arriavalMessage && setMessagesHistory((prev) => [...prev, arriavalMessage]);
  }, [arriavalMessage]);

  // set scroll down auto
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messagesHistory]);

  return (
    <div className="chat-container-bruto">
      <div className="close-btn-chat">
        <div>X</div>
      </div>
      <div className="chat-container">
        <div className="friends-window-chat">
          <div className="search-freinds-chat-input">
            <input type="text" placeholder="Search friend" />
          </div>
          <div className="freinds-container-chat">{drawFriendsList()}</div>
        </div>
        <div className="chat-body-container">
          <div className="chat-body">{drawAllMessagesInBody()}</div>

          <form onSubmit={handleSendMessage} className="chat-input">
            <div className="imogi-chat">x</div>
            <input type="text" value={message} onChange={handleMessageInput} onSubmit={handleSendMessage} />
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import messangerApi from "../../api/messangerApi";
import usersApi from "../../api/usersApi";
import { io } from "socket.io-client";

export default function Chat({ friendsList, userId }) {
  const [message, setMessage] = useState("");
  const [friend, setFriend] = useState({ id: "", name: "" });
  const [messagesHistory, setMessagesHistory] = useState([]);
  const socket = useref();

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
              <img src={`${url}/${friend.friendId}/avatar`} className="chat-small-avatar" />
            ) : (
              <img src={"https://identix.state.gov/qotw/images/no-photo.gif"} className="chat-small-avatar" />
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
    getAllMessages();
    // console.log(friend);
  }, [friend]);

  const handleMessageInput = ({ target: { value } }) => {
    setMessage(value);
    // console.log(friendsList);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    console.log(message);

    try {
      const { data } = messangerApi.post("/addmsg", {
        from: userId,
        to: friend.id,
        message,
      });
    } catch (error) {
      console.log(error.msg);
    }

    setMessage("");
  };

  const drawAllMessagesInBody = () => {
    return messagesHistory.map((msg) => {
      return (
        <div className={`message-text ${msg.fromSelf ? "sended" : "rechived"}`}>
          <div className="content-msg">
            <p>{msg.message}</p>
          </div>
        </div>
      );
    });
  };

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

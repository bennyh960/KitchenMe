import React from "react";
import "./chat.css";

export default function Chat({ friendList }) {
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
          <div className="freinds-container-chat">
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
          </div>
        </div>
        <div className="chat-body-container">
          <div className="chat-body">
            <p>text</p>
            <p>text2</p>
            <p>text3</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text4</p>
            <p>text10</p>
          </div>
          <div className="chat-input">
            <div className="imogi-chat">x</div>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

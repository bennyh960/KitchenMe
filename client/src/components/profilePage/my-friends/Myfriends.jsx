import React from "react";
import "./myfriends.css";
export default function MyFriends({ friendsList }) {
  return (
    <div className="my-friends-container">
      Myfriends
      {FriendCard()}
    </div>
  );
}

function FriendCard() {
  return (
    <div className="ui card">
      <div className="image">
        <img src="/images/avatar2/large/kristy.png" />
      </div>
      <div className="content">
        <a className="header">Kristy</a>
        <div className="meta">
          <span className="date">Joined in 2013</span>
        </div>
        <div className="description">Kristy is an art director living in New York.</div>
      </div>
      <div className="extra content">
        <a>
          <i className="user icon"></i>
          22 Friends
        </a>
      </div>
    </div>
  );
}

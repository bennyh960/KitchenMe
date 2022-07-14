import React from "react";
import { Link } from "react-router-dom";
import "./myfriends.css";
export default function MyFriends({ friendsList }) {
  const drawFriends = () => {
    return friendsList.map((friend) => {
      return (
        <Link to={`/users/profile/${friend.friendId}`} key={friend.friendId}>
          <FriendCard id={friend.friendId} name={friend.name} rank={friend.rank} />
        </Link>
      );
    });
  };

  return (
    <div className="my-friends-container">
      <h1 className="line my-friends-title">My Friends:</h1>
      <div className="friends-cards-container">{drawFriends()}</div>
    </div>
  );
}

function FriendCard({ id, name, rank }) {
  function DrawRanks() {
    const arr = [];
    for (let i = 0; i < rank; i++) {
      arr.push(i);
    }
    return arr.map((star) => {
      return <i className="star icon yellow"></i>;
    });
  }
  return (
    <div className="friend-card white-box">
      <div className="image-card ">
        <img src={`http://localhost:5000/users/${id}/avatar`} alt={id + name} className={"friend-card-image"} />
      </div>
      <div className="friend-card-content">
        <a className="header">{name}</a>
        <div className="extra content">
          <i className="user icon"></i>
          22 Friends
        </div>
        <div className="rank-friend">{DrawRanks(rank)}</div>
      </div>
    </div>
  );
}

{
  /* <div className="join-in-friend"> */
}
{
  /* <span className="date">Joined in 2013</span> */
}
{
  /* </div> */
}

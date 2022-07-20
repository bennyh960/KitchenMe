import React from "react";
import { Link } from "react-router-dom";
import "./myfriends.css";
export default function MyFriends({ friendsList }) {
  const drawFriends = () => {
    return friendsList.map((friend) => {
      return (
        <Link to={`/users/profile/${friend.friendId}`} key={friend.friendId}>
          <FriendCard id={friend.friendId} name={friend.name} rank={friend.rank} isAvatar={friend.isAvatar} />
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

function FriendCard({ id, name, rank, isAvatar }) {
  const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;
  console.log(isAvatar);
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
        {/* {isAvatar ? ( */}
        <img src={`${url}/${id}/avatar`} alt="" className={"friend-card-image"} />
        {/* ) : ( */}
        {/* <img src={`https://identix.state.gov/qotw/images/no-photo.gif`} alt="" className={"friend-card-image"} /> */}
        {/* )} */}
      </div>
      <div className="friend-card-content">
        {/* eslint-disable-next-line */}
        <a className="header">{name}</a>
        <div className="extra content">
          <i className="user icon"></i>
          32 Friends
        </div>
        <div className="rank-friend">{DrawRanks(rank)}</div>
      </div>
    </div>
  );
}
// ! hard coded - need to think how to make it updated do to friends data write in the moment thier added

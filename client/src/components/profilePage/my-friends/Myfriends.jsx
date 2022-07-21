import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import usersApi from "../../../api/usersApi";
import setStarsColor from "../../../utils/starcolors";
import "./myfriends.css";
export default function MyFriends({ friendsList }) {
  const drawFriends = () => {
    return friendsList.map((friend) => {
      return (
        <React.Fragment key={friend.friendId}>
          <Link to={`/users/profile/${friend.friendId}`}>
            <FriendCard id={friend.friendId} name={friend.name} rank={friend.rank} isAvatar={friend.isAvatar} />
          </Link>
        </React.Fragment>
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
  const [friendRank, setFriendRank] = useState(1);
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

  useEffect(() => {
    const getFriendRank = async () => {
      const { data } = await usersApi.friendshipRouter.get(`/${id}/rank`);
      setFriendRank(data);
    };
    getFriendRank();
    // friendRank
  }, [id]);

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
        {/* <div className="rank-friend">{DrawRanks(rank)}</div> */}
        <div className="rank-friend">
          <Rating
            initialValue={friendRank}
            readonly={true}
            fillColor={setStarsColor(friendRank)}
            allowHalfIcon={true}
            size={"10px"}
            className="rating-about-me"
            tooltipStyle={{ backgroundColor: setStarsColor(friendRank) }}
          />
        </div>
      </div>
    </div>
  );
}
// ! hard coded - need to think how to make it updated do to friends data write in the moment thier added

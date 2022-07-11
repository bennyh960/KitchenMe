import React, { useState, useEffect } from "react";
import CoverOther from "./coverOthers/coverOther";
import usersApi from "../../api/usersApi";
import "./profile.css";
import Friendposts from "./otherPosts/friendPosts";

export default function OtherProfilePage() {
  const [friend, setFriend] = useState({});
  useEffect(() => {
    const getFriendData = async () => {
      const { data } = await usersApi.getOtherProfile.get("62cb2b404e986b25cc73dc74");

      console.log(data);
      setFriend(data);
    };
    getFriendData();
  }, []);

  return (
    <div className="profile-page">
      <CoverOther friendId={friend._id} avatar={friend.avatar} />
      <Friendposts
        friendId={"62cb2b404e986b25cc73dc74"}
        name={friend.name}
        createdAt={friend.createdAt}
        email={friend.email}
        myRank={friend.myRank}
        topRated={friend.topRated}
      />
    </div>
  );
}

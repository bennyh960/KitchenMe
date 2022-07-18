import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoverOther from "./coverOthers/coverOther";
import usersApi from "../../api/usersApi";
import "./profile.css";
import Friendposts from "./otherPosts/friendPosts";

export default function OtherProfilePage({ currentUserId, userFriendsList, token }) {
  const [friend, setFriend] = useState({});
  let { id } = useParams();
  useEffect(() => {
    const getFriendData = async () => {
      // const { data } = await usersApi.getOtherProfile.get("/62cb2b404e986b25cc73dc74");
      const { data } = await usersApi.getOtherProfile.get(id);

      // console.log(data);
      setFriend(data);
    };
    // console.log(id);
    getFriendData();
  }, [id]);

  return (
    <div className="profile-page">
      <CoverOther friendId={friend._id} isAvatar={friend.isAvatar} />
      <Friendposts
        userFriendsList={userFriendsList}
        currentUserId={currentUserId}
        // currentUserPendingList={currentUserPendingList}
        friendId={id}
        name={friend.name}
        createdAt={friend.createdAt}
        email={friend.email}
        myRank={friend.myRank}
        topRated={friend.topRated}
        token={token}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoverOther from "./coverOthers/coverOther";
import usersApi from "../../api/usersApi";
import "./profile.css";
import Friendposts from "./otherPosts/friendPosts";

export default function OtherProfilePage({ currentUserId, userFriendsList, token }) {
  const [friend, setFriend] = useState({});
  let { id } = useParams();
  const [friendRank, setFriendRank] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    // prevent from user see his page as other page
    if (id === currentUserId) {
      navigate("/profile/me");
      return;
    }

    const getFriendData = async () => {
      // const { data } = await usersApi.getOtherProfile.get("/62cb2b404e986b25cc73dc74");
      const { data } = await usersApi.getOtherProfile.get(id);

      // console.log(data);
      setFriend(data);
    };
    // console.log(id);
    getFriendData();
  }, [id, currentUserId, navigate]);

  useEffect(() => {
    const getFriendRank = async () => {
      // /users/friend -client
      // server /users/friend/:id/rank
      const { data } = await usersApi.friendshipRouter.get(`/${id}/rank`);
      setFriendRank(data);
      // console.log(data, friendRank);
    };
    getFriendRank();
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
        myRank={friendRank}
        topRated={friend.topRated}
        token={token}
      />
    </div>
  );
}

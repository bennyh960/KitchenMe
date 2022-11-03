import React, { useState, useEffect, useContext } from "react";
import Cover from "./cover/cover";
import "./profile.css";
import Myposts from "./my-posts/myposts";
import MyRecipies from "./my-recepies/MyRecipies";
import MyFriends from "./my-friends/Myfriends";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";

// export default function ProfilePage({ avatar, name, email, topRated, myRank, createdAt, friendsList, token }) {
export default function ProfilePage({ avatar }) {
  const [view, setView] = useState("myPosts");
  const [postSelectedFromNavigation, setPostSelectedFromNavigation] = useState({});
  const {
    token,
    user: { name, email, rank, createdAt, friends },
  } = useContext(UserContext);

  let location = useLocation();

  const handleView = (viewSelected) => {
    setView(viewSelected);
  };

  const [isCover, setIsCoverView] = useState(true);
  const directToRecipe = (post) => {
    setView("MyRecipies");
    setPostSelectedFromNavigation(post);
    setIsCoverView(() => false);
    // console.log(post);
  };

  useEffect(() => {
    // setIsCoverView(true);
    // console.log(location.pathname);
  }, [location]);

  return (
    <div className="profile-page">
      {isCover && <Cover handleView={handleView} avatar={avatar} name={name} token={token} />}
      {view === "myPosts" && (
        <Myposts
          avatar={avatar}
          name={name}
          createdAt={createdAt}
          email={email}
          myRank={rank}
          // topRated={topRated}
          friendsList={friends}
          token={token}
          directToRecipe={directToRecipe}
        />
      )}
      {view === "MyRecipies" && (
        <MyRecipies
          token={token}
          postSelectedFromNavigation={postSelectedFromNavigation}
          setIsCoverView={setIsCoverView}
        />
      )}
      {/* {view === "MyPhotos" && <MyPhotos />} */}
      {view === "MyFriends" && <MyFriends friendsList={friends} />}
    </div>
  );
}

import React, { useState, useEffect } from "react";
// import Post from "../post/post";
import Cover from "./cover/cover";
// import Addrecipe from "./add-recipe/addrecipe";
import "./profile.css";
import Myposts from "./my-posts/myposts";
import MyRecipies from "./my-recepies/MyRecipies";
import MyPhotos from "./my_photos/MyPhotos";
import MyFriends from "./my-friends/Myfriends";
import { useLocation } from "react-router-dom";
// import Addrecipe from "./add-recipe/addrecipe";

export default function ProfilePage({ avatar, name, email, topRated, myRank, createdAt }) {
  const [view, setView] = useState("myPosts");
  let location = useLocation();

  const handleView = (viewSelected) => {
    setView(viewSelected);
  };

  const addNewRecipe = (activeNewRecipe) => {
    setView(activeNewRecipe);
  };

  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  return (
    <div className="profile-page">
      <Cover handleView={handleView} avatar={avatar} name={name} />
      {view === "myPosts" && (
        <Myposts avatar={avatar} name={name} createdAt={createdAt} email={email} myRank={myRank} topRated={topRated} />
      )}
      {view === "MyRecipies" && <MyRecipies />}
      {view === "MyPhotos" && <MyPhotos />}
      {view === "MyFriends" && <MyFriends />}
    </div>
  );
}

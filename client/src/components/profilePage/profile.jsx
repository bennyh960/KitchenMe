import React, { useState } from "react";
// import Post from "../post/post";
import Cover from "./cover/cover";
// import Addrecipe from "./add-recipe/addrecipe";
import "./profile.css";
import Myposts from "./my-posts/myposts";
import MyRecipies from "./my-recepies/MyRecipies";
import MyPhotos from "./my_photos/MyPhotos";
import MyFriends from "./my-friends/Myfriends";

export default function ProfilePage() {
  const [view, setView] = useState("myPosts");
  const handleView = (viewSelected) => {
    setView(viewSelected);
  };

  return (
    <div className="profile-page">
      <Cover handleView={handleView} />
      {view === "myPosts" && <Myposts />}
      {view === "MyRecipies" && <MyRecipies />}
      {view === "MyPhotos" && <MyPhotos />}
      {view === "MyFriends" && <MyFriends />}

      {/* <Post /> */}
    </div>
  );
}

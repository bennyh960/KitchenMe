import React, { useState } from "react";
import Post from "../post/post";
import Cover from "./cover/cover";
// import Addrecipe from "./add-recipe/addrecipe";
import "./profile.css";
import Myposts from "./my-posts/myposts";
import MyRecipies from "./my-recepies/MyRecipies";

export default function ProfilePageD() {
  const [view, setView] = useState("myPosts");
  return (
    <div className="profile-page">
      <Cover />
      <Myposts />
      <MyRecipies />

      {/* <Post /> */}
    </div>
  );
}

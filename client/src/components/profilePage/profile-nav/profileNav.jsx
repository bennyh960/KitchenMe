import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./profilenav.css";
import { Link } from "react-router-dom";
export default function ProfileNav({ handleView }) {
  const [activeLink, setActive] = useState(["", "active", "", ""]);
  //   const [view, setView] = useState("myPosts");

  const handleActive = ({ target }) => {
    switch (target.id) {
      case "profile-recipes":
        setActive(["active", "", "", ""]);
        handleView("MyRecipies");

        break;
      case "profile-photos":
        setActive(["", "", "active", ""]);
        handleView("MyPhotos");
        break;
      case "profile-friends":
        setActive(["", "", "", "active"]);
        handleView("MyFriends");
        break;
      default:
        setActive(["", "active", "", ""]);
        handleView("myPosts");
        break;
    }
    // console.log(window.location.pathname);
    // console.log(target.id);
  };

  return (
    <div className="profile-navbar">
      <div className="profile-nav-left">Rank</div>
      <div className={`profile-nav-center ${activeLink[0]}`} id="profile-recipes" onClick={handleActive}>
        {/* <Link to={"/recipes/me"}>My Recipies</Link> */}My Recipies
      </div>
      <div className="profile-nav-right">
        <div className={activeLink[1]} id="profile-posts" onClick={handleActive}>
          {/* <Link to={"/posts/me"}>Posts</Link> */}Posts
        </div>
        <div id="profile-photos" className={activeLink[2]} onClick={handleActive}>
          {/* <Link to={"/phots/me"}>Photos</Link> */}Photos
        </div>
        <div id="profile-friends" className={activeLink[3]} onClick={handleActive}>
          {/* <Link to={"/friends/me"}>Friends</Link> */}Friends
        </div>
      </div>
    </div>
  );
}

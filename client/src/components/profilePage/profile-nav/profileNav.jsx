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
      {/* <div className={`profile-nav-center ${activeLink[2]}`} id="profile-photos" onClick={handleActive}>
        Photos
      </div> */}
      <div className="profile-nav-right">
        <div className={activeLink[1]} id="profile-posts" onClick={handleActive}>
          Posts
        </div>
        <div id="profile-recipes" className={activeLink[0]} onClick={handleActive}>
          My Recipies
        </div>
        <div id="profile-friends" className={activeLink[3]} onClick={handleActive}>
          Friends
        </div>
      </div>
    </div>
  );
}

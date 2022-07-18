import { Link } from "react-router-dom";
import "./coverOther.css";
// import { Buffer } from "buffer";
// import { useEffect, useState } from "react";

export default function CoverOther({ friendId, isAvatar }) {
  const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;
  return (
    <div className="cover-container">
      <div className="cover-image">
        <div>
          <img
            src={isAvatar ? `${url}/${friendId}/avatar` : "https://identix.state.gov/qotw/images/no-photo.gif"}
            className="profile-image"
            alt="profile avatar"
            style={{ cursor: "auto" }}
          />
        </div>
      </div>
      <Link to={"/"}>
        <img src={process.env.PUBLIC_URL + "/images/coverLogo.png"} alt="logo" className="other-profile-logo" />
      </Link>
    </div>
  );
}

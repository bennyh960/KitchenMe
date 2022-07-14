import { Link } from "react-router-dom";
import "./coverOther.css";
// import { Buffer } from "buffer";
// import { useEffect, useState } from "react";

export default function CoverOther({ friendId, avatar }) {
  return (
    <div className="cover-container">
      <div className="cover-image">
        <div>
          <img
            src={`http://localhost:5000/users/${friendId}/avatar`}
            className="profile-image"
            alt="profile image"
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

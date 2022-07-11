import "./coverOther.css";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";

export default function CoverOther({ friendId, avatar }) {
  return (
    <div className="cover-container">
      <div className="cover-image">
        <div>
          {/* // {avatar && avatar.data && ( 
            <img
              src={`data:image/png;base64, ${Buffer.from(avatar).toString("base64")}`}
              // src={`data:image/png;base64, ${imgUrl})}`}
              className="profile-image"
              alt="profile image"
            />
          )}*/}
          <img src={`http://localhost:5000/users/${friendId}/avatar`} className="profile-image" alt="profile image" />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./cover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ProfileNav from "../profile-nav/profileNav";

export default function Cover({ handleView, avatar }) {
  console.log(avatar);
  return (
    <div className="cover-container">
      <div className="cover-image">
        <div>
          <img
            src={avatar}
            // src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.18169-9/12140671_10206941372348369_8765013128868409022_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=uONp3u0Y_FQAX8qLqF-&_nc_ht=scontent.ftlv5-1.fna&oh=00_AT8V37a__rFaUTEaNc30A8G84YKQrRDw983IcNTUePUWqw&oe=62ECD092"
            className="profile-image"
            alt="profile image"
          />
          <FontAwesomeIcon icon={faCamera} className={"fa-icon-float"} />
          <span className="hover-description">Edit Profile Image</span>
        </div>
      </div>
      <ProfileNav handleView={handleView} />
    </div>
  );
}

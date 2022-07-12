import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import "./aboutme.css";
export default function Aboutme({ name, topRated, myRank, email, hideEdit }) {
  return (
    <div className="white-box user-detailes">
      <div className="about-title-btn">
        <h2 style={{ margin: "15px" }} className="line">
          About me:
        </h2>
        <button className="edit-btn">{!hideEdit && <FontAwesomeIcon icon={faUserPen} />}</button>
      </div>
      <div className="show-about-data">
        <span>
          <b>Name :</b> {name}
        </span>
        <span>
          <b>Email :</b>
          {email}
        </span>
        <span>
          <b>My-Rank :</b>
          {myRank} stars
        </span>
        <span>
          <b>Top-Rated :</b> <a href="">{topRated}</a>
        </span>
      </div>
    </div>
  );
}

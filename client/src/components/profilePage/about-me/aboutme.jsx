import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import "./aboutme.css";
export default function Aboutme() {
  return (
    <div className="white-box user-detailes">
      <div className="about-title-btn">
        <h2 style={{ margin: "15px" }} className="line">
          About me:
        </h2>
        <button className="edit-btn">
          <FontAwesomeIcon icon={faUserPen} />
        </button>
      </div>
      <div className="show-about-data">
        <span>
          <b>Name :</b> Benny Hassan
        </span>
        <span>
          <b>Email :</b> Benny@ggg.com
        </span>
        <span>
          <b>My-Rank :</b> 3.4 stars
        </span>
        <span>
          <b>Top-Rated :</b> <a href="">Falafel 4stars</a>
        </span>
      </div>
    </div>
  );
}

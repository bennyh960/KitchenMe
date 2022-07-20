import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import "./aboutme.css";
import { Rating } from "react-simple-star-rating";

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
          {/* {myRank} stars */}
          <Rating
            initialValue={myRank}
            readonly={true}
            fillColor={setStarsColor(myRank)}
            allowHalfIcon={true}
            size={"20px"}
            className="rating-about-me"
          />
        </span>
        <span>
          <b>Top-Rated :</b> <a href="/profile/recipes">{topRated}</a>
        </span>
      </div>
    </div>
  );
}

function setStarsColor(rank) {
  switch (rank) {
    case 1:
      return "black";
    case 1.5:
      return "gray";
    case 2:
      return "brown";
    case 2.5:
      return "orange";
    case 3:
      return "green";
    case 3.5:
      return "blue";
    case 4:
      return "yellow";
    case 4.5:
      return "gold";
    case 5:
      return "pink";

    default:
      console.log("white");
      return "white";
  }
}

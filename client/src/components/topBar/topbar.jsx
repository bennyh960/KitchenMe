import React from "react";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faBell, faIndent, faListDots, faPersonShelter, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <nav className="topbar-container">
      <div className="topbar-user">
        <div>
          <Link to={"/profile/me"}>
            <img
              src={
                "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.18169-9/12140671_10206941372348369_8765013128868409022_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=uONp3u0Y_FQAX8qLqF-&_nc_ht=scontent.ftlv5-1.fna&oh=00_AT8V37a__rFaUTEaNc30A8G84YKQrRDw983IcNTUePUWqw&oe=62ECD092"
              }
              alt="profile-img-logo"
              className="profile-img-icon"
            />
          </Link>
          <FontAwesomeIcon icon={faFacebookMessenger} className={"fa-icon"} />
          <FontAwesomeIcon icon={faBell} className={"fa-icon"} />
        </div>
      </div>
      <div className="topbar-post-view">
        <div>
          {window.location.pathname === "/profile/me" ? (
            <FontAwesomeIcon icon={faPersonShelter} className={"fa-icon"} />
          ) : (
            <FontAwesomeIcon icon={faUser} className={"fa-icon"} />
          )}
          <FontAwesomeIcon icon={faYoutube} className={"fa-icon"} />
          <FontAwesomeIcon icon={faIndent} className={"fa-icon"} />
          <FontAwesomeIcon icon={faListDots} className={"fa-icon"} />
          {/* default/Video/instructions/ingredient */}
        </div>
      </div>
      <div className="topbar-search">
        <FontAwesomeIcon icon={faSearch} className={"search-icon"} />
        <input type="text" placeholder="Search" id="searchbar" />
      </div>
      <div className="logo">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "images/logo64.png"} alt="logo" />
        </Link>
      </div>
    </nav>
  );
}

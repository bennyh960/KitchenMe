import React, { useState, useRef, useEffect } from "react";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faBell,
  faIndent,
  faListDots,
  faPersonShelter,
  faUser,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PopupNanMenu from "./popUpMenu/popup";
export default function Topbar({ avatar, name }) {
  const [isPopUpMenue, setIsPopUp] = useState(false);

  // useEffect(() => {
  //   if (isPopUpMenue) {
  //     setIsPopUp(false);
  //   }
  // }, []);

  // i dont like this methode
  const handleClickOutside = () => {
    console.log("activate cb function for outside");
    setIsPopUp(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <nav className="topbar-container">
      <div className="topbar-user">
        <div className="container-left-icons-menu" ref={ref}>
          {isPopUpMenue && <PopupNanMenu name={name} />}
          {/* <Link to={"/profile/me"}> */}

          {!isPopUpMenue && (
            <img src={avatar} alt="profile-img-logo" className="profile-img-icon" onClick={() => setIsPopUp(true)} />
          )}

          {isPopUpMenue && (
            <div className="flip-back" onClick={() => setIsPopUp(false)}>
              <FontAwesomeIcon icon={faCircleXmark} className={"fa-icon "} size={"lg"} />
            </div>
          )}

          {/* </Link> */}
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

// //* Hook
function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("click outside ");
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return ref;
}

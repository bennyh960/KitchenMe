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
// import { Link, useLocation } from "react-router-dom";

import PopupNanMenu from "./popUpMenu/popup";
import DropDownResult from "./dropdownSearch/dropDownResult";
import NotificationsDD from "./notifications/notifications";
import usersApi from "../../api/usersApi";

export default function Topbar({ avatar, name, isUser, userId, pendingList, updatePendingList, updateFriendListProp }) {
  const [isPopUpMenue, setIsPopUp] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [searchMethode, setSearchMethode] = useState("people");
  const [rotation, setRotation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [notificationPopUp, setShowNotificationPopUp] = useState(false);
  const [notifications, setNotifications] = useState([pendingList]);
  // const location = useLocation();

  const handleSearchInput = ({ target: { value } }) => {
    setSearchInput((p) => value);
    // console.log(searchInput);
  };

  useEffect(() => {
    if (userId) {
      updateNotification();
    }
  }, []);

  // i dont like this methode
  const handleClickOutside = () => {
    // console.log("activate cb function for outside");
    setIsPopUp(false);
  };
  const handleClickOutsideSearch = () => {
    setSearchInput("");
    setShowSearch(false);
  };

  const handleClickOutsideNotifications = () => {
    setShowNotificationPopUp(false);
  };

  async function updateNotification() {
    const { data } = await usersApi.getUserLists.get(`/${userId}`);
    const validNotifications = data.pending.filter((pending) => pending.content !== "");
    setNotifications(validNotifications);
    updateFriendListProp(data.friends);
    console.log(validNotifications, data.pending);
  }

  const handleSearchMethode = () => {
    searchMethode === "recipes" ? setSearchMethode("people") : setSearchMethode("recipes");
    setRotation("rotation");
  };

  const ref = useOutsideClick(handleClickOutside);
  const refSearch = useOutsideClick(handleClickOutsideSearch);
  const refNotifications = useOutsideClick(handleClickOutsideNotifications);

  return (
    <nav className="topbar-container">
      <div className="topbar-user">
        <div className="container-left-icons-menu" ref={ref}>
          {isPopUpMenue && <PopupNanMenu name={name} isUser={isUser} />}
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
          <div className="notification-messanger-container">
            <FontAwesomeIcon icon={faFacebookMessenger} className={"fa-icon messanger-icon"} />
            <div className="messanger-num">6</div>
          </div>
          <div
            className="notification-bell-container"
            onClick={() => {
              updateNotification();
              setShowNotificationPopUp((p) => !p);
            }}
            ref={refNotifications}
          >
            <FontAwesomeIcon icon={faBell} className={"fa-icon bell-icon"} />
            {notifications && notifications.length > 0 && (
              <div className="notification-num">{notifications.length}</div>
            )}
            {notificationPopUp && <NotificationsDD pendingList={notifications} updatePendingList={updatePendingList} />}
          </div>
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
      <div className="topbar-search" ref={refSearch} onClick={() => setShowSearch(true)}>
        <FontAwesomeIcon icon={faSearch} className={"search-icon"} />
        <input
          type="text"
          placeholder={`Search ${searchMethode}...`}
          id="searchbar"
          value={searchInput}
          onChange={handleSearchInput}
        />

        <DropDownResult searchMethode={searchMethode} name={searchInput} resetSearch={showSearch} />
      </div>
      <div className={`logo ${rotation}`} onClick={handleSearchMethode}>
        {searchMethode === "recipes" && (
          <img src={process.env.PUBLIC_URL + "/images/logo64.png"} alt="logo" height={35} className={`${rotation}`} />
        )}
        {searchMethode === "people" && (
          <img
            className={`${rotation}`}
            src={process.env.PUBLIC_URL + "/images/peopleSearch.jpg"}
            alt="logo"
            height={35}
            style={{ borderRadius: "50%" }}
          />
        )}
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

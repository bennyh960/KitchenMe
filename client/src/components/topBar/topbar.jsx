import React, { useState, useRef, useEffect, useContext } from "react";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faBell,
  faListDots,
  faPersonShelter,
  faCircleXmark,
  faPeopleGroup,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import PopupNanMenu from "./popUpMenu/popup";
import DropDownResult from "./dropdownSearch/dropDownResult";
import NotificationsDD from "./notifications/notifications";
import usersApi from "../../api/usersApi";
import { UserContext } from "../../App";

export default function Topbar({ avatar, isUser, updatePendingList, updateFriendListProp, setAuth }) {
  const userContext = useContext(UserContext);

  const [isPopUpMenue, setIsPopUp] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [searchMethode, setSearchMethode] = useState("people");
  const [rotation, setRotation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [notificationPopUp, setShowNotificationPopUp] = useState(false);
  const [notifications, setNotifications] = useState([userContext.user.pending]);
  // const location = useLocation();

  const handleSearchInput = ({ target: { value } }) => {
    setSearchInput((p) => value);
    // console.log(searchInput);
    // console.log(userContext);
  };

  useEffect(() => {
    if (userContext.user._id) {
      updateNotification();
    }
    // eslint-disable-next-line
  }, [userContext.user._id]);

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
    const { data } = await usersApi.getUserLists.get(`/${userContext.user._id}`);
    const validNotifications = data.pending.filter((pending) => pending.content !== "");
    setNotifications(validNotifications);
    // console.log(data);
    updateFriendListProp(data.friends);
    // console.log(validNotifications, data.pending);
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
          {isPopUpMenue && (
            <PopupNanMenu name={userContext.user.name} isUser={isUser} setAuth={setAuth} token={userContext.token} />
          )}
          {!isPopUpMenue && (
            <img src={avatar} alt="profile-img-logo" className="profile-img-icon" onClick={() => setIsPopUp(true)} />
          )}
          {isPopUpMenue && (
            <div className="flip-back" onClick={() => setIsPopUp(false)}>
              <FontAwesomeIcon icon={faCircleXmark} className={"fa-icon "} size={"lg"} />
            </div>
          )}
          <Link to={"/chat"}>
            <div className="notification-messanger-container">
              <FontAwesomeIcon icon={faFacebookMessenger} className={"fa-icon messanger-icon"} />
              <div className="messanger-num">6</div>
            </div>
          </Link>
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
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} className={"fa-icon hompage-icon"} />
          </Link>
          <Link to="/profile/me">
            <FontAwesomeIcon icon={faPersonShelter} className={"fa-icon"} />
          </Link>

          <Link to="profile/myfriends">
            <FontAwesomeIcon icon={faPeopleGroup} className={"fa-icon"} />
          </Link>
          <Link to="/profile/recipes">
            <FontAwesomeIcon icon={faListDots} className={"fa-icon"} />
          </Link>
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
    // eslint-disable-next-line
  }, []);

  return ref;
}

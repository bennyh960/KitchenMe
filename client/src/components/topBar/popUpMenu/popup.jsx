import React from "react";
import "./popup.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faGear, faEdit } from "@fortawesome/free-solid-svg-icons";
import usersApi from "../../../api/usersApi";

export default function PopupNanMenu() {
  const navigate = useNavigate();
  //! token should arrive from prop
  const handleLogOut = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM3MjdmNGMzZDkwYzI5MTJiMTZmZWUiLCJpYXQiOjE2NTcyMzAyMDV9.mYZOkaY7FOyzRomcIwFiF7q_fJ89Z3h1tGQtiE7frwM";
    // const { data, status, statusText } = await usersApi.logoutRouter.post(
    //   "",
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // console.log(data, status, typeof status, typeof statusText, statusText);
    navigate("/users/login", {
      state: {
        isUser: false,
      },
    });
  };
  return (
    <div className="white-box popup-menu">
      <div className="inner-box ">
        <Link to={"/profile/me"}>
          <h2 className="line">Benny Hassan</h2>
          <span style={{ marginLeft: "1rem" }}>Profile</span>
        </Link>
      </div>
      <div className="popup-option ">
        <FontAwesomeIcon icon={faEdit} className={"fa-icon"} />
        <span>Edit Profile</span>
      </div>
      <div className="popup-option ">
        <FontAwesomeIcon icon={faGear} className={"fa-icon"} />
        <span>Settings</span>
      </div>
      <div className="popup-option" onClick={handleLogOut}>
        <FontAwesomeIcon icon={faRightFromBracket} className={"fa-icon"} />
        <span>Logout</span>
      </div>
    </div>
  );
}

// TODO 2: Edit logic     prioroty : 1
// TODO 2: Setting logic  Proiorit : save to end (in case i will have time)

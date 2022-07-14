import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usersApi from "../../../api/usersApi";
import "./notifications.css";

export default function NotificationsDD({ pendingList, updatePendingList }) {
  const [newPendingList, setNewPending] = useState([]);
  const validImageSrc = async (id) => {
    try {
      const { data } = await usersApi.users.get(`/${id}/avatar`);
      if (data) return true;
    } catch (error) {
      return false;
    }
  };

  const drawResult = () => {
    return pendingList.map((pending) => {
      return (
        <Link to={{ pathname: `/users/profile/${pending.pendingId}` }} key={pending.pendingId}>
          <div className="line dd-result-notifications">
            {validImageSrc() ? (
              <img
                src={`http://localhost:5000/users/${pending.pendingId}/avatar`}
                alt="searched person"
                className="searched-person-img"
              />
            ) : (
              <img
                src={`https://identix.state.gov/qotw/images/no-photo.gif`}
                alt="searched person"
                className="searched-person-img"
              />
            )}

            {pending.content}
          </div>
        </Link>
      );
    });
  };

  return <div className="dropdown-content-notifications">{pendingList && drawResult()}</div>;
}

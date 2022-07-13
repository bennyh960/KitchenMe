import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usersApi from "../../../api/usersApi";
import "./ddsearchres.css";

export default function DropDownResult({ searchMethode, name, resetSearch }) {
  const [searchResultPeople, setSearchresultPeople] = useState([]);

  useEffect(() => {
    const searchPeople = async () => {
      const { data } = await usersApi.users.get(`/${name}`); //*search by name with regex
      // console.log(data);
      setSearchresultPeople(data);
    };

    // console.log(resetSearch);
    if (name && resetSearch) {
      setTimeout(() => {
        searchPeople();
      }, 500);
    } else {
      console.log("RESET SEARCH BAR");
      setSearchresultPeople([]);
    }
  }, [name, resetSearch]);

  const drawResult = () => {
    return searchResultPeople.map((person) => {
      return (
        // <Link to={`/users/profile/${person._id}`} key={person._id} >
        <Link to={{ pathname: `/users/profile/${person._id}`, state: { key: person._id } }} key={person._id}>
          <div className="line dd-result">
            {person.avatar && (
              <img
                src={`http://localhost:5000/users/${person._id}/avatar`}
                alt="searched person"
                className="searched-person-img"
              />
            )}
            {!person.avatar && (
              <img
                src={`https://identix.state.gov/qotw/images/no-photo.gif`}
                alt="searched person"
                className="searched-person-img"
              />
            )}

            {person.name}
          </div>
        </Link>
      );
    });
  };

  //   return <div className="dropdown-content">{}</div>;
  return <div className="dropdown-content">{drawResult()}</div>;
}

import React, { useRef, useState, useEffect } from "react";
import "./cover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCamera, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProfileNav from "../profile-nav/profileNav";
import usersApi from "../../../api/usersApi";

export default function Cover({ handleView, avatar }) {
  const [file, setFile] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [isValid, setIsValid] = useState(true);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPrevUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      console.log(pickedFile);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const handleUploadProfileImage = async () => {
    // todo loader on
    // axios
    const { data } = await usersApi.users.post(
      "/me/avatar",
      { file },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // updateUi();
    // todo loader off
    setPrevUrl("");
  };

  return (
    <div className="cover-container">
      <div className="cover-image">
        <div>
          {prevUrl && <img src={prevUrl} className="profile-image" alt="profile image" />}
          {!prevUrl && <img src={avatar} className="profile-image" alt="profile image" />}

          {!prevUrl && (
            <div onClick={pickImageHandler}>
              <FontAwesomeIcon icon={faCamera} className={"fa-icon-float"} />
              <span className="hover-description">Edit Profile Image</span>
            </div>
          )}
          {prevUrl && (
            <div>
              <div onClick={handleUploadProfileImage}>
                <FontAwesomeIcon icon={faCheck} color={"green"} className={"fa-icon-float"} />
              </div>
              <div onClick={() => setPrevUrl("")}>
                <FontAwesomeIcon icon={faXmark} color={"blue"} className={"fa-icon-float-left"} />
              </div>
            </div>
          )}
          <input
            onChange={pickHandler}
            ref={filePickerRef}
            type="file"
            // id={id}
            style={{ display: "none" }}
            accept=".jpg,.png,.jpeg"
          />
        </div>
      </div>
      <ProfileNav handleView={handleView} />
    </div>
  );
}

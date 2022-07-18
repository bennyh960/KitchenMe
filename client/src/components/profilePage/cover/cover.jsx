import React, { useRef, useState, useEffect } from "react";
import "./cover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCamera, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProfileNav from "../profile-nav/profileNav";
import usersApi from "../../../api/usersApi";

export default function Cover({ handleView, avatar, token }) {
  const [file, setFile] = useState();
  const [prevUrl, setPrevUrl] = useState();
  // const [isValid, setIsValid] = useState(true);
  // const [updateUi, setUpdateUi] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      // console.log("not file");
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
    // let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      // setIsValid(true);
      // fileIsValid = true;
      // console.log(pickedFile);
    } else {
      // setIsValid(false);
      // fileIsValid = false;
      console.log("i disabled is valid logic due to not use, if error think about it, in cover.jsx file");
    }
  };

  const handleUploadProfileImage = async () => {
    // todo loader on
    // axios
    // console.log(file);
    const obj = {
      test: "its seems that in order to use multypart contnet type i must use multypart ",
      avatar: file,
    };
    try {
      await usersApi.userUploadAvatar.post("", obj, {
        headers: {
          // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(data);
    } catch (error) {
      // todo handle error to client
      // todo user must know that max size is 2mb
      console.log(error);
    }

    // updateUi();
    // todo loader off
    // setPrevUrl("");
    // setUpdateUi((p) => !p);
    window.location.reload(); // its very dificult to update ui due to multy compnenet use this avatar (posts ,menu , cover)
  };

  return (
    <div className="cover-container">
      <div className="cover-image">
        <div>
          {prevUrl && <img src={prevUrl} className="profile-image" alt="profile avatar big" />}
          {!prevUrl && <img src={avatar} className="profile-image" alt="profile avatar big alternate" />}

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

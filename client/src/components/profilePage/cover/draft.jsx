import React, { useRef, useState, useEffect } from "react";
import "./cover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCamera, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProfileNav from "../profile-nav/profileNav";
import usersApi from "../../../api/usersApi";

export default function Cover({ handleView, avatar }) {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickHandler = (e) => {
    let pickedFile = e.target.files[0];
    setFile(pickedFile);
  };

  const handleUploadProfileImage = async () => {
    // In this Image upload i added custom object in order to avoid bundries issue
    // In other image uploaded i build a full object with other data so i even didnt mention content-type in request header
    const obj = {
      test: "its seems that in order to use multypart contnet type i must use multy type ",
      avatar: file,
    };

    await usersApi.userUploadAvatar.post("", obj, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const getUploaded = async () => {
    // this route get all data stored
    const { data } = await router.get("62cb2b404e986b25cc73dc74");
    setImage(data.avatar);
  };

  return (
    <div className="container">
      <div onClick={pickImageHandler}>upload img</div>
      <input
        onChange={pickHandler}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
      />
      <div onClick={handleUploadProfileImage}>
        <h1> Uploaded image to DB</h1>
      </div>

      <div onClick={getUploaded}>
        <h1>Fetch Image</h1>
        <img src={`data:image/png;base64, ${Buffer.from(avatar).toString("base64")}`} alt="" /> // NOT WORKING IN THIS
        IMAGE UPLAOD METHOD
        <img src={avatar} alt="" />
      </div>
    </div>
  );
}

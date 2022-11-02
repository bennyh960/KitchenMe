import React, { useRef, useState, useEffect } from "react";
import "./upload.css";

export default function UploadSubmit({ id, onInput, imgUploadHandler, imgUrlFromApi }) {
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
      // console.log(fileReader);
    };
    fileReader.readAsDataURL(file);
    imgUploadHandler(file);
    // }, [file, imgUploadHandler]);
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
      setIsValid(true);
      // fileIsValid = true;
      // console.log(pickedFile);
    } else {
      setIsValid(false);
      // fileIsValid = false;
    }
  };

  return (
    <div className="form-control">
      <button className="ui primary button" onClick={pickImageHandler}>
        Pick Image
      </button>
      <input
        onChange={pickHandler}
        ref={filePickerRef}
        type="file"
        id={id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
      />
      <div className="image-uplaod">
        <div className="image-upload__preview">
          {prevUrl ? <img src={prevUrl} alt="Preview" /> : <img src={imgUrlFromApi} alt="Preview" />}
        </div>
      </div>
      {!isValid && <p>Upload failed</p>}
      {/* <button className="ui primary button" onClick={pickImageHandler}>
        confirm
      </button> */}
    </div>
  );
}

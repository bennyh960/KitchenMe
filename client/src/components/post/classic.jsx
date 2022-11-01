import React from "react";
import "./classic.css";

// import { Buffer } from "buffer";

export default function ClassicPost({ image, description }) {
  // console.log(process.env.REACT_APP_IMAGE_BASE_URL + image);
  // console.log(image);
  return (
    <div className="classic-container">
      <div className="post-image-container">{image && <img className="post-image " src={image} alt="" />}</div>
      <div className="post-description">
        <div className="description-content">{description}</div>
      </div>
    </div>
  );
}

{
  /* <img
            className="post-image "
            src={image
              process.env.NODE_ENV === "production"
                ? "https://meetbachv2.herokuapp.com/" + image
                : 
                  image
            }
            alt=""
          /> */
}

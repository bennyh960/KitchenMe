import React from "react";
import "./classic.css";

// import { Buffer } from "buffer";

export default function ClassicPost({ image, description, title, category, pathName }) {
  return (
    <div className="classic-container">
      {/* {pathName !== "123/321" && ( */}
      <div className="post-image-container">
        {image && (
          <img
            className="post-image "
            src={process.env.NODE_ENV === "production" ? image : `http://localhost:5000/${image}`}
            alt=""
          />
        )}
      </div>
      {/* )} */}
      <div className="post-description">
        <div className="description-content">{description}</div>
      </div>
    </div>
  );
}

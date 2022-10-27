import React from "react";
import "./classic.css";
import { Buffer } from "buffer";

export default function ClassicPost({ image, description, title, category }) {
  // console.log(description);
  return (
    <div className="classic-container">
      <div className="post-image-container">
        {image && image.data && (
          <img
            className="post-image"
            // src="https://d3o5sihylz93ps.cloudfront.net/wp-content/uploads/2020/10/17192042/08_14.jpg"
            src={`data:image/png;base64, ${Buffer.from(image.data).toString("base64")}`}
            alt=""
          />
        )}
      </div>
      <div className="post-description">
        <div className="decription-title">
          <h1>{title}</h1> <span>{category}</span>
        </div>
        <div className="description-content">{description}</div>
      </div>
      {/* <br /> */}
    </div>
  );
}

import React from "react";
import "./classic.css";
import { Buffer } from "buffer";

export default function ClassicPost({ image, description, title, category, width }) {
  const { innerWidth: width2 } = window;

  return (
    <div className="classic-container">
      {width2 <= 600 && (
        <div className="post-image-container">
          {image && image.data && (
            <img
              className="post-image "
              src={`data:image/png;base64, ${Buffer.from(image.data).toString("base64")}`}
              alt=""
            />
          )}
        </div>
      )}
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

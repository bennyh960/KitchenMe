import React from "react";
import "./classic.css";
import { Buffer } from "buffer";

export default function ClassicPost({ image, description }) {
  return (
    <div className="classic-container">
      <div>
        {image && image.data && (
          <img
            className="post-image"
            // src="https://d3o5sihylz93ps.cloudfront.net/wp-content/uploads/2020/10/17192042/08_14.jpg"
            src={`data:image/png;base64, ${Buffer.from(image.data).toString("base64")}`}
            alt=""
          />
        )}
      </div>
      <div style={{ textAlign: "justify", width: "90%", margin: "auto" }}>{description}</div>
      {/* <br /> */}
    </div>
  );
}

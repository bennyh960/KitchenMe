import React, { useEffect, useState } from "react";
import "./video.css";

export default function Video({ url }) {
  //   const URL = "https://www.youtube.com/watch?v=1IszT_guI08";

  return (
    <div>
      <iframe
        width="350"
        height="300"
        src={url.replace("/watch?v=", "/embed/")}
        title="Realtime Chat App with React, Node.js, Socket.io | MERN Stack Messenger Clone"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      ></iframe>
    </div>
  );
}

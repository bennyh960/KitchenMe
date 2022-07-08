import React from "react";
import LogIn from "../login/login";
import "./homepage.css";

export default function Homepage({ isUser }) {
  return (
    <div>
      <LogIn isUser={isUser} />
    </div>
  );
}

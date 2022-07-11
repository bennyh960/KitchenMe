import React, { useState } from "react";
import LogIn from "./login/login";
import Signin from "./signin/signin";
import ForgotPassword from "./login/forgotpassword";

export default function Authenticate({ isUser }) {
  const [action, setAction] = useState("login");
  const handleClickTo = (path) => {
    setAction(path);
  };
  //   return <Signin />;
  if (action === "login") return <LogIn handleClickTo={handleClickTo} isUser={isUser} />;
  if (action === "register") return <Signin handleClickTo={handleClickTo} isUser={isUser} />;
  if (action === "passwordReset") return <ForgotPassword handleClickTo={handleClickTo} />;
}

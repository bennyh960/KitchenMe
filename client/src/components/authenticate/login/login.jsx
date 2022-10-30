import React, { useEffect, useState, useContext } from "react";
import "./login.css";
import usersApi from "../../../api/usersApi";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

export default function LogIn({ handleClickTo, isUser, setAuth }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("\n");
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setMessage("\n");
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // todo add loader
    try {
      // ! create new router

      const { data } = await usersApi.findUserRouter.post("", { email: formData.email, password: formData.password });
      // console.log(data);
      if (!data.user) throw new Error("Unable to log in");
      setMessage(`${data.user.name} sucssesfully login in.`);
      // todo remove loader
      isUser(true);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuth({ user: data.user, token: data.token });

      // todo - store user without secret data

      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (
      formData.email !== "" &&
      formData.password !== "" &&
      formData.email.includes("@") &&
      formData.email.includes(".")
    ) {
      setIsSubmit(true);
      return;
    }

    setIsSubmit(false);
  }, [formData]);

  return (
    <div className="login-container">
      <form className="ui form login-form" onSubmit={handleSubmit}>
        <h1>Log-In</h1>
        <hr />
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email*" required onChange={handleChange} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password*" required onChange={handleChange} />
        </div>
        {message && <Message text={message} />}

        <div className="auth-options-links">
          <p onClick={() => handleClickTo("register")}>Not a member? - Register</p>
          <p onClick={() => handleClickTo("passwordReset")}>Forgot your password?</p>
          <div>demo Email: user1@c.com , password:123 </div>
        </div>

        <button className="ui button" type="submit" disabled={!isSubmit}>
          Log In
        </button>
      </form>
    </div>
  );
}

function Message({ text }) {
  return <div>{text}</div>;
}

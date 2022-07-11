import React, { useEffect, useState } from "react";

import "./login.css";
import usersApi from "../../../api/usersApi";

export default function ForgotPassword({ handleClickTo }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

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
      const { data } = await usersApi.resetPassword.post("", { email: formData.email });
      // console.log(data);

      // todo remove loader
      if (data === "ok") {
        setMessage(`We send your password into  ${formData.email}`);
        // * sendEmailFunc(formData.email)
        setTimeout(() => {
          handleClickTo("login");
        }, 1000);
      } else {
        setMessage(`${formData.email} is not an active user.`);
      }
    } catch (error) {
      console.log(error.message, error.response.data);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (formData.email !== "" && formData.email.includes("@") && formData.email.includes(".")) {
      setIsSubmit(true);
      return;
    }

    setIsSubmit(false);
  }, [formData]);

  return (
    <div className="login-container">
      <form className="ui form login-form">
        <h1>Find Your Account</h1>
        <hr />
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email*" onChange={handleChange} />
        </div>

        {message ? <Message text={message} style={{ height: "2rem" }} /> : <div style={{ height: "2rem" }}></div>}

        <button className="ui button positive" type="submit" disabled={!isSubmit} onClick={handleSubmit}>
          Find
        </button>
        <button className="ui button negative" type="button" onClick={() => handleClickTo("login")}>
          Cancle
        </button>
      </form>
    </div>
  );
}

function Message({ text }) {
  return <div>{text}</div>;
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import usersApi from "../../api/usersApi";

export default function ForgotPassword() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setMessage("\n");
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCancle = () => {
    navigate("/users/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // todo add loader
    try {
      const { data } = await usersApi.findUserRouter.post(`${formData.email}`);
      console.log(data);
      setMessage(`${data.name} sucssesfully login in.`);
      // todo remove loader
      if (data.name) {
        setMessage(`We send your password into  ${formData.email}`);
        // * sendEmailFunc(formData.email)
      } else {
        setMessage(`${formData.email} is not an active user.`);
      }
    } catch (error) {
      console.log(error.message, error.response.data);
      const description = error.response.data.split("{")[1].replace("}", "");
      const text = `${error.message}:
       With ${description}`;
      setMessage(text);
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
        <button className="ui button negative" type="button" onClick={() => handleCancle()}>
          Cancle
        </button>
      </form>
    </div>
  );
}

function Message({ text }) {
  return <div>{text}</div>;
}

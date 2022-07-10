import React, { useEffect, useState } from "react";
import "./signin.css";
import PasswordMeter from "./passwordmeter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usersApi from "../../api/usersApi";

export default function Signin({ isUser }) {
  const [showPasswordMeter, setPasswordMeter] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "" });
  const [message, setMessage] = useState("\n");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) isUser(location.state.isUser);
  }, []);

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
      // console.log(usersApi);
      const { data } = await usersApi.newUserRouter.post("", formData);
      isUser(true);
      localStorage.setItem("token", JSON.stringify(data.token));
      // todo - store user without secret data
      const userDataStore = {};
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/feed", {
        state: data.user,
      });
      // todo remove loader
    } catch (error) {
      console.log(error.message, error.response.data);
      const description = error.response.data.split("{")[1].replace("}", "");
      const text = `${error.message}:
       With ${description}`;
      setMessage(text);
    }
  };

  useEffect(() => {
    if (
      formData.name.length < 3 ||
      formData.email === "" ||
      formData.password === "" ||
      formData.password.length < 3 ||
      formData.password !== formData.password2
    ) {
      setIsSubmit(true);
      return;
      //   }
    }

    setIsSubmit(false);
  }, [formData]);

  return (
    <div className="sign-in-container">
      {/* <div className="sign-form"></div> */}
      {/* <form className="ui form sign-form" action="http://localhost:5000/users/new" method="POST"> */}
      <form className="ui form sign-form" onSubmit={handleSubmit}>
        <h1>Sign-In</h1>
        <hr />
        <div className="field">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Full Name*" required onChange={handleChange} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email*" required onChange={handleChange} />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password*"
            required
            onFocus={() => setPasswordMeter(true)}
            onBlur={() => setPasswordMeter(false)}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input
            type="password"
            onBlur={() => setConfirmPass(false)}
            onFocus={() => {
              setConfirmPass(true);
            }}
            name="password2"
            placeholder="Password*"
            required
            onChange={handleChange}
          />
        </div>
        <div>{showPasswordMeter ? <PasswordMeter password={formData.password} /> : <br />}</div>
        {showConfirmPass &&
          (formData.password !== formData.password2 ? <div>Unmatch passords</div> : <div>Password Match</div>)}
        <Link to={"/users/login"}>Already have account?</Link>
        {message && <Message text={message} />}
        <button className="ui button" type="submit" disabled={isSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}

function Message({ text }) {
  return <div>{text}</div>;
}

import React, { useEffect, useState } from "react";
import "./signin.css";
import PasswordMeter from "./passwordmeter";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function Signin() {
  const [showPasswordMeter, setPasswordMeter] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "" });

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (
      formData.name.length < 3 ||
      formData.email === "" ||
      formData.password === "" ||
      formData.password.length < 3 ||
      formData.password !== formData.password2
    ) {
      //   if (formData.password.length < 3) {
      console.log("============");
      setIsSubmit(true);
      return;
      //   }
    }
    console.log("xxx");
    setIsSubmit(false);
  }, [formData]);

  return (
    <div className="sign-in-container">
      {/* <div className="sign-form"></div> */}
      <form className="ui form sign-form" action="http://localhost:5000/users/new" method="POST">
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
        <div>{showPasswordMeter ? <PasswordMeter password={"b123njD"} /> : <br />}</div>
        {showConfirmPass &&
          (formData.password !== formData.password2 ? <div>Unmatch passords</div> : <div>Password Match</div>)}
        <button className="ui button" type="submit" disabled={isSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

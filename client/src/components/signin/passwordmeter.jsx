import React from "react";
import "./passMeter.css";

var strength = {
  0: "Worst: ",
  1: "Bad: ",
  2: "Weak: ",
  3: "Good: ",
  4: "Strong: ",
};

export default function PasswordMeter({ password }) {
  const passwordParse = () => {
    if (password.length < 3) {
      return 0;
    } else if (password.length >= 3 && password.length < 5) {
      return 1;
    } else if (password.length >= 5 && /^[^a-z]+$/g.test(password) && /^[^A-Z]+$/g.test(password)) {
      return 2;
    } else if (password.length >= 7 && /[a-z]/g.test(password) && /[A-Z]/g.test(password)) {
      return 4;
    } else if ((password.length >= 6 && /[a-z]/g.test(password)) || /[A-Z]/g.test(password)) {
      return 3;
    } else {
      return 2;
    }
  };

  return (
    <div className="password-meter-container">
      <p id="password-strength-text">{strength[passwordParse()]}</p>
      <meter max="4" id="password-strength-meter" value={passwordParse()}></meter>
    </div>
  );
}

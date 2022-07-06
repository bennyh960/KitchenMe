import React from "react";
import "./passMeter.css";

var strength = {
  0: "Worst",
  1: "Bad",
  2: "Weak",
  3: "Good",
  4: "Strong",
};

export default function PasswordMeter({ password }) {
  const passwordParse = () => {
    if (password.length < 3) {
      return 0;
    } else if (password.length >= 3 && password.length < 5) {
      return 1;
    } else if (password.length >= 5 && password.length < 7) {
      return 2;
    } else if (password.length >= 7 && /[a-z]/.test(password) && /^[A-Z]/.test(password)) {
      return 3;
    } else if (password.length >= 7 && /[a-z]/.test(password) && /[A-Z]/.test(password)) {
      return 4;
    }
  };

  return (
    <div>
      <meter max="4" id="password-strength-meter" value={passwordParse()}></meter>
      <p id="password-strength-text">{strength[passwordParse()]}</p>
    </div>
  );
}

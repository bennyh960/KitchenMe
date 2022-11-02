// import React from 'react'
import "./loaderLogo.css";
export default function LoaderImg({ size }) {
  return (
    <div className="loader-img-container">
      <div className={`loader-img-logo ${size}`}></div>
    </div>
  );
}

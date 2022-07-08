import React from "react";
import "./confirm.css";

import UploadSubmit from "../uploadFiles/uploadSubmit";

export default function ConfirmRecipe({ formData, imgUploadHandler }) {
  const drawIngrediernts = () => {
    return [...formData.ingredients].map((item, i) => {
      return (
        <div className="ingredient-row-confirm" key={i}>
          {item.ingredient} - <b>{item.amount}</b>
        </div>
      );
    });
  };
  const drawInstructions = () => {
    return [...formData.instructions].map((item, i) => {
      return (
        <div className="instruction-row-confirm" key={i}>
          {item}
          <div className="float-step-num">{i + 1}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {formData.name} Recipe - {formData.category}
      </h1>
      <div className="confirm-container white-box">
        <div className="ingredient-confirm">
          <b> Ingredients: </b>
          <hr />
          {drawIngrediernts()}
        </div>
        <div className="instructions-confirm">
          <h2 style={{ textAlign: "center", margin: "0" }}>Methode:</h2>
          {/* <hr /> */}
          {drawInstructions()}
        </div>
        <UploadSubmit imgUploadHandler={imgUploadHandler} />
      </div>
    </div>
  );
}

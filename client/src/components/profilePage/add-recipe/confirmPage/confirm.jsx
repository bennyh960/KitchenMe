import React from "react";
import "./confirm.css";

export default function ConfirmRecipe({ formData }) {
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
    console.log(formData);
    return [...formData.instructions].map((item, i) => {
      return (
        <div className="instruction-row-confirm" key={i}>
          {/* <b> step {i + 1} </b>: <br /> {item.instructions} */}
          {item.instructions}
          <div className="float-step-num">{i + 1}</div>
        </div>
      );
    });
  };

  return (
    <div className="confirm-container">
      {/* Confirm */}
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
      {/* {formData.prevUrl && <img src={formData.prevUrl} alt="" height={150} />} */}
      {/* <button
        onClick={() => {
          {
            console.log(formData);
            // console.log(formData.);
            console.log(typeof formData.ingredients, formData.ingredients);
          }
        }}
      >
        click
      </button> */}
    </div>
  );
}

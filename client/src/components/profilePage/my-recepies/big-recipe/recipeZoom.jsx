import React from "react";

import "./recipezoom.css";

export default function RecipeZoom() {
  const formData = {
    name: "aaa",
    category: "bbb",
    instructions: [1, 2, 3, 4, 5],
    ingredients: [1, 2, 3, 4, 5],
  };

  const drawIngrediernts = () => {
    return [...formData.ingredients].map((item, i, arr) => {
      return (
        <div className="ingredient-row-confirm" key={i}>
          {arr[i][0]} - <b>{arr[i][1]}</b>
          {/* {arr[i][2] && `(${arr[i][2]})`} */}
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
    <div className="title-confirm-recipe white-box">
      <h1>
        {formData.name} Recipe - {formData.category}
      </h1>
      <div className="confirm-container">
        <div className="ingredient-confirm">
          <b> Ingredients: </b>
          <hr />
          {drawIngrediernts()}
        </div>
        <div className="instructions-confirm">
          <h2 style={{ textAlign: "center", margin: "0" }}>Methode:</h2>

          {drawInstructions()}
        </div>

        <img src="http://localhost:3000/images/peopleSearch.jpg" alt="" />
      </div>
      <div className="ui buttons" id="edit-delete">
        <button className="ui pink button" id="cancle-upload-recipe">
          Edit
        </button>
        <div className="or"></div>
        <button className="ui red button" id="submit-upload-recipe">
          Delete
        </button>
      </div>
    </div>
  );
}

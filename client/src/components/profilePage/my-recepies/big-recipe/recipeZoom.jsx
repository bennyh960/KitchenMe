import React from "react";
import "./recipezoom.css";
import { useState } from "react";

export default function RecipeZoom({ data, popUpClose }) {
  const formData = {
    name: data.name,
    category: data.category,
    instructions: data.instructions || [],
    ingredients: data.ingredients || [],
  };
  const { innerWidth: width } = window;
  const [showIngredient, setShowingredients] = useState(width < 600 ? false : true);
  const [showInstructions, setShowInstructions] = useState(width < 600 ? false : true);

  const drawIngrediernts = () => {
    return [...formData.ingredients].map((item, i, arr) => {
      return (
        <div className="ingredient-row-confirm" key={i}>
          {arr[i][0]} - <b>{arr[i][1]}</b>
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

  const handleIngredient = () => {
    width < 600 && setShowingredients((p) => !p);
  };
  const handleInstructions = () => {
    width < 600 && setShowInstructions((p) => !p);
  };

  return (
    <div className="title-confirm-recipe white-box">
      <h1>
        {formData.name} Recipe - {formData.category}
        <span onClick={() => popUpClose(false)} className="close-btn">
          X
        </span>
      </h1>
      <div className="confirm-container">
        <div className="ingredient-confirm-big" onClick={handleIngredient}>
          <h1> Ingredients: </h1>
          <hr />
          {showIngredient && drawIngrediernts()}
        </div>
        <div className="instructions-confirm-big" onClick={handleInstructions}>
          <h1 style={{ textAlign: "center", margin: "0" }}>Methode:</h1>

          {showInstructions && drawInstructions()}
        </div>

        {data.image ? (
          <img
            src={process.env.NODE_ENV === "production" ? data.image : `http://localhost:5000/${data.image}`}
            alt=""
            className="recipe-image-zoom"
          />
        ) : (
          <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" className="recipe-image" />
        )}
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

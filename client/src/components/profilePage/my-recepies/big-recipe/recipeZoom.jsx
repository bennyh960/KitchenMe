import React from "react";
import { Buffer } from "buffer";
import "./recipezoom.css";

export default function RecipeZoom({ data, popUpClose }) {
  const formData = {
    name: data.name,
    category: data.category,
    instructions: data.instructions || [],
    ingredients: data.ingredients || [],
  };

  // console.log(data);
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
        <span onClick={() => popUpClose(false)} className="close-btn">
          X
        </span>
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

        {data.image ? (
          <img
            src={`data:image/png;base64, ${Buffer.from(data.image).toString("base64")}`}
            alt=""
            className="recipe-image"
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

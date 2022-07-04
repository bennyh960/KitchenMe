import React, { useState } from "react";
import IngredientTable from "../../post/table";
import "./addedrecipe.css";
import IngredientAdd from "./addIngredients/ingredientsadd";
import InstructionsAdd from "./addInstructions/instructionsadd";

// const rowsArr = [1, 2, 3];
export default function Addrecipe() {
  return (
    <div className="new-recipe-container">
      <h1 style={{ textAlign: "center" }}>Add New Recipe</h1>
      <div className="form-container-new-recipe">
        <div>
          <h2>Ingredient </h2>
          <IngredientAdd />
        </div>
        <div>
          <h2>Instructions</h2>
          <InstructionsAdd />
        </div>
      </div>
    </div>
  );
}

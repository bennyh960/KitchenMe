import React, { useState, useContext, createContext, useEffect } from "react";
import "./addedrecipe.css";
import IngredientAdd from "./addIngredients/ingredientsadd";
import InstructionsAdd from "./addInstructions/instructionsadd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UploadSubmit from "./uploadFiles/uploadSubmit";
import ConfirmRecipe from "./confirmPage/confirm";
// import axios from "axios";

// const rowsArr = [1, 2, 3];
export default function Addrecipe({ isOpenComponent }) {
  const [isDataReady, setIsDataReady] = useState(false);

  const [formData, setFormData] = useState({ ingredients: "", instructions: "", image: "" });

  useEffect(() => {
    if (formData.ingredients.length > 0 && formData.instructions.length > 0) {
      // console.log(formData);
      setIsDataReady(true);
    }
  }, [formData]);

  const postNewRecipe = async () => {
    // todo add loader
    //todo axios.post("/newRecipe",formData)
    isOpenComponent(false);
  };

  const ingredientObjHandler = (ingredients) => {
    setFormData((p) => {
      if (p) {
        return { ...p, ingredients };
      }
    });
    console.log(formData);
    console.log("xxx");
  };
  const instructionsObjHandler = (instructions) => {
    setFormData((p) => {
      if (p) {
        return { ...p, instructions };
      }
    });
    console.log(formData);
    // console.log("xxx");
  };
  const imgUploadHandler = (image) => {
    setFormData((p) => {
      if (p) {
        return { ...p, image };
      }
    });
    console.log(formData);
    // console.log("xxx");
  };

  return (
    <div className="container-newRecipe-frame">
      <div className="new-recipe-container">
        <h1 style={{ textAlign: "center" }}>Add New Recipe</h1>
        <Carousel infiniteLoop={true} emulateTouch={true} showThumbs={false}>
          <IngredientAdd ingredientObjHandler={ingredientObjHandler} />
          <InstructionsAdd instructionsObjHandler={instructionsObjHandler} />
          <UploadSubmit imgUploadHandler={imgUploadHandler} />
          <ConfirmRecipe formData={formData} />
        </Carousel>
      </div>

      <div className="ui buttons" id="save-cancle">
        <button className="ui button" id="cancle-upload-recipe" onClick={(e) => isOpenComponent(false)}>
          Cancel
        </button>
        <div className="or"></div>
        <button
          className="ui positive button"
          id="submit-upload-recipe"
          disabled={!isDataReady}
          onClick={postNewRecipe}
        >
          Save
        </button>
      </div>
    </div>
  );
}

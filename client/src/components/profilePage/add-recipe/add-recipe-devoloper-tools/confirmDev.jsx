import React, { useEffect, useState } from "react";
import "../confirmPage/confirm.css";
// import Loader from "../../../loaders/loader1";
import LoaderImg from "../../../loaders/LoaderIogo";

import UploadSubmit from "../uploadFiles/uploadSubmit";

export default function ConfirmRecipeDev({ formData, imgUploadHandler, postNewRecipe }) {
  const [isDataReady, setIsDataReady] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (formData.ingredients.length > 1 && formData.instructions.length > 1) {
      // console.log(formData);
      setIsDataReady(true);
    }
  }, [formData]);
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
    <>
      {/* {!isLoading && <Loader />} */}
      <div className="title-confirm-recipe2 white-box2">
        <h1>
          {formData.name} Recipe - {formData.category}
        </h1>
        {/* <Loader /> */}
        <div className="confirm-container2">
          <div className="ingredient-confirm">
            <b> Ingredients: </b>
            <hr />
            {drawIngrediernts()}
          </div>
          <div className="instructions-confirm">
            <h2 style={{ textAlign: "center", margin: "0" }}>Methode:</h2>

            {drawInstructions()}
          </div>
          <UploadSubmit imgUploadHandler={imgUploadHandler} />
        </div>
        <div className="ui buttons" id="save-cancle" style={{ width: "95%", margin: "0 auto" }}>
          {/* {isLoading && <Loader />} */}
          {isLoading && <LoaderImg size="" />}
          <button
            className="ui pink button"
            id="cancle-upload-recipe"
            onClick={() => {
              setLoading(true);
              postNewRecipe(true);
            }}
            disabled={!isDataReady}
          >
            Post as Public
          </button>
          <div className="or"></div>
          <button
            className="ui red button"
            id="submit-upload-recipe"
            disabled={!isDataReady}
            onClick={() => {
              setLoading(true);
              postNewRecipe(false);
            }}
          >
            Save as Private
          </button>
        </div>
      </div>
    </>
  );
}

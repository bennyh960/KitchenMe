import React, { useState, useContext, createContext, useEffect } from "react";
import "./addedrecipe.css";
import IngredientAdd from "./addIngredients/ingredientsadd";
import InstructionsAdd from "./addInstructions/instructionsadd";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import UploadSubmit from "./uploadFiles/uploadSubmit";
import ConfirmRecipe from "./confirmPage/confirm";
import { Link } from "react-router-dom";
import recipiesAPI from "../../../api/recipes.users.Api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import axios from "axios";

// const rowsArr = [1, 2, 3];
export default function Addrecipe() {
  const [isDataReady, setIsDataReady] = useState(false);
  const [titleCategory, setTitle] = useState({ name: "", category: "" });
  const [isOpenEditor, setOpenEditor] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", ingredients: "", instructions: "", image: "" });
  const [bgMandatory, setBackgroundMandtoryField] = useState("white");
  const [customCaruselPage, setCarouselPage] = useState(1);

  useEffect(() => {
    if (formData.ingredients.length > 1 && formData.instructions.length > 1) {
      // console.log(formData);
      setIsDataReady(true);
    }
  }, [formData]);

  const postNewRecipe = async () => {
    // todo add loader
    console.log(formData);
    const { data } = await recipiesAPI.createNewRecipe.post("", formData);
    console.log(data);
    //todo axios.post("/newRecipe",formData)
    // isOpenComponent(false);
  };

  const ingredientObjHandler = (ingredients) => {
    setFormData((p) => {
      if (p) {
        return { ...p, ingredients };
      }
    });
    // console.log(formData);
    // console.log("xxx");
  };
  const instructionsObjHandler = (instructions) => {
    setFormData((p) => {
      if (p) {
        return { ...p, instructions };
      }
    });
    // console.log(formData);
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
  const handleNameCategory = () => {
    setFormData((p) => {
      if (p) {
        return { ...p, name: titleCategory.name, category: titleCategory.category };
      }
    });

    if (formData.name && formData.category) {
      setOpenEditor((p) => !p);
      // return;
    } else if (!formData.name && !formData.category) {
      setBackgroundMandtoryField("rgb(240,240,240)");
      setTimeout(() => {
        setBackgroundMandtoryField("white");
      }, 100);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setTitle((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="container-newRecipe-frame">
      <div className="title-category white-box">
        <div className="add-new-title-logo">
          {/* <img src={process.env.PUBLIC_URL + "/images/logo64.png"} alt="logo" width={35} height={35} /> */}
          Add New Recipe
        </div>
        <div class="ui input ">
          <input
            type="text"
            placeholder="Recipe Name..."
            onChange={handleChange}
            value={titleCategory.name}
            style={{ backgroundColor: bgMandatory }}
            name="name"
          />
        </div>
        <div class="ui input ">
          <input
            type="text"
            placeholder="Recipe Cetegory..."
            onChange={handleChange}
            value={titleCategory.category}
            name="category"
            style={{ backgroundColor: bgMandatory }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", margin: "2rem" }}>
          <button className="ui button red" onClick={handleNameCategory}>
            {!isOpenEditor ? "Open Recipe Editor" : "Close Recipe Editor"}
          </button>
        </div>
      </div>

      {isOpenEditor && (
        <Carousel
          infiniteLoop={true}
          emulateTouch={true}
          // onSwipeMove={onSwipeMove}
          showThumbs={false}
          showArrows={false}
          // selectedItem={currentSlide}
          showIndicators={false}
          showStatus={false}
        >
          <div className="new-recipe-container ">
            {customCaruselPage % 2 === 1 && (
              <div className="ingredient-container">
                <IngredientAdd ingredientObjHandler={ingredientObjHandler} />
              </div>
            )}
            {customCaruselPage % 2 === 1 && (
              <div className="instructions-container ">
                <InstructionsAdd instructionsObjHandler={instructionsObjHandler} />
              </div>
            )}
            <div className="next-back-buttons">
              {customCaruselPage % 2 === 1 && (
                <button
                  disabled={formData.ingredients.length > 1 && formData.instructions.length > 1 ? false : true}
                  className="ui button red"
                  onClick={() => setCarouselPage((p) => ++p)}
                >
                  {/* Confirm */}
                  {formData.ingredients.length > 1 && formData.instructions.length > 1
                    ? "Confirm"
                    : "Fill 2 fileds at least in order to enable"}
                </button>
              )}
            </div>
            {customCaruselPage % 2 === 0 && (
              <div className="confirm-summary white-box">
                <ConfirmRecipe formData={formData} imgUploadHandler={imgUploadHandler} />
                {/* <UploadSubmit imgUploadHandler={imgUploadHandler} /> */}
                <div className="ui buttons" id="save-cancle">
                  <button className="ui button" id="cancle-upload-recipe" onClick={() => setCarouselPage((p) => ++p)}>
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
            )}
          </div>
        </Carousel>
      )}
    </div>
  );
}

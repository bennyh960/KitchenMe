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
export default function Addrecipe({ updateUi }) {
  const [titleCategory, setTitle] = useState({ name: "", category: "", description: "" });
  const [isOpenEditor, setOpenEditor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
  });
  const [bgMandatory, setBackgroundMandtoryField] = useState("white");

  const postNewRecipe = async (isPublic) => {
    formData.public = isPublic;
    const { data } = await recipiesAPI.createNewRecipe.post("", formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    updateUi();
    // setOpenEditor(false);
    setTitle({ name: "", description: "", category: "" });
  };

  const ingredientObjHandler = (ingredients) => {
    setFormData((p) => {
      if (p) {
        return { ...p, ingredients };
      }
    });
  };
  const instructionsObjHandler = (instructions) => {
    setFormData((p) => {
      if (p) {
        return { ...p, instructions };
      }
    });
  };
  const imgUploadHandler = (image) => {
    console.log(image);
    setFormData((p) => {
      if (p) {
        return { ...p, image };
      }
    });
    // console.log(formData);
    // console.log("xxx");
  };
  const handleNameCategory = () => {
    setFormData((p) => {
      if (p) {
        return {
          ...p,
          name: titleCategory.name,
          category: titleCategory.category,
          description: titleCategory.description,
        };
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
        <div className="ui input ">
          <input
            type="text"
            placeholder="Recipe Name*..."
            onChange={handleChange}
            value={titleCategory.name}
            style={{ backgroundColor: bgMandatory }}
            name="name"
          />
        </div>
        <div className="ui input ">
          <input
            type="text"
            placeholder="Recipe Cetegory*..."
            onChange={handleChange}
            value={titleCategory.category}
            name="category"
            style={{ backgroundColor: bgMandatory }}
          />
        </div>
        <div className="ui input ">
          <input
            type="text"
            placeholder="Description..."
            onChange={handleChange}
            value={titleCategory.description}
            name="description"
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
          // dynamicHeight={true}
          // stopOnHover={true}
          showArrows={false}
          // selectedItem={currentSlide}
          showIndicators={false}
          showStatus={false}
        >
          <div className="ingredient-container">
            <IngredientAdd ingredientObjHandler={ingredientObjHandler} />
          </div>

          <div className="instructions-container">
            <InstructionsAdd instructionsObjHandler={instructionsObjHandler} />
          </div>

          <div className="confirm-summary">
            <ConfirmRecipe
              formData={formData}
              postNewRecipe={postNewRecipe}
              imgUploadHandler={imgUploadHandler}
              updateUi={updateUi}
            />
          </div>
        </Carousel>
      )}
    </div>
  );
}

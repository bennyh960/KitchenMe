import React, { useState } from "react";
import "../addedrecipe.css";
// import IngredientAdd from "./addIngredients/ingredientsadd";
// import InstructionsAdd from "./addInstructions/instructionsadd";
// import Help from "./addHelp/Help";
import ConfirmRecipe from "../confirmPage/confirm";

import recipiesAPI from "../../../../api/recipes.users.Api";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import ConfirmRecipeDev from "./confirmDev";

// const rowsArr = [1, 2, 3];
export default function AddrecipeDev({ updateUi, token }) {
  // const [formData, setTitle] = useState({ name: "", category: "", description: "" });
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const postNewRecipe = async (isPublic) => {
    try {
      formData.public = isPublic;
      await recipiesAPI.createNewRecipe.post("", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      updateUi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    // console.log(formData);
  };

  const imgUploadHandler = (image) => {
    setFormData((p) => {
      if (p) {
        return { ...p, image };
      }
    });
  };

  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const handleInstructions = ({ target: { value, name } }) => {
    const ingredientArr = value.split("@");
    setInstructions(ingredientArr);
    setFormData((prev) => {
      return { ...prev, [name]: instructions };
    });
    console.log(name);
  };
  const handleIngredients = ({ target: { value, name } }) => {
    const ingredientArr = value.split("\n");
    for (let i of ingredientArr) {
      setIngredients((p) => [...p, i.split(",")]);
    }
    setFormData((prev) => {
      return { ...prev, [name]: ingredients };
    });
    console.log(name);
  };
  return (
    <div className="container-newRecipe-frame">
      <div className="title-category white-box">
        <div className="add-new-title-logo">Add New Recipe</div>
        <select
          className="ui dropdown select-category"
          onChange={handleChange}
          name="category"
          defaultValue={"default"}
        >
          <option value="default" disabled>
            <b> Select Recipe Category* </b>
          </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Salad">Salad</option>
          <option value="Side-dish">Side-dish</option>
          <option value="Baked-goods">Baked-goods</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Holiday">Holiday</option>
          <option value="Junk-Food">Junk-Food</option>
          <option value="Fast-Food">Fast-Food</option>
        </select>
        <div className="ui input ">
          <input type="text" placeholder="Recipe Name*..." onChange={handleChange} value={formData.name} name="name" />
        </div>

        <div className="ui input ">
          <input
            type="text"
            placeholder="Description..."
            onChange={handleChange}
            value={formData.description}
            name="description"
          />
        </div>

        <div className="" style={{ display: "flex", justifyContent: "space-around" }}>
          <textarea
            name="ingredients"
            cols="30"
            rows="10"
            onChange={handleIngredients}
            placeholder="ingredients..."
            value={ingredients}
          ></textarea>

          <textarea
            name="instructions"
            cols="30"
            rows="10"
            onChange={handleInstructions}
            placeholder="instructions..."
            value={instructions}
          ></textarea>
        </div>
      </div>

      <div className="confirm-summary">
        <ConfirmRecipe
          formData={formData}
          postNewRecipe={postNewRecipe}
          imgUploadHandler={imgUploadHandler}
          updateUi={updateUi}
        />
      </div>
    </div>
  );
}

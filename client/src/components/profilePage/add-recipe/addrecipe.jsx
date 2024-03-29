import React, { useState } from "react";
import "./addedrecipe.css";
import IngredientAdd from "./addIngredients/ingredientsadd";
import InstructionsAdd from "./addInstructions/instructionsadd";
import Help from "./addHelp/Help";
import ConfirmRecipe from "./confirmPage/confirm";
// import Loader from "../../loaders/loader1";
import recipiesAPI from "../../../api/recipes.users.Api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// const rowsArr = [1, 2, 3];
export default function Addrecipe({ updateUi, token }) {
  const [titleCategory, setTitle] = useState({ name: "", category: "", description: "" });
  const [isOpenEditor, setOpenEditor] = useState(false);
  const [isHelp, setHelp] = useState(false);

  const [errorMsg, setError] = useState("");
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
    try {
      formData.public = isPublic;
      await recipiesAPI.createNewRecipe.post("", formData, {
        headers: {
          // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      updateUi();
      setOpenEditor(false);
      setTitle({ name: "", description: "", category: "" });
    } catch (error) {
      // console.log(error);
      setHelp(true);
      setError(error);
    }
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
    setFormData((p) => {
      if (p) {
        return { ...p, image };
      }
    });
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
    // console.log(titleCategory);
  };

  const handleHelp = () => {
    setHelp((p) => !p);
  };
  return (
    <div className="container-newRecipe-frame">
      <div className="title-category white-box">
        <div className="add-new-title-logo">
          <div className="help-btn" onClick={handleHelp}>
            <i class="hire a helper icon"></i>
          </div>
          Add New Recipe
        </div>
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
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          useKeyboardArrows={true}
          // dynamicHeight={true}
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
      {isHelp && <Help setHelp={setHelp} error={errorMsg} />}
    </div>
  );
}

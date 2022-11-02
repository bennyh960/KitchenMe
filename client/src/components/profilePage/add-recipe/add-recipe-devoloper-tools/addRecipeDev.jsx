import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../addedrecipe.css";
import ConfirmRecipe from "../confirmPage/confirm";
import recipiesAPI from "../../../../api/recipes.users.Api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

export default function AddrecipeDev({ updateUi, token }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: [],
    instructions: [],
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
      navigate("/");
      // updateUi();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // https://spoonacular.com/food-api/docs
    async function getRandomRecipe() {
      const options = {
        method: "GET",
        url: "https://api.spoonacular.com/recipes/random?apiKey=cbe555ecedcd4defa535bd69b659a26e",
      };
      try {
        const { data } = await axios.request(options);
        // ====
        const result = data.recipes[0];
        // console.log(result);
        // ====
        // * Ingredients
        const ingredients = result.extendedIngredients.map((ingredient) => {
          return [
            ingredient.name,
            Math.ceil(ingredient.measures.metric.amount) + " " + ingredient.measures.metric.unitShort,
          ];
        });
        // console.log(ingredientsApi);

        // * Instructions
        const instructions = result.analyzedInstructions[0].steps.map((step) => {
          return step.step;
        });

        setFormData((p) => {
          return {
            instructions,
            ingredients,
            category: result.dishTypes[0].split(" ").join("-") || "Lanch",
            name: result.title || "Cool Recipe",
            description: result.summary || "Amazing recipe",
            image: result.image,
            systemGenerate: true,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    getRandomRecipe();
  }, []);

  const imgUploadHandler = (image) => {
    setFormData((p) => {
      if (p) {
        return { ...p, image };
      }
    });
  };

  return (
    <div>
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

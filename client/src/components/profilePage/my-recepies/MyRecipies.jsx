import React, { useEffect, useState } from "react";
import "./myrecipies.css";
import RecipeZoom from "./big-recipe/recipeZoom";
import recipiesAPI from "../../../api/recipes.users.Api";
import Loader2 from "../../loaders/loader2/loader2";
import { Buffer } from "buffer";

// TODO MAKE SEARCH functional by category and by input

export default function MyRecipies() {
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState({});
  const [popUpZoom, setPpUpZoom] = useState(false);
  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      // const { data } = await recipiesAPI.getPublicRecipes(""); //! dont delete this is useful for public posts
      const {
        // data: { recipes, owner },
        data: { recipes },
      } = await recipiesAPI.getUserRecipes("", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      setRecipes(recipes);
      setLoading(false);
    };
    getUserPosts();
  }, [setRecipes]);

  const DrawRecipes = () => {
    return recipes.map((recipe) => {
      return (
        <div
          className={`${recipe.category}`}
          key={recipe._id}
          onClick={() => {
            setData(recipe);
            setPpUpZoom(true);
          }}
        >
          <div className={`line recipe-title-one`}>
            <span>{recipe.name}</span>
            <span style={{ fontSize: "10px" }}>
              <i className="star icon yellow"></i>
              <i className="star icon yellow"></i>
              <i className="star icon yellow"></i>
            </span>
          </div>

          {recipe.image ? (
            <img
              src={`data:image/png;base64, ${Buffer.from(recipe.image).toString("base64")}`}
              alt=""
              className="recipe-image"
            />
          ) : (
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" className="recipe-image" />
          )}
        </div>
      );
    });
  };

  const popUpClose = (answere) => {
    setPpUpZoom(answere);
    console.log(answere);
  };

  return (
    <div className="my-recipes-container ">
      <div className="loading-absolute-container">{isLoading && <Loader2 />}</div>
      <h1 style={{ margin: "2rem" }}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" className="my-recipe-logo-image" />
      </h1>
      <div className="ui input my-recipes-searchbar">
        <input type="text" placeholder="Search recipe name" />
      </div>
      <div className="categories-container ">
        <h2 className="line">Filter By Recipe Category</h2>
        <div>Breakfast</div>
        <div>Lunch</div>
        <div>Dinner</div>
        <div>Appetizer</div>
        <div>Salad</div>
        <div>Side-dish</div>
        <div>Baked-goods</div>
        <div>Vegetarian</div>
        <div>Holiday</div>
        <div>Junk-Food</div>
        <div>Fast-Food</div>
      </div>
      <div className="recipes-container">
        {/* <div>
          <div className="line recipe-title-one">
            <span>Name</span>
            <span>Stars</span>
          </div>
          <img src={process.env.PUBLIC_URL + "/images/example.jfif"} alt="" className="recipe-image" />
        </div> */}
        {DrawRecipes()}
      </div>
      {popUpZoom && (
        <div className="zoom-container">
          <RecipeZoom data={data} popUpClose={popUpClose} />
        </div>
      )}
    </div>
  );
}

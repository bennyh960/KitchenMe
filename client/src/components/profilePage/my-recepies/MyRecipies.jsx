import React from "react";
import "./myrecipies.css";
import RecipeZoom from "./big-recipe/recipeZoom";

export default function MyRecipies() {
  return (
    <div className="my-recipes-container ">
      <h1 style={{ margin: "2rem" }}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
      </h1>
      <div className="ui input my-recipes-searchbar">
        <input type="text" placeholder="Search recipe name" />
      </div>
      <div className="categories-container ">
        <h2 className="line">Filter By Recipe Category</h2>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="recipes-container">
        <div>
          <div className="line recipe-title-one">
            <span>Name</span>
            <span>Stars</span>
          </div>
          <img src={process.env.PUBLIC_URL + "/images/example.jfif"} alt="" className="recipe-image" />
        </div>
        <div>
          <div className="line recipe-title-one">
            <span>Name</span>
            <span>Stars</span>
          </div>
          <img src={process.env.PUBLIC_URL + "/images/example.jfif"} alt="" className="recipe-image" />
        </div>
        <div>
          <div className="line recipe-title-one">
            <span>Name</span>
            <span>Stars</span>
          </div>
          <img src={process.env.PUBLIC_URL + "/images/example.jfif"} alt="" className="recipe-image" />
        </div>
        <div>
          <div className="line recipe-title-one">
            <span>Name</span>
            <span>Stars</span>
          </div>
          <img src={process.env.PUBLIC_URL + "/images/example.jfif"} alt="" className="recipe-image" />
        </div>
      </div>
    </div>
  );
}

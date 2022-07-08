// import React, { useState } from "react";
import Post from "../../post/post";
// import Addrecipe from "../add-recipe/addrecipe";
import { Link } from "react-router-dom";
import "./myposts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Aboutme from "../about-me/aboutme";

export default function Myposts() {
  return (
    <div className="my-posts-container">
      <div className="my-post-left-container">
        <div className="add-new-recipe white-box">
          <h2 style={{ margin: "15px", textAlign: "center" }} className="line">
            Add New Recipe
          </h2>
          <Link to={"/addNewRecipe"} className="btn-primary">
            <div style={{ textAlign: "center" }}>Write New Recipe</div>
          </Link>
        </div>
        {/* todo : add map function that render all user posts */}

        <Post />
        <div className="first-message">
          <h1>Welcome Benny</h1>

          <h3> 06/07/22</h3>
        </div>
      </div>
      <div className="my-post-right-container">
        <Aboutme />
        <div className="white-box user-friends">
          <h2 style={{ margin: "15px" }} className="line">
            My Friends:
          </h2>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="white-box user-recipes">
          <h2 style={{ margin: "15px" }} className="line">
            My Top Recipes:
          </h2>
        </div>
      </div>
    </div>
  );
}
